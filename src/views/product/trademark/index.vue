<template>
  <el-card>
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <el-table style="margin: 10px 0" border>
      <el-table-column
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌名称"></el-table-column>
      <el-table-column label="品牌LOGO"></el-table-column>
      <el-table-column label="品牌操作"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[3, 5, 7, 9]"
      layout=" prev, pager, next, jumper,->,sizes, total"
      :total="400"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPage4 = ref(1)
const pageSize4 = ref(3)
</script>

<style scoped></style>
