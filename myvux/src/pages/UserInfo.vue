<template>
  <div class="home">
      <div v-if="isShow" class="head"> 
          <a href="#/touxiang"><img :src="'http://192.168.13.237:2222/images/' + user.touxiang" alt=""></a>
          <p>
              <a href="#/setting">{{user.username}}</a>
          </p>
          <!-- {{user}} -->
      </div>
      <div v-if="!isShow" class="head">
          <img src="../assets/default.png" alt="">
          <a href="#/login"><span>登录/注册</span></a>
       </div>
      <div class="order">
      	<a v-if="!isShow" href="#/login"><p>
              <span>我的订单</span>
              <strong>全部订单<img src="../assets/dayu.png" alt=""></strong>
          </p></a>
          <a v-if="isShow" href="#/order"><p>
              <span>我的订单</span>
              <strong>全部订单<img src="../assets/dayu.png" alt=""></strong>
          </p></a>
          <a  v-if="!isShow" href="#/login"> <figure>
              <img src="../assets/money.png" alt="">
              <figcaption>
                    待付款
              </figcaption>
          </figure></a>
         <a  v-if="isShow" href="#/pay"> <figure>
              <img src="../assets/money.png" alt="">
              <figcaption>
                    待付款
              </figcaption>
          </figure></a>
          <a  v-if="!isShow" href="#/login"><figure>
              <img src="../assets/gou.png" alt="">
              <figcaption>
                  待收货  
              </figcaption>
          </figure></a>
          <a  v-if="isShow" href="#/shou"><figure>
              <img src="../assets/gou.png" alt="">
              <figcaption>
                  待收货  
              </figcaption>
          </figure></a>
          <figure>
              <img src="../assets/tui.png" alt="">
              <figcaption>
                  退修换
              </figcaption>
          </figure>
      </div>
      <div class="set">
          <a href="#/heart"><i style="color:red;margin-left:3px;" class="fa fa-heart"></i>
          <p>
              <span>我的收藏</span>
              <img src="../assets/dayu.png" alt="">
          </p></a>
      </div>
      <div class="set">
          <a href="#/message"><i style="color:red;margin-left:3px;" class="fa fa-commenting-o"></i>
          <p>
              <span>消息通知</span>
              <img src="../assets/dayu.png" alt="">
          </p></a>
      </div>
      <div class="set">
          <div class="service">
            <img src="../assets/fuwu.png" alt="">
            <p>
              <span>服务中心</span>
              <img src="../assets/dayu.png" alt="">
            </p>
          </div>
          <div class="service">
            <img src="../assets/mihome.png" alt="">
            <p>
              <span>小米之家</span>
              <img src="../assets/dayu.png" alt="">
            </p>
          </div>
      </div>
      <div class="set setting">
      	<a v-if="!isShow" href="#/login"><img src="../assets/setting.png" alt="">
          <p>
              <span>设置</span>
              <img src="../assets/dayu.png" alt="">
          </p></a>
          <a  v-if="isShow" href="#/setting"><img src="../assets/setting.png" alt="">
          <p>
              <span>设置</span>
              <img src="../assets/dayu.png" alt="">
          </p></a>
      </div>
      <tabbar class="tab">
      <tabbar-item link="/">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/category">
        <i slot="icon" class="fa fa-file-text-o"></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item link="/shopcart" v-if="isTrue">
        <i slot="icon" class="fa fa-shopping-cart"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/fabu" v-if="!isTrue">
        <i slot="icon" class="fa fa-edit"></i>
        <span slot="label">发布</span>      
      </tabbar-item>
      <tabbar-item selected link="/userinfo">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
    
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
// import XmFoot from '../components/XmFoot'
import axios from 'axios'
import { Tabbar,TabbarItem } from 'vux';
export default {
  data:function(){
      return {
        isShow:true,
        user:{},
        isTrue:true,
        isCun:true
      }
  },
  components:{
      Tabbar,
      TabbarItem
    },
    mounted:function(){
        var that = this;
        axios.get('/mi/').then(function(result){
            console.log(result);
            if(result.data.error == 0){
                if(result.data.user.username == 'aaaaaa'){
                    that.isTrue = false;
                }else{
                    that.isTrue = true;
                }
                that.isShow = true;
                that.user = result.data.user
                
                
            }else{
                that.isShow = false;                
            }
        }).catch(function(err){
            console.log(err);
        })
    }
}
</script>
<style scoped>
.home{
    background: #eeeeee;
    height: 450px;
}
.head{
    background: url('../assets/back.png') no-repeat;
    background-size: 100%;
    background-color:pink; 
    /* height: 100px; */
    padding: 20px;
}
.head{
    overflow: hidden;
}
.head img{
    width: 50px;
    height: 50px;
    float: left;
    border: solid 2px pink;
    border-radius: 50%;
    margin-right: 10px;
}
.head p{
    margin-top: 10px;
    padding-left: 20px;
}
.head p a{
    display: block;
    color: #f9f9f9;
}
.head p a:first-child{
    font-size: 18px;
}
.head span{
    color: #fff;
    display: block;
    margin-top: 15px;
}
.order{
    overflow: hidden;
    background: #fff;
}
.order p{
    overflow: hidden;
    padding: 10px 15px;
    border-bottom: solid 1px #ddd;
}
.order p span{
    float: left;
    font-size: 14px;
    color: #333333;
}
.order p strong{
    float: right;
    font-size: 14px;
    font-weight: normal;
    color: #757575;
}
.order p strong img{
    width: 8px;
    position: relative;
    top: 2px;
    left: 5px;
}
figure{
    width: 33%;
    float: left;
    padding: 10px 0;
    text-align: center;
}
figure img{
    width: 25px;
    /* position: relative; */
    /* left: -10px; */
}
figcaption{
    font-size: 14px;
    color: #555555;
}
.set{
    overflow: hidden;
    margin-top: 10px;
    background: #fff;
    padding: 10px 20px;
}
.setting{
    margin-bottom: 60px;
}
.service:first-child p{
    padding-bottom: 10px;
    border-bottom: solid 1px #ddd;
}
.service:first-child{
    padding-bottom: 10px;
}
.service:last-child{
    padding-top: 5px;
}
.service img{
    width: 25px;
    position: relative;
    top: 2px;
}
.set a > img{
    width: 25px;
    position: relative;
    top: 2px;
}
.set p{
    float: right;
    overflow: hidden;
    width: 88%;
    height: 30px;
}
.set p span{
    float: left;
    font-size: 14px;
    color: #555555;
    position: relative;
    top: 4px;
}
.set p img{
    float: right;
    width: 9px;
    position: relative;
    top: 8px;
}
.tab i.fa{
  font-size: 20px;
}
.tab span{
  font-size: 14px
}
.tab{
  width: 100%;
  position: fixed;
  bottom: 0;
}
/* .small{
    position: relative;
    font-size: 10px;
    border: solid 1px pink;
    background: pink;
    padding: 0 5px;
    border-radius: 50%;
    color: #fff;
    left: 40px;
    top:-20px;
} */
[v-cloak] { display: none }
</style>
