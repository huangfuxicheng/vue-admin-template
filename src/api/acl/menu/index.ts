import request from '@/utils/request'
import type { PermisstionResponseData, MenuParams } from './type'
//枚举地址
enum API {
  //获取全部菜单与按钮的标识数据
  ALL_PERMISSION_URL = '/admin/acl/permission',
}
//获取菜单数据
export const reqAllPermisstion = () => {
  return request.get<any, PermisstionResponseData>(API.ALL_PERMISSION_URL)
}
