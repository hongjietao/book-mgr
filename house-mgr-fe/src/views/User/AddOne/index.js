import { defineComponent, reactive } from 'vue'
import { user } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store'

const defaultForm = {
  account: 'u',
  password: '123',
  character: '',
}

export default defineComponent({
  props: {
    show: Boolean
  },
  setup(props, context){
    const addForm = reactive(clone(defaultForm))
    const { characterInfo } = store.state

    addForm.character = characterInfo[1]._id

    const close = () => {
      context.emit("update:show", false)
    }

    const submit = async () => {
      const form = clone(addForm)
      const res = await user.add(form)

      result(res)
        .success(({ data, msg }) => {
          Object.assign(addForm, defaultForm)
          message.success(msg)
          close()
          context.emit("getList")
        })
    }



    return {
      addForm,
      submit,
      props,
      close,
      characterInfo,
    }
  }

})
