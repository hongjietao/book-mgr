const mongoose = require('mongoose')
const Router = require('@koa/router')
const { getBody } = require('../../helpers/utils/index')

const Book = mongoose.model('Book')

const router = new Router({
  prefix: '/book',
})

router.post('/add', async (ctx) => {
  const {
    name,
    price,
    author,
    publishDate,
    classify,
  } = getBody(ctx)

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
  })

  const res = await book.save()

  ctx.body = {
    code: 1,
    data: res,
    msg: '创建成功'
  }
})

router.get('/list', async (ctx) => {
  const {
    page = 1,
    keyword = '',
  } = ctx.query

  let {
    size = 10
  } = ctx.query
  
  size = Number(size)

  const query = {}
  if(keyword) {
    query.name = keyword
  }

  const list = await Book
    .find(query)
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  const total = await Book.countDocuments()

  ctx.body = {
    code: 1,
    data: {
      list,
      total,
      page,
      size,
    },
    msg: '获取列表成功',
  }
})

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await Book.deleteOne({
    _id: id,
  })
  
  ctx.body = {
    code: 1,
    data: delMsg,
    msg: '删除成功',
  }

})

module.exports = router