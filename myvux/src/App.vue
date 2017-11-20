<template>
  <div class="myapp">
    <router-view></router-view>
    
  </div>
</template>

<script>


export default {
  data:function(){
    return {

    }
  },
  components:{
    
    
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
.myapp{
  position: relative;
  // height: 1800px;
}
</style>
