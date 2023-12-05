import request from '@/utils/request.ts'
import {
  AllRoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from '@/api/acl/user/type.ts'

enum API { //获取全部已有用户账号信息
  ALL_USER_URL = '/admin/acl/user/',
  //添加一个新的用户账号
  ADD_USER_URL = '/admin/acl/user/save',
  //更新已有的用户账号
  UPDATE_USER_URL = '/admin/acl/user/update',
  ALL_ROLE_URL = '/admin/acl/user/toAssign/',
  SET_ROLE_URL = '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETE_USER_URL = '/admin/acl/user/remove/',
  //批量删除的接口
  DELETE_ALL_USER_URL = '/admin/acl/user/batchRemove',
}

export const reqAllUser = (page: number, limit: number, kw: string) =>
  request.get<any, UserResponseData>(
    API.ALL_USER_URL + `${page}/${limit}?username=${kw}`,
  )

//添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  //携带参数有ID更新
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<any, any>(API.ADD_USER_URL, data)
  }
}

export const reqRole = (id: number) =>
  request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL + id)

//分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SET_ROLE_URL, data)

//删除某一个账号的信息
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETE_USER_URL + userId)
//批量删除的接口
export const reqSelectUser = (idList: number[]) =>
  request.delete<any, any>(API.DELETE_ALL_USER_URL, { data: idList })
