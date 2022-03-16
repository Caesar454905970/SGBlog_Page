//从VueRouter中导入需要的函数模块
import {createRouter, createWebHashHistory } from 'vue-router'
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
                path: 'SysUser',
                name: 'SysUser',
                component: () => import('../views/system/user/index.vue'),
            },
            {
                path: 'sysRole',
                name: 'sysRole',
                component: () => import('../views/system/role/index.vue'),
            },

        ]
    },
]

/*const routes = [
    { path: '/', component: () => import('../Layout/index.vue'),
        children:[
            { path: 'home', component: () => import('../views/Home/index.vue')},
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
    if (to.path === '/login' || to.path === '/register') {
        next()
        return
    }
    const SysUserToken=sessionStorage.getItem("SysUserToken")
    // let user = localStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}
    // if (!user.permissions || !user.permissions.length) {
    if (SysUserToken==null || SysUserToken==="" || SysUserToken===undefined ) {
        next('/login')
    }  else {
        next()
    }
})








//导出router
export default router
