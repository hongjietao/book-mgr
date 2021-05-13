const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const BookSchema = new mongoose.Schema({
  name: String, //书名
  price: Number, //价格
  author: String, //作者
  publishDate: String, //出版日期
  classify: String, //分类
  count: Number, //库存
  meta: getMeta()
})

BookSchema.pre('save', preSave);

mongoose.model('Book', BookSchema)