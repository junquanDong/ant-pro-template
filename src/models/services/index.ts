import { request } from '@umijs/max';

/** 获取权限树 GET /api/permission/tree */
export async function getPermissionTree(options?: { [key: string]: any }) {
  return request<{
    data: GlobalModel.PermissionTreeResult;
  }>('/api/permission/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取角色权限列表 GET /api/permission/roles */
export async function getPermissionRole(options?: { [key: string]: any }) {
  return request<{
    data: GlobalModel.PermissionRoleResult;
  }>('/api/permission/roles', {
    method: 'GET',
    ...(options || {}),
  });
}
