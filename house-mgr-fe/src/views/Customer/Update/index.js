import { defineComponent, reactive, watch } from 'vue'
import { customer } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import moment from 'moment'

export default defineComponent({
  props: {
    show: Boolean,
    customer: Object,
  },
  setup(props, context){
    const editForm = reactive({
      name: 'test',
      phone: '18790312222',
      ID_card: '412822199805133333',
      type: null, // 类型： 0: 租房用户，1: 买房页面
      creater: '', // 创建人
    })

    watch(() => props.customer, (cur) => {
      Object.assign(editForm, cur)
    })
    const close = () => {
      context.emit("update:show", false)
    }

    const submit = async () => {
      let requestData = {
        id: props.customer._id,
        phone: editForm.phone,
        name: editForm.name,
        ID_card: editForm.ID_card,
        type: editForm.type,
      }
      const res = await customer.update(requestData)

      result(res)
        .success(({ data, msg }) => {
          context.emit("update", data)
          message.success(msg)
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
