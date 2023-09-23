import { request } from '@umijs/max';

/** 获取用户信息 GET /api/admin_manager/user_info */
export async function getUserInfo(
  params: UserEdit.APIDefaultParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: UserEdit.UserInfoResult;
  }>('/api/admin_manager/user_info', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 保存用户信息 POST /api/admin_manager/user_edit */
export async function saveUserInfo(data: UserEdit.EditInfo, options?: { [key: string]: any }) {
  return request<{
    data: UserEdit.DefaultResult;
  }>('/api/admin_manager/user_edit', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
