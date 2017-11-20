<template>
  <div class="home">
      <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>我的收藏</h4>        
      </header>
      <div class="shopcart">
        <div class="shop" v-for="(cart,ins) in user.heart">
          <img :src="'http://192.168.13.237:2222/images/' + cart.pic_url[0]" alt="">
          <div class="cart">
            <span>{{cart.good_name}}</span>
            <p> {{cart.good_intro}} </p>
            <p>￥<span>{{cart.good_price}}</span></p>
          </div>
        </div>
        
      </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data:function(){
      return {
          user:'',
          isShow:false,
          checked:''
      }
  },
  mounted:function(){
      this.getuser();
  },
  methods:{
      getuser:function(){
          var that = this;
          axios.get('/mi/').then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  that.user = result.data.user
              }
          }).catch(function(err){
              console.log(err);
          })
      }
      
  }
}
</script>
<style scoped>
.home{
    padding-bottom: 60px;
}
header{
    background: pink;
    padding: 7px 10px;
    position: fixed;
    top: 0;
    width: 100%;
}
header img{
    width: 25px;
}
header h4{
    width: 65%;
    float:right;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
}
header i.fa{
    position: absolute;
    right: 19px;
    top: 10px;
    color: #757575;
}

footer{
    width: 100%;
    position: fixed;
    bottom: 0;
}
.cart > span{
  color: #000;
  font-size: 18px;
}
.shop{
  overflow: hidden;
  padding: 15px;
  border-bottom: solid 1px #eee;
  margin-top: 50px;
}
.shop img{
  float: left;
  width: 70px;
  height: 80px;
}
.shop .cart{
  width: 65%;
  float: right;
  color: #757575;
  font-size: 14px;
}
.cart > p{
    margin-top: 5px;
    color: palevioletred;
}

</style>