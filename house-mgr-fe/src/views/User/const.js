export const columns = [
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '城市',
    dataIndex: 'city',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '身份证',
    dataIndex: 'ID_card',
  },
  {
    title: '状态',
    // dataIndex: 'type',
    slots: {
      customRender: 'type',
    },
  },
  {
    title: '创建日期',
    slots: {
      customRender: 'createAt',
    },
  },
  {
    title: '角色',
    slots: {
      customRender: 'character',
    },
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions',
    },
  },
]

// city: String, //所在城市
// phone: String, //手机号
// ID_card: String, //身份证
// type: Number, //状态 0:离职， 1: 在职
