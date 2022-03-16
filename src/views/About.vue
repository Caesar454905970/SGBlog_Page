<template>
  <div>


<!--    {{obj.id}}-->
<!--    <button @click="name++">{{name}}</button>-->
    <button @click="changeNum()">{{name}}</button>

<!--    //组件传值:单个值-->
<!--    <List  :num="name"/>-->
    <!--    //组件传值:数组-->
<!--    :arr="arr"：传递给子组件的值-->
<!--    @el-child="changeNum1":接受子组件的值-->
        <List  :arr="arr" @el-child="changeNum1"/>
  </div>
</template>

<script setup>
// ref ：变量
//reactive:对象
import List from './List.vue'
import {ref,reactive} from "vue";

  const name =ref(9) //定义变量的值
  const obj =reactive( {id:100})
  const arr =reactive( [10,12.13])
  const  changeNum = (v)=>{//定义函数
    name.value++ //ref改变值要加value
    obj.id++   //对象的值可以直接加
    name.value = v;
  }
  changeNum();//运行函数


  //接受子组件（List.vue）传递过来的值
  const  changeNum1 = (v)=>{
    name.value = v;
  }

</script>

