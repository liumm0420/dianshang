<template>
  <div v-cloak>
      <mi-empty>待付款 </mi-empty>
      
  </div>
</template>
<script>
import MiEmpty from './MiEmpty'
import axios from 'axios'
export default {
  data:function(){
      return {
          
      }
  },
  components:{
      MiEmpty,
  },
  
}
</script>
<style scoped>
[v-cloak]{
    display: none !important;
}

</style>
