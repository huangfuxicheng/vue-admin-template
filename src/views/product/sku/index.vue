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
            ></el-button>
            <el-button size="small" icon="Delete" type="primary"></el-button>
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
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqCancelSku, reqSaleSku, reqSkuInfo } from '@/api/product/sku'
import { SkuData } from '@/api/product/sku/type.ts'
import { ElMessage } from 'element-plus'

let currentSize = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)

let skuArr = ref<SkuData[]>([])

onMounted(() => {
  getSku()
})
const getSku = async (pager = 1) => {
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
    const result = await reqCancelSku(row.id)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '下架成功',
      })
      getSku(pageSize.value)
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败',
      })
    }
  } else {
    const result = await reqSaleSku(row.id)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
      getSku(pageSize.value)
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
</script>

<style scoped></style>
