<template>
  <div>
      <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>商品评价</h4>
            <!-- <i class="fa fa-search"></i>             -->
      </header>
      <div class="shop">
          <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
          <div class="cart">
            <p>{{good.good_name}}</p>
            <p>{{good.good_intro}}</p>
          </div>
          <textarea v-model="content" name="" id="" cols="38" rows="10"></textarea>
            <button @click="reply()">评价</button>
        </div>
        <p class="mess">
            {{message}}
        </p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data:function(){
      return {
          good:{pic_url:[]},
          isShow:true,
          content:'',
          message:'',
      }
  },
  mounted:function(){
      this.queren();
    //   this.reply();
  },
  methods:{
      queren:function(){
          var id = this.$route.params;
          console.log(id);
          var that = this;
          axios.post('/mi/gain',{
              id:id.id
          })
          .then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  that.good = result.data.good;
              }
          }).catch(function(err){
              console.log(err)
          })
      },
      reply:function(){
          var that = this;
          axios.post('/mi/ping',{
              good:that.good._id,
              content:that.content
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  that.message = '评论成功';
                  setTimeout(function(){
                      location.href = '#/order'
                  },1500)
              }
          }).catch(function(err){
              console.log(err);
          })
      }
  }
}
</script>
<style scoped>
header{
    background: pink;
    padding: 7px 10px;
    /* border-bottom: solid 1px #ccc;*/
}
header img{
    width: 25px;
}
header h4{
    width: 60%;
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
  height: 80px;
}
.shop .cart{
  width: 60%;
  float: right;
  color: #757575;
  font-size: 14px;
}

.cart p{
	color: #333;
    font-size: 20px;
}
.cart p:last-child{
    font-size: 14px;
    color: #757575;
}
textarea{
    margin-top: 30px;
    background: none;
}
button{
    float: right;
    border: none;
    background: pink;
    padding: 5px 10px;
    border-radius: 5px;
    color: #f5f5f5;
}
.mess{
    color: pink;
    font-size: 18px;
    margin-top: 20px;
    background: #fff;
    text-align: center;
    line-height: 40px;
}
</style>
