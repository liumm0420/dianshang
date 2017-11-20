<template>
  <div class="home">
      <div class="top">
        <img src="../assets/milogo.png" alt="">
        <h3>小米账号登录</h3>
        
      </div>
      <form action="">
          <input type="text" name="username" v-model="username" id="" placeholder="邮箱/账号">
          <input type="password" name="password" v-model="password" id="" placeholder="密码"><br>
          <button @click="denglu($event)" type="submit">登录</button>
      </form>
      <div class="foot">
          <a href="#/zhuce">没有账号,去注册</a>
          <p class="mess" style="color:red;fontsize:16px;">{{message}}</p>
          <p>
              小米公司版权所有-京ICP备10046444-
              <img src="../assets/ghs.png" alt="">
              京公网安备11010802020134号-京ICP证110507号
          </p>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data:function(){
      return {
          username:'',
          password:'',
          message:'',
          user:{}
      }
  },
  methods:{
      denglu:function(ev){
          ev.preventDefault();
          var that = this;
          axios.post('/mi/login',{
                 username:this.username,
                 password:this.password
          }).then(function(result){
              console.log(result.data.data);
              that.user = result.data.data;
              if(result.data.error == 0){
                  if(that.username == 'aaaaaa'){
                      that.message = '欢迎商家登录~'
                  }else{
                    that.message = result.data.message;     
                  }
                  setTimeout(function(){
                    location.href = '#/';
                  },2000)
				  
              }else{
                  that.message = result.data;
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
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 50px 0;
    /* background: #; */
}
.home > div{
    height: 100%;
}
.top img{
    width: 50px;
}
.top h3{
    line-height: 70px;
    font-weight: 500;
}
input{
    width: 82%;
    height: 40px;
    font-size: 18px;
    border: none;
    padding: 0 10px;
    border: solid 1px #eee;
    background: rgba(255, 255, 255, 0.5)
}
input:first-child{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: none;
}
input:nth-child(2){
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
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
}
.foot{
    margin: 0 auto;
    padding: 20px 0;
}
.foot a{
    font-size: 16px;
    text-decoration: none;
    color: #33b4ff;
}
.foot p{
    font-size: 14px;
    display: block;
    padding: 0 10px;
    margin-top: 30px;
    color: #757575;
}

.mess{
  color: red;
  text-align: center;
  background: #fff;
  margin-top: 10px;
  font-size: 16px;
  padding: 2px;
}
</style>
