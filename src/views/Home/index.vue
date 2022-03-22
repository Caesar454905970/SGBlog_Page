<template>
  <div>
    <el-row  :gutter="20">
      <el-col :span="12">
        <el-card >
          <div>
            为了更好的学习和使用vue3中的新特性，包括elementplus+pinia的使用；<br>
            为了更好的学习和使用springboot中的特性，以及鉴权等各种实际开发解决方案，搭建了这个小破站来提升自己的技术；<br>
            感谢bibibi三更老师视频，我都是跟着他的基础视频敲过来的；附上老师的视频地址：<br>
            https://space.bilibili.com/663528522?spm_id_from=333.788.b_765f7570696e666f.2<br>
            目前这个网站项目的前后端源码开源地址：<br>
            https://github.com/Caesar454905970/SGBlog <br>
            https://github.com/Caesar454905970/SGBlog_Page <br>
            后面回定期更新出百度云盘的下载地址：<br>
          </div>
        </el-card >
      </el-col>
      <el-col :span="12">
        <div>
          <el-card>
            <el-timeline>
              <el-timeline-item timestamp="2022/3/22" placement="top">
                <el-card>
                  <h4>Update Github </h4>
                  <p>更新角色管理：
                    角色名称和权限字符串唯一</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2022/3/21" placement="top">
                <el-card>
                  <h4>Update Github </h4>
                  <p>更新用户管理和操作日志管理</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2022/3/19" placement="top">
                <el-card>
                  <h4>Update Github</h4>
                  <p>初始化项目</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-card>

        </div>
      </el-col>
    </el-row>



  </div>


</template>

<script setup>

import {ref} from "vue";
import {useStore} from "vuex"
const store =useStore()
const num =store.state.count
const tableData =ref([])
const loading =ref(false) //默认不加载
const load = ()=>{
  loading.value=true //开启加载
  setTimeout( ()=>{
    tableData.value= [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    loading.value=false //关闭加载
  },1000)


}
//加载数据
// load();
</script>


