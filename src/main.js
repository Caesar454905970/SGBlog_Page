import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/css/gloable.css" //引入全局样式
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言
import './assets/iconfont/iconfont.css'
import {store} from "./store";
import Particles from 'particles.vue3'
import $ from 'jquery'

//引入highCharts
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);



const app =createApp(App)


// 分页组件
import Pagination from './components/Pagination/index.vue'

// 全局组件挂载
app.component('Pagination', Pagination)

app.use(router)
    .use(ElementPlus,{
        locale: locale,
    })
    .use($)
    .use(store)
    .use(Particles)
    .mount('#app')
