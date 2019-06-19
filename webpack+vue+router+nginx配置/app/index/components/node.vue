
<style lang='stylus'>
  .node-container
    width 100%
</style>

<template>
  <div class="node-container">
    <h1>欢迎来到node类书籍</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        msg: '我是node组件'
      }
    },
    methods: {
      
    }
  }
</script>