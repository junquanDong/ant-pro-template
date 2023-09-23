// @ts-ignore
/* eslint-disable */

declare namespace UserList {
  /* APIRESULT */
  type ResultData = {
    id: number;
    account_id: number | string;
    username: string;
    company_id: number | string;
    company_name: string;
    phone: string;
    balance: float;
    create_ts: string;
    last_login?: string;
  };

  type UserListAPIResult = {
    code?: number;
    data: ResultData;
    message?: string;
  };

  type Result = {
    code?: number;
    message?: string;
  };

  /* APIPARAMS */
  type APIResetParams = {
    user_id: number;
  };

  type APIGetUserListParams = {
    keyword?: string;
    create_time_start?: string;
    create_time_end?: string;
    login_time_start?: string;
    login_time_end?: string;
  };

  /* EVENT */
  type ColumnOptionEvents = {
    onEdit: function;
    onPermission: function;
    onPackage: function;
    onResetPwd: function;
  };
}
