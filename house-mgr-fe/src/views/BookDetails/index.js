import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const id = route.params.id
    console.log(id);
    
    return {

    }
  }
})
