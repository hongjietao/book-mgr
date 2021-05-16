const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const { connect } = require('./db')
const registerRoutes = require('./routers')
const cors = require('@koa/cors')
const { middleware: koaJwtMiddleware, catchTokenError, checkUser } = require('./helpers/token')
const { logMiddleware } = require('./helpers/log')
const path = require('path')
const config = require('./project.config')

const app = new Koa()

app.use(koaStatic(path.resolve(__dirname, '../public')))

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

    app.listen(config.SERVER_PORT, () => {
      console.log('success!');
    })
  }
)