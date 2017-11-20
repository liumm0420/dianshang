<template>
  <div class="foot">
      <tabbar class="tab">
      <tabbar-item selected link="/">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/category">
        <i slot="icon" class="fa fa-file-text-o"></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item link="/shopcart" v-if="!isTrue">
        <i slot="icon" class="fa fa-shopping-cart"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/fabu" v-if="isTrue">
        <i slot="icon" class="fa fa-edit"></i>
        <span slot="label">发布</span>      
      </tabbar-item>
      <tabbar-item link="/userinfo">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar,TabbarItem } from 'vux';
export default {
  data:function(){
    return {
			isShow:false,
			isTrue:true,
			user:''
    }
  },
  components:{
      Tabbar,
      TabbarItem
   },
   mounted:function(){
        var that = this;
        axios.get('/mi/').then(function(result){
            console.log(result);
            if(result.data.error == 0){
                if(result.data.user.username == 'aaaaaa'){
                    that.isTrue = false;
                }else{
                    that.isTrue = true;
                }
                that.isShow = true;
                that.user = result.data.user
            }else{
                that.isShow = false;                
            }
        }).catch(function(err){
            console.log(err);
        })
    }
}
</script scoped>

<style scoped>
.tab i.fa{
  font-size: 20px;
}
.tab span{
  font-size: 14px
}
.foot{
  width: 100%;
  position: fixed;
  bottom: 0;
}

</style>
