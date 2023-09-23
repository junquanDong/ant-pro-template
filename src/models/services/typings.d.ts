// @ts-ignore
/* eslint-disable */

declare namespace GlobalModel {
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

  type DefaultResult = {
    code?: number;
    message?: string;
  };

  type PermissionTreeResult = DefaultResult & {
    data: ResultData[];
  };

  type RoleData = {
    id: number;
    name: string;
  };

  type PermissionRoleResult = DefaultResult & {
    data: RoleData[];
  };
}
