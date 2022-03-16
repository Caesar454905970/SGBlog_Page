<template>

  <!--左侧栏菜单 menu-->
  <el-aside width="200px">
    <div style="width: 200px">
      <el-menu
          style="height: calc(100vh - 51px)"
          default-active="/home"
          router
      >

        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/home">
            <el-icon><component :is="name"></component></el-icon>
            <span>主页</span>
          </el-menu-item>

          <el-menu-item index="/SysUser">
            <el-icon><icon-menu /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/sysRole">
            <el-icon><icon-menu /></el-icon>
            <span>角色管理</span>
          </el-menu-item>
        </el-sub-menu>

<!--        <el-menu-item index="2">-->
<!--          <el-icon><icon-menu /></el-icon>-->
<!--          <span>菜单二</span>-->
<!--        </el-menu-item>-->
      </el-menu>
    </div>
  </el-aside>
</template>

<script setup>
/**
 *   <!--左侧栏菜单 menu-->
 */
//引入图标库
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  ArrowDown, Apple,
} from '@element-plus/icons-vue'
import {reactive, ref,shallowRef} from "vue";

//定义左侧动态菜单的数据：
const  items = reactive([
  { title: '首页',url:'/home'},
  { title: '用户管理',url:'/'},
  { title: '角色管理',url:'/'},
  { title: '权限管理',url:'/'},
  { title: '设备管理',url:'/'},


])

//定义图标
const name =shallowRef(Apple) //定义变量的值

</script>

