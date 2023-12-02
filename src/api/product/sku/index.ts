import request from '@/utils/request.ts'
import { SkuInfoData, SkuResponseData } from '@/api/product/sku/type.ts'

enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = '/admin/product/list/',
  //上架
  SALE_URL = '/admin/product/onSale/',
  //下架的接口
  CANCEL_SALE_URL = '/admin/product/cancelSale/',
  //获取商品详情的接口
  SKU_INFO_URL = '/admin/product/getSkuInfo/',
  DELETE_SKU_URL = '/admin/product/deleteSku/',
}

export const reqSkuInfo = (cur: number, size: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${cur}/${size}`)

export const reqSaleSku = (skuId: number | string) =>
  request.get(API.SALE_URL + skuId)
export const reqCancelSku = (skuId: number | string) =>
  request.get(API.CANCEL_SALE_URL + skuId)

//获取商品详情的接口
export const reqSku = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKU_INFO_URL + skuId)

export const reqRemoveSku = (skuId: string | number) =>
  request.delete(API.DELETE_SKU_URL + skuId)
