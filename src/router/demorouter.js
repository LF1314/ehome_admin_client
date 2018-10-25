//有关移动端的相关路由

const demrotuer =[
    {
        //添加移动端用户
        path:'adddemouser',
        name:'adddemouser',
        meta:{index:8},
        component:()=>import('@demo/demouser/adddemouser')
    },
    {
        //移动端用户列表
        path:'demouserlist',
        name:"demouserlist",
        meta:{index:9},
        component:()=>import('@demo/demouser/demouserlist')
    }
]
export default demrotuer