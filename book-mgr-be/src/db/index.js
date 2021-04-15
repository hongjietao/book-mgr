 const mongoose = require('mongoose')

//  1.给那个数据库的
// 那个集合
// 添加什么格式的文档

// Schema 映射mongodb下的一个集合，并且他的内容就是集合下文档的构成
// Model 根据Schema生成的一套方法，这套方法用来操作mongodb下的集合和集合下的文档

const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number,
})

const UserModel = mongoose.model('User', UserSchema);

// 连接数据库
const connect = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

  // 当数据库被打开的时候，做一些事情
  mongoose.connection.on('open', () => {
    console.log('连接成功');

    // 创建文档
    const user = new UserModel({
      nickname: '小好',
      password: '123456',
      age: 12
    })

    // 保存，同步到mongodb
    user.save()
  })
}

connect()