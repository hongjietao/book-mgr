import { defineComponent, onMounted, ref} from 'vue'
import { result, clone } from '@/helpers/utils'
import { houseColumns } from './const.js'
import AddOne from './AddOne/index.vue'
import { house } from '@/service'

export default defineComponent({
  components: {
    AddOne
  },
  setup(){
    const show = ref(false)
    const isSearch = ref(false)
    const keyword = ref('')
    const houseList = ref([])
    onMounted(async () => {
      const res = await house.list()
      result(res)
        .success(({ data }) => {
          houseList.value = data
        })
    })

    const backAll = () => {
      keyword.value = ''
      isSearch.value = false
    }

    const remove = () => {
      console.log("remove");
    }
    const update = () => {
      console.log("update");
    }
    const toDetail = () => {
      console.log("toDetail");
    }
    const onSearch = () => {
      console.log("search");
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
    }
  }
})
