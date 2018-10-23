<template>
    <div class="Header_eraper clearfix">
                   <el-breadcrumb separator="/" class="fl">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                      <el-dropdown class="fr">
                             <div class="userimg_wraper fl">
                                  <img :src="$store.state.userinfo.avatar" height="100%" v-if="$store.state.userinfo" alt="">
                             </div>
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                 <router-link to="/home/index">
                                   <el-dropdown-item>返回首页</el-dropdown-item>
                                 </router-link>
                                <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>  
                            </el-dropdown-menu>
                        </el-dropdown>

    </div>
</template>
<script>
export default
{
    name:'Header',
    methods:{
        //退出登录
        loginout()
        {
            console.log('..')
            if(this.$store.state.userinfo)
            {
                         this.$axios.get('/admin/logout').then(res=>{
                if(res.code == 200)
                {
                    this.$message.success({message:res.msg})
                    this.$store.commit('CHANGEUSERINFO',null)
                    setTimeout(()=>{
                        this.$router.push("/login")
                    },500)
                }
            })
            }else{
                this.$message.error("登陆状态失效")
                    setTimeout(()=>{
                        this.$router.push("/login")
                    },500)
            }
    
        }
    }
}
    
</script>
<style scoped lang ='scss'>
.Header_eraper{
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    width: 100%;
}
.el-breadcrumb{
    line-height: 50px;
}
.userimg_wraper{
    height: 40px;
    width: 40px;
    margin: 5px;
    box-sizing: border-box;
    border-radius: 50%;
    overflow: hidden;
}
</style>

















