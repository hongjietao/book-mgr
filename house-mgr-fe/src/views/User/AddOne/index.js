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
      // form.publishDate = addForm.publishDate.valueOf()
      console.log(form)
      const res = await user.add(form)

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultForm)
          message.success(data.msg)
        })
    }

    const close = () => {
      context.emit("update:show", false)
    }

    return {
      addForm,
      submit,
      props,
      close,
    }
  }

})
