import Crumb from '@/components/Crumb';
import Label from '@/components/Label';
import { Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { forwardRef, useImperativeHandle } from 'react';
import './index.less';
export default forwardRef((props, ref) => {
  const [data, setData] = React.useState<{}[]>([]);
  const [modalStatus, setModalStatus] = React.useState<boolean>(false);

  interface DataType {
    key: React.Key;
    dataIndex: string;
    title: string;
    [key: string]: any;
  }

  const column: ColumnsType<DataType> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '办理人ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '办理人名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '办理时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '办理附件',
      dataIndex: 'files',
      key: 'files',
      render() {
        return <Button type="link">查看附件</Button>;
      },
    },
    {
      title: '办理备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  useImperativeHandle(ref, () => ({
    setModalStatus: (status) => {
      setModalStatus(status);
    },
  }));

  const onOk = () => {
    // TODO 调用接口
    setModalStatus(false);
  };

  return (
    <Modal
      width={800}
      open={modalStatus}
      onCancel={() => setModalStatus(false)}
      maskClosable
      footer={[
        <Button key="cancel" style={{ marginRight: 8 }} onClick={() => setModalStatus(false)}>
          关闭
        </Button>,
      ]}
    >
      <div className="do-modal-package-recharge-log">
        <Crumb size="big" label="充值与消费记录"></Crumb>

        <div className="content">
          <div className="user-info">
            <Label label="用户ID">{props.state?.id}</Label>
            <Label label="用户名称">{props.state?.username}</Label>
            <Label label="所属公司">{props.state?.company_name}</Label>
          </div>
          <Table columns={column} datasource={[]} bordered />
        </div>
      </div>
    </Modal>
  );
});
