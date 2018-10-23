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
                         ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 
                             name: 'file',  // 图片参数名
                             size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                             action:'https://upload-z1.qiniup.com',  // 服务器地址, 如果action为空，则采用base64插入图片
                             // response 为一个函数用来获取服务器返回的具体图片地址
                             // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                             // 则 return res.data.url
                             response: (res) => {
                                 return res.url
                             },
                             headers: (xhr) => {
                             // xhr.setRequestHeader('myHeader','myValue')
                             },  // 可选参数 设置请求头部
                    
                             change: (xhr, formData) => {
                                  formData.append('token', this.token)
                             } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                         },
                         toolbar: {  // 如果不上传图片到服务器，此处不必配置
                             container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
                             handlers: {
                                 'image': function () {  // 劫持原来的图片点击按钮事件
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
                    // console.log(res)
                    this.category = res.category
                })
            },
            //获取 作者列表
            getauthor(){
                 this.$axios.get('/admin').then(res=>{
                    //  console.log(res)
                     this.adminlist = res.admins
                 })
            },
            //
            addnews(){
                // console.log(this.newsForm)
                console.log("..")
              if(this.newsForm && this.newsForm.contentext){
                  this.$axios.post('/news/addnew',this.newsForm).then(res=>{
                      if(res.code == 200)
                      {
                          this.$message.success({message:'添加新闻成功！'})
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
