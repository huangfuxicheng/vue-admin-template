import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user.ts'
import { ElMessage } from 'element-plus'

nprogress.configure({ showSpinner: false })
// https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html
router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore()
  //用户登录判断
  if (userStore.token) {
    //登录成功,访问login,不能访问,指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //登录成功访问其余六个路由(登录排除)
      //有用户信息
      if (userStore.username) {
        //放行
        next()
      } else {
        //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo()
          //放行
          //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
          next({ ...to })
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      ElMessage({
        showClose: true,
        message: '请先登录.',
        type: 'warning',
      })
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  nprogress.start()
  next()
})

router.afterEach(() => {
  nprogress.done()
})
