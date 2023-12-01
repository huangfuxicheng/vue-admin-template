import request from '@/utils/request.ts'
import { SkuResponseData } from '@/api/product/sku/type.ts'

enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = '/admin/product/list/',
  //上架
  SALE_URL = '/admin/product/onSale/',
  //下架的接口
  CANCEL_SALE_URL = '/admin/product/cancelSale/',
}

export const reqSkuInfo = (cur: number, size: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${cur}/${size}`)

export const reqSaleSku = (skuId: number | string) =>
  request.get(API.SALE_URL + skuId)
export const reqCancelSku = (skuId: number | string) =>
  request.get(API.CANCEL_SALE_URL + skuId)
