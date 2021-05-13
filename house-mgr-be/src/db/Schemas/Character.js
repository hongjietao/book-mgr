const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const CharacterSchema = new mongoose.Schema({
  name: String,
  title: String,
  power: Object, //用户角色
  
  meta: getMeta(),
})

CharacterSchema.pre('save', preSave)

mongoose.model('Character', CharacterSchema)