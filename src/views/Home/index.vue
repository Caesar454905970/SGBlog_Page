<template>
  <div>
    <el-card >
      <div>
        <div style="padding: 10px 0">
          <el-button type="primary" plain @click="load">搜索</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </el-card >
    <el-card>
      vuex的使用测试，接受参数：{{num}}
    </el-card>

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


