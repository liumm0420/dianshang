<template>
  <div class="home">
      <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>收货地址</h4>        
      </header>
      <div class="addr" v-for="(address,ins) in user.shop_address">
          <p class="name">
              <span>{{address.name}}</span><span>{{address.tell}}</span> <strong @click="removesite(ins)">删除</strong>
          </p>
          
            <p class="address">{{address.value}}</p>
            <p class="address">{{address.address}}</p>
      </div>
      <footer>
          <a href="#/newadds"><button type="button">新增地址</button></a>
      </footer>
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
      this.showaddr();
  },
  methods:{
      showaddr:function(){
          var that = this;
          axios.get('/mi/').then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  that.isShow = true;
                  that.user = result.data.user;
              }else{
                  that.isShow = false;
              }
          }).then(function(err){
              console.log(err);
          })
      },
      removesite:function(ins){
          console.log(ins);
          var that = this;
          axios.post('/mi/removesite',{
              userId:that.user._id,
              ins:ins
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  location.reload()
              }
          }).then(function(err){
              console.log(err);
          })
      },
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
    /* border-bottom: solid 1px #ccc; */
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
.addr{
    margin-top: 10px;
    padding: 5px 10px;
    border:solid 1px #eee; 
}
.name{
    padding: 3px 5px;
    border-bottom: solid 1px #eee;
    padding-bottom: 5px;
    color: #333;
}
.name span:first-child{
    color: pink;
    font-size: 16px;
     padding-right: 20px;
}
.name strong{
    float:right;
    font-weight: 500;
    color: #333;
}
.address{
    padding: 3px 5px;
    font-size: 14px;
    color: #333;
}
footer{
    width: 100%;
    position: fixed;
    bottom: 0;
}
button{
    width: 100%;
    height: 40px;
    border: none;
    font-size: 16px;
    color: #fff;
    background: pink;
}
</style>
