export default [
  {
    title: '房源管理',
    path: '/house-list',
  },
  {
    title: '用户管理 ',
    path: '/user',
  },
  {
    title: '操作日志 ',
    path: '/log',
  },
  {
    title: '其它',
    path: '/others',
    children: [
      {
        title: '列表',
        path: '/books',
      },
      // {
      //   title: '已上线房源',
      //   path: '/add-house',
      // },
    ]
  },
]
