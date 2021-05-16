import { defineComponent, onMounted, ref } from 'vue'
import { log } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils'
import { getLogInfoByPath } from '@/helpers/log'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '用户名',
    dataIndex: 'user.account',
  },
  {
    title: '动作',
    dataIndex: 'action',
  },
  // {
  //   title: '访问地址',
  //   dataIndex: 'request.url',
  // },
  {
    title: '记录时间',
    slots: {
      customRender: 'createdAt',
    }
  },
]

export default defineComponent({
  props:{
    simple: Boolean,
  },
  setup(props){
    const curPage = ref(1)
    const total = ref(0)
    const list = ref([])
    const loading = ref(true)

    if(!props.simple) {
      columns.push({
        title: '操作',
        slots: {
          customRender: 'action',
        }
      })
    }
    const getList = async () => {
      loading.value = true
      const res = await log.list(curPage.value, 20)
      loading.value = false
      result(res)
        .success(({ data: { list: l, total: t} })=>{
          l.forEach((item) => {
            item.action = getLogInfoByPath(item.request.url)
          })
          total.value = t
          list.value = l
        })
    }

    const setPage = (page) => {
      curPage.value = page
      getList()
    }

    const remove = async ({ _id }) => {
      const res = await log.remove(_id)
      result(res)
        .success(({ msg })=>{
          message.success(msg)
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
      setPage,
      loading,
      formatTimestamp,
      remove,
      simple: props.simple
    }
  }
})
