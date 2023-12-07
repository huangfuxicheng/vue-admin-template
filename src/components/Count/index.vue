<template>
  <div class="count">
    <h2>当前求和：{{ sum }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let sum = ref(1)
</script>

<style scoped></style>
