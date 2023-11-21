import request from '@/utils/request.ts'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const getTradeMark = (page: number, size: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${size}`)
