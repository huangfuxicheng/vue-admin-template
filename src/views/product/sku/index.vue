<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="名称" width="200px"></el-table-column>
        <el-table-column label="描述" width="200px"></el-table-column>
        <el-table-column label="图片" width="200px"></el-table-column>
        <el-table-column label="重量" width="200px"></el-table-column>
        <el-table-column label="价格" width="200px"></el-table-column>
        <el-table-column
          label="操作"
          width="300px"
          fixed="right"
        ></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentSize"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="prev,pager, next,jumper,->,sizes,total"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let currentSize = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
</script>

<style scoped></style>
