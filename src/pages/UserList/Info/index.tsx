import Crumb from '@/components/Crumb';
import Label from '@/components/Label';
import { Button, Input, Spin, Switch, message } from 'antd';
import React from 'react';
import { history, useLocation } from 'umi';
import { baseInfo, invoicingInfo } from './config';
import './index.less';
import { getUserInfo, saveUserInfo } from './services';

export default React.memo(() => {
  const { state } = useLocation();
  const [disabledPwd, setDisabledPwd] = React.useState<boolean>(state?.id ? true : false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [saveLoading, setSaveLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<UserEdit.EditInfo>({
    user: {},
    company: {},
  });
  const onSave = async () => {
    console.log(123);
    setSaveLoading(true);
    const res = await saveUserInfo(data);
    console.log(res);
    setSaveLoading(false);
    if (res.code === 200) {
      message.success('保存成功!');
      history.back();
    }
  };

  const transData = (_data) => {
    return {
      user: {
        id: _data.id,
        email: _data.email,
        is_admin: _data.is_admin,
        real_name: _data.real_name,
        phone: _data.phone,
      },
      company: {
        company_id: _data.company?.company_id,
        name: _data.company?.name,
        invoicing_name: _data.company?.invoicing_name,
        bank_account: _data.company?.bank_account,
        invoicing_bank: _data.company?.invoicing_bank,
        tax_number: _data.company?.tax_number,
        mailing_address: _data.company?.mailing_address,
        recipient: _data.company?.recipient,
        recipient_phone: _data.company?.recipient_phone,
        invoicing_tax_number: _data.company?.invoicing_tax_number,
      },
    };
  };

  React.useEffect(() => {
    const init = async () => {
      if (!state || !state.id) {
        return;
      }
      setLoading(true);
      const res = await getUserInfo({
        user_id: state.id,
      } as UserEdit.APIDefaultParams);
      console.log({ res });
      if (res.code === 200) {
        setData(transData(res.data));
      } else {
        // TODO 重新加载
      }
      setLoading(false);
    };

    init();
  }, []);

  const getItemValue = (key) => {
    try {
      const _keys = key.split('.');
      let value = data;

      _keys.forEach((__key) => {
        value = value[__key];
      });
      return value;
    } catch (error) {}
    return null;
  };

  const setItemValue = (key, value) => {
    const keys = key.split('.');
    data[keys[0]][keys[1]] = value;
    setData({ ...data });
  };
  console.log(loading);
  return (
    <div className="do-page-user-edit">
      <Crumb label={['用户管理', state?.id ? '编辑用户' : '新增用户']} />
      <Spin spinning={loading}>
        <div className="content">
          <Crumb label="基本信息" className="m-l-8" />
          <div className="box-info">
            {baseInfo.map((_item) => {
              const _val = getItemValue(_item.key);
              if (_item.existShow && !_val) {
                return;
              }
              return (
                <Label
                  label={_item.label}
                  hideColon
                  required={_item.required}
                  className="m-b-12"
                  key={_item.label}
                >
                  {_item.key === 'user.is_admin' ? (
                    <div style={{ width: 200 }}>
                      <Switch
                        checked={!!_val}
                        onChange={(e) => setItemValue(_item.key, e ? 1 : 0)}
                      />
                    </div>
                  ) : (
                    <Input
                      value={_val}
                      placeholder={_item.placeholder}
                      disabled={_item.key === 'user.password' ? disabledPwd : _item.disabled}
                      onChange={(e) => setItemValue(_item.key, e.target.value)}
                    />
                  )}

                  {_item.key === 'user.password' ? (
                    <Button
                      className="reset-btn"
                      type="link"
                      onClick={() => {
                        setItemValue(_item.key, '');
                        setDisabledPwd(false);
                      }}
                    >
                      重置
                    </Button>
                  ) : null}
                </Label>
              );
            })}
          </div>
          <Crumb label="开票信息" className="m-l-8" />
          <div className="box-info">
            {invoicingInfo.map((_item) => {
              const _val = getItemValue(_item.key);
              if (_item.existShow && !_val) {
                return;
              }
              return (
                <Label
                  label={_item.label}
                  hideColon
                  required={_item.required}
                  className="m-b-12"
                  key={_item.label}
                >
                  <Input
                    value={_val}
                    placeholder={_item.placeholder}
                    onChange={(e) => setItemValue(_item.key, e.target.value)}
                  />
                </Label>
              );
            })}
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
