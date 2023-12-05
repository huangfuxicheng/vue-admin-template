<template>
  <div>
    <el-card>
      <el-form :inline="true" class="search_container">
        <el-form-item label="角色：">
          <el-input placeholder="请输入角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addRole">添加角色</el-button>
      <el-table border style="margin: 10px 0" :data="roleArr">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User">
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-button type="primary" size="small" icon="Delete">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page="currentSize"
        :total="total"
        layout="prev,pager, next,jumper,->,sizes,total"
        :page-sizes="[10, 20, 30]"
        @size-change="handler"
        @current-change="getAllRole"
      ></el-pagination>
      <el-dialog v-model="dialogVisible">
        <el-form
          :title="RoleParams.id ? '更新职位' : '添加职位'"
          :rules="rules"
          ref="formRef"
          :model="RoleParams"
        >
          <el-form-item label="角色名称：" prop="roleName">
            <el-input
              placeholder="请输入"
              v-model="RoleParams.roleName"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { reqAddOrUpdateRole, reqAllRoleList } from '@/api/acl/role'
import { ElMessage } from 'element-plus'
import { RoleData } from '@/api/acl/role/type.ts'

let pageSize = ref<number>(10)
let currentSize = ref<number>(1)
let total = ref<number>(0)
let roleArr = ref()
let keyword = ref<string>('')
let dialogVisible = ref<boolean>(false)
let RoleParams = ref({
  roleName: '',
})

let formRef = ref()
onMounted(() => {
  getAllRole()
})
const getAllRole = async (pager = 1) => {
  currentSize.value = pager
  const result = await reqAllRoleList(
    currentSize.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    roleArr.value = result.data.records
  }
}

const handler = () => {
  getAllRole()
}

const addRole = () => {
  dialogVisible.value = true
  //清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

//更新已有的职位按钮的回调
const updateRole = (row: RoleData) => {
  //显示出对话框
  dialogVisible.value = true
  //存储已有的职位----带有ID的
  Object.assign(RoleParams, row)
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

const save = async () => {
  await formRef.value.validator()
  //添加职位|更新职位的请求
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    //提示文字
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功',
    })
    //对话框显示
    dialogVisite.value = false
    //再次获取全部的已有的职位
    getAllRole(RoleParams.id ? currentSize.value : 1)
  }
}

const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('少于2位'))
  }
}

const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
</script>

<style scoped>
.search_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
