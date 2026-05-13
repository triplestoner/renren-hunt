import AdminApp from './App';

const AdminPortal = ({ onRoleSwitch }) => {
  // 直接进入管理后台，无需登录确认
  return <AdminApp onRoleSwitch={onRoleSwitch} />;
};

export default AdminPortal;
