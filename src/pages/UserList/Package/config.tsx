import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  dataIndex: string;
  title: string;
  [key: string]: any;
}

export const column: ColumnsType<DataType> = [
  {
    title: '一级菜单',
    dataIndex: 'menu',
    key: 'menu',
  },
  {
    title: '权限名称',
    dataIndex: 'permission_name',
    key: 'permission_name',
  },
  {
    title: '剩余次数',
    dataIndex: 'frequency',
    key: 'nafrequencyme',
  },
  {
    title: '到期时间',
    dataIndex: 'expires_time',
    key: 'expires_time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render() {
      return <Button type="link">操作</Button>;
    },
  },
  {
    title: '变更记录',
    dataIndex: 'change_log',
    key: 'change_log',
    render() {
      return <Button type="link">查看</Button>;
    },
  },
];
