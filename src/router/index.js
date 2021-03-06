//从VueRouter中导入需要的函数模块
import {createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入 HelloWorld.vue 组件
import  Layout from "../Layout/index.vue"
import {getRouters} from "../api/Login/login";

// component字符串转换为对象
// const _loadPageByRoutes=(str)=> { // views文件夹下的Home组件，传入的格式为 'Home'
//
// }
// 匹配views里面所有的.vue文件
// const modules = import.meta.glob('../views/**/*.vue')
// component字符串转换为对象
let data= [
    { path: '/', component: () => import('../Layout/index.vue'),redirect: "noRedirect",
        children:[
            {
                path: 'Account',
                name: 'Account',
                component: 'Account',
            },
            {
                path: 'Role',
                name: 'Role',
                component: 'Role',
                meta:{
                    title:' 角色管理'
                }
            }
        ]}
]
//匹配文件下的所有路由
const modules = import.meta.glob('../views/**/index.vue')
// 遍历后台传来的路由字符串，转换为组件对象
//遍历树结构
let _import =(view) => {
    // console.log("view传入",view)
    // console.log("modules所有",modules)
    // console.log("modules选择的结果",modules[`../views/${view}/index.vue`])
    // return  ()=>import(`../views/${view}/index.vue`)
    return modules[`../views/${view}/index.vue`]
}
// component:_import(item.component)//以这种方式引入
const filterAsyncRouter=(routers)=>{
    //遍历后台传过来的字符串，转换为组件对象
     routers= routers.filter((route)=>{
         // console.log("**********")
         // console.log(str)
         if(!route.redirect){
             route.component=_import( route.component)//以这种方式引入
             // console.log("生成的路由为", route.component)
             // console.log("**********")
         }


/*         if(route.component){
             route.component=loadPageByRoutes(route.component())
         }*/

        if(route.children && route.children.length){
            route.children=filterAsyncRouter(route.children)
        }
         return true
    })
        // console.log(routers)
        return routers
}



const routes = [
    {
        path: '/login',
        name:'login',
        component: () => import('../views/Login/index.vue'),
        children:[

        ]
    },
    {
        path: '/',
        // name:'/',
        component: () => import('../Layout/index.vue'),
        children:[
            {
                path: '/home',
                name: 'Home',
                component: () => import('../views/Home/index.vue'),
            },
/*            {
                path: '/Account',
                name: 'Account',
                component: () => import('../views/Account/index.vue'),
            },*/
            {
                path: '/RequestLog',
                name: 'RequestLog',
                component: () => import('../views/RequestLog/index.vue'),
            },
/*
            {
                path: '/Role',
                name: 'Role',
                component: () => import('../views/Role/index.vue'),
                meta:{
                    title:' 角色管理'
                }
            },*/
            {
                path: '/HighCharts',
                name: 'HighCharts',
                component: () => import('../views/HighCharts/index.vue'),
                meta:{
                    title:' HighCharts'
                }
            },

            {
                path: '/Menu',
                name: 'Menu',
                component: () => import('../views/Menu/index.vue'),
                meta:{
                    title:' 菜单管理'
                }
            },
        ]
    },
]

const routes1 = [
    { path: '/', component: () => import('../Layout/index.vue'),
        children:[
            {
                path: 'Account',
                name: 'Account',
                component: () => import('../views/Account/index.vue'),
            },
            {
                path: 'Role',
                name: 'Role',
                component: () => import('../views/Role/index.vue'),
                meta:{
                    title:' 角色管理'
                }
            }
        ]}
]
// routes.push(filterAsyncRouter(data))
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
getRouters().then(res=>{
    data=[]
    data=res.data
    // console.log("请求回来的动态路由",data)
})
let str=filterAsyncRouter(data)
// console.log("动态添加可访问路由表str",str)
//路由拦截
router.beforeEach((to, from, next) => {
    //防止刷新找不到路由
    if (to.matched.length === 0) { router.push(to.path); }

    // console.log("str已经筛选出来的路由",str)
    str.forEach(route => {
        // console.log("我来生成动态路由了")
        router.addRoute(route) // 动态添加可访问路由表
    })

    NProgress.start()
    if (to.path === '/login' || to.path === '/register') {
        next()
        return
    }
    const SysUserToken=sessionStorage.getItem("SysUserToken")
    // let user = localStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}
    // if (!user.permissions || !user.permissions.length) {
    if (SysUserToken==null || SysUserToken==="" || SysUserToken===undefined ) {

        next('/login')
        NProgress.done()
    }  else {
        next()
    }
})





router.afterEach(() => {
    NProgress.done()
})

// router.addRoute(filterAsyncRouter(data))


//导出router

export default router
