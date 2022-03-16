import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/css/gloable.css" //引入全局样式
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言
import './assets/iconfont/iconfont.css'
import {store} from "./store";

const app =createApp(App)


// 分页组件
import Pagination from './components/Pagination/index.vue'

// 全局组件挂载
app.component('Pagination', Pagination)



app.use(router)
    .use(ElementPlus,{
        locale: locale,
    })
    .use(store)
    .mount('#app')
