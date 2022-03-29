<template>
<!--  <div>


    <!-菜单管理列表&ndash;&gt;
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



  </div>-->
</template>

<script setup>/*
/!**
 * 菜单管理
 *!/

import {onMounted} from "vue";
import {RoleList} from "../../api/Role/Role";
import {ElMessage} from "element-plus";
/!*****数据区域*********!/
/!**************!/


/!****函数方法区域*********!/
//获取用户列表
const getMenuList=()=>{
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
/!**************!/



/!****生命周期区域*********!/
//初始化
onMounted(()=>{
  //获取用户列表
  getRoleList()
})
/!**************!/*/
</script>

<style lang='less' scoped>

</style>
