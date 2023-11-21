<template>
  <el-card>
    <el-button type="primary" size="default" icon="Plus" @click="addTradeMark">
      添加品牌
    </el-button>
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt="logo"
            style="width: 50px; height: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTradeMark"
          ></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      layout=" prev, pager, next,jumper, ->, sizes, total"
      :total="total"
      :background="true"
      :page-count="9"
      @current-change="handleSubmit"
      @size-change="handleSizeChange"
    />
  </el-card>
  <el-dialog v-model="dialogVisable" title="ab">
    <el-form style="width: 80%">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="info" size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTradeMark } from '@/api/product/trademark'
import { Records, TradeMarkResponseData } from '@/api/product/trademark/type.ts'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
let dialogVisable = ref<boolean>(false)
const handleSubmit = async (pager = 1) => {
  currentPage.value = pager
  const resp: TradeMarkResponseData = await getTradeMark(
    currentPage.value,
    pageSize.value,
  )
  if (resp.code === 200) {
    total.value = resp.data.total
    trademarkArr.value = resp.data.records
  }
}

onMounted(() => {
  handleSubmit()
})
const handleSizeChange = () => {
  handleSubmit()
}
//添加品牌
const addTradeMark = () => {
  dialogVisable.value = true
}

const updateTradeMark = () => {
  dialogVisable.value = true
}

const cancel = () => {
  dialogVisable.value = false
}

const confirm = () => {
  dialogVisable.value = false
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
