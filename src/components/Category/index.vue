<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          >
            <!--            {{ c1.name }}-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select>
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select>
          <el-option></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'

let c1Arr = ref()
onMounted(() => {
  getC1()
})
let categoryStore = useCategoryStore()
const getC1 = () => {
  categoryStore.getC1()
}
</script>

<style scoped></style>
