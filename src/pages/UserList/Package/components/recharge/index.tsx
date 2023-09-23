import Crumb from '@/components/Crumb';
import Label from '@/components/Label';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Input, Modal, Upload, message } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import './index.less';

export default forwardRef((props, ref) => {
  const [files, setFiles] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<float | null>(null);
  const [remark, setRemark] = React.useState<string>('');
  const [modalStatus, setModalStatus] = React.useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    setModalStatus: (status) => {
      setModalStatus(status);
    },
  }));

  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/admin_manager/upload',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        setFiles(info.fileList.map((v) => v?.response?.data));
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  const onOk = () => {
    // TODO 调用接口
    setModalStatus(false);
  };

  return (
    <Modal
      width={700}
      open={modalStatus}
      onCancel={() => setModalStatus(false)}
      onOk={onOk}
      maskClosable
    >
      <div className="do-modal-package-recharge">
        <Crumb size="big" label="人工充值"></Crumb>

        <div className="content">
          <div className="user-info">
            <Label label="用户ID">{props.state?.id}</Label>
            <Label label="用户名称">{props.state?.username}</Label>
            <Label label="所属公司">{props.state?.company_name}</Label>
          </div>
          <Label label="充值金额" hideColon required>
            <Input
              style={{ width: 220 }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </Label>
          <Label label="转账凭证" hideColon required>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} style={{ width: 220 }} className="upload-btn">
                点击上传银行转账流水单
              </Button>
            </Upload>
          </Label>

          <Label label="备注" hideColon required className="title-remarks"></Label>
          <Input.TextArea
            value={remark}
            onChange={(e) => {
              setRemark(e.target.value);
            }}
            rows={4}
            placeholder="请填写充值备注"
            maxLength={6}
          />
        </div>
      </div>
    </Modal>
  );
});
