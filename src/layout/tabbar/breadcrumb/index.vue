<template>
  <!--      左侧切换按钮-->
  <el-icon style="margin-right: 20px" @click="changeIcon">
    <component :is="layoutSetting.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!--      面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      :to="item.path"
      v-show="item.meta.title"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="BreadCrumb">
import useLayoutSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'

const layoutSetting = useLayoutSettingStore()
const changeIcon = () => {
  layoutSetting.fold = !layoutSetting.fold
}
const $route = useRoute()
</script>

<style scoped>
.breadcrumb_icon {
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
}
</style>
