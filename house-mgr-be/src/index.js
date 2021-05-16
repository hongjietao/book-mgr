const Koa = require('koa')
const koaBody = require('koa-body')
const { connect } = require('./db')
const registerRoutes = require('./routers')
const cors = require('@koa/cors')
const { middleware: koaJwtMiddleware, catchTokenError, checkUser } = require('./helpers/token')
const { logMiddleware } = require('./helpers/log')

const app = new Koa()

connect().then( () => {
    app.use(cors())
    app.use(koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    }))

    app.use(catchTokenError) 

    koaJwtMiddleware(app) //token校验
    
    app.use(checkUser) //校验当前用户是否存在

    app.use(logMiddleware)

    registerRoutes(app)

    app.listen(3000, () => {
      console.log('success!');
    })
  }
)