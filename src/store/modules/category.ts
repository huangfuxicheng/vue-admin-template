import { defineStore } from 'pinia'
import { reqC1 } from '@/api/attr'

const useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      c1Arr: [],
      c1Id: '',
    }
  },
  actions: {
    async getC1() {
      const result = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
