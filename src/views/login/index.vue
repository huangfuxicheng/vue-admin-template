<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="ruleFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              :loading="loading"
              type="primary"
              size="default"
              @click="handleSubmit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="login">
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'
import { getTime } from '@/utils/time.ts'

let loading = ref(false)
const loginForm = reactive({ username: 'admin', password: 'atguigu123' })
const $router = useRouter()
const $route = useRoute()
const useStore = useUserStore()

const ruleFormRef = ref<FormInstance>()

const validatePassword = (_: any, value: any, callback: any) => {
  if (value.length < 5 || value.length > 10) {
    callback(new Error('长度应为6-10位'))
  } else {
    callback()
  }
}
const validateUsername = (_: any, value: any, callback: any) => {
  if (value.length < 5 || value.length > 10) {
    callback(new Error('长度应为6-10位'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof loginForm>>({
  password: [{ validator: validatePassword, trigger: 'change' }],
  username: [{ validator: validateUsername, trigger: 'change' }],
})

// const rules = {
//   username: [
//     //规则对象属性:
//     {
//       required: true, // required,代表这个字段务必要校验的
//       min: 5, //min:文本长度至少多少位
//       max: 10, // max:文本长度最多多少位
//       message: '长度应为6-10位', // message:错误的提示信息
//       trigger: 'change', //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
//     },
//   ],
//   password: [
//     {
//       required: true,
//       min: 6,
//       max: 10,
//       message: '长度应为6-10位',
//       trigger: 'change',
//     },
//   ],
// }
const handleSubmit = async () => {
  await ruleFormRef?.value?.validate()
  //按钮加载效果
  loading.value = true
  //点击登录按钮以后干什么
  //通知仓库发起请求
  //请求成功->路由跳转
  //请求失败->弹出登陆失败信息
  try {
    //也可以书写.then语法
    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据的首页
    const redirect = $route.query.redirect
    $router.push({ path: (redirect as string) || '/home' })
    //登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '登录成功！',
      title: `HI,${getTime()}`,
    })
    //登录成功,加载效果也消失
    loading.value = false
  } catch (error) {
    //登陆失败加载效果消失
    loading.value = false
    //登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;
  }

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
