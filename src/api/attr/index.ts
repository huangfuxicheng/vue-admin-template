import request from '@/utils/request.ts'
import { Attr, AttrInfoData, CategoryResponseData } from '@/api/attr/type.ts'

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_INFO_URL = '/admin/product/attrInfoList/',
  SAVE_ATTR_URL = '/admin/product/saveAttrInfo',
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)

export const reqAttrInfo = (
  c1: string | number,
  c2: string | number,
  c3: string | number,
) => request.get<any, AttrInfoData>(API.ATTR_INFO_URL + `${c1}/${c2}/${c3}`)

export const saveOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.SAVE_ATTR_URL, data)
export const handleDelete = (id: string | number) =>
  request.delete(API.DELETE_ATTR_URL + id)
