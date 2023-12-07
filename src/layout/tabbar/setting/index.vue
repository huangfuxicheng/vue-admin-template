<template>
  <el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>

  <el-popover
    placement="bottom"
    title="Title"
    :width="300"
    trigger="click"
    :visible="visible"
  >
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          size="small"
          @change="setColor"
          v-model="color"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="changeDark"
          v-model="dark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button
        size="small"
        icon="Setting"
        circle
        @click="visible = !visible"
      ></el-button>
    </template>
  </el-popover>
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
import { ref } from 'vue'

const userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
const $router = useRouter()
const $route = useRoute()
let dark = ref<boolean>(false)
let visible = ref<boolean>(false)
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

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  visible.value = false
}
</script>

<style scoped></style>
