<template>
  <!--      左侧切换按钮-->
  <el-icon style="margin-right: 20px" @click="changeIcon">
    <Expand />
  </el-icon>
  <!--      面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">aaaa</a></el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="BreadCrumb">
import { ref } from 'vue'

let fold = ref(false)
const changeIcon = () => {
  fold.value = !fold.value
  alert(fold.value)
}
</script>

<style scoped></style>
