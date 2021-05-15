const auth = require('./auth')
const inviteCode = require('./invite-code')
const book = require('./book')
const house = require('./house')
const log = require('./log')
const user = require('./user')
const character = require('./character')
const forgetPassword = require('./forget-password')

module.exports = (app) => {
  app.use(auth.routes());
  app.use(book.routes());
  app.use(inviteCode.routes());
  app.use(house.routes());
  app.use(log.routes());
  app.use(user.routes());
  app.use(character.routes());
  app.use(forgetPassword.routes());
} 