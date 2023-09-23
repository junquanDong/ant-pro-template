import { request } from '@umijs/max';

/** 获取用户列表 GET /api/admin_manager/user_list */
export async function getUserList(
  params?: UserList.APIGetUserListParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: UserList.UserListAPIResult;
  }>('/api/admin_manager/user_list', {
    method: 'GET',
    params: params || {},
    ...(options || {}),
  });
}

/** 重置密码 POST /api/admin_manager/reset_password */
export async function resetPwd(body: UserList.APIResetParams, options?: { [key: string]: any }) {
  return request<UserList.Result>('/api/admin_manager/reset_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
