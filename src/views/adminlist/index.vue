<template>
    <div class="admin_wraper">
          <el-card>
                 <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="用户名"
                    width="100"
                    prop='userName'
                    >
    
                    </el-table-column>
                     <el-table-column
                    label="昵称"
                    prop = 'nickName'
                    >
                    </el-table-column>
                       <el-table-column
                      label="性别"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.sex == 1 ? '男' : '女'}}</span>
                    </template>
                    </el-table-column>
                     <el-table-column
                    label="手机号"
                    width="180"
                    prop= 'phone'
                    >
                    </el-table-column>
                    <el-table-column
                    label="头像"             
                    >
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" class="tableimg" alt="">
                    </template>
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="editadmin(scope.row.userName)"
                      >编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="removeadmin(scope.row._id)"
                      >删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
          </el-card>
    </div>
</template>
<script>
    export default
    {
        name:"adminlist",
        data(){
            return{
                tableData:[],
                loading:false
            }
        },
        methods:{
            getdata(){
                this.loading = true
                this.$axios.get('/admin').then(res=>{  
                    res.admins.forEach((el,index) => {
                        if(el.userName == this.$store.state.userinfo.userName){
                            res.admins.splice(index,1)
                        }
                    });
                    this.tableData = res.admins
                    this.loading = false
                })
            },
            //删除管理员
            removeadmin(id)
            {
               this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {  
                        this.$axios.delete('/admin/del',{id}).then(res=>{
                            if(res.code == 200){
                                this.$message.success({message:res.msg})
                                this.getdata()
                            }else{
                                this.$message.error(res.msg)
                            }
                        })
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
            },
            //编辑管理员信息
            editadmin(name){
                 this.$router.push({name:'editadmin',params:{userName:name}})
            }
           },
        created() {
            this.getdata()
        },
    }
</script>

<style scoped lang ='scss'>
.admin_wraper{
    color: #666;
    padding: 20px;
}
.tableimg{
    height: 50px;
    width: 50px;
    border-radius: 5px;;
}
</style>
