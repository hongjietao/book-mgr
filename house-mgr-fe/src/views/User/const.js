export const columns = [
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '创建日期',
    slots: {
      customRender: 'createAt',
    },
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions',
    },
  },
]
