// 新闻列表
<template>
    <div class="newlist_wraper">
        <el-card>
           <el-table
                :data="newlistdata"
                v-loading= 'loading'
                border
                style="width: 100%">
                <el-table-column
                prop="title"
                label="新闻标题"
                width="100">
                </el-table-column>
                <el-table-column
                prop="type.category"
                label="分类"
                width="100">
                </el-table-column>
                  <el-table-column
                    prop="author.userName"
                    label="作者"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="author.nickName"
                    label="笔名"
                    width="180">
                </el-table-column>
                <el-table-column
                  label="头图">
                    <template slot-scope="scope">
                            <img :src="scope.row.newimg" class="new_img" alt="">
                    </template>
                </el-table-column>

                <el-table-column
                 label='操作'
                >
                   <template slot-scope="scope">
                        <el-button type='danger'  size="small">删除</el-button>
                        <el-button type="primary" size="small">编辑</el-button>
                    </template>
                     
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
    export default
    {
        name:'newlist',
        data(){
            return{
                newlistdata:[],
                loading:false,
            }
        },
        methods:{
            //获取新闻列表
            getnewlit(){
                this.loading = true
                this.$axios.get('/news').then(res=>{
                    if(res.code == 200){
                         this.newlistdata = res.data
                         this.loading = false
                    }
                   else{
                       this.loading =false
                   }    
                })
            }
        },
        created() {
            this.getnewlit()
        },
    }
</script>


<style scoped lang = 'scss'>
 .newlist_wraper{
     padding: 20px;
   
 }
 .new_img{
     width: 60px;
     height: 60px;
 }
</style>
