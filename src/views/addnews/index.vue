<template>
    <div class="addnew_wraepr">
        <el-card>
                <el-form
             label-width="100px" 
             class="demo-ruleForm"
             :model="newsForm"
            >
                 <el-form-item label='新闻头图'>
                     <template>
                          <pic v-model="newsForm.newimg"></pic>
                     </template>
                 </el-form-item>
                <el-form-item label='新闻标题'>
                     <el-input type='text' v-model="newsForm.title"></el-input>
                </el-form-item>
                <el-form-item label='新闻内容'>
                     <template>
                            <quill-editor v-model="newsForm.content"
                                    title="新闻内容"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @change="onEditorChange($event)">
                            </quill-editor>
                     </template>
                </el-form-item>
                 <el-form-item label='分类'>
                        <el-select v-model="newsForm.type" placeholder="新闻类型">
                            <el-option v-for='(cate ,index) in category' :key="index" :label="cate.category" :value="cate._id"></el-option>
                           
                       </el-select>
                </el-form-item>
                  <el-form-item label='作者'>
                        <el-select v-model="newsForm.author" placeholder="新闻作者">
                            <el-option v-for="(admin,index) in adminlist" :key="index" :label="admin.userName" :value="admin._id"></el-option>
                       </el-select>
                </el-form-item>
                <el-form-item>
                     <el-button @click="addnews">
                         添加新闻
                     </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
import pic from '../../components/Uploadimg'
    export default
    {
        
        name:'addnews',
        data(){
            return{
                adminlist:[],
                category:[],
              newsForm:
              {
                    title:'',
                    content:'',
                    contentext:'',
                    newimg:'',
                    type:'',
                    author:''
              },
              token:'',
               editorOption: {
                     modules: {
                         ImageExtend: {  
                             name: 'file',
                             size: 3,  
                             action:'https://upload-z1.qiniup.com', 
                             response: (res) => {
                                 return res.url
                             },
                             headers: (xhr) => {
                             },  
                             change: (xhr, formData) => {
                                  formData.append('token', this.token)
                             } 
                         },
                         toolbar: { 
                             container: container,  
                             handlers: {
                                 'image': function () {  
                                     QuillWatch.emit(this.quill.id)
                                 }
                             }
                         }
                     }
                 }
            }
        },
            components:{
            pic,
            quillEditor
        },
        methods:{
            // 获取新闻文本内容
              onEditorChange({ quill, html, text }) {
              this.newsForm.contentext = text
             }
             ,
              getToken() {
            axios.get("http://upload.yaojunrong.com/getToken").then(res => {
                this.token = res.data.data;
            });
            },
            //获取分类
            getcategory(){
                this.$axios.get('/category').then(res=>{
                    this.category = res.category
                })
            },
            //获取 作者列表
            getauthor(){
                 this.$axios.get('/admin').then(res=>{
                     this.adminlist = res.admins
                 })
            },
            //
            addnews(){
                console.log("..")
              if(this.newsForm && this.newsForm.contentext){
                  this.$axios.post('/news/addnew',this.newsForm).then(res=>{
                      if(res.code == 200)
                      {
                          this.$message.success({message:'添加新闻成功！'})
                          this.$router.push('/home/newlist')
                      }
                  })
              }else{
                  this.$message.error('新闻内容不可以为空')
              }
            
            }
        },
        created() {
            this.getToken()
            this.getcategory()
            this.getauthor()
        },
    }
</script>


<style scoped lang = 'scss'>
.addnew_wraepr{
    padding: 20px;
    
}
.quill-editor{

 /deep/  .ql-container{
    height: 260px;
   }
}

</style>
