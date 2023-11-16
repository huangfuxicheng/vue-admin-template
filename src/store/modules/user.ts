//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { loginForm, userInfoResponseData } from '@/api/user/type.ts'
import { reqLogin, reqUserInfo } from '@/api/user'
import { loginResponseData } from '@/api/user/type.ts'
import { UserState } from '@/store/modules/types/type.ts'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.ts'
//引入路由（常量路由）
import { constantRoute } from '@/router/routes.ts'
//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      // token: localStorage.getItem('TOKEN'),
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生产菜单需要数组（路由）
      username: '',
      avatar: '',
    }
  },
  //处理异步|逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        //pinia仓库存储token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data.token as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data.token as string)
        // localStorage.setItem('TOKEN', result.data.token as string)
        //保证当前async函数返回一个成功的promise函数
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    async userInfo() {
      // 获取用户信息
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      }
    },
    async logout() {
      this.username = ''
      this.token = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})
//对外暴露小仓库
export default useUserStore
