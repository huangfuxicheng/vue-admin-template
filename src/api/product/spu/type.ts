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
  spuImageList: null
  spuSaleAttrList: number
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
