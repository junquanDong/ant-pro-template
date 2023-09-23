// @ts-ignore
/* eslint-disable */

declare namespace UserPermission {
  /* APIRESULT */
  type Result = {
    code?: number;
    message?: string;
  };

  type PermissionData = {
    id: number;
    name: string;
    model: string;
    mune?: string;
    button?: string;
    type: string;
    level: number;
    parent_id: number;
    child?: PermissionData;
  };

  type PermissionTreeResult = {
    code?: number;
    data: ResultData[];
    message?: string;
  };

  /* APIPARAMS */
  type APIGetUPermissionParams = {
    user_id: number;
  };

  type APIPUpdateUPermissionParams = {
    user_id: number;
    permission_ids: number[];
  };
}
