<template>
  <div class="layout_container">
    <!--   左侧菜单-->
    <div class="layout_slider">
      <logo></logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#001529"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          text-color="#fff"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
          <!--          <el-menu-item index="1">-->
          <!--            <el-icon>-->
          <!--              <setting />-->
          <!--            </el-icon>-->
          <!--            <span>首页</span>-->
          <!--          </el-menu-item>-->
          <!--          <el-menu-item index="2">-->
          <!--            <el-icon>-->
          <!--              <setting />-->
          <!--            </el-icon>-->
          <!--            <span>数据大屏</span>-->
          <!--          </el-menu-item>-->
          <!--          <el-sub-menu index="3">-->
          <!--            <template #title>-->
          <!--              <span>权限管理</span>-->
          <!--            </template>-->
          <!--            <el-menu-item index="2-1">用户管理</el-menu-item>-->
          <!--          </el-sub-menu>-->
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    顶部导航-->
    <div class="layout_tabbar" :class="{ fold: !!settingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!--    内容展示区-->
    <div class="layout_main" :class="{ fold: !!settingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { useRoute } from 'vue-router'
import logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import useUserStore from '@/store/modules/user.ts'
import Tabbar from '@/layout/tabbar/index.vue'
import useLayoutSettingStore from '@/store/modules/setting.ts'
let userStore = useUserStore()
let settingStore = useLayoutSettingStore()
let $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    //background-color: yellow;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 24px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
