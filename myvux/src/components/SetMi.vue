<template>
  <div class="home">
      <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>个人设置</h4>          
      </header>
      <a href="#/address"><div class="addr">
          
              <p>地址管理</p>
              <img src="../assets/dayu.png" alt="">
          
      </div></a>
      <footer>
          <button @click="tuichu($event)" type="submit">退出账户</button>
      </footer>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data:function(){
      return {

      }
  },
  methods:{
      tuichu:function(ev){
          ev.preventDefault();
          axios.get('/mi/quit').then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  location.href = '/'
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
.addr{
    overflow: hidden;
    padding: 5px 10px;
    border-bottom:solid 1px #ddd; 
}
.addr p{
    float: left;
    color: #333;
}
.addr img{
    width: 10px;
    float: right;
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
