/**
 * axios的请求的相关设置封装成 service 在api中进行调用 service方法
 */
import axios from 'axios'
import router from "../router";
import {ElMessage} from "element-plus";
import defaultSettings from '../settings'

// axios封装：统一处理请求头
const { baseURL } = defaultSettings
const service = axios.create({
    baseURL: baseURL,
    timeout: 5000 //5s提示报错
})

//添加请求拦截器ss
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
service.interceptors.request.use(config =>{
    const  SysUserToken= window.sessionStorage.getItem("SysUserToken")
    if(SysUserToken){ //token不存在；不携带；login
        config.headers['token'] =SysUserToken// 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
} ,error => {
    return Promise.reject(error)
})

//添加响应拦截器
// 可以在接口响应后统一处理结果(统一添加错误码)
// response 拦截器
// 可以在接口响应后统一处理结果
service.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 验证token：
        else if (res.code === 401) {
            // console.error("token过期，重新登录")
            router.push("/login").then(r =>router.push("/login") )
        }
            // arr1=JSON.parse(window.sessionStorage.getItem("arr_start_menu"))
        // 接口是否有权限访问：如果 403 没有权限；提示用户刷新页面：mian.vue=>onmouted原始路由信息=》放入sessionStorage
        else if (res.code === 403) {
            ElMessage({
                message: "权限不足，请刷新页面重试",
                type: 'error',
                duration: 5 * 1000
            })

        }

        else if (res.code === 401) {
            // console.error("token过期，重新登录")
            router.push("/login").then(r =>router.push("/login"))
        }
        return res;
    },
    error => {
        let { message } = error;

        //捕获接口网络异常问题
        if (message === "Network Error") {
            message = "后端接口连接异常";
        }
        else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        ElMessage({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })



        return Promise.reject(error)
    }
)


export default service

/*

import router from "@/router";

const request = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 5000
})

// 请求白名单，如果请求在白名单里面，将不会被拦截校验权限
const whiteUrls = ["/user/login", '/user/register']

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // 取出sessionStorage里面缓存的用户信息
    let userJson = sessionStorage.getItem("token")
    if (!whiteUrls.includes(config.url)) {  // 校验请求白名单
        if(!userJson) {
            router.push("/login")
        } else {
            let user = JSON.parse(userJson);
            config.headers['token'] = user.token;  // 设置请求头
        }
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 验证token
        if (res.code === '401') {
            console.error("token过期，重新登录")
            router.push("/login")
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request*/

