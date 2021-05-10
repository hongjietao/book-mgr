import { defineComponent, ref, onMounted, createVNode } from 'vue'
import AddOne from './AddOne/index.vue'
import Update from './Update/index.vue'
import { book } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils'
import { message, Modal, Input } from 'ant-design-vue'

export default defineComponent({
  components:{
    AddOne,
    Update
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
        title: "库存",
        dataIndex: "count",
        slots: {
          customRender: "count"
        }
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
    const showUpdateModel = ref(false)
    const curEditBook = ref({})
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

    const updateCount = (type, record) => {
      let word = '入库'
      if(type === 'OUT_COUNT') {
        word = '出库'
      }
      Modal.confirm({
        title: `要${word}多少书？`,
        content: (
          <div>
            <Input class = "__book_input_count"/>
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector('.__book_input_count');
          const res = await book.updateCount({
            id: record._id,
            num: el.value,
            type,
          })

          result(res)
            .success((data) => {
              const one = list.value.find( (item) => {
                return item._id === record._id
              })
              if(one) {
                one.count = data.data.count
                  message.success(`成功${word}${Math.abs(el.value)}本书`)
              }
            })

        }
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

    const update = (record) => {
      showUpdateModel.value = true
      curEditBook.value = record
    }

    const updateCurBook = (newData) => {
      Object.assign(curEditBook.value, newData)
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
      updateCount,
      showUpdateModel,
      update,
      curEditBook,
      updateCurBook,
    }
  }
})
