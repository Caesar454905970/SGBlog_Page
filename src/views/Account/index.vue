<template>
  <div>


      <!--    搜索区域-->
      <div>
        <!--    搜索区域-->
        <el-row>
          <el-col :span="24">
            <!--    搜索区域-->
            <el-form style="display: flex">
              <el-form-item label="用户名" prop="userName" style="color: #969696!important;font-weight: 300;">
                <el-input
                    v-model="data.queryParams.userName"
                    placeholder="请输入帐号"
                    clearable
                    style="width: 240px"
                    @clear="getAccountList"
                />
              </el-form-item>
              <el-form-item label="昵称" prop="nickname" style="margin-left: 20px;color: #969696!important;font-weight: 300;">
                <el-input
                    v-model="data.queryParams.nickName"
                    placeholder="请输入昵称"
                    clearable
                    style="width: 240px"
                    @clear="getAccountList"
                />
              </el-form-item>
              <el-button style="margin-left: 20px" type="primary" :icon="Search" @click="getAccountList">搜索</el-button>
            </el-form>
          </el-col>


        </el-row>
      </div>


      <div style="margin-bottom: 8px;">
        <!--    新增按钮_平台-->
        <el-button
            type="primary"
            plain
            :icon="Plus"
            @click="handleAddAccount"
        >新增</el-button>
      </div>


      <!--用户管列表-->
    <el-table
        border :header-cell-style="{background:'#F8F8F9',color:'#363D4B'}"
        :data="userList"
        style="width: 100%"
        v-loading="loading"
        row-key="depId"
    >
      <el-table-column prop="id" label="id"  align="center"/>
      <el-table-column prop="userName" label="用户名"  align="center"/>
      <el-table-column prop="nickName" label="昵称"  align="center"/>
      <el-table-column prop="type" label="用户类型"  align="center"/>
      <el-table-column prop="status" label="账号状态"  align="center"/>
      <el-table-column prop="email" label="邮箱"  align="center"/>
      <el-table-column prop="phonenumber" label="手机号"  align="center"/>
      <el-table-column :show-overflow-tooltip='true' width="150px" prop="sex" label="用户性别"  align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.sex == 0" >男</el-tag>
        <el-tag v-else-if="scope.row.sex == 1" type="success">女</el-tag>
      </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip='true' width="150px" prop="avatar" label="头像"  align="center"/>
      <el-table-column prop="createBy" label="createBy"  align="center"/>
      <el-table-column prop="updateBy" label="updateBy"  align="center"/>
      <el-table-column prop="createTime" label="创建时间"  align="center">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"  align="center">
        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140px">
        <template #default="scope">
          <el-button  class="coperate_btn" type="text"    @click="handleEditAccount(scope.row)">编辑</el-button>
          <el-button  class="coperate_btn" type="text"    @click="handleDelAccount(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="display: flex;justify-content:center;background-color: #fff;">
      <!--    用户列表页码-->
      <pagination
          v-show="userList_total > 0"
          :total="userList_total"
          v-model:page="data.queryParams.pageNum"
          v-model:limit="data.queryParams.pageSize"
          @pagination="getAccountList"
      />
    </div>

    <!--   新增用户账号对话框-->
    <el-dialog
        v-model="dialogVisibleAddAccount"
        title="新增账号"
        width="40%"
        :before-close="handleClose"
        @close="addAccountDialogClosed_plat"

    >
      <!--      内容展示区域-->
      <div style="    height: 50vh;overflow:auto;">
        <el-form label-width="120px" ref="formAddRef" :model="accountForm.addForm" :rules="Rules">
          <el-form-item label="登陆账号" prop="account">
            <el-input v-model="accountForm.addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="accountForm.addForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="accountForm.addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="accountForm.addForm.email"></el-input>
          </el-form-item>


        </el-form>
      </div>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancleAddAccountInfo">取消</el-button>
      <el-button type="primary" @click="commitAddAccountInfo"
      >提交</el-button
      >
    </span>
      </template>
    </el-dialog>

    <!--   编辑用户账号对话框-->
    <el-dialog
        v-model="dialogVisibleEditAccount"
        title="编辑账号"
        width="40%"
        :before-close="handleClose"
        @close="editAccountDialogClosed"

    >
      <!--      内容展示区域-->
      <div style="    height: 50vh;overflow:auto;">
        <el-form label-width="120px" ref="formEditRef" :model="accountForm.editForm" :rules="Rules">
          <el-form-item label="账号id" prop="id" >
            <el-input v-model="accountForm.editForm.id" :disabled="true"> </el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="accountForm.editForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="重置密码" prop="password">
            <el-input v-model="accountForm.editForm.password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="accountForm.editForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="accountForm.editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-input v-model="accountForm.editForm.avatar"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancleEditAccountInfo">取消</el-button>
      <el-button type="primary" @click="commitEditAccountInfo"
      >提交</el-button
      >
    </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
/**
 * 用户管理页面
 */
import {  Plus, Edit, Share, Delete, Search, Upload,Refresh } from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import {AddUser, DelUser, UpdateUser, UserList} from "../../api/Account/Account";
import {ElMessage, ElMessageBox} from "element-plus";
import {parseTime} from "../../utils/ruoyi.js";
import {Encrypt} from "../../utils/secret"; //引入时间格式化工具
/*****数据区域*********/
const loading = ref(false)
//用户列表
const userList=ref([])
//总的用户数量
const userList_total=ref(0)
const data =reactive({

  //获取用户列表请求的参数
  queryParams:{
    pageNum:1,
    pageSize:10,
    userName:'',
    nickName:''
  },
})
//控制新增用户账号对话框
const dialogVisibleAddAccount = ref(false)
//控制编辑用户账号对话框
const dialogVisibleEditAccount = ref(false)
const formAddRef= ref(null)
const formEditRef= ref(null)
//要提交显示的表单信息_平台
const accountForm = reactive({
  editForm:{
    id:'',
    nickName:'',
    sex:'',
    email:'',
    avatar:'',
    password:'',
  },
  addForm:{

    userName:'',
    nickName:'',
    password:'',
    email:'',

  }
})
// 自定义验证规则
const validatePass = (rule, value, callback) => {
  //  密码只能由大小写英文字母或数字开头，且由大小写英文字母_.组成
  const reg = /^[A-Za-z0-9][A-Za-z0-9]{0,18}$/
  console.log('reg', value.match(reg))
  if (!value.match(reg)) {
    callback(new Error('登录账号由字母或数字开头，且只能为字母,数字'))
  } else {
    callback()
  }
}

// 定义校验规则
const Rules = reactive({
  userName: [
    { required: true, message: '登录账号不能为空', trigger: 'blur' },
    { min: 0, max: 18, message: '登录账号位数只能在0~18之间', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
})

/**************/


/****函数方法区域*********/

//获取用户列表
const getAccountList=()=>{
  //提交数据
  loading.value=true //开启加载
  const param ={
  }
  param.pageNum=data.queryParams.pageNum
  param.pageSize=data.queryParams.pageSize

  if(data.queryParams.userName){
    param.userName=data.queryParams.userName
  }
  if(data.queryParams.nickName){
    param.nickName=data.queryParams.nickName
  }
  UserList(param).then(res=>{
    if(res.code===200){
      // ElMessage({
      //   message: "获取请求日志列表成功",
      //   type: 'success',
      //   showClose: true,
      //   duration: 1000,
      // })
      userList.value=res.data.rows
      userList_total.value=parseInt(res.data.total)
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
//点击新增：账号按钮
const handleAddAccount=()=>{
  dialogVisibleAddAccount.value=true
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
//监听：新增对话框关闭：清空表单，还原警告
const addAccountDialogClosed_plat=()=>{
  //清空表单
  //清空信息
  formAddRef.value.resetFields()
}
//监听：编辑对话框关闭：清空表单，还原警告
const editAccountDialogClosed=()=>{
  //清空表单
  //清空信息
  formEditRef.value.resetFields()
}

//关闭对话框：取消新增账号
const cancleAddAccountInfo=()=>{
  //清空表单
  // formAddRef.value.resetFields()
  //清空信息
  //关闭弹出框
  dialogVisibleAddAccount.value=false

}
//关闭对话框：取消编辑账号
const cancleEditAccountInfo=()=>{
  //清空表单
  // formAddRef.value.resetFields()
  //清空信息
  //关闭弹出框
  dialogVisibleEditAccount.value=false

}
// 提交 新增账号按钮
const commitAddAccountInfo=()=>{
  //提交数据
  const param ={
  }

  //存在名称，才加入，防止提交空
  if(accountForm.addForm.userName){
    param.userName=accountForm.addForm.userName
  }
  if(accountForm.addForm.nickName){
    param.nickName=accountForm.addForm.nickName
  }
  if(accountForm.addForm.email){
    param.email=accountForm.addForm.email
  }
  if(accountForm.addForm.password){
    param.password=Encrypt(accountForm.addForm.password)
  }
  AddUser(param).then(res=>{
    if (res.code === 200) {
      ElMessage({
        message: res.msg,
        type: 'success',
        showClose: true,
        duration: 1000,
      })
      //清空表单
      formAddRef.value.resetFields()
      //刷新列表
      getAccountList()
      dialogVisibleAddAccount.value=false
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

// 提交 编辑账号按钮
const commitEditAccountInfo=()=>{
    //提交数据
    const param ={
    }
  param.id=accountForm.editForm.id
    //存在名称，才加入，防止提交空
    if(accountForm.editForm.nickName){
      param.nickName=accountForm.editForm.nickName
    }
    if(accountForm.editForm.sex){
      param.sex=accountForm.editForm.sex
    }
    if(accountForm.editForm.email){
      param.email=accountForm.editForm.email
    }
    if(accountForm.editForm.avatar){
      param.avatar=accountForm.editForm.avatar
    }
  if(accountForm.editForm.password){
    param.password=Encrypt(accountForm.editForm.password)
  }
  UpdateUser(param).then(res=>{
      if (res.code === 200) {
        ElMessage({
          message: res.msg,
          type: 'success',
          showClose: true,
          duration: 1000,
        })
        //清空表单
        formEditRef.value.resetFields()
        //刷新列表
        getAccountList()
        dialogVisibleEditAccount.value=false
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
//点击编辑按钮：编辑用户信息
const handleEditAccount=(row)=>{
  //填充表单信息
  accountForm.editForm.id=row.id
  accountForm.editForm.nickName=row.nickName
  accountForm.editForm.sex=row.sex
  accountForm.editForm.email=row.email
  accountForm.editForm.avatar=row.avatar
  //打开编辑 对话框
  dialogVisibleEditAccount.value=true
}
//点击删除按钮：删除用户
const handleDelAccount=(row)=>{
  //弹出是否确认删除
  ElMessageBox.confirm('确认删除用户：'+row.userName)
      .then(() => {
        const param ={

        }
        param.ID=row.id
        DelUser(param).then((res =>{
          if (res.code === 200) {
            ElMessage({
              message: res.msg,
              type: 'success',
              showClose: true,
              duration: 1000,
            })
            //更新列表
            getAccountList()
          }else{
            ElMessage({
              message: res.msg,
              type: 'error',
              showClose: true,
              duration: 1000,
            })
          }

        }))
      })
      .catch(() => {
        // catch error
      })



}


/**************/


/****生命周期区域*********/
//初始化
onMounted(()=>{
  //获取用户列表
  getAccountList()
})
/**************/

</script>

<style lang='less' scoped>

</style>
