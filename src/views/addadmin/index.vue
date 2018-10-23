<template>
    <div>
        <el-card class="addadmin_wraper">
             <el-form :model="addadminForm" label-width="100px" class="demo-ruleForm">
                 <el-form-item label="头像" prop="avatar">
                     <template>
                          <pic v-model="addadminForm.avatar"></pic>
                     </template>
                 </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addadminForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="addadminForm.nickName"></el-input>
                </el-form-item>
                 <el-form-item v-if="show" label="密码" prop="password">
                    <el-input type ='password' v-model="addadminForm.password"></el-input>
                </el-form-item>
                 <el-form-item label="年龄" prop="age">
                     <el-input-number size="small" v-model="addadminForm.age"></el-input-number>
                </el-form-item>
                  <el-form-item label="电话" prop="phone">
                     <el-input  v-model="addadminForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="addadminForm.sex" placeholder="性别">
                    <el-option label="男" value=1></el-option>
                    <el-option label="女" value=0></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="工作" prop="job">
                    <el-select v-model="addadminForm.job" placeholder="工作">
                    <el-option label="前端" value=0></el-option>
                    <el-option label="后端" value=1></el-option>
                    <el-option label="工程师" value=2></el-option>
                    <el-option label="ui" value=3></el-option>
                    </el-select>
                </el-form-item>
    
                <el-form-item label="个性签名" prop="desc">
                    <el-input type="textarea" v-model="addadminForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="show" type="primary" @click="addamin">添加管理员</el-button>
                    <el-button v-else type="primary" @click="editamin">修改管理员</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
                </el-form>
        </el-card>
    </div>
</template>
<script>
import pic from '../../components/Uploadimg'
    export default
    {
        name:'addadmin',
        data(){
            return{
                show:true,
                addadminForm:{
                    userName:'',
                    password:'',
                    nickName:'',
                    desc:'',
                    job:'',
                    sex:'',
                    age:'',
                    phone:'',
                    avatar:''
                }
            }
        },

        watch:{
            $route(val){
            //   console.log(val)
              if(val.name == 'editadmin'){
                  this.$axios.get('admin/info',{userName:val.params.userName}).then(res=>{
                      this.addadminForm = res.data
                  })
              }else{
                   this.show = true
                  this.addadminForm = {
                    userName:'',
                    password:'',
                    nickName:'',
                    desc:'',
                    job:'',
                    sex:'',
                    age:'',
                    phone:'',
                    avatar:''
                  }
              }
            }
        }
        ,
        components:{
            pic
        },
        methods:{
            addamin(){
                console.log(this.addadminForm)
                this.$axios.post('/admin/singup',this.addadminForm).then(res=>{
                    if(res.code == 200){
                        this.$message.success({message:'添加成功'})
                        setTimeout(()=>{
                            this.$router.push('/home/adminlist')
                        },500)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            editamin(){

            }
        },
        created() {
               this.show = true
            if(this.$route.name == 'editadmin'){
                this.show = false;
                   this.$axios.get('admin/info',{userName:this.$route.params.userName}).then(res=>{
                      this.addadminForm = res.userinfo
                    //   console.log(this.addadminForm)
                  })
            }
        },
    }
</script>


<style scoped lang = 'scss'>
.addadmin_wraper{
    margin: 20px;
    padding-right: 400px;
    box-sizing: border-box;
}
</style>
