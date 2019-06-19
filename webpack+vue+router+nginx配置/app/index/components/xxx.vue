
<style lang='stylus'>
  .xxx-container
    width 100%
</style>

<template>
  <div class="xxx-container">
    <h1>欢迎来到xxx</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        msg: '我是XXX组件'
      }
    },
    created() {
      console.log(this.$route.params.id)
    }
  }
</script>