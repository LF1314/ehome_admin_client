
// const baseURL = 'api'
 import { Message } from 'element-ui'
import axios from 'axios'
import router from '../router/index'

const xhr = axios.create({
         baseURL:'/api',
        timeout:100000
        
})  

 class axis{
     static get (url , data, methods ='get',config){
        return new Promise((resolve,rejects)=>{
            xhr[methods](url, {params: data} ,config).then(res=>{
                if(res.data.code == 403){
                  Message.info({message:res.data.msg})
                  router.push('/login')
                }
                resolve(res.data)
            }).catch(err=>{
                rejects(err)
            })
          })
     }

     static post (url , data, methods ='post',config){
        return new Promise((resolve,rejects)=>{
            xhr[methods](url, data ,config).then(res=>{
                if(res.data.code == 403){
                    router.push('/login')
                  Message.info({message:res.data.msg})
                }
                resolve(res.data)
            }).catch(err=>{
                rejects(err)
            })
          })
     }

     static delete(url , data , config){
         return this.get(url,data,'delete',config)
     }
 }

 export default axis





















