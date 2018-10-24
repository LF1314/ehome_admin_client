<template>
    <div class="bannerlist_wraper">
         <el-card>
               <div slot="header">
                     轮播图列表
               </div>
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
                                prop="type.category"
                                label="分类"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                label='索引'
                                width='100'
                                prop='index'
                                >
                            </el-table-column>
                            <el-table-column
                                label='是否显示'
                                width='100'
                                >
                                <div slot-scope="scope">
                                    {{scope.row.status == 1 ? '显示' :'不显示'}}
                                </div>
                            </el-table-column>
                            <el-table-column
                                prop="imgUrl"
                                label="头图"
                                width="160">
                                <template slot-scope="scope">
                                    <img :src="scope.row.imgUrl" class="bannerimg" alt="">
                                </template>
                            </el-table-column>
                                <el-table-column
                                label="操作"
                                >
                                <template slot-scope="scope">
                                    <el-button type='primary' @click="editbanner(scope.row._id)" size='mini'>编辑</el-button>
                                    <el-button type ='danger' size='mini'>删除</el-button>
                                </template>
                            </el-table-column>
          
               </el-table>
         </el-card>
    </div> 
</template>

<script>
export default {
  name: "banerlist",
  data() {
    return {
      bannerlist: []
    };
  },
  methods: {
    getbannerlist() {
      this.$axios.get("/banner").then(res => {
        console.log(res);
        this.bannerlist = res.data;
      });
    },
    editbanner(id) {
      this.$router.push({ name: "editbanner", query: { id: id } });
    }
  },
  created() {
    this.getbannerlist();
  }
};
</script>


<style scoped lang ='scss'>
.bannerlist_wraper {
  padding: 20px;
}
.bannerimg {
  width: 50px;
  height: 50px;
  border-radius: 6px;
}
</style>
