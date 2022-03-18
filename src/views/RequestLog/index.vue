<template>
<div>

  <!--系统日志记录-->
  <el-table
      border :header-cell-style="{background:'#F8F8F9',color:'#363D4B'}"
      :data="requestLogList"
      style="width: 100%"
      v-loading="loading"
      row-key="depId"
  >
    <el-table-column prop="id" label="id"  align="center"/>
    <el-table-column prop="requestUrl" label="请求 URL"  align="center"/>
    <el-table-column prop="businessName" label="描述信息"  align="center"/>
    <el-table-column prop="httpMethod" label="Http method"  align="center"/>
    <el-table-column prop="classMethodPath" label="调用 controller 的全路径"  align="center"/>
    <el-table-column prop="classMethodName" label="调用 controller 的方法"  align="center"/>
    <el-table-column prop="ip" label="请求的 IP"  align="center"/>
    <el-table-column :show-overflow-tooltip='true' width="150px" prop="requestArgs" label="请求入参"  align="center"/>
    <el-table-column :show-overflow-tooltip='true' width="150px" prop="response" label="响应的结果"  align="center"/>
    <el-table-column prop="createBy" label="createBy"  align="center"/>
        <el-table-column prop="createTime" label="创建时间"  align="center">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
    <el-table-column label="操作" align="center" width="70px">
      <template #default="scope">
        <el-button  class="coperate_btn" type="text"    @click="handleLog(scope.row)">详情</el-button>
      </template>
    </el-table-column>

  </el-table>
  <div style="display: flex;justify-content:center;background-color: #fff;">
    <!--    日志列表页码-->
    <pagination
        v-show="requestLogList_total > 0"
        :total="requestLogList_total"
        v-model:page="data_log.queryParams.pageNum"
        v-model:limit="data_log.queryParams.pageSize"
        @pagination="getRequestLogList"
    />
  </div>


  <!--    日志详情对话框-->
  <el-dialog

      v-model="logDetailDialogVisible"
      title="日志详情"
      width="40%"
      :before-close="handleClose"
      @close="logDetailDialogClosed"
  >
  <!--      内容展示区域-->
  <div class="dialogVisible_cotent">
    <el-descriptions :column="1"  ref="formLogRef">
      <el-descriptions-item label="id：">{{logForm.Form.id}}</el-descriptions-item>

      <el-descriptions-item label="请求 URL：">{{logForm.Form.requestUrl}}</el-descriptions-item>

      <el-descriptions-item label="描述信息：">{{logForm.Form.businessName}}</el-descriptions-item>

      <el-descriptions-item label="Http method：">{{logForm.Form.httpMethod}}</el-descriptions-item>

      <el-descriptions-item label="调用 controller 的全路径：">{{logForm.Form.classMethodPath}}</el-descriptions-item>

      <el-descriptions-item label="调用 controller 的方法：">{{logForm.Form.classMethodName}}</el-descriptions-item>

      <el-descriptions-item label="请求的 IP：">{{logForm.Form.ip}}</el-descriptions-item>

      <el-descriptions-item label="请求入参：">{{logForm.Form.requestArgs}}</el-descriptions-item>

      <el-descriptions-item label="响应的结果：">{{logForm.Form.response}} ms</el-descriptions-item>

      <el-descriptions-item label="createBy：">{{logForm.Form.createBy}}</el-descriptions-item>

      <el-descriptions-item label="日志生成时间：">{{logForm.Form.createTime}}</el-descriptions-item>

    </el-descriptions>
  </div>
  <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancleLogDetail">关闭</el-button>
      </span>
  </template>
  </el-dialog>




</div>
</template>

<script setup >
/**
 * 系统操作日志记录页面
 */
import {onMounted, reactive, ref} from "vue";
import {requestlogList} from "../../api/RequestLog/RequestLog";
import {ElMessage, ElMessageBox} from "element-plus";
import {parseTime} from "../../utils/ruoyi.js"; //引入时间格式化工具


const loading = ref(false)
//请求数据
const data_log=reactive({
  //获取操作日志记录列表
  queryParams:{
    pageNum:1,
    pageSize:10,
  }
})
//控制志详情对话框
const logDetailDialogVisible = ref(false)
// 日志记录列表
const requestLogList=ref([])
const requestLogList_total=ref(0)
//日志详情：要填充的信息
const logForm = reactive({
  Form:{
    id:'',
    requestUrl:'',
    businessName:'',
    httpMethod:'',
    classMethodPath:'',
    classMethodName:'',
    ip:'',
    requestArgs:'',
    response:'',
    createBy:'',
    createTime:'',

  },

})



//获取操作日志记录列表
const getRequestLogList=()=>{
  loading.value=true //开启加载
  const param ={
  }
  param.pageNum=data_log.queryParams.pageNum
  param.pageSize=data_log.queryParams.pageSize
  requestlogList(param).then(res=>{
    if(res.code===200){
      // ElMessage({
      //   message: "获取请求日志列表成功",
      //   type: 'success',
      //   showClose: true,
      //   duration: 1000,
      // })
      requestLogList.value=res.data.rows
      requestLogList_total.value=parseInt(res.data.total)
      loading.value=false //关闭加载
    }else {
      ElMessage({
        message: res.msg,
        type: 'error',
        showClose: true,
        duration: 1000,
      })
      //跳出

    }

  })
}
//点击详情：查看详细信息
const handleLog=(row)=>{
  //填充信息
  logForm.Form.id=row.id
  logForm.Form.requestUrl=row.requestUrl
  logForm.Form.businessName=row.businessName
  logForm.Form.httpMethod=row.httpMethod
  logForm.Form.classMethodPath=row.classMethodPath
  logForm.Form.classMethodName=row.classMethodName
  logForm.Form.ip=row.ip
  logForm.Form.requestArgs=row.requestArgs
  logForm.Form.response=row.response
  logForm.Form.createBy=row.createBy
  logForm.Form.createTime=row.createTime

  //展开对话框
  logDetailDialogVisible.value=true
}

//关闭对话框： 日志详情
const cancleLogDetail=()=>{
  //清空表单
  logForm.Form.id=""
  logForm.Form.requestUrl=""
  logForm.Form.businessName=""
  logForm.Form.httpMethod=""
  logForm.Form.classMethodPath=""
  logForm.Form.classMethodName=""
  logForm.Form.ip=""
  logForm.Form.requestArgs=""
  logForm.Form.response=""
  logForm.Form.createBy=""
  logForm.Form.createTime=""
  logDetailDialogVisible.value=false
}

//监听： 日志详情对话框关闭：清空表单，还原警告
const logDetailDialogClosed=()=>{
  //清空表单
  logForm.Form.id=""
  logForm.Form.requestUrl=""
  logForm.Form.businessName=""
  logForm.Form.httpMethod=""
  logForm.Form.classMethodPath=""
  logForm.Form.classMethodName=""
  logForm.Form.ip=""
  logForm.Form.requestArgs=""
  logForm.Form.response=""
  logForm.Form.createBy=""
  logForm.Form.createTime=""
}

const handleClose =(done)=>{
  // ElMessageBox.confirm('Are you sure to close this dialog?')
  ElMessageBox.confirm('您确定要关闭此对话框吗?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
onMounted(()=>{
  //初始化列表
  getRequestLogList()
})
</script>

<style lang='less' scoped>


</style>
