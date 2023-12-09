import type { RouteRecordRaw } from 'vue-router'
import { CategoryObj } from '@/api/product/attr/type.ts'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

export interface SettingState {
  fold: boolean
  refresh: boolean
}

export interface CategoryState {
  c1Id: string | number
  c2Id: string | number
  c3Id: string | number
  c1Arr: CategoryObj[]
  c2Arr: CategoryObj[]
  c3Arr: CategoryObj[]
}
