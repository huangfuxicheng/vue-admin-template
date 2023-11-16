import { defineStore } from 'pinia'
import { SettingState } from '@/store/modules/types/type.ts'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: (): SettingState => {
    return {
      fold: false,
      refresh: false,
    }
  },
})

export default useLayoutSettingStore
