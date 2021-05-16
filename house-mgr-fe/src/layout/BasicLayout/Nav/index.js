import { ref, defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import menu from '@/config/menu';
import store from '@/store'

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const openKeys = ref([]);
    const selectedKeys = ref([]);
    const { userCharacter } = store.state
    const showMenu = (onlyAdmin) => {
      if(userCharacter.name === 'admin') {
        return true
      } else {
        return !onlyAdmin
      }
    }

    onMounted(() => {
      selectedKeys.value = [route.path];

      menu.forEach((item) => {
        (item.children || []).forEach((child) => {
          if (child.path === route.path) {
            openKeys.value.push(item.title);
          }
        });
      });
    });

    const to = (url) => {
      router.push(url);
    };

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
      showMenu,
    };
  }
});
