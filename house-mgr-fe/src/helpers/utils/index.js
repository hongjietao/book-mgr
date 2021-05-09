import { message } from 'ant-design-vue'

export const result = (response, authShowMessage = true) => {
  const { data } = response

  if((data.code !== 1) && authShowMessage) {
    message.error(data.msg)
  }

  return {
    success(cb){
      if(data.code !== 0) {
        cb(data, response);
      }
      // 达到链式调用效果
      return this
    },
    fail(cb){
      if(data.code === 0) {
        cb(data, response);
      }
      return this
    },
    finally(cb){
      cb(data, response);
      return this
    },
  }
}

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}


// 格式化时间戳

const prefixZero = (num) => {
  return num < 10 ? '0' + num : num
}

export const formatTimestamp = (ts) => {
  const date = new Date(Number(ts))

  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()

  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  return `${YYYY}/${prefixZero(MM)}/${prefixZero(DD)} ${prefixZero(hh)}:${prefixZero(mm)}:${prefixZero(ss)}`
}
