import request from '@/utils/request.ts'
import {
  AllTrademark,
  HasSaleAttrResponseData,
  SaleAttrResponseData,
  SpuHasImg,
  spuResponseData,
} from '@/api/product/spu/type.ts'

enum API {
  GET_SPU_URL = '/admin/product/',
  //获取全部品牌的数据
  ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  //获取整个项目全部的销售属性[颜色、版本、尺码]
  ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
  //获取某一个SPU下全部的已有的销售属性接口地址
  SPU_ON_ALL_SALE_ATTR_URL = '/admin/product/spuSaleAttrList/',
  //追加一个新的SPU
  ADD_SPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
}

export const reqSPUInfo = (page: number, size: number, id: string | number) =>
  request.get<any, spuResponseData>(
    API.GET_SPU_URL + `${page}/${size}?category3Id=${id}`,
  )
export const reqAllTrademark = () =>
  request.get<any, AllTrademark>(API.ALL_TRADEMARK_URL)

export const reqTrademarkImage = (spuId: number | string) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL)

export const reqSpuHasSaleAttr = (spuId: number | string) =>
  request.get<any, SaleAttrResponseData>(API.SPU_ON_ALL_SALE_ATTR_URL + spuId)

//添加一个新的SPU的
//更新已有的SPU接口
//data:即为新增的SPU|或者已有的SPU对象
export const reqAddOrUpdateSpu = (data: any) => {
  //如果SPU对象拥有ID,更新已有的SPU
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data)
  } else {
    return request.post<any, any>(API.ADD_SPU_URL, data)
  }
}
