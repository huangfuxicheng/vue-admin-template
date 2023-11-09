<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <!--    svg:图标外层容器节点，内部需要与use标签结合使用-->
  <svg :style="{ width, height }">
    <!--      xlink:href执行用哪一个图标-->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped></style>
