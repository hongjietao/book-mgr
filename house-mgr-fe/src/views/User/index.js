import { defineComponent, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { user } from '@/service'
import { columns } from './const'
import AddOne from './AddOne/index.vue'
import { result, formatTimestamp } from '@/helpers/utils'
import { getCharacterInfoById } from '@/helpers/character'
import { getHeaders } from '@/helpers/request';
import store from '@/store'

// city: String, //所在城市
// phone: String, //手机号
// ID_card: String, //身份证
// type: Number, //状态 0:离职， 1: 在职


export default defineComponent({
  components:{
    AddOne,
    EditOutlined,
  },
  setup(){
    const curPage = ref(1)
    const total = ref(0)
    const list = ref([])
    const show = ref(false)
    const showEditCharacterModal = ref(false)
    const isSearch = ref(false)
    const keyword = ref('')
    const editForm = reactive({
      character: '',
      current: {},
    })

    const { characterInfo } = store.state

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

    const quit = async ({ _id }) => {
      const res = await user.quit(_id)
      result(res)
        .success(({ msg }) => {
          message.success(msg)
          getUser()
        })
    }

    // 查询后返回
    const backALl = () => {
      keyword.value = ''
      isSearch.value = false
      getUser()
    }

    // 修改用户角色
    const onEdit = (record) => {
      editForm.current = record
      editForm.character = record.character
      showEditCharacterModal.value = true
    }

    const close = () => {
      showEditCharacterModal.value = false
    }

    const submit = async () => {
      const res = await user.editCharacter(editForm.character, editForm.current._id)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          editForm.current.character = editForm.character
          close()
        })
    }

    // 批量上传
    const onUploadChange = ({ file }) => {
      if(file.response) {
        result(file.response)
          .success(async (key) => {
            const res = await user.addMany(key)
            result(res)
              .success(({data: { addCount} }) => {
                message.success(`成功添加${addCount}位用户`)
              })
          })
      }
    }

    return {
      curPage,
      total,
      setPage,
      list,
      columns,
      formatTimestamp,
      remove,
      show,
      getUser,
      reset,
      onSearch,
      isSearch,
      keyword,
      backALl,
      getCharacterInfoById,
      editForm,
      characterInfo,
      showEditCharacterModal,
      onEdit,
      close,
      submit,
      onUploadChange,
      headers: getHeaders(),
      quit,
    }
  }
})
