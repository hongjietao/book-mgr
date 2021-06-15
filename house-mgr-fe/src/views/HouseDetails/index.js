import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { result, formatTimestamp } from '@/helpers/utils'
import { house } from '@/service'
import { message } from 'ant-design-vue'
import Update from '@/views/House/Update/index.vue';

export default defineComponent({
  components: {
    Update,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const showUpdateModal = ref(false);
    const detailInfo = ref({
      meta:{}
    })

    const getDetail = async () => {
      const res = await house.detail(id)
      result(res)
        .success(({ data }) => {
          detailInfo.value = data
        })
    }

    const remove = async () => {
      const res = await house.remove(id)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          router.replace("/house-list")
        })
    }

    const update = (good) => {
      Object.assign(detailInfo.value, good);
    };

    // verify: Number, // 审核结果 0: 待审核， 1: 审核通过， 2： 审核不通过
    const updateVerify = async (verify) => {
      detailInfo.value.id = detailInfo.value._id
      detailInfo.value.verify = verify
      const res = await house.update(detailInfo.value)
      if(res.data.code === 0) {
        message.success('审核通过')
      } else {
        message.error('审核不通过')
      }

      update()
    }
    onMounted(() => {
      getDetail()
    })

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
      d: detailInfo,
      remove,
      showUpdateModal,
      update,
      formatTimestamp,
      verifyResult,
      updateVerify,
    }
  }
})
