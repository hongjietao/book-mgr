const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils/index')
// const { v4: uuidv4 } = require('uuid');

const Customer = mongoose.model('Customer')

const findOneCustomer = async (id) => {
  const one = await Customer.findOne({
    _id: id,
  }).exec()
  return one
}

const router = new Router({
  prefix: '/customer',
})

router.post('/add', async (ctx) => {
  const { 
    name,
    phone,
    ID_card,
    type,
    area,
    creater,
  } = getBody(ctx)

  const customer = new Customer({
    name,
    phone,
    ID_card,
    type,
    area,
    creater,
  })
  const res = await customer.save()
  ctx.body = {
    code: 1,
    data: res,
    msg: '创建成功'
  }
})


router.get('/list', async (ctx) => {
  const {
    keyword = '',
  } = ctx.query

  let {
    page = 1,
    size = 20
  } = ctx.query
  
  size = Number(size)
  page = Number(page)

  const query = {}
  if(keyword) {
    query.name = keyword
  }

  const list = await Customer
    .find(query)
    .sort({ _id: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  const total = await Customer.countDocuments()

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

  const delMsg = await Customer.deleteOne({
    _id: id,
  })
  
  ctx.body = {
    code: 1,
    data: delMsg,
    msg: '删除成功',
  }
})

// 更新客源信息
router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body

  const one = await findOneCustomer(id)

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '没有找到房源',
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

router.get('/detail/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const one = await findOneCustomer(id)

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '没有找到客户',
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