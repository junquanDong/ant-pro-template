import { request } from '@umijs/max';

/** 获取用户权限 GET /api/admin_manager/user_permission */
export async function getUserPermission(
  params: UserPermission.APIGetUPermissionParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: UserPermission.PermissionTreeResult;
  }>('/api/admin_manager/user_permission', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 更新用户权限 POST /api/permission/add_user_permission */
export async function updateUserPermission(
  body: UserPermission.APIPUpdateUPermissionParams,
  options?: { [key: string]: any },
) {
  return request<UserPermission.Result>('/api/permission/add_user_permission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
