<template>
  <div>
    <el-card >
      <div>

        <el-table border  :data="userList" style="width: 100%" >
          <el-table-column prop="name" label="角色名称" width="180" />
          <el-table-column prop="roleKey" label="roleKey" width="180" />
          <el-table-column prop="status" label="角色状态（0正常 1停用）" />
          <el-table-column prop="delFlag" label="delFlag" />
          <el-table-column prop="createBy" label="createBy" />
          <el-table-column prop="createTime" label="createTime" />
          <el-table-column prop="updateBy" label="updateBy" />
          <el-table-column prop="updateTime" label="updateTime" />
          <el-table-column prop="remark" label="remark" />
        </el-table>

        <pagination
            v-show="total > 0"
            :total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="getRoleList"
        />
      </div>
    </el-card >
  </div>
</template>

<script setup>
/**
 * 角色管理
 */
import {
  CircleCheck,
  Search,
  Unlock,
  UserFilled,

} from '@element-plus/icons-vue'
import pagination from '../../../components/Pagination/index.vue'
import {onMounted, reactive, ref, toRefs} from "vue";
import {listRole} from "../../../api/system/role";
const userList = ref([]); //用户列表
const total = ref(0);
const data =reactive({
  queryParams:{
    pageNum:1,
    pageSize:10,
  }
})
const { queryParams } = toRefs(data);
onMounted(() => {
  getRoleList()
})
const getRoleList = ()=>{
  listRole(data.queryParams).then(res =>{
    userList.value=res.data.records
    total.value =res.data.total
  })
}
</script>

<style lang='less' scoped>



</style>

