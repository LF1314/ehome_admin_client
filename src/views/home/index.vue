<template>
    <div class="home_wraper">
           <el-row>
               <el-col :span ='4'>
                    <Navbar></Navbar>
               </el-col>
             
               <el-col :span="20" class="main_wraper">
                       <div  class="commonheader">
                            <Header></Header>
                       </div>
                    
                      <div class="router-view">
                             <transition :name="transitionName">
                               <router-view></router-view>
                             </transition>
                      </div>
                       
               </el-col>
           </el-row>
    </div>
</template>
<script>
    export default
    {
        name:'homes',
        data(){
            return{
               transitionName:''
            }
        },
        components:{
             
             Header:()=>import('../../components/Header.vue'),
             Navbar:()=>import('../../components/Navbar.vue')
        },
        watch:{
            $route(to,from){
                // console.log(to,from)
                if(to.meta.index > from.meta.index){
                    this.transitionName = 'slide-left';
                }else{
                    this.transitionName = 'slide-right';
                }

            }
        }
    }
</script>
<style scoped lang ='scss'>
.main_wraper{
    overflow-y: scroll;
    height: 100vh;
    overflow: hidden;
}
.router-view{
    overflow-y:scroll;
    height: 80vh; 
    width: 100%;
    position: relative;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 1500ms;
  position: absolute;
  width: calc(100% - 40px);
 
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}


</style>
