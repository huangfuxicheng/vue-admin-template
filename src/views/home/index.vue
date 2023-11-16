<template>
  <div></div>
</template>

<script setup lang="ts" name="home">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
