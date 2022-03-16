<template>

  <div>
    child
<!--    {{props.name}}-->
    <ul>
      <li v-for="(item,index) in props.arr" :key="index">
        {{item}}
      </li>
    </ul>
    <div>
<!--      //子组件传递给父-->
      <button @click="change()"> 子组件按钮</button>
    </div>
  </div>
</template>

<script setup>
  import  {ref} from  'vue'
/*  <!--    //组件传值-->
  <List  :num="num"/>*/
  //父到子，子进行接受
  const props =defineProps({
    // name: Number  值:类型
    arr:{
      type:Array,
      default:()=>[1,2] //默认值
    }
  })


  //子传递参数给父组件（About.vue)
  const emit =defineEmits(['el-child']) //自定义名称
  //子组件传递给父
  const sub =ref('List') //定义 参数
  const change = ()=>{
    emit('el-child',sub.value) //发射的名称，传递的参数
  }
</script>


