const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils/index')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')

const router = new Router({
  prefix: '/auth',
})

router.post('/register', async (ctx) => {
  const { account, password } = getBody(ctx);

  // 校验账号密码是否符合逻辑
  const one = await User.findOne({account}).exec();
  if(one) {
    ctx.body = {
      code: 0,
      msg: '账户已存在',
      data: null,
    }
    return 
  }

  const user = new User({
    account,
    password,
  })  

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res,
  }
})

router.post('/login', async (ctx) => {
  const { account, password } = getBody(ctx);
  const one = await User.findOne({account}).exec()
  
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null,
    }
    return 
  }
  
  if(one.password === password) {
    const user = {
      account: one.account,
      _id: one._id,
    }
    ctx.body = {
      code: 1,
      msg: '登录成功',
      data: {
        user,
        token: jwt.sign(user, 'book-mgr')
      },
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '密码错误',
      data: null,
    }
  }
})

module.exports = router