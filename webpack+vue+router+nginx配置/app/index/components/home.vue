
<style lang='stylus'>
  .home-container
    width 100%
</style>

<template>
  <div class="home-container">
    <h1>欢迎来到home页面</h1>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      
    }
  }
</script>