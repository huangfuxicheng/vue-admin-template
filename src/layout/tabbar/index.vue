<template>
  <div class="tabbar_container">
    <div class="tabbar_left">
      <BreadCrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, #ead6ee, #a0f1ea);

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
