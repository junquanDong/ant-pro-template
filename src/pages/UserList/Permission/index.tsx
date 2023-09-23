import Crumb from '@/components/Crumb';
import Label from '@/components/Label';
import { Button, Select, Spin, Tree, message } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React from 'react';
import { history, useLocation, useModel } from 'umi';
import './index.less';
import { getUserPermission, updateUserPermission } from './services';

function getAllChildIds(node) {
  let childIds = [node.key];

  if (node.children && node.children.length > 0) {
    for (const childNode of node.children) {
      const childNodeIds = getAllChildIds(childNode);
      childIds = [...childIds, ...childNodeIds];
    }
  }

  return childIds;
}

export default React.memo(() => {
  const { state } = useLocation();
  const global = useModel('global');
  const [myLoading, setMyLoading] = React.useState<boolean>(false);
  const [saveLoading, setSaveLoading] = React.useState<boolean>(false);
  const [checkedKeys, setCheckedKeys] = React.useState<number[]>([]);
  const [treeData, setTreeData] = React.useState<DataNode[]>([]);
  const [defaultExpKeys, setDefaultExpKeys] = React.useState<number[]>([]);

  const onSave = async () => {
    const _param: UserPermission.APIPUpdateUPermissionParams = {
      user_id: state.id,
      permission_ids: checkedKeys,
    };
    setSaveLoading(true);
    const res = await updateUserPermission(_param);
    setSaveLoading(false);
    if (res.code === 200) {
      message.success('保存成功!');
      history.back();
    }
  };

  const permissionFormatTreeData = (list: UserPermission.PermissionData[]) => {
    return list.map((_cur) => {
      const _new_cur = {
        key: _cur.id,
        title: _cur.name,
        children: permissionFormatTreeData(_cur.child),
      };

      return _new_cur;
    });
  };

  const transPermissionTree = () => {
    if (global.permissionTree && global.permissionTree.length) {
      console.log('更新数据', global.permissionTree);
      setTreeData(permissionFormatTreeData(global.permissionTree));
      setDefaultExpKeys(global.permissionTree.map((v) => v.id));
    }
  };

  React.useEffect(() => {
    const init = async () => {
      setMyLoading(true);
      if (!state || !state.id) {
        history.push('/');
        return;
      }
      if (!global.permissionTree || !global.permissionTree.length) {
        global.getPermissionTree();
      }
      if (!global.permissionRoleList || !global.permissionRoleList.length) {
        global.getPermissionRole();
      }

      transPermissionTree();
      const permissionResult = await getUserPermission({
        user_id: state.id,
      } as UserPermission.APIGetUPermissionParams);
      setCheckedKeys(permissionResult.data ? permissionResult.data.map((v) => v.id) : []);
      setMyLoading(false);
      // TODO 做错误刷新处理
    };

    init();
  }, []);

  React.useEffect(() => {
    transPermissionTree();
  }, [global.permissionTree]);

  return (
    <div className="do-page-user-permission">
      <Crumb label={['用户管理', '菜单权限配置']} />
      <Spin spinning={myLoading}>
        <div className="content">
          <Label label="用户ID " className="m-b-12">
            {state?.id}
          </Label>
          <Label label="手机号 " className="m-b-12">
            {state?.phone}
          </Label>
          <Label label="权限角色选择" hideColon className="m-b-12">
            <Select
              style={{ width: 160 }}
              options={global.permissionRoleList}
              placeholder="请选择权限角色"
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Label>
          <Crumb label="权限分配" className="m-l-8" />
          <div className="box-permission">
            {defaultExpKeys && defaultExpKeys.length ? (
              <Tree
                checkable
                checkedKeys={checkedKeys}
                defaultExpandedKeys={defaultExpKeys}
                onCheck={(val) => {
                  setCheckedKeys(val);
                }}
                treeData={treeData}
              />
            ) : null}
          </div>
          <div className="btns">
            <Button onClick={() => history.back()}>返回</Button>
            <Button type="primary" onClick={onSave} loading={saveLoading}>
              保存
            </Button>
          </div>
        </div>
      </Spin>
    </div>
  );
});
