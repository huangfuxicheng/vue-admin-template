import { ResponseData } from '@/api/product/trademark/type.ts'

export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface SPUData {
  category3Id: string | number
  id?: number
  spuName: string
  tmId: number | string
  description: string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]
}

export type Records = SPUData[]

export interface spuResponseData extends responseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

export interface AllTrademark extends responseData {
  data: Trademark[]
}

export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}

export interface SpuHasImg extends responseData {
  data: SpuImg[]
}

export interface SaleAttrValue {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: null
}
export type SpuSaleAttrValueList = SaleAttrValue[]
export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends responseData {
  data: HasSaleAttr[]
}

export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleSaleAttrId: number | string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}

export interface SaleAttrResponseData extends responseData {
  data: SaleAttr[]
}
