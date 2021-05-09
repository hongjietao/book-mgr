const mongoose = require('mongoose')
const { getMeta } = require('../helpers')

const BookSchema = new mongoose.Schema({
  name: String, //书名
  price: Number, //价格
  author: String, //作者
  publishDate: String, //出版日期
  classify: String, //分类
  meta: getMeta()
})

mongoose.model('Book', BookSchema)