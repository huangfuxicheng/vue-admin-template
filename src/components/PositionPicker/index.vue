<template>
  <div id="container">
    <div id="search" class="search">
      <input id="input" placeholder="请输入关键字" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { watchEffect } from 'vue'

watchEffect(() => {
  // @ts-ignore
  window._AMapSecurityConfig = {
    securityJsCode: '',
  }
  AMapLoader.load({
    key: '', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15，https://lbs.amap.com/api/jsapi-v2/documentation#map
    plugins: ['AMap.ToolBar', 'AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    AMapUI: {
      // 是否加载 AMapUI，缺省不加载
      version: '1.1', // AMapUI 缺省 1.1
      plugins: ['misc/PositionPicker'], // 需要加载的 AMapUI ui插件
    },
  }).then((AMap) => {
    // @ts-ignore
    // load中配置AMapUI后，loader会自动将AMapUI库加载到window中
    window.AMapUI.loadUI(['misc/PositionPicker'], (picker: any) => {
      const map = new AMap.Map('container', {
        viewMode: '2D', //默认使用 2D 模式
        zoom: 11, //地图级别, // 地图显示的缩放级别范围, 默认为 [2, 20] ，取值范围 [2 ~ 30] 数字越大，比例尺越小
        center: [116.397428, 39.90923], //地图中心点
      })

      const positionPicker = new picker({
        mode: 'dragMap', // 两种模式 dragMap：拖拽地图 和 dragMarker 拖拽标记
        map,
      })

      let infoWindow: any

      positionPicker.on('success', (positionResult: any) => {
        const { lng, lat } = positionResult.position

        // 在地图标记选择成功后，显示一个信息窗
        const content = `<div style="margin: 15px">
                            <p>地址：${positionResult.address}</p>
                            <p>经纬度：${lng} / ${lat}</p>
                            <p style="color: #7d8293;font-size: 12px">请拖拽地图选取位置</p>
                           </div>`
        // 关闭之前的信息窗
        if (infoWindow) infoWindow.close()

        infoWindow = new AMap.InfoWindow({
          content,
          offset: new AMap.Pixel(0, -30),
        })

        infoWindow.open(map, [lng, lat])

        // if (onChange) onChange(positionResult)
      })

      positionPicker.start()
      map.panBy(0, 1)

      map.addControl(new AMap.Scale())
      map.addControl(new AMap.ToolBar())

      // 输入提示
      const autoOptions = {
        input: 'input',
      }

      AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], () => {
        const auto = new AMap.AutoComplete(autoOptions)
        const placeSearch = new AMap.PlaceSearch({
          map,
        }) // 构造地点查询类

        // 如果中心点不存在，则用place作为大概位置
        // if (!center && !!place) {
        placeSearch.search([116.397428, 39.90923], () => {
          positionPicker.stop()
          positionPicker.start()
        })
        // }

        auto.on('select', (e: any) => {
          // 当选中某条记录后，关闭拖拽标记
          positionPicker.stop()
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name, () => {
            // 搜索成功后，开启拖拽标记
            positionPicker.start()
          }) // 关键字查询查询
        }) // 注册监听，当选中某条记录时会触发
      })
    })
  })
})
</script>

<style scoped lang="scss">
#container {
  .search {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
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
