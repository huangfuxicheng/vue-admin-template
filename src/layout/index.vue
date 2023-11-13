<template>
  <div class="layout_container">
    <!--   左侧菜单-->
    <div class="layout_slider">
      <logo></logo>
    </div>
    <!--    顶部导航-->
    <div class="layout_tabbar">2</div>
    <!--    内容展示区-->
    <div class="layout_main">3</div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/layout/logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: blue;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: skyblue;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellow;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 24px;
    overflow: auto;
  }
}
</style>
