import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@views/login/index')

    }
    ,
    {
      path:'/home',
      name:'home',
      redirect:'/home/index',
      component:()=>import('@views/home/index'),
      children:[
        {
          path:'index',
          name:'index',
          meta:{index:0},
          component:()=>import('@views/layout/layout')
        },
        {
          //管理员列表
          path:'adminlist',
          name:'adminlist',
          meta:{index:1},
          component:()=>import('@views/adminlist/index')

        },
        {
          // 添加管理员
          path:'addadmin',
          name:'addadmin',
          meta:{index:2},
          component:()=>import('@views/addadmin')
        },
        {
          //添加新闻
          path:'addnews',
          name:'addnews',
          meta:{index:3},
          component:()=>import('@views/addnews')
        },
        {
          //新闻列表
          path:'newlist',
          name:'newlist',
          meta:{index:4},
          component:()=>import('@views/newlist')
        }

      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  NProgress.start()
   next()
})

router.afterEach((to,from)=>{
  NProgress.done()
})
export default router