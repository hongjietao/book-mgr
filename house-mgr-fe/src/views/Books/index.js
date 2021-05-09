import { defineComponent, ref, onMounted } from 'vue'
import AddOne from './AddOne/index.vue'
import { book } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils'
import { message } from 'ant-design-vue'

export default defineComponent({
  components:{
    AddOne
  },
  setup(){
    const columns = [
      {
        title: "书名",
        dataIndex: "name",
      },
      {
        title: "作者",
        dataIndex: "author",
      },
      {
        title: "价格",
        dataIndex: "price",
      },
      {
        title: "出版日期",
        dataIndex: "publishDate",
        slots: {
          customRender: 'publishDate'
        }
      },
      {
        title: "分类",
        dataIndex: "classify",
      },
      {
        title: "操作",
        slots: {
          customRender: 'actions'
        }
      },
    ]

    const list = ref([])
    const total = ref(0)
    const show = ref(false)
    const curPage = ref(1)
    const keyword = ref('')
    const isSearch = ref(false)

    // 获取所有数据
    const getList = async () => {
      const res = await book.list({
        page: curPage.value,
        size: 10,
        keyword: keyword.value,
      })

      result(res)
        .success(({ data: { list:l, total:t } }) => {
          list.value = l
          total.value = t
        })
    }

    // 换页
    const setPage = (page) => {
      curPage.value = page;
      getList()
    }

    // 查询
    const onSearch = () => {
      isSearch.value = !!keyword.value
      getList()
    }

    // 从查询状态返回至所有数据
    const backAll = () => {
      keyword.value = ''
      isSearch.value = false,
      getList()
    }

    // 删除一行数据
    const remove = async ({ text: record }) => {
      const { _id } = record

      const res = await book.remove(_id)
      result(res)
        .success(({ msg }) => {
          message.success(msg)
        })

      getList()
    }

    onMounted(async () => {
      getList()
    })

    return {
      columns,
      list,
      show,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
    }
  }
})
