import { defineComponent, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { user } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils'
import { columns } from './const'
import AddOne from './AddOne/index.vue'

export default defineComponent({
  components:{
    AddOne,
  },
  setup(){
    const curPage = ref(1)
    const total = ref(0)
    const list = ref([])
    const showAddModal = ref(false)

    const getUser = async () => {
      const res = await user.list(curPage.value, 20)
      result(res)
        .success(({ data: { list: l, total: t} })=>{
          total.value = t
          list.value = l
        })
    }

    onMounted(() => {
      getUser()
    })

    const remove = async ({ _id }) => {
      // console.log(_id);
      const res = await user.remove(_id)
      result(res)
        .success(({ msg }) => {
          message.success(msg)
          getUser()
        })
    }

    return {
      curPage,
      total,
      list,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
    }
  }
})
