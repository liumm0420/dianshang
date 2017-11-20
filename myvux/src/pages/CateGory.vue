<template>
  <div class="home" v-cloak>
      <header>
             <a href="#/"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>商品分类</h4>           
      </header>
      <div class="wrap">
          <aside>
            <ul>
                <li v-for="cate in cates">{{cate}}</li>
            </ul>
        </aside>
        <div class="imgWrap">
            <img src="../assets/sou.jpg" alt="">
            <div class="figwrap">
                <h4>手机</h4>
                <figure v-for="good in goods"><a :href="'#/good/'+ good._id">
                    <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
                    <figcaption>{{good.good_name}}</figcaption></a>
                </figure>
    
            </div>
            <div class="figwrap">
                <h4>电视</h4>
                <figure v-for="good in goodtv"><a :href="'#/good/'+ good._id">
                    <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
                    <figcaption>{{good.good_name}}</figcaption></a>
                </figure>
            </div>
             <div class="figwrap">
                <h4>电脑</h4>
                <figure v-for="good in comp"><a :href="'#/good/'+ good._id">
                    <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
                    <figcaption>{{good.good_name}}</figcaption></a>
                </figure>
            </div>
             <div class="figwrap">
                <h4>智能</h4>
                <figure v-for="good in mind"><a :href="'#/good/'+ good._id">
                    <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
                    <figcaption>{{good.good_name}}</figcaption></a>
                </figure>
             
            </div>
            
        </div>
        
      </div>
      
      <tabbar class="tab">
      <tabbar-item link="/">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item selected link="/category">
        <i slot="icon" class="fa fa-file-text-o"></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item link="/shopcart" v-if="isTrue" v-cloak>
        <i slot="icon" class="fa fa-shopping-cart"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/fabu" v-if="!isTrue" v-cloak>
        <i slot="icon" class="fa fa-edit"></i>
        <span slot="label">发布</span>      
      </tabbar-item>
      <tabbar-item link="/userinfo">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import { Tabbar,TabbarItem } from 'vux';
  import axios from 'axios'
export default {
  data:function(){
      return {
          cates:['新品','手机','电视','电脑','智能','家电','路由','耳机'],
          goods:{},
          goodtv:{},
          mind:{},
          comp:{},
          isTrue:true,
          isShow:true,
      }
  },
  components:{
      Tabbar,
      TabbarItem
    },
    mounted:function(){
        this.getgood();
        this.getgoodtv();
        this.getmind();
        this.getcomp();
        this.panduan()
    },
    methods:{
        getgood:function(){
          var that = this;
          axios.get('/mi/phone',{
              params:{
                  cate:'手机'
              }
          }).then((result)=>{
              console.log(result);
              that.goods = result.data.allgood;
            //   that.goodleft = result.data.goodleft;
              return that.goods;
          }).catch((err)=>{
              console.log(err);
          })
      },
      getgoodtv:function(){
          var that = this;
          axios.get('/mi/tv',{
              params:{
                  cate:'电视'
              }
          }).then((result)=>{
              console.log(result);
              that.goodtv = result.data.allgood;
            //   that.goodleft = result.data.more;
              return that.goodtv;
          }).catch((err)=>{
              console.log(err);
          })
      },
      getmind:function(){
          var that = this;
          axios.get('/mi/mind',{
              params:{
                  cate:'智能'
              }
          }).then((result)=>{
              console.log(result);
              that.mind = result.data.allgood;
              return that.mind;
          }).catch((err)=>{
              console.log(err);
          })
      },
      getcomp:function(){
          var that = this;
          axios.get('/mi/com',{
              params:{
                  cate:'电脑'
              }
          }).then((result)=>{
              console.log(result);
              that.comp = result.data.allgood;
              return that.comp;
          }).catch((err)=>{
              console.log(err);
          })
      },
      panduan:function(){
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
}
</script>
<style scoped>
header{
    background: pink;
    padding: 5px 10px;
    border-bottom: solid 1px #ccc;
    position: fixed;
    top: 0;
    width: 100%;
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
.wrap{
    overflow: hidden;
    padding-top:45px; 
}
.wrap aside{
    width: 20%;
    float: left;
    border-right: solid 1px #eee;
    text-align: center;
    position: fixed;
    left: 0;
}
.wrap aside ul li{
    padding: 15px 0;
    font-size: 14px;
    color: #757575;
    list-style: none;
}
.imgWrap{
    padding: 15px 14px;
    width: 70%;
    float:right;
}
.imgWrap > img{
    width: 100%;
    height: 80px;
}
.figwrap{
    overflow: hidden;
}
.figwrap h4{
    text-align: center;
    color: #444;
    font-weight: 500;
    margin: 20px 0;
}
figure{
    width: 33%;
    float: left;
    text-align: center;
}
figure img{
    width: 50px;
    height: 65px;
}
figure figcaption{
    font-size: 12px;
    color: #757575;
}
[v-cloak]{
display: none !important;
} 
</style>
