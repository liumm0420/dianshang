<template>
  <div>
      <mi-empty v-if="!isShow">待收货 </mi-empty>
      <div v-if="isShow">
          <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>待收货</h4>
          </header>
          <div class="shop" v-for="(cart,ins) in way_list">
          <img :src="'http://192.168.13.237:2222/images/' + cart.pic_url[0]" alt="">
          <div class="cart">
            <span>{{cart.good_name}}</span>
            <p>数量： {{cart.cart_num}} 件</p>
            <p>总价： <span>{{cart.good_price * cart.cart_num}}</span> 元</p>
            <button @click="queren(ins)">确认收货</button>
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
          way_list:'',
          isShow:true,
          shop_cart:''
      }
  },
  components:{
      MiEmpty,
  },
  mounted:function(){
      this.addpay();
  },
  methods:{
      addpay:function(){
          var that = this;
          axios.get('/mi/').then(function(result){
              console.log(result.data.user.way_list);
              if(result.data.error ==0 ){
                  that.way_list = result.data.user.way_list;
                  if(result.data.user.way_list.length == 0){
                      that.isShow = false;
                  }else{
                      that.isShow = true;
                  }
                  
              }else{
                  
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      queren:function(ins){
          alert('已成功收貨')
          var that = this;
          axios.post('/mi/queren',{
              way_list:that.way_list,
              ins:ins
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  location.reload();
              }
          }).catch(function(err){
              console.log(err);
          })
      }
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