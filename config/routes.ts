export default [
  {
    path: '/user',
    name: '登录页',
    layout: false,
    routes: [{ path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/user-list',
    name: '用户管理',
    icon: 'table',
    component: './UserList',
  },
  {
    path: '/user-list/permission',
    name: '菜单权限配置',
    hideInMenu: true,
    component: './UserList/Permission',
  },
  {
    path: '/user-list/info',
    name: '新增/编辑用户',
    hideInMenu: true,
    component: './UserList/Info',
  },
  {
    path: '/user-list/package',
    name: '套餐配置',
    hideInMenu: true,
    component: './UserList/Package',
  },
  { path: '/', redirect: '/user-list' },
  { path: '*', layout: false, component: './404' },
];
