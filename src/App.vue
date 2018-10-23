<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}
.fl{
  float: left;
}
.fr{
  float: right;;
}
.clearfix::after{
  content:'';
  display: block;
  clear: both;
  width: 100%;

}
a{
  text-decoration: none;
  color: #fff;
}
</style>
