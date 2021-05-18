const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config  = require('../../project.config');

const User = mongoose.model('User');
const House = mongoose.model('House');
const Customer = mongoose.model('Customer');
const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/dashboard',
});

router.get('/base-info', async (ctx) => {
  const houseTotal = await House.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await Log.find({ show: true }).countDocuments();
  const customerTotal = await Customer.find().countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: {
      total: {
        house: houseTotal,
        customer: customerTotal,
        user: userTotal,
        log: logTotal,
      },
    },
  };
});

module.exports = router;
