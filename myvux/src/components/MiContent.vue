<template>
  <div class="home">
      <div class="lun">
          <!-- <img src="https://i8.mifile.cn/v1/a1/447d6ce6-2e1a-7998-575f-013b2f7a53fe.webp" alt="">
          <h2>首页的推荐</h2> -->
    <swiper auto height="190px">
      <swiper-item class="black"><h2 class="title fadeInUp animated"><img style="height:190px" src="../assets/shou2.jpg" alt=""></h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated"><img style="height:190px" src="../assets/tv3.jpg" alt=""></h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated"><img style="height:190px" src="../assets/zhi2.png" alt=""></h2></swiper-item>
    </swiper>
    <div class="fig-wrap">
      <figure v-for="good in goods"><a :href="'#/good/'+ good._id">
        <!-- <img src="../assets/mi5.jpg" alt=""> -->
        <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
        <figcaption>
          <p class="p-one">
            <span>{{good.good_name}}</span>
            <span>￥<i>{{good.good_price}}</i></span>
          </p>
          <p class="p-two">
            <span>{{good.good_intro}}</span>
            <span>立即预约</span>
          </p>
        </figcaption></a>
      </figure>
    </div>
    <!-- <div class="picWrap">
      <figure v-for="good in other"><a :href="'#/good/'+ good._id">
        <img :src="'http://localhost:2222/images/' + good.pic_url[0]" alt="">
        <figcaption>
          <span class="name">{{good.good_name}}</span>
          <p>{{good.good_intro}}</p>
          <span class="money">￥<i>{{good.good_price}}</i>起</span>
          <a href="">立即购买</a>
        </figcaption></a>
      </figure>
    </div> -->
      </div>
  </div>
</template>
<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
import axios from 'axios'
export default {
  data:function(){
      return {
        goods:{},
        id:'',
        computers:{},
        good:{},
        other:{}
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
//  this.getgood();
//  this.getgoods();
		this.getall();
  },
  methods:{
  	getall:function(){
  		var that = this;
  		axios.get('/mi/good').then((result)=>{
              that.goods = result.data.goods;
          }).catch((err)=>{
              console.log(err);
          });
          var num = 0;
   		 		$(document).on('scroll',window,function(){
   		 			var height = $(this).height();
   		 			var screenHeight = $(window).height();
   		 			var scrollTop = $(window).scrollTop();  		 			
   		 			if(scrollTop + screenHeight > height - 10){
                num ++;
   		 				axios.get('/mi/good?page=' + num).then(function (result) {
                  var datas = result.data.goods;
                  // console.log(result.data);
			      		    datas.forEach(function(data){
			      			    that.goods.push(data);
			      		    })
   		 		}).catch(function (err) {
     	 	console.log(err)
   		 	})
   		 			}
   		 		})
  	},
  }
}
</script>
<style scoped>
.home{
  background: rgb(244, 226, 212);
  padding-bottom: 70px;
  padding-top: 50px;
}
.lun img{
    width: 100%;
    height: 100%;
}
.fig-wrap{
  padding: 10px 5px;
}
.fig-wrap figure{
  padding-bottom: 10px;
  background: #fff;
  margin-bottom: 10px;
}
.fig-wrap figure img{
  width: 100%;
  height: 100%;
}
p{
  padding: 0 10px ;

}
p span{
  font-size: 12px;
  color: #757575;
}
p span i{
  font-style:normal;
}
.p-one{
  overflow: hidden;
}
.p-one span:first-child{
  color: #333;
}
.p-one span:last-child{
  float: right;
  color: pink;
}
.p-two{
  overflow: hidden;
}
.p-two span:last-child{
  float: right;
  background: pink;
  padding: 5px 10px;
  color: #fff;
  border-radius: 3px;
}
.picWrap{
  overflow: hidden;
  padding: 0 5px;
}
.picWrap figure{
  width: 48%;
  float: left;
  height: 195px;
  margin-right: 7px;
  margin-left:2px;
  background: #f5f5f5;
  margin-bottom: 10px;
}
.picWrap figure:nth-child(2n + 1){
  margin-right: 0;
}
.picWrap figure img{
  width: 100%;
  height: 100px;
}
.picWrap figcaption{
  text-align: center;
  font-size: 12px;
}
.picWrap figcaption i{
  font-style: normal;
}
.picWrap figcaption p{
  color: #757575;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.picWrap figcaption a{
  display: block;
  padding: 6px 10px;
  background: pink;
  color: #fff;
}
.name{
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.money{
  color: pink;
}
</style>


