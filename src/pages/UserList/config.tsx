import { Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  key: React.Key;
  dataIndex: string;
  title: string;
  [key: string]: any;
}

const options = [
  {
    title: '编辑',
    event: 'onEdit',
  },
  {
    title: '权限分配',
    event: 'onPermission',
  },
  {
    title: '套餐配置',
    event: 'onPackage',
  },
  {
    title: '重置密码',
    event: 'onResetPwd',
    tips: '确定重置该用户密码吗?',
  },
];

export const column: ColumnsType<DataType> = (events: UserList.ColumnOptionEvents) => {
  return [
    {
      title: '账号ID',
      dataIndex: 'id',
      key: 'id',
      width: 92,
    },
    {
      title: '账号名称',
      dataIndex: 'username',
      key: 'username',
      width: 130,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '所属公司ID',
      dataIndex: 'company_id',
      key: 'company_id',
      width: 120,
    },
    {
      title: '所属公司名称',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'create_ts',
      key: 'create_ts',
      width: 178,
    },
    {
      title: '最近登录时间',
      dataIndex: 'last_login',
      key: 'last_login',
      width: 178,
    },
    {
      title: '套餐类型',
      dataIndex: 'type',
      key: 'type',
      fixed: 'right',
      width: 92,
      render: (text) => {
        return text || '无';
      },
    },
    {
      title: '剩余余额',
      dataIndex: 'balance',
      key: 'balance',
      fixed: 'right',
      width: 92,
      render(text) {
        return String(text);
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      width: 270,
      render: (_, record) => {
        const btn = (v) => {
          return (
            <Button
              key={v.title}
              type="link"
              onClick={() => !v.tips && events[v.event] && events[v.event](record)}
            >
              {v.title}
            </Button>
          );
        };
        return (
          <div className="options">
            {options.map((v) => {
              if (!v.tips) {
                return btn(v);
              }
              return (
                <Popconfirm
                  key={v.title}
                  title={v.tips}
                  onConfirm={() => events[v.event] && events[v.event](record)}
                  okText="重置"
                  cancelText="取消"
                >
                  {btn(v)}
                </Popconfirm>
              );
            })}
          </div>
        );
      },
    },
  ];
};
