require('./Schemas/User')
require('./Schemas/InviteCode')
require('./Schemas/House')
require('./Schemas/Log')
require('./Schemas/Character')
require('./Schemas/LogResopnse')
require('./Schemas/ForgetPassword')
require('./Schemas/Customer')
// require('./Schemas/SaleHouse')

const mongoose = require('mongoose')

// 连接数据库
const connect = () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://127.0.0.1:27017/house-mgr');
  
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功');
      resolve()
    })
  })
}

module.exports = {
  connect,
}