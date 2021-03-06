//调用封装了的axios => request
import service from "../../utils/request.js";

/**
 * 封装各个组件里面的axios请求
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
//登录方法
export function Login(formData){
    return service({
        method:'post',  //请求的方法
        url:`/login`, //请求的地址
        data: formData    //提交的参数
    })
}
//登出登录方法
export  function logout(){
    return service({
        method:'post',
        url:`/logout`,

    })
}

// 03-获取动态路由
export  function getRouters(){
    return service({
        method:'get',
        url:`/getRouters`,
    })
}
// 04-获取侧栏菜单列表
export  function getMenuList(){
    return service({
        method:'get',
        url:`/getMenuList`,
    })
}
