<template>
  <div class="home">
      <div class="back">
        <a href="#/"><img src="../assets/back_.png" alt=""></a>
    </div>
    <div class="share">
        <a href="" class="right"><img src="../assets/share.png" alt=""></a>
    </div>
     <swiper :threshold="50" height="370px">
      <swiper-item class="black"><h2 class="title fadeInUp animated"><img style="height:370px" :src="'http://192.168.13.237:2222/images/' + good.pic_url[1]" alt=""></h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated"><img style="height:370px" :src="'http://192.168.13.237:2222/images/' + good.pic_url[2]" alt=""></h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated"><img style="height:370px" :src="'http://192.168.13.237:2222/images/' + good.pic_url[3]" alt=""></h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated"><img style="height:370px" :src="'http://192.168.13.237:2222/images/' + good.pic_url[4]" alt=""></h2></swiper-item>   
    </swiper>
    <div class="intr">
        <h4>{{good.good_name}}</h4>
        <p class="jie"><span>{{good.youhui}}
            </span>{{good.introduce}}
        </p>
        <span class="price">￥<i>{{good.good_price}}</i></span>
        <div class="cu">
            <span>促销</span>
            <p class="zeng">
                <span><i>赠品</i>限量送小米活塞耳机清新版</span>
                <span><i>赠品</i>无限流量米粉卡 含100元话费</span>
            </p>
        </div>
        
    </div>
    <div class="chooseWrap">
        <div class="choose">
            <span>已选</span>
            <p>{{good.good_name}}  <span> 星空蓝</span> × 1</p>
            
        </div>
        <p class="tui">支持7天无理由退货</p>
    </div> 
    <div class="reply">
        <a :href="'#/reply/' + good._id" style="color:#333"><p>用户评价(<span>{{good.reply_num}}</span>)</p></a>
    </div>
    <footer>
        <ul v-if="!isShow">
            <li><a href="#/"><i class="fa fa-home"></i> 首页</a></li>
            <li @click="addheart()"><i class="fa fa-heart"></i>收藏</li>
            <li v-if="isCun" @click="add()">加入购物车</li>
            <li v-if="!isCun"><a href="#/login" style="color:#fff;">加入购物车</a></li>
        </ul>
         <span class="remove" v-if="isShow" @click="remove">删除</span>
        <a :href="'#/edit/' + good._id" v-if="isShow" class="edit">编辑</a>
    </footer>
  </div>
</template>
<script>
import axios from 'axios'
const images = ['shouji1.jpg','shouji2.png','shouji3.png','shouji4.png']
import { Swiper,SwiperItem } from 'vux'
export default {
  data:function(){
      return {
          images:images,
          user:'',
          isShow:false,
          good:{pic_url:[]},
          message:'',
          isCun:false,
      }
  },
  components:{
    Swiper,
    SwiperItem
  },
  mounted:function(){
    this.getuser();
    this.getuserid();
  },
  methods:{
      getuser:function(){
      var that = this;
          axios.get('/mi/').then(function(result){
//            console.log(result);
              
                if(result.data.error == 0){
                    if(result.data.user.username == 'aaaaaa'){
                        that.isShow = true;
                    }else{
                        that.isShow = false;
                }
                that.isCun = true;
                that.user = result.data.user
              }else{
                that.isCun = false;
              }
              return that.isShow;
          }).catch(function(err){
              console.log(err);
          })
      },
      getuserid:function(){
          var _id = this.$route.params;
          console.log(_id);
          var that = this;
          axios.get('/mi/xiang',{
              params:{
                  id:_id.id
              }
          }).then(function(result){
//            console.log(result);
              that.good = result.data.good;
              return that.good;
          }).catch(function(err){
              console.log(err);
          })
      },
      remove:function(){
          var _id = this.$route.params;
          console.log(_id);
          var that = this;
          axios.get('/mi/remove',{
              params:{
                  id:_id.id
              }
          }).then(function(result){
//            console.log(result);
              if(result.data.error == 0){
                  that.message = result.data.message;
                  location.href = '#/'
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      add:function(){
          var _id = this.$route.params;
          console.log(_id);
          var that = this;
          axios.post('/mi/add',{
              id:_id.id,
              user:that.user
          }).then(function(result){
//            console.log(result);
              if(result.data.error == 0){
                  alert(result.data.message)
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      addheart:function(){
          console.log('123546');
          var that = this;
          axios.post('/mi/addheart',{
              good:that.good
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                  alert('收藏成功')
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
    background: #efeff0;
    padding-bottom: 50px;
}
swiper-item{
    width: 100%;
    height: 100%;
}
.back{
    position: relative;
}
.back a{
    position: absolute;
    top: 20px;
    left: 15px;
    z-index: 10; 
}
.back a img{
    width: 22px;
}
.share{
    position: relative;
}
.share a{
    position: absolute;
    top: 20px;
    right: 15px;
    z-index: 10; 
}
.share a img{
    width: 22px;
}
.intr{
    padding: 10px 15px;
    background: #fff;
    overflow: hidden;
}
.intr h4{
    font-size: 18px;
    font-weight: 500;
    color: #555;
}
.intr .jie{
    font-size: 12px;
    color: #757575;
}
.intr .jie span{
    color: pink;
}
.intr .price{
    font-size: 18px;
    color: crimson;
}
.intr .price i{
    font-size: 22px;
    font-style: normal;
}
.cu{
    overflow: hidden;
    border-top: solid 1px #eee;
    padding-top: 5px;
    margin-top: 10px;
}
.cu > span{
    padding-top: 4px;
}
.cu span{
    float: left;
    font-size: 12px;
    display: block;
    
}
.cu .zeng{
    width: 82%;
    float:right;
    color: #757575;
    font-size: 12px;
    line-height: 30px;
}
.cu .zeng span i{
    font-style: normal;
    border: solid 1px pink;
    padding: 2px 5px;
    color: pink;
    border-radius: 3px;
    margin-right: 3px;
}
.edit{
    color: #fff;
    background: pink;
    padding: 3px 10px;
    border-radius: 3px;
    width: 44%;
    float: right;
    text-align: center
}
.remove{
    color: #fff;
    background: pink;
    padding: 3px 10px;
    border-radius: 3px;
    display: block;
    width: 43%;
    float: left;
    text-align: center
}
.chooseWrap{
    margin-top: 10px;
    padding:10px 15px;
    background: #fff;
}
.choose{
    overflow: hidden;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: solid 1px #eee;
}
.choose p{
    width: 82%;
    float: right;
}
.tui{
    margin-left: 50px;
    color: #757575;
    font-size: 12px;
}
.reply{
    margin-top: 10px;
    padding:10px 15px;
    background: #fff;
    font-size: 12px;
}
footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
}
footer ul{
    overflow: hidden;
}
footer ul li{
    float: left;
    list-style: none;
    width: 25%;
    padding: 12px 0 5px 0;
    text-align: center;
    position: relative;
    border-right: solid 1px #eee;
}
footer ul li a{
    color: #333;
}
footer ul li:last-child{
    border: none;
    background: pink;
    color: #fff;
    width: 49%;
}
footer ul li i{
    position: absolute;
    top:0px;
    left: 35px;

}
</style>
