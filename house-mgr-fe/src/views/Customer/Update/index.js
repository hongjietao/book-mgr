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
