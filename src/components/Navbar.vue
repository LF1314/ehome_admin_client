<template>
    <div class="Header_eraper">
         <el-menu
            background-color="#545c64"
             text-color="#fff"
           >
               <el-menu-item index="home">
                   <template>
                        <router-link to="/home/index">首页</router-link>
                   </template>
                </el-menu-item>
                <el-submenu index='0'>
                            <template slot="title">管理员管理</template>
                            <el-menu-item-group>
                                    <router-link to="/home/adminlist">
                                        <el-menu-item index="home/adminlist">
                                             管理员列表
                                        </el-menu-item>
                                    </router-link> 
                                    <router-link to="/home/addadmin">
                                            <el-menu-item index="1-2">
                                               添加管理员
                                            </el-menu-item>
                                    </router-link>
                            </el-menu-item-group>
                </el-submenu>
                 <el-submenu index='1'>
                            <template slot="title">新闻管理</template>
                            <el-menu-item-group>
                                  
                                    <router-link to="/home/newlist">
                                              <el-menu-item index="home/new">
                                                 新闻列表
                                             </el-menu-item>
                                    </router-link>
                                    <router-link to="/home/addnews">
                                           <el-menu-item index="2-2">
                                                  添加新闻
                                            </el-menu-item>
                                    </router-link>
                            </el-menu-item-group>
                </el-submenu>
                  <el-submenu index='3'>
                            <template slot="title">轮播图管理</template>
                            <el-menu-item-group>
                                  
                                    <router-link to="/home/bannerlist">
                                              <el-menu-item index="home/banerlist">
                                                 轮播图列表
                                             </el-menu-item>
                                    </router-link>
                                    <router-link to="/home/addbanner">
                                           <el-menu-item index="3-2">
                                                  添加轮播图
                                            </el-menu-item>
                                    </router-link>
                            </el-menu-item-group>
                </el-submenu>
         </el-menu>
    </div>
</template>
<script>
export default
{
}   
</script>
<style scoped lang ='scss'>
.Header_eraper{
    height: 100vh;
    background-color: #545c64;
    .el-menu{
        border-right: none;
        .el-submenu .el-menu-item{
            min-width: 0px;
        }
    }
}
.router-link-active{
    color: #cff520;
}

</style>

















