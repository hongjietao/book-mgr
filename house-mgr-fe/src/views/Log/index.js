import { defineComponent, onMounted, ref } from 'vue'
import { log } from '@/service'
import { result } from '@/helpers/utils'

const columns = [
  {
    title: '用户名',
    dataIndex: 'user.account',
  },
  {
    title: '访问地址',
    dataIndex: 'request.url',
  }
]

export default defineComponent({
  setup(){
    const curPage = ref(1)
    const total = ref(0)
    const list = ref([])

    const getList = async () => {
      const res = await log.list(curPage.value, 20)
      result(res)
        .success(({ data: { list: l, total: t} })=>{
          total.value = t
          list.value = l
        })
    }

    onMounted(() => {
      getList()
    })

    return {
      curPage,
      total,
      list,
      columns,
    }
  }
})
