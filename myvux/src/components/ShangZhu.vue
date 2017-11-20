<template>
  <div class="home">
      <div class="top">
        <img src="../assets/milogo.png" alt=""><br>
       <!-- <span class="mai">买家注册</span> <span class="shang">商家注册</span> -->
      </div>
      <form action="">
          <input type="text" name="username" v-model="username" placeholder="用户名/邮箱"><br>
          <input type="password" name="password" v-model="password" id="" placeholder="密码"><br>
          <button @click="zhuce()">注册</button>
          <p class="">{{message}}</p>
      </form>
      
      <a href="#/login">已有账号，去登录</a>
      <p>注册账号即表示您同意并愿意遵守小米 <a href="">用户协议</a>和 <a href="">隐私政策</a> </p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data:function(){
      return {
          username:'',
          password:'',
          message:''
      }
  },
  methods:{
      zhuce:function(){
          var that = this;
          axios.post('/mi/zhuce',{
              params:{
                  username:this.username,
                  password:this.password
              }
          }).then(function(result){
              console.log(result.data);
              that.message = result.data;
              console.log(that.message);
          }).catch(function(err){
              console.log(err);
          })
      }
  }
}
</script>
<style scoped>
.home{
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 50px 0;
}
.home > div{
    height: 100%;
}
.top img{
    width: 50px;
    margin-bottom: 20px;
}
span{
    display: inline-block;
    padding: 6px 35px;
}
.mai{
    background: #33b4ff;
    color: #f9f9f9;
    border-bottom-left-radius:20px; 
    border-top-left-radius:20px;
}
.shang{
    background: #ffffff;
    color: #33b4ff;
    border-bottom-right-radius:20px; 
    border-top-right-radius:20px;
}
input{
    width: 82%;
    height: 40px;
    font-size: 18px;
    border: none;
    padding: 0 10px;
    background: #fff;
    border: solid 1px #ddd;
    border-radius: 15px;
}
input:first-child{
    margin-bottom: 10px;
    margin-top: 10px;
}
button{
    margin-top: 30px;
    width: 85%;
    border: none;
    background: #33b4ff;
    color: #f5f5f5;
    line-height: 40px;
    border-radius: 20px;
    font-size: 18px;
    margin-bottom: 20px;
}
.home > a{
    color: #33b4ff;
}
.home p{
    display: block;
    margin-top: 10px;
    padding: 0 5px;
    font-size: 14px;
    color: #757575;
}
p a{
    color: #333;
    font-weight: 600;
}
</style>

