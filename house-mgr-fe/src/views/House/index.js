import { defineComponent, onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import { result, clone } from '@/helpers/utils'
import { houseColumns } from './const.js'
import AddOne from './AddOne/index.vue'
import Update from './Update/index.vue'
import { house } from '@/service'
import { message, Modal, Input } from 'ant-design-vue'

export default defineComponent({
  components: {
    AddOne,
    Update,
  },
  props: {
    simple: Boolean
  },
  setup(props){
    const show = ref(false)
    const isSearch = ref(false)
    const keyword = ref('')
    const houseList = ref([])
    const total = ref(0)
    const curPage = ref(1)
    const showUpdateModel = ref(false)
    const curEditHouse = ref({})
    const router = useRouter()

    if(!props.simple) {
      const _idx1 = houseColumns.findIndex((item) => {
        return item.dataIndex === '_id'
      })
      const _idx2 = houseColumns.findIndex((item) => {
        return item.dataIndex === 'actions'
      })
      if(_idx1 === -1) {
        houseColumns.unshift(
          {
            title: "编号",
            // 自动省略
            // ellipsis: true,
            dataIndex: "_id",
          }
        )
      }
      if(_idx2 === -1) {
        houseColumns.push({
          title: "actions",
          // 定宽
          // width: 90,
          dataIndex: "actions",
          slots: {
            customRender: "actions"
          }
        })
      }
    }
    const getList = async () => {
      const res = await house.list(curPage.value, 20, keyword.value)
      result(res)
        .success(({ data: { list, total: t} }) => {
          houseList.value = list
          total.value = t
        })
    }

    onMounted(() => {
      getList()
    })

    const backAll = () => {
      keyword.value = ''
      isSearch.value = false
    }

    // 更新房源信息
    const update = (record) => {
      showUpdateModel.value = true
      curEditHouse.value = record
    }

    const updateCurHouse = (newData) => {
      Object.assign(curEditHouse.value, newData)
    }

    const onSearch = () => {
      getList()
    }

    // 进入详情页面
    const toDetail = async (record) => {
      router.push(`/house/${record._id}`)
    }

    // 删除一行数据
    const remove = async ({ _id }) => {
      const res = await house.remove(_id)
      result(res)
        .success(({ msg }) => {
          message.success(msg)
        })

      getList()
    }

    // 换页
    const setPage = (page) => {
      curPage.value = page
      getList()
    }

    const verifyResult = (verify) => {
      if(verify === 0) {
        return '待审核'
      } else if(verify === 1) {
        return '审核通过'
      } else {
        return '审核不通过'
      }
    }

    return {
      houseColumns,
      houseList,
      show,
      isSearch,
      backAll,
      remove,
      update,
      toDetail,
      keyword,
      onSearch,
      total,
      curPage,
      setPage,
      showUpdateModel,
      curEditHouse,
      updateCurHouse,
      simple: props.simple,
      verifyResult,
    }
  }
})
