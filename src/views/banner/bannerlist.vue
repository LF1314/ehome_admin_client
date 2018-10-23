<template>
    <div class="bannerlist_wraper">
         <el-card>
               <el-table 
                 border
                 :data ='bannerlist'
                  style="width: 100%"
               >
                    <el-table-column
                        prop="title"
                        label="标题"
                        width="180">
                     </el-table-column>
                      <el-table-column
                            prop="type"
                            label="分类"
                            width="180">
                        </el-table-column>
                       <el-table-column
                            prop="imgurl"
                            label="头图"
                            width="100">
                        </el-table-column>
                            <el-table-column
                            label="操作"
                            width="150">
                            <template>
                                <el-button type='primary'>编辑</el-button>
                                <el-button type ='danger'>删除</el-button>
                            </template>
                        </el-table-column>
          
               </el-table>
         </el-card>
    </div> 
</template>

<script>
    export default
    {
        name:'banerlist',
        data(){
            return{
                bannerlist:[]
            }
        },
        methods:{
         getbannerlist(){
             
         }
        }
    }
</script>


<style scoped lang ='scss'>
.bannerlist_wraper{
    padding: 20px;
}
</style>
