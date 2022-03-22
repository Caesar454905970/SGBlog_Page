//调用封装了的axios => request
import service from "../../utils/request.js";

/**
 * 封装各个组件里面的axios请求
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
//获取角色列表
export function RoleList(query){
    return service({
        method:'post',  //请求的方法
        url:`/role/roleList`, //请求的地址
        params: query    //提交的参数
    })
}
// 新增角色
export function AddRole(formData){
    return service({
        method:'post',  //请求的方法
        url:`/role/addRole`, //请求的地址
        data: formData    //提交的参数
    })
}
// 修改角色信息
export function UpdateRole(formData){
    return service({
        method:'post',  //请求的方法
        url:`/role/updateRoleInfo`, //请求的地址
        data: formData    //提交的参数
    })
}
//删除角色
export function DelRole(query){
    return service({
        method:'post',  //请求的方法
        url:`/role/delRoleById`, //请求的地址
        params: query    //提交的参数
    })
}
