import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index'
import '@/styles/index.scss'
import pinia from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(globalComponent)
app.use(router)
app.use(pinia)
import './permisstion.ts'
app.mount('#app')
