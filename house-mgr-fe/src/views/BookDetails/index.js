import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { result, formatTimestamp } from '@/helpers/utils'
import { book } from '@/service'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const detailInfo = ref({})

    const getDetail = async () => {
      const res = await book.detail(id)
      result(res)
        .success(({ data }) => {
          detailInfo.value = data
        })
    }

    const remove = async () => {
      const res = await book.remove(id)

      result(res)
        .success(({ msg }) => {
          message(msg)
          router.replace("/books")
        })

    }
    onMounted(() => {
      getDetail()
    })

    return {
      d: detailInfo,
      formatTimestamp,
      remove,
    }
  }
})
