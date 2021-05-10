import { defineComponent, reactive, watch } from 'vue'
import { book } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import moment from 'moment'

const defaultForm = {
  name: '',
  price: 0,
  author: '',
  publishDate: 0,
  classify: '',
}

export default defineComponent({
  props: {
    show: Boolean,
    book: Object,
  },
  setup(props, context){
    const editForm = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: 0,
      classify: '',
    })

    watch(() => props.book, (cur) => {
      Object.assign(editForm, cur)
      editForm.publishDate = moment(Number(editForm.publishDate))
    })
    const close = () => {
      context.emit("update:show", false)
    }

    const submit = async () => {
      const res = await book.update({
        id: props.book._id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        classify: editForm.classify,
        publishDate: editForm.publishDate.valueOf()
      })

      result(res)
        .success(({ data, msg }) => {
          context.emit("update", data)
          message.success(msg )
          close()
        })
    }

    return {
      editForm,
      submit,
      props,
      close,
    }
  }

})
