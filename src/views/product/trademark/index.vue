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
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-popconfirm
            :title="`确定要删除${row.tmName}吗`"
            icon="Delete"
            width="200px"
            @confirm="updateTradeMark(row)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="deleteTrademark(row)"
              ></el-button>
            </template>
          </el-popconfirm>
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
      @current-change="handleSubmit"
      @size-change="handleSizeChange"
    />
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    :title="trademarkParams.id ? '更新品牌' : '添加品牌'"
  >
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      :ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input
          placeholder="请输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
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
import { nextTick, onMounted, reactive, ref } from 'vue'
import type { UploadProps } from 'element-plus'
import {
  dTrademark,
  getTradeMark,
  reqAddOrUpdateTradeMark,
} from '@/api/product/trademark'
import {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type.ts'
import { ElMessage } from 'element-plus'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
let dialogVisible = ref<boolean>(false)
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref()
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
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  trademarkParams.id = 0
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('tmName')
  })
  dialogVisible.value = true
}

const updateTradeMark = (row: TradeMark) => {
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  // trademarkParams.id = row.id
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('tmName')
  })
  Object.assign(trademarkParams, row)
  dialogVisible.value = true
}

const cancel = () => {
  dialogVisible.value = false
}

const confirm = async () => {
  await formRef.value.validate()
  const result = await reqAddOrUpdateTradeMark(trademarkParams)
  if (result.code === 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    handleSubmit(trademarkParams.id ? currentPage.value : 1)
  } else {
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
  dialogVisible.value = false
}
//上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
//图片上传成功的hook
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('图片没有上传'))
  }
}
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

const deleteTrademark = async (row) => {
  const result = await dTrademark(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    handleSubmit(
      trademarkArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
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
