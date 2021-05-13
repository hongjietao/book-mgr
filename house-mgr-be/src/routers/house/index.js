const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils/index')
// const { v4: uuidv4 } = require('uuid');

const House = mongoose.model('House')

const router = new Router({
  prefix: '/house',
})

router.post('/add', async (ctx) => {
  const { 
    city,
    neighborhood,
    floor,
    floor_plan_room,
    area,
    facing,
  } = getBody(ctx)

  const house = new House({
    city,
    neighborhood,
    floor,
    floor_plan_room,
    area,
    facing,
  })
  const res = await house.save()
  ctx.body = {
    code: 1,
    data: res,
    msg: '创建成功'
  }
})

router.get('/list', async (ctx) => {
  // const {
  //   query
  // } = ctx.query

  const res = await House
    .find()
    .sort({
      _id: -1
    })

  ctx.body = {
    code: 1,
    data: res, 
    msg: '查询成功'
  }

})

module.exports = router