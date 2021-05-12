const mongoose = require('mongoose')
const Router = require('@koa/router')
const { getBody } = require('../../helpers/utils/index')

const BOOK_COUNT = {
  IN: "IN_COUNT",
  OUT: "OUT_COUNT",
}

const Book = mongoose.model('Book')

const findOneBook = async (id) => {
  const one = await Book.findOne({
    _id: id,
  }).exec()
  return one
}

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
    count,
  } = getBody(ctx)

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
    count,
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

router.post('/update/count', async (ctx) => {
  const {
    id,
    type,
  } = ctx.request.body
  
  let { num } = ctx.request.body
  num = Number(num)

  let book = await findOneBook(id)

  if(!book) {
    ctx.body = {
      code: 0,
      msg: '未找到书籍'
    }
    return
  }

  if(type === BOOK_COUNT.IN) {
    num = Math.abs(num)
  } else {
    num = -Math.abs(num)
  }

  book.count = book.count + num

  if(book.count < 0) {
    ctx.body = {
      code: 0,
      msg: '剩余书籍数量不足以出库',
    }
  }
  const res = await book.save()

  ctx.body = {
    code: 1,
    data: res,
    msg: '操作成功'
  }

})

router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body

  const one = await findOneBook(id)

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍',
    }
    return ;
  }

  const newQuery = {}
  Object.entries(others).forEach(([key, value])=>{
    if(value) {
      newQuery[key] = value
    }
  })

  Object.assign(one, newQuery)

  const res = await one.save()

  ctx.body = {
    code: 1,
    data: res,
    msg: '修改成功',
  }
})

router.get('/details/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const one = await findOneBook(id)

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍',
    }
    return;
  }

  ctx.body = {
    code: 1,
    data: one,
    msg: '成功',
  }

})

module.exports = router