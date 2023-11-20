<template>
  <el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    alt="avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="Setting">
import useLayoutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
const $router = useRouter()
const $route = useRoute()
const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const fullScreen = () => {
  // DOM对象的一个属性：可以用判断当前是不是全屏模式，全屏： true,不是全屏：false
  let full = document.fullscreenElement
  if (!full) {
    // 文档节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
const logout = async () => {
  await userStore.logout()
  $router.replace({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped></style>
