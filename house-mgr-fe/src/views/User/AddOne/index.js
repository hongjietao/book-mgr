import { defineComponent, reactive } from 'vue'
import { user } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'

const defaultForm = {
  account: 'test',
  password: '123'
}

export default defineComponent({
  props: {
    show: Boolean
  },
  setup(props, context){
    const addForm = reactive(clone(defaultForm))

    const submit = async () => {
      const form = clone(addForm)
      const res = await user.add(form)

      const close = () => {
        context.emit("update:show", false)
      }

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultForm)
          message.success(data.msg)
          close()
          context.emit("getList")
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
