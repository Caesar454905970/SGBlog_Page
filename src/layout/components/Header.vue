<template>
  <!--头部内容区域 Header-->
  <el-header>
    <div style="height: 50px;line-height: 50px;display: flex;border-bottom: 1px solid #eeeeee">
      <div style="width: 200px;font-size: 20px;font-weight:bold;padding-left: 20px ">后台管理系统</div>

      <div style="flex: 1"></div>

      <!--下拉菜单-->
      <div style="width: 140px">
        <el-dropdown>
            <span class="el-dropdown-link">
              <!--头像-->
              <el-avatar :size="40" :src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F15%2F20200215151942_iyvmq.thumb.1000_0.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645252208&t=6cc3de560cb40e0cbfd809669925dbcc'"></el-avatar>
              成强
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click="Logout" >退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script setup>
/**
 *   <!--头部内容区域 Header-->
 */
//引入图标库
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  ArrowDown,
} from '@element-plus/icons-vue'
import router from "../../router";
import {ElMessage} from "element-plus";
import {logout} from '../../api/login'
const Logout=()=>{
  console.log("我点击了退出")
  //删除sessionStorage中的token
  window.sessionStorage.removeItem("SysUserToken")
  router.push(('/'))
  console.log(window.sessionStorage.getItem("SysUserToken"))
  //toekn失效
  logout().then(res => {
    if(res.code ===200){
      ElMessage({
        message: res.msg,
        type: 'success',
        showClose: true,
        duration: 1000,
      })


    }

  })
}

</script>

