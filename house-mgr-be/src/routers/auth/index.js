const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils/index')
const jwt = require('jsonwebtoken')
const config = require('../../project.config')

const User = mongoose.model('User')
const InviteCode = mongoose.model('InviteCode')

const router = new Router({
  prefix: '/auth',
})

router.post('/register', async (ctx) => {
  const { 
    account,
    password, 
    inviteCode 
  } = getBody(ctx);

  if(account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null,
    }
    return
  }
  
  // 校验邀请码是否正确
  const findCode = await InviteCode.findOne({code: inviteCode}).exec();
  if((!findCode) || findCode.user) {
    ctx.body = {
      code: 0,
      msg: '邀请码不正确',
      data: null,
    }
    return
  }
  
  // 校验账号密码是否符合逻辑
  const findUser = await User.findOne({account}).exec();
  if(findUser) {
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
  
  findCode.user = user._id
  findCode.meta.updateAt = (new Date()).getTime()
  await findCode.save()

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
      character: one.character,
      _id: one._id,
    }
    ctx.body = {
      code: 1,
      msg: '登录成功',
      data: {
        user,
        token: jwt.sign(user, config.JWT_SECRET)
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