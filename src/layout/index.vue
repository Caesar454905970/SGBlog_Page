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
<!--  <div>
      &lt;!&ndash;头部内容区域 Header&ndash;&gt;
      <div style="height: 50px;line-height: 50px;display: flex;border-bottom: 1px solid #eeeeee">
        <div style="width: 200px;font-size: 20px;font-weight:bold;padding-left: 20px ">后台管理系统</div>

        <div style="flex: 1"></div>

        &lt;!&ndash;下拉菜单&ndash;&gt;
        <div style="width: 140px">
          <el-dropdown>
            <span class="el-dropdown-link">
              &lt;!&ndash;头像&ndash;&gt;
              <el-avatar :size="20" :src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F15%2F20200215151942_iyvmq.thumb.1000_0.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645252208&t=6cc3de560cb40e0cbfd809669925dbcc'"></el-avatar>
              成强
              <el-icon class="el-icon&#45;&#45;right">
                <arrow-down />
              </el-icon>
            </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
          </el-dropdown>
        </div>
      </div>

      <div style="display: flex">

          &lt;!&ndash;左侧栏菜单 menu&ndash;&gt;
          <div style="width: 200px">
              <el-menu
                  style="height: calc(100vh - 51px)"
                  default-active="/home"
                  router
              >

                <el-sub-menu index="1">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>菜单一</span>
                  </template>
                  <el-menu-item index="/home">
                    <el-icon><icon-menu /></el-icon>
                    <span>主页</span>
                  </el-menu-item>
                  <el-menu-item index="/about">
                    <el-icon><icon-menu /></el-icon>
                    <span>关于</span>
                  </el-menu-item>
                </el-sub-menu>

                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>菜单二</span>
                </el-menu-item>
              </el-menu>
          </div>

          &lt;!&ndash;右部内容区域 &ndash;&gt;
          <div style="flex: 1">
            <router-view />
          </div>

      </div>

  </div>-->
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
