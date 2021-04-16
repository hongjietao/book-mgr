 require('./Schemas/User')
 
 const mongoose = require('mongoose')

// 连接数据库
const connect = () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
  
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