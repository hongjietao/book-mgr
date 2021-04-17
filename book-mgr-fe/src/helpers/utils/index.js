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
