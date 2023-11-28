import request from '@/utils/request.ts'
import { spuResponseData } from '@/api/product/spu/type.ts'

enum API {
  GET_SPU_URL = '/admin/product/',
}

export const reqSPUInfo = (page: number, size: number, id: string | number) =>
  request.get<any, spuResponseData>(
    API.GET_SPU_URL + `${page}/${size}?category3Id=${id}`,
  )
