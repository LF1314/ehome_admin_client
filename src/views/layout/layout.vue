<template>
    <div class="layout_wraper">
          欢迎来到党建一家后台首页
          历史上的今天
          <div v-html="content">

          </div>
    </div>
</template>
<script>
    export default
    {
        name:"homeindex",
        data(){
            return{
                content:''
            }
        }
    }
</script>

<style scoped lang ='scss'>
.layout_wraper{
    color: #666;
    padding: 20px;
}
</style>
