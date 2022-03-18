<!--后台管理系统首页的框架：头部 左侧 右部内容区域-->
<template>

  <div>
    <el-container >
      <!--左侧栏菜单 menu：组件-->
      <Aside />
      <el-container direction="vertical">
        <!--头部内容区域 Header ：组件-->
        <Header />
        <!--右部内容区域 ：组件 -->
        <Main />
      </el-container>
    </el-container>
  </div>

</template>

<script  setup>
import Aside from './components/Aside.vue'  //导入左侧栏菜单组件
import Header from './components/Header.vue'  //头部内容区域 Header ：组件
import Main from './components/Main.vue'  //右部内容区域 ：组件

//引入图标库
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  ArrowDown,
} from '@element-plus/icons-vue'

</script>
