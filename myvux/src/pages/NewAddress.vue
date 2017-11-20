<template>
  <div class="home">
      <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>新增地址</h4>          
      </header>
      <!-- <div class="addr"> -->
          <form action="">
              <p> 收货人：<input type="text" placeholder="真实姓名" v-model="name"></p>
              <p class=".tell"> 手机号：<input type="text" placeholder="手机号" v-model="tell"></p>
              <!-- <p> 所在地区：<input type="text" placeholder="省市区" v-model="sheng"></p> -->
              <!-- <group> -->
                <x-address :value="getName(value)" title="所在地区：" raw-value v-model="value" :list="addressData"></x-address>
              <!-- </group> -->
              <p> 详细地址：<input type="text" placeholder="详细地址" v-model="address"></p>
          </form>
          <p v-if="isShow" class="mess">{{message}}</p>
      <footer>
          <button @click="save()" type="submit">保存地址</button>
      </footer>
  </div>
</template>
<script>
import axios from 'axios';
import { Group, XAddress, ChinaAddressData ,Value2nameFilter as value2name } from 'vux'
export default {
  data:function(){
      return {
            name:'',
            tell:'',
            sheng:'',
            address:'',
            message:'',
            isShow:false,
            // alue: ['广东省', '中山市', '--'],
            addressData: ChinaAddressData,
            value:[],
            value1:[],
      }
  },
  components: {
    Group,
    XAddress, 
  },
  methods:{
      save:function(){
          var that = this;
          axios.post('/mi/address',{
              name:that.name,
              tell:that.tell,
              value:that.value1,
              address:that.address
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  that.message = result.data.message;
                  that.isShow = true;
                  setTimeout(function(){
                    location.href = '#/address'                
                  },2000)
                  
              }else{
                  that.isShow = false;
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      getName(value){
          this.value1 = value2name(value,ChinaAddressData);
      }
  }
}
</script>
<style scoped>
header{
    background: pink;
    padding: 6px 10px;
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
.tell{
    border-bottom: none;
    margin: 10px 0 10px 10px;
}
form p:first-child{
    margin: 10px 0 10px 15px;
    border-bottom:solid 1px #eee;
}
form p:nth-child(4){
    margin: 10px 0 10px 15px;
    padding: 10px 0;
    border-bottom:solid 1px #eee;
    border-top: solid 1px #eee;
}
form p:nth-child(2){
    margin: 10px 0 10px 15px;
    /* border-bottom:solid 1px #eee; */
}
form input{
    height: 35px;
    width: 60%;
    border: none;
    background: none;
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
.mess{
    background: #fff;
    padding: 10px 0;
    text-align: center;
    color: pink;
    margin-top: 50px;
}

</style>
