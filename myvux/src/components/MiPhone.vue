<template>
  <div class="home">
      <div class="lun">
            <swiper auto>
                <swiper-item :key="index" v-for="(img,index) in images">
                    <img :src="'../static/' + img" alt="">
                </swiper-item>
            </swiper>
      </div>
      <img class="bao" src="../assets/shou1.png" alt="">
      <div class="picWrap">
          <figure v-for="good in goods"><a :href="'#/good/'+ good._id">
              <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
              <figcaption>
                  <p>
                      <span>{{good.good_name}}</span>
                      <span>￥<i>{{good.good_price}}</i></span>
                  </p>
                  <p>
                      <span>{{good.good_intro}}</span>
                      <span>立即购买</span>
                  </p>
              </figcaption></a>
          </figure>
        
      </div>
      <div class="pic-Wrap">
      <figure v-for="goodl in goodleft"><a :href="'#/good/'+ goodl._id">
        <img :src="'http://192.168.13.237:2222/images/' + goodl.pic_url[0]" alt="">
        <figcaption>
          <span class="name">{{goodl.good_name}}</span>
          <p>{{goodl.good_price}}</p>
          <span class="money">￥<i>{{goodl.good_price}}</i>起</span>
          <a href="">立即购买</a>
        </figcaption></a>
      </figure>
    </div>
  </div>
</template>
<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
import axios from 'axios'
const images = ['shou2.jpg','shou3.png']

export default {
  data:function(){
      return {
          images:images,
          goods:'',
          goodleft:''
      }
  },
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  mounted:function(){
      this.getgood();
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
              that.goods = result.data.goods;
              that.goodleft = result.data.goodleft;
              return [that.goodleft,that.goods];
          }).catch((err)=>{
              console.log(err);
          })
      }
  }
}
</script>
<style scoped>
.home{
    background: rgb(238, 229, 220);
    padding-bottom: 60px;
    padding-top: 42px;
}
.lun img{
    width: 100%;
    height: 100%;
}
.bao{
    width: 100%;
    height: 100%;
}
.picWrap{
    padding: 0 5px;
}
.picWrap figure{
    padding-bottom: 10px;
    background: #fff;
    margin-bottom: 10px;
}
.picWrap figure img{
    width: 100%;
    height: 100%;
}
.picWrap figure figcaption{
    padding: 0 10px;
}
.picWrap figure figcaption p span{
    font-size: 14px;
    color: #333;
}
.picWrap figure figcaption p span i{
    font-style: normal;
}
.picWrap figure figcaption p{
    overflow: hidden;
}
.picWrap figure figcaption p span:last-child{
    float: right;
}
.picWrap figure figcaption p:last-child span{
    font-size: 12px;
    color: #757575;
}
.picWrap figure figcaption p:last-child span:last-child{
    padding: 5px 10px;
    background: pink;
    color: #fff;
    border-radius: 3px;
}

.pic-Wrap{
  overflow: hidden;
  padding: 0 5px;
  margin-bottom: 10px;
}
.pic-Wrap figure{
  width: 48%;
  float: left;
  height: 195px;
  margin-right: 7px;
  margin-left:2px;
  background: #f5f5f5;
  margin-bottom: 10px;
}
.pic-Wrap figure:nth-child(2n + 1){
  margin-right: 0;
}
.pic-Wrap figure img{
  width: 100%;
  height: 100px;
}
.pic-Wrap figcaption{
  text-align: center;
  font-size: 12px;
}
.pic-Wrap figcaption i{
  font-style: normal;
}
.pic-Wrap figcaption p{
  color: #757575;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pic-Wrap figcaption a{
  display: block;
  padding: 6px 10px;
  background: pink;
  color: #fff;
}
.name{
  color: #333;
}
.money{
  color: red;
}
</style>
