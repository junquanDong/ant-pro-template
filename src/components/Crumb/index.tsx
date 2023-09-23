import { Breadcrumb } from 'antd';
// import router from '../../../config/router';
import { Link } from 'umi';
import './index.less';

const router = [
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
    label: '菜单权限配置',
    component: './UserList/Permission',
  },
  { path: '/', redirect: '/user-list' },
  { path: '*', layout: false, component: './404' },
];

interface CrumbProps {
  label: string | string[];
  className?: string;
  size?: 'default' | 'small' | 'big';
}

export default (props: CrumbProps) => {
  if (!props.label) {
    return null;
  }

  let items = [];

  if (typeof props.label === 'string') {
    items.push({ title: props.label });
  } else if (Array.isArray(props.label)) {
    props.label.forEach((_label, _idx) => {
      const _routerInfo = router.find((r) => (r.name || r.label) == _label);
      items.push({
        title:
          props.label.length > _idx + 1 ? <Link to={_routerInfo?.path}>{_label}</Link> : _label,
      });
    });
  }

  let _cls = '';
  if (props.size) {
    _cls = `crumb-size-${props.size}`;
  }
  return (
    <div className={`do-comp-crumb ${props.className} ${_cls}`}>
      <Breadcrumb items={items} />
    </div>
  );
};
