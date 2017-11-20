<template>
<div class="headWrap">
  <div class="head">
          <img src="../assets/me.png" alt="">
          <a href="#/search"><input type="text" placeholder="搜索商品名称"></a>
          <i class="fa fa-search"></i>
          <a v-if="isShow" href="#/login">登录</a>
          <a class="pic" v-if="!isShow" href="#/userinfo"><img src="../assets/user.png" alt="">  </a>
  </div>
  <div class="scr">
      <tab style="position:fixed;top:50px;z-index:10;" class="tab" :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list3" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
       
      <!-- <swiper style="padding-top:44px;" v-model="index" height="3000px" :show-dots="false">
        <swiper-item v-for="(item, index) in list3" :key="index"> -->
          <!-- <div class="tab-swiper vux-center">{{item}} Container</div> -->
              <mi-content v-if="index == 0"></mi-content>  
              <mi-phone v-if="index == 1"></mi-phone>
              <mi-zhi v-if="index == 2"></mi-zhi>
              <mi-tv v-if="index == 3"></mi-tv>
              <mi-com v-if="index == 4"></mi-com>
        <!-- </swiper-item>
      </swiper> -->
    </div>
</div>
</template>
<script>
import axios from 'axios'
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import MiPhone from './MiPhone'
import MiContent from './MiContent'
import MiZhi from './MiZhi'
import MiTv from './MiTv'
import MiCom from './MiCom'

export default {
  data:function(){
      return {
          list3:['推荐', '手机', '智能', '电视', '电脑'],
          index:0,
          demo2:'精选',
          user:{},
          isShow:false,
      }
  },
   components: { 
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    MiPhone,
    MiContent,
    MiZhi,
    MiTv,
    MiCom
  },
 
  mounted:function(){
    this.getuser();
  },
  methods:{
    getuser:function(){
       var that = this;
      axios.get('/mi/').then(function(result){
      console.log(result);
      if(result.data.error == 1){
          that.isShow = true;
      }else{
        that.isShow = false;
      }
      return that.isShow;
    }).catch(function(err){
      console.log(err);
    })
    }
  }
}
</script>
<style scoped>
.vux-tab{
  width: 310px;
  padding-right: 10px;
}
.head{
    background: #f5f5f5;
    top: 0;
}
.scr{
  padding-top: 50px;
}
.head{
    position: fixed;
    width: 100%;
    padding: 10px;
    z-index: 10;
    /* position: relative; */
}
.head img{
    width: 28px;
    position: relative;
    top: 7px;
    /* border-radius: 50% */
}
.head input{
    width: 200px;
    height: 28px;
    margin: 0 5px;
    padding-left:25px; 
    border: solid 1px #e5e5e5;
    color: rgba(0,0,0,.3);
}
.head i{
    position: absolute;
    left: 50px;
    top: 16px;
    color: rgba(0,0,0,.3);
}
.head a{
    color: #969696
}
.weui-tabbar__label{
    line-height: 0;
}
.vux-tab .vux-tab-item{
    font-size: 12px;
}
.pic img{
  width:15px;
  position: relative;
  top:5px;
}
.vux-slider{
  height: 3000px;
}
.vux-swiper{
  height: 3000px;
}
</style>
