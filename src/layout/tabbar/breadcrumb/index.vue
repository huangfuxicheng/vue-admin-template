<template>
  <!--      左侧切换按钮-->
  <el-icon style="margin-right: 20px" @click="changeIcon">
    <component :is="layoutSetting.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!--      面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">aaaa</a></el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="BreadCrumb">
import useLayoutSettingStore from '@/store/modules/setting.ts'

const layoutSetting = useLayoutSettingStore()
const changeIcon = () => {
  layoutSetting.fold = !layoutSetting.fold
}
</script>

<style scoped></style>
