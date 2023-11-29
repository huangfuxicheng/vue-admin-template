<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="1" key="1"></el-option>
        <el-option label="1"></el-option>
        <el-option label="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="华为"></el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 10px">添加属性</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值" width="120xp"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  HasSaleAttr,
  SaleAttr,
  SPUData,
  SpuImg,
  Trademark,
} from '@/api/product/spu/type.ts'
import {
  reqAllSaleAttr,
  reqAllTrademark,
  reqSpuHasSaleAttr,
  reqTrademarkImage,
} from '@/api/product/spu'
import { ref } from 'vue'

let $emit = defineEmits(['changeScene'])
const cancel = () => {
  $emit('changeScene', 0)
}

//存储已有的SPU这些数据
let AllTradeMark = ref<Trademark[]>([])
//商品图片
let imgList = ref<SpuImg[]>([])
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//存储预览图片地址
let dialogImageUrl = ref<string>('')
//存储已有的SPU对象
let SpuParams = ref<SPUData>({
  category3Id: '', //收集三级分类的ID
  spuName: '', //SPU的名字
  description: '', //SPU的描述
  tmId: '', //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')
const initHasSpuData = async (row: SPUData) => {
  let result = await reqAllTrademark()
  let result1 = await reqTrademarkImage(row.id)
  let result2 = await reqSpuHasSaleAttr(row.id)
  let result3 = await reqAllSaleAttr()
  AllTradeMark.value = result.data
  //SPU对应商品图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  //存储已有的SPU的销售属性
  saleAttr.value = result2.data
  //存储全部的销售属性
  allSaleAttr.value = result3.data
}
defineExpose({ initHasSpuData })
</script>

<style scoped></style>
