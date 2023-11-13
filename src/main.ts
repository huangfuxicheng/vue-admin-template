import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index'
import '@/styles/index.scss'
import pinia from '@/store'

app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
