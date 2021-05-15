const Router = require('@koa/router')
const mongoose = require('mongoose')
const config = require('../../project.config')

const ForgetPassword = mongoose.model('ForgetPassword')
const User = mongoose.model('User')


const router = new Router({
  prefix: '/forget-password',
})


router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.params

  page = Number(page)
  size = Number(size)
  
  const list = await ForgetPassword
    .find({
      status: 1,
    })
    .sort({
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()
  
    const total = await ForgetPassword
      .find({ status: 1 })
      .countDocuments()
      .exec()
  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      list,
      page,
      size,
      total,
    }
  }
})

router.post('/add', async (ctx) => {
  // 账户存在
  const {
    account 
  } = ctx.request.body 

  const user = await User.findOne({
    account
  }).exec()
  if(!user) {
    ctx.body = {
      code: 1,
      msg: '申请成功',
    }
    return ;
  }

  // forgetPassword不存在当前账户status为1的数据
  const one = await ForgetPassword.findOne({
    account,
    status: 1,
  }).exec()

  if(one) {
    ctx.body = {
      code: 1,
      msg: '申请成功',
    }
    return ;
  }

  const forgetPwd = new ForgetPassword({
    account,
    status: 1,
  })

  await forgetPwd.save()

  ctx.body = {
    code: 1,
    msg: '申请成功',
  }

})

router.post('/update/status', async (ctx) => {
  const {
    id,
    status,
  } = ctx.request.body

  const one = await ForgetPassword.findOne({
    _id: id
  })

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '找不到这条申请',
    }
  }
  
  one.status = status;

  if (status === 2) {
    const user = await User.findOne({
      account: one.account,
    }).exec();

    if (user) {
      user.password = config.DEFAULT_PASSWORD;

      await user.save();
    }
  }

  await one.save();

  await one.save()

  ctx.body = {
    code: 1,
    msg: '处理成功',
  }

})

module.exports = router