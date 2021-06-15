`
 -1 无任何权限
  0 管理员权限
  1 增加权限
  2 删除权限
  3 查找权限
  4 修改权限
  5 审核权限 
`

const defaultCharacters = [
  {
    title: '管理员',
    name: 'admin',
    power: {
      house: [0],
      user: [0],
    },
  },
  {
    title: '成员',
    name: 'member',
    power: {
      house: [1],
      user: [-1],
    },
  },
];

module.exports = {
  defaultCharacters,
};
