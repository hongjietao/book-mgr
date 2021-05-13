export default [
  {
    title: '房源管理',
    path: '/books',
  },
  {
    title: '房源管理',
    path: '/house',
    children: [
      {
        title: '房源列表',
        path: '/house-list',
      },
      // {
      //   title: '已上线房源',
      //   path: '/add-house',
      // },
    ]
  },
  {
    title: '用户管理 ',
    path: '/user',
  },
  {
    title: '操作日志 ',
    path: '/log',
  },
]
