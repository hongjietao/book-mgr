import { defineComponent, reactive } from 'vue'
import { book } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'

const defaultForm = {
  name: '',
  price: 0,
  author: '',
  publishDate: 0,
  classify: '',
}

export default defineComponent({
  props: {
    show: Boolean
  },
  setup(props, context){
    const addForm = reactive(clone(defaultForm))

    const submit = async () => {
      const form = clone(addForm)
      form.publishDate = addForm.publishDate.valueOf()
      const res = await book.add(form)

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
