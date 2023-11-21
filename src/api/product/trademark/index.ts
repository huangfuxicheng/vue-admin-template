import request from '@/utils/request.ts'
import { TradeMarkResponseData } from '@/api/product/trademark/type.ts'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const getTradeMark = (page: number, size: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${size}`)
