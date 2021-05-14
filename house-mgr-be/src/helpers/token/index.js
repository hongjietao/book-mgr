const jwt = require('jsonwebtoken')
const koaJwt = require('koa-jwt')
const config = require('../../project.config')

// 获取token
const getToken = (ctx) => {
  let { authorization } = ctx.header

  authorization = authorization.replace('Bearer ','').replace('bearer ','')
  
  return authorization
}

// 验证token
const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if(err) {
        reject(err)
        return 
      }
      resolve(payload)
    })
  })
}

// 
const middleware = (app) => {
  app.use(koaJwt({
    secret: config.JWT_SECRET,
  }).unless({
    path:[
      /^\/auth\/login/,
      /^\/auth\/register/,
    ]
  }))
}

const catchTokenError = async (ctx, next) => {
  return next().catch((error) => {
    if(error.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 0,
        msg: 'token error'
      }
    } else {
      throw error
    }
  })
}

module.exports = {
  verify,
  getToken,
  middleware,
  catchTokenError,
}