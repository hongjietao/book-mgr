require('./Schemas/User')
require('./Schemas/InviteCode')
require('./Schemas/Book')
require('./Schemas/House')
require('./Schemas/Log')
require('./Schemas/Character')

const mongoose = require('mongoose')

// 连接数据库
const connect = () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://127.0.0.1:27017/house-mgr');
  
    // 当数据库被打开的时候，做一些事情
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功');
      resolve()
    })
  })
}

module.exports = {
  connect,
}