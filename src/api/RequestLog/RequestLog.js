//调用封装了的axios => request
import service from "../../utils/request.js";

/**
 * 封装各个组件里面的axios请求
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
// 15-获取请求日志记录：分页查询
export function requestlogList(query){
    return service({
        method:'post',  //请求的方法
        url:`/requestlog/requestlogList`, //请求的地址
        params: query    //提交的参数
    })
}

