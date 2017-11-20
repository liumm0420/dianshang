<template>
  <div class="home">
      <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>消息通知</h4>        
      </header>
      <div class="shopcart">
        <div class="shop" v-for="message in messages">
          <div class="cart">
            <p v-if="message.atType == 'at'"><span>{{message.user_id.username}}</span> 评价了你的商品<i> {{message.good_id.good_name}} </i></p>
            <p v-if="message.atType == 'zan'"><span>{{message.user_id.username}}</span> 给你点赞了<i> {{message.good_id.good_name}} </i></p>
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
          checked:'',
          messages:''
      }
  },
  mounted:function(){
      this.getuser();
  },
  methods:{
      getuser:function(){
          var that = this;
          axios.get('/mi/message').then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  that.messages = result.data.messages
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
.shopcart{
    padding-top: 50px;
}
.cart  span{
  color: pink;
}
.shop{
  overflow: hidden;
  padding: 15px;
  border-bottom: solid 1px #eee;
}
.cart i{
    color: palevioletred;
    font-style: normal;
}

</style>