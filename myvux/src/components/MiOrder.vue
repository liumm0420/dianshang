<template>
  <div v-cloak>
      
      <mi-empty  v-if="!isShow">全部订单 </mi-empty>
      <div v-if="isShow">
          <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>全部订单</h4>
          </header>
          <div class="shop" v-for="(cart,ins) in order_list">
          <img :src="'http://192.168.13.237:2222/images/' + cart.pic_url[0]" alt="">
          <div class="cart">
            <span>{{cart.good_name}}</span>
            <p>数量： {{cart.cart_num}} 件</p>
            <p>总价： <span>{{cart.good_price * cart.cart_num}}</span> 元</p>
            <a :href="'#/order/'+ cart._id"><button>立即评价</button></a>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import MiEmpty from './MiEmpty'
import axios from 'axios'
export default {
  data:function(){
      return {
          order_list:'',
          isShow:true,
          user:'',
      }
  },
  components:{
      MiEmpty,
  },
  mounted:function(){
      this.queren()
  },
  methods:{
      queren:function(){
          var that = this;
          axios.get('/mi/').then(function(result){
              console.log(result.data.user);
              if(result.data.error ==0 ){
                  that.user = result.data.user;
                  that.order_list = result.data.user.order_list;
                  if(result.data.user.order_list.length == 0){
                      that.isShow = false;
                  }else{
                      that.isShow = true;
                  }
              }else{
                  that.isShow = false;
              }
          }).catch(function(err){
              console.log(err);
          })
      },
  }
}
</script>
<style scoped>
[v-cloak]{
    display: none !important;
}
header{
    background: pink;
    padding: 5px 10px;
    border-bottom: solid 1px #ccc;
}
header img{
    width: 25px;
}
header h4{
    width: 58%;
    float:right;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
}
.shop{
  overflow: hidden;
  padding: 15px;
  border-bottom: solid 1px #eee;
}
.shop img{
  float: left;
  width: 80px;
  height: 90px;
}
.shop .cart{
  width: 65%;
  float: right;
  color: #757575;
  font-size: 14px;
}

.cart p{
	color: #333;
}
button{
    float: right;
    border: none;
    background: pink;
    padding: 5px 10px;
    border-radius: 5px;
    color: #f5f5f5;
}
</style>
