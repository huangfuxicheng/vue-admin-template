<template>
  <!--  路由组件出口的位置-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--      渲染layout一级路由组件的子路由-->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="Main">
import { nextTick, ref, watch } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting.ts'
const layoutSettingStore = useLayoutSettingStore()
let exist = ref(true)
watch(
  () => layoutSettingStore.refresh,
  () => {
    exist.value = false
    nextTick(() => {
      exist.value = true
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
