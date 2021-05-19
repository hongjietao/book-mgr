import { defineComponent, reactive, watch } from 'vue'
import { house } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import moment from 'moment'

export default defineComponent({
  props: {
    show: Boolean,
    house: Object,
  },
  setup(props, context){
    const editForm = reactive({
      city: '',
      neighborhood: '',
      floor: 0,
      floor_plan_room: '',
      area: 0,
      facing: '',
      type: 0, // 类型： 0: 出租，1: 销售
      price: 0, // 价格： 0: price 元/月,1:price 万元
    })

    watch(() => props.house, (cur) => {
      Object.assign(editForm, cur)
    })
    const close = () => {
      context.emit("update:show", false)
    }

    const submit = async () => {
      let requestData = {
        id: props.house._id,
        city: editForm.city,
        neighborhood: editForm.neighborhood,
        floor: editForm.floor,
        floor_plan_room: editForm.floor_plan_room,
        area: editForm.area,
        facing: editForm.facing,
        type: editForm.type, // 类型： 0: 出租，1: 销售
        price: editForm.price, // 价格： 0: price 元/月,1:price 万元
      }
      const res = await house.update(requestData)

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
