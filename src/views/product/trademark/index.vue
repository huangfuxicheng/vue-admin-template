<template>
  <el-card>
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <el-table style="margin: 10px 0" border :data="trademarkArr" :key="id">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt="logo"
            style="width: 50px; height: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      layout=" prev, pager, next,jumper, ->, sizes, total"
      :total="total"
      :background="true"
      :page-count="9"
      @current-change="handleSubmit"
      @size-change="handleSizeChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getTradeMark } from '@/api/product/trademark'
import { Records, TradeMarkResponseData } from '@/api/product/trademark/type.ts'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = reactive<Records>([])
const handleSubmit = async (pager = 1) => {
  currentPage.value = pager
  const resp: TradeMarkResponseData = await getTradeMark(
    currentPage.value,
    pageSize.value,
  )
  if (resp.code === 200) {
    total.value = resp.data.total
    trademarkArr = resp.data.records
  }
}

onMounted(() => {
  handleSubmit()
})
const handleSizeChange = () => {
  handleSubmit()
}
</script>

<style scoped></style>
