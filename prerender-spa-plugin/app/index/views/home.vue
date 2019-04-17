
<style lang='stylus'>
  .home-container
    width 100%
</style>

<template>
  <div class="home-container">
    <h1>欢迎来到Home</h1>
    <p>{{msg}}</p>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        msg: '我是Home组件'
      }
    },
    methods: {
      
    }
  }
</script>