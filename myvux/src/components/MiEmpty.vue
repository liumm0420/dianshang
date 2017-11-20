<template>
  <div class="home">
      <header>
             <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4><slot></slot> </h4>
            <!--<i class="fa fa-search"></i>-->            
      </header>

        <div class="wrap">
            <img src="../assets/kong.png" alt=""><br>
            <span class="quan">全部商品</span><span class="jing">精选商品</span>
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
      <tabbar-item link="/shopcart">
        <i slot="icon" class="fa fa-shopping-cart"></i>
        <span slot="label">购物车</span>
        
      </tabbar-item>
      <tabbar-item selected link="/userinfo">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
    
      </tabbar-item>
    </tabbar>
      
  </div>
</template>
<script>
import { Tabbar,TabbarItem } from 'vux';
import axios from 'axios';
export default {
  data:function(){
      return {

      }
  },
  components:{
      Tabbar,
      TabbarItem
    },
  methods:{
      
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
    width: 61%;
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
.tab{
    position: fixed;
    bottom: 0;
}
.wrap{
    width: 100%;
    margin-top: 60px;
    text-align: center;
}
.wrap img{
    width: 100px;
    margin-bottom: 20px;
}
.wrap span{
    
    padding: 15px 20px;
    
}
.jing{
    background: pink;
    color: #fff;
}
.quan{
    background:#eee;
}
</style>