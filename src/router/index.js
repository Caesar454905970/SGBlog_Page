//从VueRouter中导入需要的函数模块
import {createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入 HelloWorld.vue 组件
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
        name:'Layout',
        component: () => import('../Layout/index.vue'),
        children:[
            {
                path: 'home',
                name: 'Home',
                component: () => import('../views/Home/index.vue'),
            },
            {
                path: '/Account',
                name: 'Account',
                component: () => import('../views/Account/index.vue'),
            },
            {
                path: '/RequestLog',
                name: 'RequestLog',
                component: () => import('../views/RequestLog/index.vue'),
            },

            {
                path: '/Role',
                name: 'Role',
                component: () => import('../views/Role/index.vue'),
                meta:{
                    title:' 角色管理'
                }
            },

        ]
    },
]

/*const routes = [
    { path: '/', component: () => import('../Layout/index.vue.vue'),
        children:[
            { path: 'home', component: () => import('../views/Home/index.vue.vue')},
            { path: 'about', component: () => import('../views/About.vue')},
        ]}
]*/

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

//路由拦截
router.beforeEach((to, from, next) => {
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



//导出router
export default router
