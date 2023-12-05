<template>
  <div>
    <el-card style="height: 80px">
      <el-form inline class="search_container">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入搜索用户名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyword" @click="search">
            搜索
          </el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="primary"
        @click="deleteSelectUser"
        :disabled="!selectIdArr?.length"
      >
        批量删除
      </el-button>
      <el-table
        style="margin: 10px 0"
        border
        :data="userArr"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名"
          align="center"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          show-overflow-tooltip
          prop="username"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          align="center"
          show-overflow-tooltip
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="dispatchRole(row)"
            >
              分类角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.username}`"
              width="260px"
              @confirm="deleteUser(row.id)"
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
        v-model:current-page="currentSize"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="prev,pager, next,jumper,->,sizes,total"
        :total="total"
        @current-change="getAllUser"
        @size-change="handler"
      />
      <!-- 抽屉结构:完成添加新的用户账号|更新已有的账号信息 -->
      <el-drawer v-model="drawer">
        <!-- 头部标题:将来文字内容应该动态的 -->
        <template #header>
          <h4>添加用户</h4>
        </template>
        <!-- 身体部分 -->
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                placeholder="请您输入用户姓名"
                v-model="userParams.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input
                placeholder="请您输入用户昵称"
                v-model="userParams.name"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户密码"
              prop="password"
              v-if="!userParams.id"
            >
              <el-input
                placeholder="请您输入用户密码"
                v-model="userParams.password"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @="cancel">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </div>
        </template>
      </el-drawer>
      <!-- 抽屉结构:用户某一个已有的账号进行职位分配 -->
      <el-drawer v-model="drawer1">
        <template #header>
          <h4>分配角色(职位)</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input
                v-model="userParams.username"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位列表">
              <el-checkbox
                @change="handleCheckAllChange"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
              >
                全选
              </el-checkbox>
              <!-- 显示职位的的复选框 -->
              <el-checkbox-group
                v-model="UserRole"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="(role, index) in ALlRole"
                  :key="index"
                  :label="role"
                >
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer1 = false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateUser,
  reqAllUser,
  reqRemoveUser,
  reqRole,
  reqSelectUser,
  reqSetUserRole,
} from '@/api/acl/user'
import type {
  AllRole,
  Records,
  SetRoleData,
  User,
} from '@/api/acl/user/type.ts'
import { CheckboxValueType, ElMessage } from 'element-plus'
import useLayoutSettingStore from '@/store/modules/setting.ts'

let currentSize = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let userArr = ref<Records>()
let formRef = ref()
let ALlRole = ref<AllRole>([])
let UserRole = ref<AllRole>([])
const checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let selectIdArr = ref()
//获取模板setting仓库
let settingStore = useLayoutSettingStore()
let keyword = ref<string>('')
//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})

let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
onMounted(() => {
  getAllUser()
})
const getAllUser = async (pager = 1) => {
  currentSize.value = pager
  const result = await reqAllUser(
    currentSize.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
const handler = () => {
  getAllUser()
}

const addUser = () => {
  //抽屉显示出来
  drawer.value = true
  //清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

//取消按钮的回调
const cancel = () => {
  //关闭抽屉
  drawer.value = false
}
//保存按钮的回调
const save = async () => {
  await formRef.value.validate()
  //保存按钮:添加新的用户|更新已有的用户账号信息
  console.log(userParams)
  let result: any = await reqAddOrUpdateUser(userParams)
  //添加或者更新成功
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    //获取最新的全部账号的信息
    getAllUser(userParams.id ? currentSize.value : 1)
    window.location.reload()
  } else {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
const validatorUsername = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名至少五位'))
  }
}
const validatorName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名至少五位'))
  }
}
const validatorPassword = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户名至少五位'))
  }
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

const dispatchRole = async (row: User) => {
  Object.assign(userParams, row)
  const result = await reqRole(row.id as number)
  if (result.code === 200) {
    ALlRole.value = result.data.allRolesList
    UserRole.value = result.data.assignRoles
  }
  checkAll.value = UserRole.value.length === ALlRole.value.length
  isIndeterminate.value =
    UserRole.value.length > 0 && UserRole.value.length < ALlRole.value.length
  drawer1.value = true
}

const handleCheckAllChange = (val: CheckboxValueType) => {
  UserRole?.value = val ? ALlRole : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (val: CheckboxValueType[]) => {
  const checkedCount = val.length
  checkAll.value = checkedCount === ALlRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < ALlRole.value.length
}

//确定按钮的回调(分配职位)
const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: UserRole.value.map((item) => item.id as number),
  }
  //分配用户的职位
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '分配职务成功' })
    //关闭抽屉
    drawer1.value = false
    //获取更新完毕用户的信息,更新完毕留在当前页
    getAllUser(currentSize.value)
  }
}

const deleteUser = async (id: number) => {
  let result: any = await reqRemoveUser(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAllUser(
      userArr?.value.length > 1 ? currentSize.value : currentSize.value - 1,
    )
  }
}

const selectChange = (value: []) => {
  selectIdArr.value = value
}

const deleteSelectUser = async () => {
  //整理批量删除的参数
  let idsList: any = selectIdArr.value.map((item: any) => {
    return item.id
  })
  const result: any = await reqSelectUser(idsList)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAllUser(
      userArr?.value.length > 1 ? currentSize.value : currentSize.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

const search = () => {
  getAllUser()
}

//重置按钮
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
</script>

<style scoped lang="scss">
.search_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
