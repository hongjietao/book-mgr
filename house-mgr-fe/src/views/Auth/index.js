import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { auth } from '@/service'
import { result } from '@/helpers/utils'
import { setToken } from '@/helpers/token'
import { message } from 'ant-design-vue'
import store from '@/store'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup(){
    const router = useRouter()

    // 注册的账户表单
    const regForm = reactive({
      account: '',
      password: '',
      inviteCode: '',
    })
    // 注册逻辑
    const register = async () => {
      if(regForm.account.trim() === '') {
        message.info('请输入账户')
        return
      }
      if(regForm.password.trim() === '') {
        message.info('请输入密码')
        return
      }
      if(regForm.inviteCode.trim() === '') {
        message.info('请输入邀请码')
        return
      }

      const res = await auth.register(regForm.account.trim(), regForm.password.trim(), regForm.inviteCode.trim())

      result(res)
        .success((data) => {
          message.success(data.msg)
        })
    }
    // 登录账户表单
    const loginForm = reactive({
      account: '',
      password: '',
    })
    // 登录逻辑
    const login = async () => {
      if(loginForm.account.trim() === '') {
        message.info('请输入账户')
        return
      }
      if(loginForm.password.trim() === '') {
        message.info('请输入密码')
        return
      }
      const res = await auth.login(loginForm.account, loginForm.password)

      result(res)
        .success(({ msg, data: { user, token }})=>{
          message.success(msg)
          store.commit('setUserInfo', user)
          store.commit('setUserCharacter', user.character)
          setToken(token)
          router.replace('/books')
        })
    }

    return {
      // 注册相关
      regForm,
      register,

      // 登录相关
      loginForm,
      login,
    }
  }
})
