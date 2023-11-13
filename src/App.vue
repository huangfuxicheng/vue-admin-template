<script lang="ts" setup>
// console.log(import.meta.env)
// import axios from 'axios'
// axios({
//   url: '/user/login',
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
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>
