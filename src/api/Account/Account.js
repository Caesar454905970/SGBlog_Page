//调用封装了的axios => request
import service from "../../utils/request.js";

/**
 * 封装各个组件里面的axios请求
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
//获取用户列表
export function UserList(query){
    return service({
        method:'post',  //请求的方法
        url:`/user/userList`, //请求的地址
        params: query    //提交的参数
    })
}
// 新增用户
export function AddUser(formData){
    return service({
        method:'post',  //请求的方法
        url:`/user/register`, //请求的地址
        data: formData    //提交的参数
    })
}
// 13-更新个人信息
export function UpdateUser(formData){
    return service({
        method:'post',  //请求的方法
        url:`/user/updateUserInfo`, //请求的地址
        data: formData    //提交的参数
    })
}
// 02-删除一个用户
export function DelUser(query){
    return service({
        method:'post',  //请求的方法
        url:`/user/delUserById`, //请求的地址
        params: query    //提交的参数
    })
}
