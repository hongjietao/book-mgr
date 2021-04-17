import { defineComponent, reactive } from 'vue'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { auth } from '@/service'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup(){
    // 注册的账户表单
    const regForm = reactive({
      account: '',
      password: '',
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

      const { data } = await auth.register(regForm.account.trim(), regForm.password.trim())

      if(data.code) {
        message.success(data.msg)
        return
      }
      message.error(data.msg)
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
      const { data } = await auth.login(loginForm.account, loginForm.password)
      if(data.code) {
        message.success(data.msg)
        return
      }
      message.error(data.msg)
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
