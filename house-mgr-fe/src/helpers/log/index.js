const LOG_MAP = [
  ['/character/list', '获取角色列表'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取自己的登录信息'],
  ['/house/list', '获取房源列表'],
  ['/customer/list', '获取客源列表'],
  ['/user/list', '获取员工列表'],
  ['/user/add', '新增用户'],
  ['/user/reset/password', '重置用户密码'],
  ['/dashboard/base-info', '总揽'],
  ['/invite/list', '获取邀请码列表'],
  ['/invite/add', '新增邀请码'],
];

export const getLogInfoByPath = (path) => {
  let title = '';

  LOG_MAP.forEach((item) => {
    if (path.includes(item[0])) {
      title = path.replace(item[0], item[1]);
    }
  });

  return title || path;
};
