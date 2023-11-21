<script lang="ts" setup>
// console.log(import.meta.env)
// import axios from 'axios'
// axios({
//   url: '/user/logo',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password: '111111',
//   },
// })
// import { onMounted } from 'vue'
// import { reqLogin } from '@/api/user/index.ts'

// onMounted(() => {
//   reqLogin({
//     username: 'admin',
//     password: '111111',
//   })
// })
import useLayOutSettingStore from '@/store/modules/setting'
import { nextTick, ref, watch } from 'vue'

let layOutSettingStore = useLayOutSettingStore()
let flag = ref(true)
//监听仓库内部的数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
  () => layOutSettingStore.refresh,
  () => {
    //点击刷新按钮：路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>
