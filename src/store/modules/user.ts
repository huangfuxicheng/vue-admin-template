//创建用户相关的小仓库
import { defineStore } from 'pinia'
//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: () => {
    return null
  },
  //处理异步|逻辑地方
  actions: {},
  getters: {},
})
//对外暴露小仓库
export default useUserStore
