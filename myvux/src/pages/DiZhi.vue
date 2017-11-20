<template>
  
<div>
    <h2>显示</h2>
    <group>
      <x-address title="title" raw-value v-model="value" :list="addressData"></x-address>
    </group>

</div>
</template>
<script> 
import { Group, XAddress, ChinaAddressData } from 'vux'
export default {
   components: {
    Group,
    XAddress, 
  },
  data:function(){
      return {
      value: ['广东省', '中山市', '--'],
      addressData: ChinaAddressData,
      }
  },
  methods:{
    props:function(){

    }
  }
}
</script>
<style>


</style>


