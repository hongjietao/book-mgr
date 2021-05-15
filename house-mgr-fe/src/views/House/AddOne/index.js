import { defineComponent, reactive } from 'vue'
import { house } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'

const defaultForm = {
  city: '西京',
  neighborhood: '春秋小区',
  floor: 12,
  floor_plan_room: '3室',
  area: 129,
  facing: '西北',
}

export default defineComponent({
  props: {
    show: Boolean
  },
  setup(props, context){
    const addForm = reactive(clone(defaultForm))

    const close = () => {
      context.emit("update:show", false)
    }

    const submit = async () => {
      const form = clone(addForm)
      // form.publishDate = addForm.publishDate.valueOf()
      const res = await house.add(form)

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
