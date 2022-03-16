<template>

  <!--右部内容区域 ：组件 -->
  <el-main>
    <div style="flex: 1">
      <router-view />
    </div>
  </el-main>
</template>

<script setup>
/**
 *   <!--右部内容区域 ：组件 -->
 */
//引入图标库
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  ArrowDown,
} from '@element-plus/icons-vue'
</script>

