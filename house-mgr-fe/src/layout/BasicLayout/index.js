import { defineComponent } from 'vue';
import { setToken } from '@/helpers/token';
import Nav from './Nav/index.vue';
import store from '@/store';
import { LoginOutlined, CloseCircleTwoTone } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    AppNav: Nav,
    LoginOutlined,
    CloseCircleTwoTone,
  },
  setup() {
    const logout = () => {
      setToken('');
      window.location.href = '/';
    };

    return {
      logout,
      store: store.state,
    };
  },
});
