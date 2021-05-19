export default [
  {
    title: '总览',
    path: '/dashboard',
    onlyAdmin: false,
  },
  {
    title: '房源管理',
    path: '/house-list',
    onlyAdmin: false,
  },
  {
    title: '客源管理',
    path: '/customer-list',
    onlyAdmin: false,
  },
  {
    title: '员工管理 ',
    path: '/user',
    onlyAdmin: true,
  },
  {
    title: '操作日志 ',
    path: '/log',
    onlyAdmin: true,
  },
  {
    title: '其它',
    onlyAdmin: false,
    children: [
      {
        title: '邀请码',
        path: '/invite-code',
        onlyAdmin: true,
      },
      {
        title: '重置密码',
        path: '/reset-password',
        onlyAdmin: true,
      },
      {
        title: '个人信息',
        path: '/profile',
        onlyAdmin: false,
      },
    ]
  },
]
