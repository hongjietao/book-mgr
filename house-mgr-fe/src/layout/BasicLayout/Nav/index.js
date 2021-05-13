import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { MailOutlined } from '@ant-design/icons-vue'
import menu from '@/config/menu'

export default defineComponent({
  components: {
    // MailOutlined
  },
  setup() {
    const openKeys = ref([])
    const selectedKeys = ref([])
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
      selectedKeys.value = [route.path]
    })

    const to = (path) => {
      router.push(path)
    }

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
    }
  }
})
