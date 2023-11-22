import request from '@/utils/request.ts'
import { TradeMarkResponseData } from '@/api/product/trademark/type.ts'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  SAVE_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
}

export const getTradeMark = (page: number, size: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${size}`)

export const saveTradeMark = (data: any) =>
  request.post<any, TradeMarkResponseData>(API.SAVE_TRADEMARK_URL, data)

export const updateTradeMark = (data: any) =>
  request.put<any, TradeMarkResponseData>(API.UPDATE_TRADEMARK_URL, data)
