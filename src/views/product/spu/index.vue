<template>
  <div>
    <Category :scene="scene === 0"></Category>
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          @click="addSpu"
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="SPU操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="primary"
                icon="View"
                size="small"
                title="查看SKU列表"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          v-model:current-page="currentSize"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          layout="prev,pager, next,jumper,->,sizes,total"
          :total="total"
          @current-change="getSPUInfo"
        />
      </div>
      <spu-form
        ref="spu"
        v-show="scene === 1"
        @changeScene="changeScene"
      ></spu-form>
      <sku-form
        v-show="scene === 2"
        @changeScene="changeScene"
        ref="sku"
      ></sku-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'
import { reqSPUInfo } from '@/api/product/spu'
import { Records, SPUData } from '@/api/product/spu/type.ts'
import spuForm from './spuForm.vue'
import skuForm from './skuForm.vue'
let scene = ref<number>(0)
let currentSize = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let records = ref<Records>([])

let categoryStore = useCategoryStore()

let spu = ref<any>()
let sku = ref<any>()
watch(
  () => categoryStore.c3Id,
  () => {
    //当三级分类发生变化的时候清空对应的数据
    records.value = []
    //务必保证有三级分类ID
    if (!categoryStore.c3Id) return
    getSPUInfo()
  },
)
const getSPUInfo = async (pager = 1) => {
  currentSize.value = pager
  const result = await reqSPUInfo(
    currentSize.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code === 200) {
    total.value = result.data.total
    records.value = result.data.records
  }
}

const addSpu = () => {
  scene.value = 1
  spu.value.initAddSpuData(categoryStore.c3Id)
}

const changeScene = (obj: any) => {
  // console.log(value)
  scene.value = obj.flag
  if (obj.params == 'update') {
    getSPUInfo(currentSize.value)
  } else {
    getSPUInfo()
  }
}

const updateSpu = (row: SPUData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
}
const addSku = (row: SpuData) => {
  scene.value = 2
  //调用子组件的方法初始化添加SKU的数据
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
</script>

<style scoped></style>
