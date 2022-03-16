<template>
  <div class="login" >
    <el-row>
      <el-col :span="2" >
        <br>
      </el-col>
      <el-col :span="10" >
        <el-row style="height: 10vh">
          <br>
        </el-row>
        <el-row style="height: 80vh;background-color: #FFFFFF;border-radius: 20px 0 0 20px; opacity:0.8;">
          <!--左侧内容-->
          <el-row style="height: 20.8vh;width: 100vw;">
            <!--reem-logo-->
            <div  class="reem-logo">
              <br>
            </div>
            <br>
          </el-row>
          <el-row  style="height: 44vh;width: 100vw;">
            <!--中间Logo-->
            <el-col :span="2" style="height: 44vh;"> <br></el-col>
            <el-col :span="20 " class="login-left-logo"> <br></el-col>
            <el-col :span="2" style="height: 44vh;"> <br></el-col>
          </el-row>
          <el-row style="height: 15.2vh;width: 100vw;">
            <br>
          </el-row>
        </el-row>
        <el-row style="height: 10vh">
          <br>
        </el-row>
      </el-col>
      <el-col :span="10" >
        <el-row style="height: 10vh">
          <br>
        </el-row>
        <el-row style="height: 80vh;background-color: #FFFFFF;border-radius: 0 20px 20px 0;opacity:0.8;">

          <el-row style="height: 18vh;width: 100vw;">
            <br>
          </el-row>
          <el-row style="height: 62vh;width: 100vw;">
            <br>
            <el-col :span="5" style=""> <br></el-col>
            <el-col :span="14" style="">
              <!--心血管自主神经系统-->
              <el-row style="height:4vh;  justify-content: center;">
                <span class="title-font">vue3.2+vite2后台管理系统</span>
              </el-row>
              <el-row style="height:12vh;">
                <br>
              </el-row>
              <el-row style="justify-content: center">
                <el-form :model="loginForm"
                           ref="loginFormRef"
                         style="height:48vh;"
                         :rules="loginFormRules">
                  <el-form-item prop="userName" style="width: 100%;height:5vh;justify-content: center">
                    <el-input
                        clearable
                        size="large"
                        v-model="loginForm.userName"
                        placeholder="请输入登录名称"
                    >
                      <template #prefix >
                        <el-icon style="margin:auto" class="iconfont icon-yonghu"></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password" style="width: 100%;height:5vh;">
                    <el-input
                        class="pwd_input"
                        show-password
                        size="large"
                        clearable
                        v-model="loginForm.password"
                        placeholder="请输入登录密码"
                    >
                      <template #prefix >
                        <el-icon style="margin:auto" class="iconfont icon-3"></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>


                  <el-form-item  prop="validCode">
                      <el-row>
                        <el-col :span="14">
                          <el-input clearable size="large"
                                    @keyup.enter.native="submitLoginForm"
                                    class="validCode" prefix-icon="el-icon-key"
                                    v-model="loginForm.validCode"
                                    style="width: 100%;"
                                    placeholder="请输入验证码">
                            <template #prefix >
                              <el-icon style="margin:auto" class="iconfont icon-yanzhengma"></el-icon>
                            </template>
                          </el-input>
                        </el-col>
                        <el-col :span="2"><br></el-col>
                        <el-col :span="8">
                          <div style="background-color: #a9e6ff;border-radius:3px">
                            <ValidCode @input="createValidCode" />
                          </div>
                        </el-col>
                      </el-row>

                  </el-form-item>

                  <el-form-item  style="width: 100%;height:3vh;">
                    <el-checkbox v-model="loginForm.rememberMe" style="width: 100%;height:3vh;">记住密码</el-checkbox>
                  </el-form-item >

                  <el-form-item style="width: 100%;height:3vh;">
                    <el-button size="large" style="width: 100%" type="primary" @click="submitLoginForm" class="btns-denglu">登录</el-button>
                  </el-form-item>
                </el-form>


              </el-row>


            </el-col>
            <el-col :span="5" style=""> <br></el-col>

          </el-row>
        </el-row>
        <el-row style="height: 10vh">
          <br>
        </el-row>
      </el-col>
      <el-col :span="2" >
          <br>
      </el-col>
    </el-row>
<!--    <div>123</div>-->
  </div>

</template>

<script  setup >
import { ElMessage } from 'element-plus'
import ValidCode from '../../components/ValidCode/ValidCode.vue' //引入验证码组件
import {reactive, ref} from "vue";
import { onMounted, onUnmounted } from 'vue'
import {Login} from '../../api/login.js'
// import {useRouter} from 'vue-router'
import {
  CircleCheck,
  Search,
  Unlock,
   UserFilled,
} from '@element-plus/icons-vue'
import router from '../../router'


onMounted(() => {
  //从loclstroage获取用户密码,初始化
  //为空判断（不能进行序列化)
  // console.log(localStorage.getItem("reemUserPwd"))
  const  str_reemUserPwd=localStorage.getItem("reemUserPwd")
  if(str_reemUserPwd==""||str_reemUserPwd==null||str_reemUserPwd==undefined){
    console.log("本地没有数据")
    return
  }else{
    const reemUserPwd=JSON.parse(localStorage.getItem("reemUserPwd"))
    console.log(reemUserPwd)

    // if(reemUserPwd.password){
      // if(reemUserPwd.userName){
        // 如果有用户名，密码
        // loginForm = reemUserPwd

        loginForm.userName=reemUserPwd.userName
        loginForm.password=reemUserPwd.password
        loginForm.rememberMe=reemUserPwd.rememberMe
        console.log("记住密码：加载3个数据成功")
      // }

    // }
  }
})

// const router = router
  /**
   * 登录业务逻辑
   * @type {UnwrapNestedRefs<{password: string, validCode: string, rememberMe: boolean, userName: string}>}
   */
  //登录表单数据
  const loginForm = reactive({
    userName:'',
    password:'',
    validCode:'',
    rememberMe: false, //记住密码

  })

  //登录表单数据验证
  const loginFormRules= reactive({
    userName: [// 验证用户名是否合法
      { required: true, //必填字段
        message: '请输入登录名称',
        trigger: 'blur' }, // 失去焦点时触发
      { min: 1,
        max: 10,
        message: '长度在 1 到 10 个字符',
        trigger: 'blur' },// 失去焦点时触发
    ],
    password: [ // 验证密码是否合法
      { required: true,
        message: '请输入登录密码',
        trigger: 'blur' }, // 失去焦点时触发
      { min: 1,
        max: 15,
        message: '长度在 1 到 15 个字符',
        trigger: 'blur' }// 失去焦点时触发
    ],
    validCode: [ // 验证密码是否合法
      { required: true,
        message: '请输入验证码',
        trigger: 'blur' }, // 失去焦点时触发
      { min: 1,
        max: 4,
        message: '长度在 1 到 4 个字符',
        trigger: 'change' }// 失去焦点时触发
    ]
  })
  const  loginFormRef = ref(null)


  //登录按钮提交 表单信息
  const submitLoginForm= ()=>{
    // 表单登录之前预验证
   loginFormRef.value.validate(async (valid) => {
      //记住密码的逻辑
     if(loginForm.rememberMe ===true){
       localStorage.setItem("reemUserPwd",JSON.stringify(loginForm))
     }else {

     }
      if (!valid) {
        // 预验证失败
        alert("预验证失败,表单信息有误，请检查")
        return //拦截
      }
     if(loginForm.validCode.toLowerCase() !== validCode.value.toLowerCase()) {
       ElMessage.error('验证码错误')
       // console.log("验证码错误")
       return
     }

      //预验证通过
      // console.log("表单预校验验证成功")

     //登录之前要删除本地的session中的token
     sessionStorage.removeItem("SysUserToken")

     //数据交互(调用utils/api.js请求方法)
     Login(loginForm).then(res => {
       //接受到响应结果
       if(res.code ===200){
         //保存token进入localstorage
         sessionStorage.setItem("SysUserToken",res.data.token)
         //保存用户信息放入store
         //页面跳转:到主页
         ElMessage({
           message: res.msg,
           type: 'success',
           showClose: true,
           duration: 1000,
         })
         router.push('/home');
       }else {
         alert("登录失败")
         //登录失败
       }

     })

    })

  }
const  validCode = ref(null)
// 接收验证码组件提交的 4位验证码
const  createValidCode= (data)=>{
  validCode.value=data
}




</script>
<style lang='less' scoped>
//使用样式穿透
.pwd_input {
  ::v-deep .el-input__icon{
    padding-left: 10px;
  }
}

.login{
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/login-background.jpg");
  background-size: cover;//---把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉

}
.login-left-logo{
  //690 408
  background-size: 100% 100% ;
  background-image: url('../../assets/images/login-left-logo.svg');
  //background-size: 100% no-repeat;//---把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉
}
.reem-logo{

  //margin-top: 2.7vh;
  //margin-left: 2.6vh;
  ////
  ////width: 5vw;
  ////height: 2vh;
  //width: 80px;
  //height: 22.5px;
  ////background-size: 100% 100%;//
  //background-size: cover;
  //background-image: url('../../assets/images/reem-logo.png');
}

.title-font{
  height:4vh;
  font-size: 1.5vw;
  font-weight :bold;
}
@media screen and (min-width: 801px) and (max-width: 941px) {
  .login-left-logo {
    height: 164.46px;
    margin-top: 60px;
  }
}
@media screen and (min-width: 942px) and (max-width: 1028px) {
  .login-left-logo {
    height: 193.2px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1029px) and (max-width: 1109px) {
  .login-left-logo {
    height: 211.1px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1110px) and (max-width: 1189px) {
  .login-left-logo {
    height: 227.7px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1190px) and (max-width: 1289px) {
  .login-left-logo {
    height: 244.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1290px) and (max-width: 1310px) {
  .login-left-logo {
    height: 264.6px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1311px) and (max-width: 1391px) {
  .login-left-logo {
    height: 284.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1392px) and (max-width: 1472px) {
  .login-left-logo {
    height: 304.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1473px) and (max-width: 1553px) {
  .login-left-logo {
    height: 324.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1554px) and (max-width: 1634px) {
  .login-left-logo {
    height: 344.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1635px) and (max-width: 1715px) {
  .login-left-logo {
    height: 364.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1716px) and (max-width: 1796px) {
  .login-left-logo {
    height: 384.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1797px) and (max-width: 1877px) {
  .login-left-logo {
    height: 404.3px;
    margin-top: 31px;
  }
}
@media screen and (min-width: 1878px) and (max-width: 1920px) {
  .login-left-logo {
    height: 424.3px;
    margin-top: 31px;
  }
}



</style>
<!--<style lang='less' scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/login-background.png");
  background-size: cover;//-&#45;&#45;把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉

}
.login-left-logo{
  //690 408
  background-size:100% 100%;
  background-image: url('../../assets/images/login-left-logo.png');
  //background-size: 100% no-repeat;//-&#45;&#45;把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉
}
.reem-logo{

  margin-top: 2.7vh;
  margin-left: 2.6vh;
  //
  //width: 5vw;
  //height: 2vh;
  width: 103px;
  height: 29px;
  //background-size: 100% 100%;//
  background-size: cover;
  background-image: url('../../assets/images/reem-logo.png');
}

.title-font{
  height:4vh;
  font-size: 1.5vw;



}



</style>-->
