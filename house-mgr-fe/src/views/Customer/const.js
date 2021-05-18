export const houseColumns = [
  // {
  //   title: "客户编号",
  //   // 自动省略
  //   // ellipsis: true,
  //   dataIndex: "_id",
  // },
  {
    title: "客户姓名",
    dataIndex: "name",
  },
  {
    title: "电话",
    dataIndex: "phone",
  },
  {
    title: "身份证",
    dataIndex: "ID_card",
  },
  {
    title: "客户类型",
    slots: {
      customRender: "type"
    }
  },
  {
    title: "录入人员",
    dataIndex: "creater",
  },
]

/*

name: String, //客户姓名
phone: String, //电话
ID_card: String, //身份证
type: Number, //类型： 0: 租房用户，1: 买房用户
creater: String, // 录入人员
*/
