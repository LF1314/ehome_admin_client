//添加移动端用户
<template>
    <div class="demoadduser_wraepr">
           <el-card class="el-cardss">
               <div slot="header">
                     注册移动端用户
               </div>
               <el-form
                        :rules="rules" 
                         ref="ruleForm" 
                        :model='userdata'
                        label-width="100px" 
                        >
                   <el-form-item 
                    label='用户头像'
                    prop='avurl'
                   >
                       <template>
                           <pic v-model="userdata.avurl"></pic>
                       </template>
                   </el-form-item>
                   <el-form-item
                   label='用户名'
                   >
                       <el-input v-model="userdata.username"></el-input>
                   </el-form-item>
                       <el-form-item
                   label='身份证号'
                   prop='idcard'
                   
                   >
                       <el-input v-model="userdata.idcard"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='姓名'
                   >
                       <el-input v-model="userdata.leaderson"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='家乡'
                   >
                       <el-input v-model="userdata.hometown"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='民族'
                   prop ='nation'
                   >

                       <el-input v-model="userdata.nation"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='家庭住址'
                   prop='adress'
                   >
                       <el-input v-model="userdata.adress"></el-input>
                   </el-form-item>
                     <el-form-item label='生日' prop="birthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="userdata.birthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                      <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="userdata.sex">
                            <el-radio :label='1' >男</el-radio>
                            <el-radio :label='0' >女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                     <el-form-item
                   label='密码'
                   prop='pass'
                   >
                       <el-input type='password' v-model="userdata.pass"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='电话'
                   prop='phone'
                   >
                       <el-input v-model="userdata.phone"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='微信号'
                   prop='wxnum'
                   >
                       <el-input v-model="userdata.wxnum"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='扣扣号'
                   prop='qqNum'
                   >
                       <el-input v-model="userdata.qqNum"></el-input>
                   </el-form-item>
                     <el-form-item
                   label='职业'
                   prop ='jobrank'
                   >
                       <el-input v-model="userdata.jobrank"></el-input>
                   </el-form-item>
                       <el-form-item
                   label='教育'
                   prop ='education'
                   >
                       <el-input v-model="userdata.education"></el-input>
                   </el-form-item>
                    
                     <el-form-item
                   label='工资'
                   >
                       <el-input v-model="userdata.salery"></el-input>
                   </el-form-item>
                   <el-form-item
                   label='当前身份'
                   prop = 'partyIdentity'
                   >
                         <el-select v-model="userdata.partyIdentity" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in options"
                            :key="index+1"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                   </el-form-item>
                   <el-form-item
                   >
                       <el-button type='primary' @click="adduserdemo('ruleForm')">
                           添加用户
                       </el-button>
                   </el-form-item>

               </el-form>
           </el-card>
    </div>
</template>

<script>
import pic from '../../components/Uploadimg'    
export default
{
    name:'adddemouser',
    components:{
        pic
    },
    data(){
        return{
            userdata: {
                avurl:'',
                adress:'',
                age:0,
                birthday:'',
                branchName:'',
                leaderson:'',
                phone:'',
                qqNum:'',
                salery:0,
                nation:'',
                sex:0,
                hometown:'',
                wxnum:'',
                jobrank:'',
                education:'',
                pass:'',
                username:'',
                partyIdentity:'',
                idcard:''
            },
            options:[
                        {
                value:'1',
                label: '党员'
                }, {
                value:'2',
                label: '预备党员'
                }, {
                value:'3',
                label: '积极分子'
                }, {
                value:'4',
                label: '小白'
                }
            ],
            rules:{
                   pass:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                        ],
                    idcard:[
                        { required: true, message: '请输入身份证号', trigger: 'blur' }
                    ]
            }
            
        }
    },
    methods:{
        // 添加移动端用户
        adduserdemo(ruleForm){
            console.log(ruleForm)
             this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/demouser/add',this.userdata).then(res=>{
                console.log(res)
                if(res.code==200){
                    this.$message.success({message:res.msg})
                    this.$router.push('/home/demouserlist')
                }
            })
          } else {
            this.$message.error('缺少必填字段');
            return false;
          }
        });
        }
    }
}
</script>

<style scoped lang ='scss'>
.demoadduser_wraepr{
    padding: 20px;
    .el-cardss{
        padding-right: 400px;
    }
}

</style>
