<template>
  <div id="container">
    <div id="search" class="search">
      <el-input
        id="input"
        placeholder="请输入城市名称"
        @keyup.enter.native="search"
        v-model="keyWord"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
let keyWord = ref('')
let map: any = null

onMounted(() => {
  // @ts-ignore
  window._AMapSecurityConfig = {
    securityJsCode: '',
  }
  AMapLoader.load({
    key: '', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    // plugins: [
    //   'AMap.Scale',
    //   'AMap.OverView',
    //   'AMap.ToolBar',
    //   'AMap.MapType',
    //   'AMap.PlaceSearch',
    //   'AMap.Autocomplete',
    //   'AMap.Geolocation',
    //   'AMap.Geocoder',
    //   'AMap.AMapUI',
    // ], // 需要使用的的,插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '2D', // 是否为3D地图模式
        zoom: 4.4, // 初始化地图级别
        center: [108, 38], // 初始化地图中心点位置
        resizeEnable: true,
      })
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})

function search() {
  if (!keyWord.value) {
    keyWord.value = '北京市'
  }
  map.setCity(keyWord.value)
}
</script>

<style scoped>
#container {
  .search {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
}

::v-deep .amap-logo {
  display: none;
  opacity: 0 !important;
}

::v-deep .amap-copyright {
  opacity: 0;
}
</style>
