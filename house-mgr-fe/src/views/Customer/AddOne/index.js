import { defineComponent, reactive, onUpdated } from 'vue'
import { customer } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store'

const defaultForm = {
  name: 'test',
  phone: '18790310000',
  ID_card: '41282219980513xxxx',
  type: null, // 类型： 0: 租房用户，1: 买房页面
  creater: '', // 创建人

// name: String, //客户姓名
// phone: String, //电话
// ID_card: String, //身份证
// type: Number, //类型： 0: 租房用户，1: 买房用户
// creater: String, // 录入人员
}

export default defineComponent({
  props: {
    show: Boolean
  },
  setup(props, context){
    const addForm = reactive(clone(defaultForm))
    const { userInfo } = store.state
    onUpdated(() => {
      addForm.creater = userInfo.account
    })

    const close = () => {
      context.emit("update:show", false)
    }

    const submit = async () => {
      const form = clone(addForm)
      // form.publishDate = addForm.publishDate.valueOf()
      const res = await customer.add(form)

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultForm)
          message.success(data.msg)
          close()
        })
    }



    return {
      addForm,
      submit,
      props,
      close,
    }
  }

})
