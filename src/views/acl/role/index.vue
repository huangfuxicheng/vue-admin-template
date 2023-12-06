<template>
  <div>
    <el-card>
      <el-form :inline="true" class="search_container">
        <el-form-item label="角色：">
          <el-input placeholder="请输入角色" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
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
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermisstion(row)"
            >
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
            <el-popconfirm
              :title="`确认删除${row.roleName}`"
              @confirm="deleteRole(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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
          :title="RoleParams?.id ? '更新职位' : '添加职位'"
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
      <el-drawer v-model="drawer">
        <template #header>
          <h4>分配权限</h4>
        </template>
        <template #default>
          <el-tree
            ref="tree"
            :data="menuArr"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectArr"
            :props="defaultProps"
          />
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确认</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermisstion,
} from '@/api/acl/role'
import { ElMessage } from 'element-plus'
import { MenuList, MenuResponseData, RoleData } from '@/api/acl/role/type.ts'
import useLayoutSettingStore from '@/store/modules/setting.ts'

let pageSize = ref<number>(10)
let currentSize = ref<number>(1)
let total = ref<number>(0)
let roleArr = ref()
let keyword = ref<string>('')
let dialogVisible = ref<boolean>(false)
let settingStore = useLayoutSettingStore()
let RoleParams = reactive<RoleData>({
  roleName: '',
})
let selectArr = ref<number[]>([])
//定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
let drawer = ref<boolean>(false)
let formRef = ref()
let tree = ref()
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
    formRef.value.clearValidate('roleName')
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
    formRef.value.clearValidate('roleName')
  })
}

const save = async () => {
  await formRef.value.validate()
  //添加职位|更新职位的请求
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    //提示文字
    ElMessage({
      type: 'success',
      message: RoleParams?.id ? '更新成功' : '添加成功',
    })
    //对话框显示
    dialogVisible.value = false
    //再次获取全部的已有的职位
    getAllRole(RoleParams?.id ? currentSize.value : 1)
  }
}

const validatorRoleName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('少于2位'))
  }
}

const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}

const search = () => {
  getAllRole()
}

//树形控件的测试数据
const defaultProps = {
  children: 'children',
  label: 'name',
}

const reset = () => {
  settingStore.refresh = !settingStore.refresh
}

//已有的职位的数据
const setPermisstion = async (row: RoleData) => {
  //抽屉显示出来
  drawer.value = true
  //收集当前要分类权限的职位的数据
  Object.assign(RoleParams, row)
  //根据职位获取权限的数据
  let result: MenuResponseData = await reqAllMenuList(RoleParams?.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    } else {
      if (item.select) {
        initArr.push(item.id)
      }
    }
  })

  return initArr
}

//抽屉确定按钮的回调
const confirmClick = async () => {
  //职位的ID
  const roleId = RoleParams?.id as number
  //选中节点的ID
  // checkedKeys
  let arr = tree.value.getCheckedKeys()
  //半选的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  //下发权限
  let result: any = await reqSetPermisstion(roleId, permissionId)
  if (result.code == 200) {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //页面刷新
    window.location.reload()
  }
}

const deleteRole = async (id: number) => {
  const result = await reqRemoveRole(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAllRole()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.search_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
