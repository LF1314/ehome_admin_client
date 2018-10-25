<template>
    <div class="demouer_list_wraper">
         <el-card>
             <div slot="header">
                 用户列表
             </div>
                  <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="用户名"
                    width="100"
                    prop='username'
                    >
                    </el-table-column>
                     <el-table-column
                    label="昵称"
                    prop = 'leaderson'
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
                    prop= 'phone'
                    >
                    </el-table-column>
                    <el-table-column
                    label="民族"
                    prop= 'nation'
                    >
                    </el-table-column>
                 <el-table-column
                    label="家乡"
                    prop= 'hometown'
                    >
                    </el-table-column>
                    <el-table-column
                    label="薪资"
                    prop= 'salery'
                    >
                    </el-table-column>
                    <el-table-column
                    label="头像"             
                    >
                    <template slot-scope="scope">
                        <img :src="scope.row.avurl" class="tableimg" alt="">
                    </template>
                    </el-table-column>
                    <el-table-column label="操作"  width='150'>
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
        name:"demouserlist",
        data(){
            return {
              loading:false,
              tableData:[]
            }
        },
        methods:{
            //获取移动端用户列表
            getdemolist(){
                this.$axios.get('/demouser').then(res=>{
                    // console.log(res.data)
                    this.tableData = res.data
                })
            }
        },
        created() {
            this.getdemolist()
        },
    }
</script>

<style scoped lang='scss'>
.tableimg{
    width: 50px;
    height: 50px;
    border-radius: 4px;
}
.demouer_list_wraper{
    padding: 20px;
}
</style>
