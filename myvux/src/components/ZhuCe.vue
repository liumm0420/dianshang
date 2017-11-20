<template>
  <div class="home">
      <div class="top">
        <img src="../assets/milogo.png" alt=""><br>
        
      </div>
      <form action="">
          <input @click="dianji()" type="text" name="username" v-model="username" placeholder="用户名/邮箱"><br>
          <p v-if="isShow" class="tishi">提示：用户名必须以字母开头，长度为6-12</p>
          <input @click="xianshi()" type="password" name="password" v-model="password" id="" placeholder="密码"><br>
          <p v-if="isTrue" class="tishi">提示：密码必须以字母开头，长度为6-12</p>
          <button @click="zhuce($event)" type="submit">注册</button>
      </form>
      
      <a href="#/login">已有账号，去登录</a>
      <p class="mess" style="color:red;">{{message}}</p>
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
          message:'',
          isShow:false,
          isTrue:false
      }
  },
  methods:{
      zhuce:function(ev){
          ev.preventDefault();
          var that = this;
          axios.post('/mi/zhuce',{
                  username:this.username,
                  password:this.password
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  that.message = result.data.message;
                  setTimeout(function(){
                    location.href = '#/login';
                  },2000)
              }else{
                  that.message = result.data;
              }
              console.log(that.message);
          }).catch(function(err){
              console.log(err);
              that.message = '用戶名或密碼不合法';
          })
      },
      dianji:function(){
          console.log(123)
          this.isShow = !this.isShow;
          if(this.isTrue){
              this.isTrue = !this.isTrue;
          }
      },
      xianshi:function(){
          this.isTrue = !this.isTrue;
          if(this.isShow){
            this.isShow = !this.isShow;
          }
          
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
.tishi{
    margin-bottom: 10px;
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
    margin-bottom: 10px;
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
.mess{
  color: red;
  text-align: center;
  background: #fff;
  margin-top: 10px;
  font-size: 16px;
  padding: 2px;
}
</style>

