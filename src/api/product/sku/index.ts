import request from '@/utils/request.ts'
import { SkuResponseData } from '@/api/product/sku/type.ts'

enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = '/admin/product/list/',
}

export const reqSkuInfo = (cur: number, size: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${cur}/${size}`)
