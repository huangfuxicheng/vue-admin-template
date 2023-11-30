<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item label="内存">
          <el-select>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item label="颜色">
          <el-select>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
            <el-option label="213"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const $emit = defineEmits(['changeScene'])
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

//当前子组件的方法对外暴露
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  //获取平台属性
  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  //获取对应的销售属性
  let result1: any = await reqSpuHasSaleAttr(spu.id)
  //获取照片墙的数据
  let result2: any = await reqSpuImageList(spu.id)
  //平台属性
  attrArr.value = result.data
  //销售属性
  saleArr.value = result1.data
  //图片
  imgArr.value = result2.data
}

defineExpose({ initSkuData })
</script>

<style scoped></style>
