const Router = require('@koa/router')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config')
const { verify, getToken } = require('../../helpers/token')
const { loadExcel, getFirstSheet } = require('../../helpers/excel')

const User = mongoose.model('User')
const Character = mongoose.model('Character')

const router = new Router({
  prefix: '/user',
})

router.get('/list', async (ctx) => {
  let {
    page,
    size,
    keyword,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const query = {};

  if (keyword) {
    query.account = keyword;
  }

  const list = await User
    .find(query)
    .sort({
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await User.countDocuments().exec();

  ctx.body = {
    msg: '获取用户列表成功',
    data: {
      list,
      page,
      size,
      total,
    },
    code: 1,
  };
});

router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const res = await User.deleteOne({
    _id: id
  })

  ctx.body = {
    code: 1,
    data: res,
    msg: '删除用户成功'
  }

})

// city: String, //所在城市
// phone: String, //手机号
// ID_card: String, //身份证
// type: Number, //状态 0:离职， 1: 在职
router.post('/add', async (ctx) => {
  const {
    account,
    password = password || config.DEFAULT_PASSWORD,
    city,
    phone,
    ID_card,
    character,
  } = ctx.request.body

  if(!character) {
    ctx.body = {
      code: 0,
      msg: '添加失败',
    }
    return 
  }
  // 查询当前账户名是否重复
  const someUser = await User.findOne({
    account,
  })
  if(someUser) {
    ctx.body = {
      code: 0,
      msg: '账户重复',
    }
    return 
  }
  // 验证身份信息
  const char = await Character.findOne({
    _id: character
  }).exec()

  if(!char) {
    ctx.body = {
      code: 0,
      msg: '添加失败',
    }
    return 
  }

  const user = new User({
    account,
    password,
    character,
    city,
    phone,
    ID_card,
    type: 1,
  })

  const res = await user.save()

  ctx.body = {
    code: 1,
    data: res,
    msg: '创建用户成功'
  }

})

router.post('/reset/password', async (ctx) => {
  const {
    id
  } = ctx.request.body

  const user = await User.findOne({
    _id: id
  }).exec()

  if(!user) {
    ctx.body = {
      code: 0,
      msg: '未找到用户',
      data: ''
    }
    return 
  }

  user.password = config.DEFAULT_PASSWORD

  await user.save()

  ctx.body = {
    code: 1,
    data: {
      account: user.account,
      _id: user._id
    },
    msg: '重置密码成功'
  }

})

router.post('/update/character', async (ctx) => {
  const {
    character,
    userId,
  } = ctx.request.body

  const char = await Character.find({
    _id: character
  })

  if(!char) {
    ctx.body = {
      code: 0,
      msg: '角色错误',
    }
    return 
  }

  const user = await User.findOne({
    _id: userId,
  })

  if(!user) {
    ctx.body = {
      code: 0,
      msg: '用户不存在',
    }
    return 
  }

  user.character = character

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '修改角色成功',
    data: res,
  }
})

router.get('/info', async (ctx) => {
  ctx.body = {
    data: await verify(getToken(ctx)),
    code: 1,
    msg: '获取成功',
  }
});

router.post('/addMany', async (ctx) => {
  const {
    key = ''
  } = ctx.request.body

  const path = `${config.UPLOAD_DIR}/${key}`

  // loadExcel, getFirstSheet 
  const excel = loadExcel(path)
  const sheet = getFirstSheet(excel)

  const character = await Character.find().exec()

  const member = character.find((item) => (item.name === 'member'))

  const arr = []

  sheet.forEach((record) => {
    const [account, password = config.DEFAULT_PASSWORD, city, phone, ID_card] = record
    arr.push({
      account,
      password,
      city, 
      phone, 
      ID_card,
      character: member._id,
      type: 1,
    })
  })

  await User.insertMany(arr)

  ctx.body = {
    code: 1,
    data: {
      addCount: arr.length,
    },
    msg: '添加成功',
  }
})

router.post('/quit', async(ctx) => {
  const {
    id
  } = ctx.request.body
  
  const user = await User.findOne({_id: id})

  if(!user) {
    ctx.body = {
      code: 0,
      msg: '未找到用户',
    }
    return 
  }
  user.type = 0
  const res = await user.save()
  ctx.body = {
    code: 1,
    msg: '员工离职成功',
    data: res,
  }
})

module.exports = router