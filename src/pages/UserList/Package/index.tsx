import Crumb from '@/components/Crumb';
import Label from '@/components/Label';
import { Button, Spin, Table } from 'antd';
import React, { useRef } from 'react';
import { useLocation } from 'umi';
import PackageLog from './components/packageLog';
import Recharge from './components/recharge';
import RechargeLog from './components/rechargeLog';
import SubPackage from './components/subPackage';
import { column } from './config';
import './index.less';

export default React.memo(() => {
  const { state } = useLocation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const subPackageModal = useRef();
  const packageLogModal = useRef();
  const rechargeModal = useRef();
  const rechargeLogModal = useRef();
  React.useEffect(() => {
    const init = async () => {
      if (!state || !state.id) {
        history.push('/');
        return;
      }
      // setLoading(true);
      // const res = await getUserInfo({
      //   user_id: state.id,
      // } as UserEdit.APIDefaultParams);
      // console.log({ res });
      // if (res.code === 200) {
      //   setData(transData(res.data));
      // } else {
      //   // TODO 重新加载
      //   message.error(res.message);
      // }
      // setLoading(false);
    };

    init();
  }, []);

  console.log(loading);
  return (
    <div className="do-page-user-package">
      <Crumb label={['用户管理', '账户管理']} />
      <Spin spinning={loading}>
        <div className="content">
          <div className="user-info">
            <Label label="用户ID" className="m-b-12">
              {state?.id}
            </Label>
            <Label label="用户名称" className="m-b-12">
              {state?.username}
            </Label>
            <Label label="所属公司" className="m-b-12">
              {state?.company_name}
            </Label>
          </div>
          <div className="package-info info-box">
            <span className="label">当前套餐</span>
            <span className="value">无</span>
            <Button type="link" onClick={() => subPackageModal.current.setModalStatus(true)}>
              办理套餐
            </Button>
            <Button type="link" onClick={() => packageLogModal.current.setModalStatus(true)}>
              套餐办理记录
            </Button>
          </div>
          <div className="price-info info-box">
            <span className="label">当前余额</span>
            <span className="value">9999元</span>
            <Button type="link" onClick={() => rechargeModal.current.setModalStatus(true)}>
              充值
            </Button>
            <Button type="link" onClick={() => rechargeLogModal.current.setModalStatus(true)}>
              充值与消费记录
            </Button>
          </div>
          <Crumb label={['功能余额']} className="package-title" />
          <Table columns={column} datasource={[]} bordered />
        </div>
        <SubPackage state={state} ref={subPackageModal} />
        <PackageLog state={state} ref={packageLogModal} />
        <Recharge state={state} ref={rechargeModal} />
        <RechargeLog state={state} ref={rechargeLogModal} />
      </Spin>
    </div>
  );
});
