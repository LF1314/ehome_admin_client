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
                      >编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
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
                    console.log(res)
                    this.tableData = res.admins
                    this.loading = false
                })
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
