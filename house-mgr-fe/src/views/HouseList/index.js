import { defineComponent, reactive, ref} from 'vue'
import { result, clone } from '@/helpers/utils'
import { houseColumns, houseList } from './const.js'
import AddOne from './AddOne/index.vue'

export default defineComponent({
  components: {
    AddOne
  },
  setup(){
    const show = ref(false)
    const isSearch = ref(false)
    const keyword = ref('')

    const backAll = () => {
      keyword.value = ''
      isSearch.value = false
    }

    return {
      houseColumns,
      houseList,
      show,
      isSearch,
      backAll,
    }
  }
})
