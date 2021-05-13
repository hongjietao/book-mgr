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
    const isSearch = ref(false)
    const keyword = ref('')

    // 获取用户信息
    const getUser = async () => {
      const res = await user.list(curPage.value, 20, keyword.value)
      result(res)
        .success(({ data: { list: l, total: t} })=>{
          total.value = t
          list.value = l
        })
    }

    // 换页
    const setPage = (page) => {
      curPage.value = page
      getUser()
    }

    onMounted(() => {
      getUser()
    })

    // 删除用户
    const remove = async ({ _id }) => {
      // console.log(_id);
      const res = await user.remove(_id)
      result(res)
        .success(({ msg }) => {
          message.success(msg)
          getUser()
        })
    }

    // 重置密码
    const reset = async ({ _id }) => {
      const res = await user.resetPassword(_id)
      result(res)
        .success(({ msg }) => {
          message.success(msg)
        })
    }

    // 查询用户
    const onSearch = () => {
      getUser()
      isSearch.value = true
    }

    // 查询后返回
    const backALl = () => {
      keyword.value = ''
      isSearch.value = false
      getUser()
    }

    return {
      curPage,
      total,
      setPage,
      list,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      getUser,
      reset,
      onSearch,
      isSearch,
      keyword,
      backALl,
    }
  }
})
