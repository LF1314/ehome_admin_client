<template>
    <div class="logn_wraper">
          <div class="loginform_wraper">
               <h2 class="login_titles">
                   党建一家后台管理登陆
               </h2>
                <el-form :v-model="formData"
                >
                        <el-form-item label="用户名">
                            <el-input placeholder = '请输入用户名' v-model="formData.userName"></el-input>
                        </el-form-item>
                         <el-form-item label="密码">
                            <el-input  placeholder = '请输入密码' type='password' v-model="formData.password"></el-input>
                        </el-form-item>
                </el-form>
                 <el-button class="login_btn" type='primary' @click="handlelogin"> 登陆</el-button>
          </div>
    </div>
</template>
<script>
    export default
    {
        name:'login',
        data(){
            return{
                left:'left',
              formData:{
                    userName:'风雪',
                    password:'admin'
              }
            }
        },
        methods:{
            handlelogin(){
                console.log(this.$axios.post)
                this.$axios.post('/admin/login',this.formData).then(res=>{
                    console.log(res)
                    if(res.code == 200)
                    {
                        this.$router.push('/home')
                        this.$message.success({message:res.msg})
                        this.$axios.get('/admin/info',{userName:this.formData.userName}).then(res=>{
                            console.log(res)
                            this.$store.commit('CHANGEUSERINFO',res.userinfo)
                        })
                    
                    }
                    else{
                        this.$message.error({message:res.msg})
                    }
                })
            }
        }
    }
</script>

<style scoped lang = 'scss'>
.login_titles{
    text-align: center;
    color: rgb(187, 148, 148);
}
.logn_wraper{
    height: 100vh;
    background-color: #2d3a4b;
}
.loginform_wraper{
    width: 450px;
    padding: 20px;
    border: 2px solid #5e5454;
    border-radius: 5px;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    /deep/ .el-form-item__label{
        color: #fff;
        
    }
    .el-form-item{
      margin-bottom: 10px;
    }

   /deep/  .el-input__inner{
       background-color: #554a4a;
       color: #fff;
    }
    .login_btn{
        width: 100%;
        box-sizing: border-box;
        margin-top: 22px;
    }
}
</style>



