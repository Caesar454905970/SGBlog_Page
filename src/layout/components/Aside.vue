<template>

  <!--左侧栏菜单 menu-->
  <el-aside width="200px">
    <div style="width: 200px">
      <el-menu

          style="height: calc(100vh - 51px)"
          default-active="/home"
          router
      >
        <!--一级菜单-->
        <el-sub-menu :index="item.id + '' " v-for="item in menu_Side_list" :key="item.id">
          <!--一级菜单的模板区-->
          <template #title>
            <!--图标-->
            <i :class="item.icon"></i>
            <!--文本-->
            <span>{{ item.menuName }}</span>
          </template>

          <!--二级菜单-->
          <el-menu-item :index="subItem.path"
                        v-for="subItem in item.children"
                        :key="subItem.ID"
                        @click="saveNavState(subItem.path)">
            <template #title>
              <!--图标-->
              <i class="el-icon-menu"></i>
              <!--文本-->
              <span>{{ subItem.menuName }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
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
import {computed, onMounted, reactive, ref, shallowRef} from "vue";
import {useRoute} from "vue-router";
import {getMenuList, getRouters} from "../../api/Login/login";

/************数据************/
//存放左侧菜单数据
const menu_Side_list=ref([])
const route = useRoute();
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
// 被激活的链接地址

/*const activePath = computed(() => {
  //判断当前路由是否为一级路由：菜单，如果是，直接放行
  //如果当前路由是二级路由：返回父级菜单的一级路由的path:meta.activeMenu
  const { meta, path } = route;
  // console.log("activeMenu:",meta.activeMenu)
/!*  if(meta.activeMenu){
    return meta.activeMenu;
  }*!/
  // console.log("要跳转的路由",path)
  return  path
})*/
/************函数方法************/
const saveNavState=(path)=>{
  // activePath.value=path
}

/************初始化************/
//初始化
onMounted(() => {
  // console.log("**************")
  // console.log("route",route)
  getMenuList().then(res=>{
    menu_Side_list.value=res.data
    sessionStorage.setItem("getMenuList",JSON.stringify(res.data))
    // console.log("请求回来的动态路由",res)
  })


})

</script>

