<template>
<div>

  <!--    搜索区域-->
  <div>
    <!--    搜索区域-->
    <el-row>
      <el-col :span="24">
        <!--    搜索区域-->
        <el-form style="display: flex">
          <el-form-item label="角色名称" prop="userName" style="color: #969696!important;font-weight: 300;">
            <el-input
                v-model="data.queryParams.name"
                placeholder="请输入角色名称"
                clearable
                style="width: 240px"
                @clear="getRoleList"
            />
          </el-form-item>
          <el-form-item label="权限字符串" prop="nickname" style="margin-left: 20px;color: #969696!important;font-weight: 300;">
            <el-input
                v-model="data.queryParams.roleKey"
                placeholder="请输入权限字符串"
                clearable
                style="width: 240px"
                @clear="getRoleList"
            />
          </el-form-item>
          <el-button style="margin-left: 20px" type="primary" :icon="Search" @click="getRoleList">搜索</el-button>
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


  <!--角色管理列表-->
  <el-table
      border :header-cell-style="{background:'#F8F8F9',color:'#363D4B'}"
      :data="roleList"
      style="width: 100%"
      v-loading="loading"
      row-key="id"
  >
    <el-table-column prop="id" label="id"  align="center"/>
    <el-table-column prop="name" label="角色名称"  align="center"/>
    <el-table-column prop="roleKey" label="角色权限字符串"  align="center"/>
    <el-table-column prop="status" label="角色状态（0正常 1停用）"  align="center"/>

    <el-table-column prop="remark" label="备注"  align="center"/>

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
        <el-button  class="coperate_btn" type="text"    @click="handleEditRole(scope.row)">编辑</el-button>
        <el-button  class="coperate_btn" type="text"    @click="handleDelRole(scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <div style="display: flex;justify-content:center;background-color: #fff;">
    <!--    用户列表页码-->
    <pagination
        v-show="roleList_total > 0"
        :total="roleList_total"
        v-model:page="data.queryParams.pageNum"
        v-model:limit="data.queryParams.pageSize"
        @pagination="getRoleList"
    />
  </div>


  <!--   新增用户角色对话框-->
  <el-dialog
      v-model="dialogVisibleAddRole"
      title="新增角色"
      width="40%"
      :before-close="handleClose"
      @close="addRoleDialogClosed"

  >
    <!--      内容展示区域-->
    <div style="    height: 50vh;overflow:auto;">
      <el-form label-width="120px" ref="formAddRef" :model="roleForm.addForm" >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色权限字符串" prop="roleKey">
          <el-input v-model="roleForm.addForm.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色状态（0正常 1停用）" prop="status">
          <el-input v-model="roleForm.addForm.status"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleForm.addForm.remark"></el-input>
        </el-form-item>


      </el-form>
    </div>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancleAddRoleInfo">取消</el-button>
      <el-button type="primary" @click="commitAddRoleInfo"
      >提交</el-button
      >
    </span>
    </template>
  </el-dialog>


  <!--   编辑用户角色对话框-->
  <el-dialog
      v-model="dialogVisibleEditRole"
      title="编辑角色"
      width="40%"
      :before-close="handleClose"
      @close="editRoleDialogClosed"

  >
    <!--      内容展示区域-->
    <div style="    height: 50vh;overflow:auto;">
      <el-form label-width="120px" ref="formEditRef" :model="roleForm.editForm" :rules="Rules">
        <el-form-item label="角色id" prop="id" >
          <el-input v-model="roleForm.editForm.id" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色权限字符串" prop="roleKey">
          <el-input v-model="roleForm.editForm.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色状态（0正常 1停用）" prop="status">
          <el-input v-model="roleForm.editForm.status"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleForm.editForm.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancleEditRoleInfo">取消</el-button>
      <el-button type="primary" @click="commitEditRoleInfo"
      >提交</el-button
      >
    </span>
    </template>
  </el-dialog>



</div>
</template>

<script setup>
/**
 * 角色管理组件
 */


import {AddUser, DelUser, UpdateUser, UserList} from "../../api/Account/Account";
import {  Plus, Edit, Share, Delete, Search, Upload,Refresh } from '@element-plus/icons-vue'
import {parseTime} from "../../utils/ruoyi.js"; //引入时间格式化工具
import {onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {AddRole, DelRole, RoleList, UpdateRole} from "../../api/Role/Role";
/*****数据区域*********/
const loading = ref(false)
//角色列表
const roleList=ref([])
//总的角色数量
const roleList_total=ref(0)
const data =reactive({

  //获取用户列表请求的参数
  queryParams:{
    pageNum:1,
    pageSize:10,
    name:'',
    roleKey:''
  },
})
//控制新增角色对话框
const dialogVisibleAddRole = ref(false)
//控制编辑角色对话框
const dialogVisibleEditRole = ref(false)
const formAddRef= ref(null)
const formEditRef= ref(null)
//要提交显示的表单信息_平台
const roleForm = reactive({
  editForm:{
    id:'',
    name:'',
    roleKey:'',
    status:'',
    remark:'',
  },
  addForm:{
    name:'',
    roleKey:'',
    status:'',
    remark:'',

  }
})


/**************/




/****函数方法区域*********/

//获取用户列表
const getRoleList=()=>{
  //提交数据
  loading.value=true //开启加载
  const param ={
  }
  param.pageNum=data.queryParams.pageNum
  param.pageSize=data.queryParams.pageSize

  if(data.queryParams.name){
    param.name=data.queryParams.name
  }
  if(data.queryParams.roleKey){
    param.roleKey=data.queryParams.roleKey
  }
  RoleList(param).then(res=>{
    if(res.code===200){
      // ElMessage({
      //   message: "获取请求日志列表成功",
      //   type: 'success',
      //   showClose: true,
      //   duration: 1000,
      // })
      roleList.value=res.data.rows
      roleList_total.value=parseInt(res.data.total)
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
  dialogVisibleAddRole.value=true
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
const addRoleDialogClosed=()=>{
  //清空表单
  //清空信息
  formAddRef.value.resetFields()
}

//关闭对话框：取消新增角色
const cancleAddRoleInfo=()=>{
  //清空表单
  // formAddRef.value.resetFields()
  //清空信息
  //关闭弹出框
  dialogVisibleAddRole.value=false

}
// 提交 新增角色按钮
const commitAddRoleInfo=()=>{
  //提交数据
  const param ={
  }

  //存在名称，才加入，防止提交空
  if(roleForm.addForm.name){
    param.name=roleForm.addForm.name
  }
  if(roleForm.addForm.roleKey){
    param.roleKey=roleForm.addForm.roleKey
  }
  if(roleForm.addForm.status){
    param.status=roleForm.addForm.status
  }
  if(roleForm.addForm.remark){
    param.remark=roleForm.addForm.remark
  }
  AddRole(param).then(res=>{
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
      getRoleList()
      dialogVisibleAddRole.value=false
    }else {
      ElMessage({
        message: res.msg,
        type: 'error',
        showClose: true,
        duration: 1000,
      })
      //跳出

    }
  })}
//监听：编辑对话框关闭：清空表单，还原警告
const editRoleDialogClosed=()=>{
  //清空表单
  //清空信息
  formEditRef.value.resetFields()
}


//点击编辑按钮：编辑角色信息
const handleEditRole=(row)=>{
  //填充表单信息
  roleForm.editForm.id=row.id
  roleForm.editForm.name=row.name
  roleForm.editForm.roleKey=row.roleKey
  roleForm.editForm.status=row.status
  roleForm.editForm.remark=row.remark
  //打开编辑 对话框
  dialogVisibleEditRole.value=true
}

//关闭对话框：取消编辑角色
const cancleEditRoleInfo=()=>{
  //清空表单
  // formAddRef.value.resetFields()
  //清空信息
  //关闭弹出框
  dialogVisibleEditRole.value=false

}

// 提交 编辑角色按钮
const commitEditRoleInfo=()=> {
  //提交数据
  const param = {}
  param.id = roleForm.editForm.id
  //存在名称，才加入，防止提交空
  if (roleForm.editForm.name) {
    param.name = roleForm.editForm.name
  }
  if (roleForm.editForm.roleKey) {
    param.roleKey = roleForm.editForm.roleKey
  }
  if (roleForm.editForm.status) {
    param.status = roleForm.editForm.status
  }
  if (roleForm.editForm.remark) {
    param.remark = roleForm.editForm.remark
  }
  UpdateRole(param).then(res => {
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
      getRoleList()
      dialogVisibleEditRole.value = false
    } else {
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

//点击删除按钮：删除用户
const handleDelRole=(row)=>{
  //弹出是否确认删除
  ElMessageBox.confirm('确认删除用户：'+row.name)
      .then(() => {
        const param ={

        }
        param.id=row.id
        DelRole(param).then((res =>{
          if (res.code === 200) {
            ElMessage({
              message: res.msg,
              type: 'success',
              showClose: true,
              duration: 1000,
            })
            //更新列表
            getRoleList()
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
  getRoleList()
})
/**************/
</script>

<style lang='less' scoped>

</style>
