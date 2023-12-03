<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0" :data="skuArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="200px"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="200px"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="图片" width="200px">
          <template #default="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="200px"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="200px"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
          <template #default="{ row }">
            <el-button
              size="small"
              :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
              type="primary"
              @click="updateSale(row)"
            ></el-button>
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              @click="edit"
            ></el-button>
            <el-button
              size="small"
              icon="InfoFilled"
              type="primary"
              @click="findSku(row)"
            ></el-button>
            <el-popconfirm
              :title="`确认删除${row.skuName}`"
              @confirm="deleteSku(row)"
            >
              <template #reference>
                <el-button
                  size="small"
                  icon="Delete"
                  type="primary"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentSize"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="prev,pager, next,jumper,->,sizes,total"
        :total="total"
        @current-change="getSku"
        @size-change="handler"
      />
      <el-drawer v-model="drawer" title="查看商品的详情">
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="300px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqCancelSku, reqSaleSku, reqSku, reqSkuInfo } from '@/api/product/sku'
import { SkuData, SkuInfoData } from '@/api/product/sku/type.ts'
import { ElMessage } from 'element-plus'
import { reqDeleteSpu } from '@/api/product/spu'

let currentSize = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)

let skuArr = ref<SkuData[]>([])
let skuInfo = ref<any>({})
//控制抽屉显示与隐藏的字段
let drawer = ref<boolean>(false)
//查看商品详情按钮的回调
const findSku = async (row: SkuData) => {
  //抽屉展示出来
  drawer.value = true

  let result: SkuInfoData = await reqSku(row.id as number)
  //存储已有的SKU
  skuInfo.value = result.data
}

onMounted(() => {
  getSku()
})
const getSku = async (pager = 1) => {
  currentSize.value = pager
  const result = await reqSkuInfo(currentSize.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}

const handler = () => {
  getSku()
}

const updateSale = async (row: SkuData) => {
  if (row.isSale === 1) {
    const result: any = await reqCancelSku(row.id!)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '下架成功',
      })
      getSku(currentSize.value)
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败',
      })
    }
  } else {
    const result: any = await reqSaleSku(row.id!)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
      getSku(currentSize.value)
    } else {
      ElMessage({
        type: 'error',
        message: '上架失败',
      })
    }
  }
}
const edit = () => {
  ElMessage({
    type: 'success',
    message: '开发中',
  })
}

const deleteSku = async (row: SkuData) => {
  const result = await reqDeleteSpu(row.id!)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getSku(skuArr.value.length > 1 ? currentSize.value : currentSize.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: result.data,
    })
  }
}
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
