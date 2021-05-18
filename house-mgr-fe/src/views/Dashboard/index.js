import { defineComponent, reactive, ref, onMounted } from 'vue'
import { dashboard } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import House from '@/views/House/index.vue'
import Customer from '@/views/Customer/index.vue'

export default defineComponent({
  components: {
    House,
    Customer,
  },
  setup(){
    const loading = ref(false)
    const baseInfo = ref({
      total:{
        house: 0,
        user: 0,
        log: 0,
      }
    })

    const getBaseInfo = async () => {
      loading.value = true
      const res = await dashboard.baseInfo()
      loading.value = false
      result(res)
        .success(({ data }) => {
          baseInfo.value = data
        })
    }

    onMounted(() => {
      getBaseInfo()
    })



    return {
      baseInfo,
      loading,
    }
  }
})
