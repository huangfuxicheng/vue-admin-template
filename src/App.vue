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
import request from '../utils/request.ts'

request({
  url: '/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})
</script>

<template>
  <div>
    <h1>aaa</h1>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>
