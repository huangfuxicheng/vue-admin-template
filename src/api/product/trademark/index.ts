import request from '@/utils/request.ts'
import {
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type.ts'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  SAVE_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export const getTradeMark = (page: number, size: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${size}`)

export const saveTradeMark = (data: TradeMark) =>
  request.post<any, TradeMarkResponseData>(API.SAVE_TRADEMARK_URL, data)

export const updateTradeMark = (data: TradeMark) =>
  request.put<any, TradeMarkResponseData>(API.UPDATE_TRADEMARK_URL, data)

export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return updateTradeMark(data)
  } else {
    return saveTradeMark(data)
  }
}

export const dTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETE_URL + `${id}`)
}
