<script lang="ts" setup>
import {Delete, Edit} from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button :icon="Delete" circle type="danger"/>
    <el-button :icon="Edit" type="info"/>
    <div class="example-pagination-block">
      <div class="example-demonstration">When you have more than 7 pages</div>
      <el-pagination :total="1000" layout="prev, pager, next"/>
    </div>
  </div>
</template>

<style scoped></style>
