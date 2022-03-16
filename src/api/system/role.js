//调用封装了的axios => request
import service from "../../utils/request.js";

/**
 * 封装各个组件里面的axios请求
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
//查询用户列表
export function listRole(query){
    return service({
        method:'post',  //请求的方法
        url:`/sysRole/List`, //请求的地址
        params: query    //提交的参数
    })
}
