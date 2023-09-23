import Crumb from '@/components/Crumb';
import Label from '@/components/Label';
import { Button, DatePicker, Input, Table, message } from 'antd';
import type { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import './index.less';
import { getUserList, resetPwd } from './services';
const { RangePicker } = DatePicker;

import { column } from './config';
console.log(column);
export default React.memo(() => {
  const [data, setData] = useState<UserList.ResultData[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [createTime, setCreateTime] = useState<string[]>([]);
  const [loginTime, setLoginTime] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getUserList();
      if (res.code === 200) {
        setData(res.data.reverse());
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  /** Event */
  const optionEvents: UserList.ColumnOptionEvents = {
    onEdit: (params: UserList.ResultData) => {
      history.push('/user-list/info', params);
    },
    onPermission: (params: UserList.ResultData) => {
      history.push('/user-list/permission', params);
    },
    onPackage: (params: UserList.ResultData) => {
      history.push('/user-list/package', params);
    },
    onResetPwd: async (params: UserList.ResultData) => {
      console.log('出发');
      const _param: UserList.APIResetParams = {
        user_id: params.id,
      };
      console.log(_param);
      const res = await resetPwd(_param);
      if (res.code === 200) {
        message.success(res.message);
      }
    },
  };

  const onSelectTime = (times: Moment[], updateFun: Function) => {
    updateFun((times || []).map((_) => _.format('YYYY-MM-DD')));
  };

  const onSearch = async () => {
    console.log(loginTime, createTime, keyword);
    const [create_time_start, create_time_end] = createTime;
    const [login_time_start, login_time_end] = loginTime;

    const _param = {
      create_time_start,
      create_time_end,
      login_time_start,
      login_time_end,
    };

    if (keyword) {
      _param.keyword = keyword;
    }
    setLoading(true);
    const res = await getUserList(_param);
    if (res.code === 200) {
      setData(res.data);
    }
    setLoading(false);
  };

  console.log({ data });
  return (
    <div className="do-page-user-list">
      <Crumb label="用户列表" />
      <div className="filter">
        <div className="left">
          <Input
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入姓名或账号或公司名称"
            style={{ width: 240 }}
          />
          <Label label="创建时间" type="border" className="m-l-8">
            <RangePicker onChange={(_) => onSelectTime(_, setCreateTime)} />
          </Label>
          <Label label="最近登录时间" type="border" className="m-l-8">
            <RangePicker onChange={(_) => onSelectTime(_, setLoginTime)} />
          </Label>
        </div>
        <div className="right">
          <Button type="primary" onClick={onSearch}>
            搜索
          </Button>
        </div>
      </div>
      <div className="content">
        <Button
          type="primary"
          style={{ marginBottom: 8 }}
          onClick={() => history.push('/user-list/info')}
        >
          创建用户
        </Button>
        <Table
          loading={loading}
          scroll={{ x: 200, y: document.body.offsetHeight - 360 }}
          key="phone"
          columns={column(optionEvents)}
          dataSource={data}
          bordered
        />
      </div>
    </div>
  );
});
