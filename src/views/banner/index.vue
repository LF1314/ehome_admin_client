<template>
    <div class="addbanner_wraper">
         <el-card class="card_wraper">
             <el-form
              :model='bannerData'
              label-width="100px"
              :rules="rules" 
              ref="ruleForm"
             >
                  <el-form-item 
                  label='轮播头图'
                  prop='imgUrl'
                  >
                      <template>
                          <pic v-model="bannerData.imgUrl"></pic>
                      </template>
                  </el-form-item>

                  <el-form-item
                  label='轮播图标题'
                  prop='title'
                  >
                      <el-input  v-model="bannerData.title"></el-input>
                  </el-form-item>
                  <el-form-item 
                   label='显示轮播图'
                  >
                      <el-switch
                            v-model="bannerData.status"
                            active-value='1'
                            inactive-value='0'
                            active-text="显示"
                            inactive-text="不显示">
                            </el-switch>
                  </el-form-item>
                 <el-form-item label='索引'>
                       <el-input-number size="small" v-model="bannerData.index" :min='1'></el-input-number>
                 </el-form-item>
                  <el-form-item
                   label='分类'
                   prop ='type'
                  >
                   <el-select v-model="bannerData.type" placeholder='请选择分类'>
                       <el-option v-for="(cate,index) in category" :key="index"
                       :label='cate.category'
                       :value='cate._id'
                       @click.native="changedialog(cate._id)"
                       >       
                       </el-option>
                   </el-select>
                  </el-form-item>
                  <el-form-item>
                      <el-button class="addbtn" v-if="!isedit" type='primary' @click="addbanner('ruleForm')">
                          添加轮播图
                      </el-button>
                       <el-button type="primary" v-else size="small" @click="savebaner()">保存修改</el-button>
                  </el-form-item>
             </el-form>
         </el-card>
         <el-dialog title="新闻列表"  width='60%' :visible.sync="dialogTableVisible">
                <el-table :data="newlist"
                     border >
                    <el-table-column property="author.userName" label="作者" width="150"></el-table-column>
                    <el-table-column property="author.nickName" label="笔名" width="100"></el-table-column>
                     <el-table-column property="title" label="标题" width="200"></el-table-column>
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
                        <el-button type="primary"  size="small" @click="addnewid(scope.row._id)">添加</el-button>
                       
                    </template>
                     
                </el-table-column>
                </el-table>
         </el-dialog>
    </div>
</template>
<script>
import pic from '../../components/Uploadimg'
export default
{
    name:'addbanner',
    data(){
       
        return{
            isedit:false,
            newlist:[],
            dialogTableVisible:false,
             category:[],
            bannerData:{
            imgUrl:'',
            newId:'',
            title:'',
            type:'',
            status:'1',
            index:''
        },
        rules:{
            title:[
                { required: true, message:'请输入新闻标题', trigger:'blur' }
            ],
            imgUrl:[
                {required:true ,message:'请上传轮播图头图', trigger:'change'}
            ],
            type:[
                 { required: true, message:'请选择分类', trigger:'change' }
            ]
        }
        }
    },
    components:{
        pic, 
    },
    methods:{
          getcategory(){
                this.$axios.get('/category').then(res=>{
                    this.category = res.category
                })
            },
            changedialog(type){
                this.dialogTableVisible = !this.dialogTableVisible
                this.$axios.get('/news/newtype',{type:type}).then(res=>{
                    this.newlist = res.data
                })
            },
            addnewid(id){
                this.bannerData.newId = id 
                this.dialogTableVisible = false
            },
            //添加轮播图
            addbanner(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                        this.$axios.post('/banner/addbaner',this.bannerData).then(res=>{
                            if(res.code == 200){
                                this.$message.success({message:res.msg})
                                this.$router.push('/home/bannerlist')
                            }
                        })
                } else {
                    this.$message.error('信息填写不完整')
                    return false;
                }
                });
                
            },
            //获取单个轮播图
            getonebaner(){
                let id = this.$route.query.id
                this.$axios.get(`/banner/${id}`).then(res=>{
                    this.bannerData = res.data
                })
            },
            //修改轮播图
            savebaner(){

            }
    },
    watch:{
      $route(val){
          if(val.name == 'editbanner')
          {
              this.isedit = true
          }else
          {
              this.isedit = false
              this.bannerData={
                    imgUrl:'',
                    newId:'',
                    title:'',
                    type:'',
                    status:'1',
                    index:''
              }
          }
      }
    },
    created() {
        this.getcategory()
        
        if(this.$route.name =='editbanner')
        {
            this.getonebaner()
            this.isedit = true
        }
    },
}
    
</script>

<style  scoped lang='scss'>
.addbanner_wraper{
    padding: 20px;
}
.card_wraper{
    padding-right: 400px;
  
}
.addbtn{
    width: 160px;
    margin-top: 20px
}
.new_img{
    height: 50px;
    width: 50px;
    border-radius: 5px;;
}
</style>
