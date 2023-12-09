//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { loginForm, userInfoResponseData } from '@/api/user/type.ts'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { loginResponseData } from '@/api/user/type.ts'
import { UserState } from '@/store/modules/types/type.ts'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.ts'
//引入路由（常量路由）
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes.ts'
import router from '@/router'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
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
      buttons: [],
    }
  },
  //处理异步|逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        // console.log(result.data)
        //pinia仓库存储token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        // localStorage.setItem('TOKEN', result.data.token as string)
        //保证当前async函数返回一个成功的promise函数
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userInfo() {
      // 获取用户信息
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async logout() {
      let result = await reqLogout()
      if (result.code === 200) {
        this.username = ''
        this.token = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露小仓库
export default useUserStore
