const { getToken, verify } = require('../token')
const mongoose = require('mongoose')

const Log = mongoose.model('Log')



const logMiddleware = async (ctx, next) => {
  const startTime = Date.now()

  await next()

  let payload = {}
  try {
    payload = await verify(getToken(ctx))
  } catch(e) {
    payload = {
      account: '未知用户',
      id: '',
    }
  }

  const url = ctx.url
  const method = ctx.method
  const status = ctx.status
  let responseBody = ''
  if(typeof ctx.body === 'string') {
    responseBody = ctx.body
  } else {
    try {
      responseBody = JSON.stringify(ctx.body)
    } catch {
      responseBody = ''
    }
  }

  const log = new Log({
    user: {
      account: payload.account,
      id: payload.id,
    },
    request: {
      url,
      responseBody,
      method,
      status,
    }
  })
  const endTime = Date.now()

  await log.save()

}

module.exports = {
  logMiddleware,

}