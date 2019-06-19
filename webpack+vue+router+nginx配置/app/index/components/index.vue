
<style lang="stylus">
  
</style>

<template>
  <div id="app">
    <header>
      <router-link to="/home">Home</router-link>
      <router-link to="/java">java</router-link>
      <router-link to="/node">node</router-link>
      <router-link to='/xxx'>XXX</router-link>
    </header>
    <!-- 对应组件的内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        
      }
    }
  }
</script>