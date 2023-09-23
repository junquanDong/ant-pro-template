import { useState } from 'react';
import {
  getPermissionRole as permissionRoleApi,
  getPermissionTree as permissionTreeApi,
} from './services';

export default function GlobalModel() {
  /* State */
  const [permissionTree, setPermissionTree] = useState([]); // 用户端权限树
  const [permissionRoleList, setPermissionRoleList] = useState([]); // 权限角色列表

  /* Effect */
  const getPermissionTree = async () => {
    if (permissionTree.length) {
      return permissionTree;
    }
    const res = await permissionTreeApi();

    if (res.code === 200) {
      setPermissionTree(res.data);
      return res.data;
    }

    return undefined;
  };
  const getPermissionRole = async () => {
    if (permissionRoleList.length) {
      return permissionRoleList;
    }
    const res = await permissionRoleApi();

    if (res.code === 200) {
      setPermissionRoleList(res.data);
      return res.data;
    }

    return undefined;
  };

  return { permissionTree, getPermissionTree, permissionRoleList, getPermissionRole };
}
