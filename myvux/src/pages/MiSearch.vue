<template>
  <div>
      <header>
             <a href="#/"><i class="fa fa-home"></i></a>
            <input type="text" v-model="any" @keyup="search($event)">
            <i class="fa fa-search"></i>            
      </header>
      <div class="wrap" v-if="!isShow">
          <h5>热门搜索</h5>
          <img src="../assets/sou.jpg" alt="">
          <ul>
              <a href=""><li>免费领卷</li></a>
              <a href=""><li>小米电饭煲</li></a>
              <a href=""><li>红米Note 5A</li></a>
              <a href=""><li>小米Max 2</li></a>
          </ul>
      </div>
      <div v-if="isShow && !isTrue">
          <div class="hehe">
          <div class="jiage">
              <select name="" @change="showp($event)">
                  <option value="">--请选择--</option>
                  <option :value="price"  v-for="(price,ins) in prices">{{price}}</option>
              </select>
            <!-- <p class="prices" @click="showp(ins)" value="" v-for="(price,ins) in prices">{{price}}</p> -->
          <!-- <p ">{{price}}</p> -->
          </div>
          <p class="paixu"><span @click="pricedown()">价格↓</span><span  @click="priceup()">价格↑</span></p>
          </div>
          <div class="shopcart">
        <div class="shop" v-for="good in message">
          <img :src="'http://192.168.13.237:2222/images/' + good.pic_url[0]" alt="">
          <div class="cart">
            <span>{{good.good_name}}</span>
            <p class="pri">￥{{good.good_price}}</p>            
            <p>{{good.good_intro}}</p>
          </div>
        </div>
      </div>
      </div>
      <div v-if="isShow && isTrue">
          <h2>暂无该商品</h2>
      </div>
  </div>
</template>
<script>
	import axios from 'axios'
export default {
  data:function(){
      return {
          any:'',
          message:'',
          isShow:false,
          isTrue:false,
          prices:[
                	'0 - 500','500 - 1000','1000 - 2000','2000 - 5000'
                ],
                goods:[],
                data:[]
      }
  },
  methods:{
  	search:function(ev){
        //   console.log(ev);console.log(ev.keyCode)
          var that = this;
          if(ev.keyCode === 13){
              axios.post('/mi/search',{
                    any:that.any
                }).then(function(result){
                    console.log(result);
                    if(result.data.error == 0){
                        that.message = result.data.goods;
                        that.data = result.data.goods;
                        that.isShow = true;
                        if(that.message.length == 0){
                            that.isTrue = true;
                        }else{
                            that.isTrue = false;
                        }
                    }else{
                        that.isShow = false;
                    }
                }).catch(function(err){
                    console.log(err)
                })
          }
  		
      },
      pricedown:function(){
          console.log('123456');
          var that = this;
          axios.post('/mi/pricedown',{
              goods:that.message,
              any:that.any
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                        that.message = result.data.goods;
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      priceup:function(){
          console.log('123456');
          var that = this;
          axios.post('/mi/priceup',{
              goods:that.message,
              any:that.any
          }).then(function(result){
              console.log(result);
              if(result.data.error == 0){
                        that.message = result.data.goods;
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      showp:function (ev) {
		console.log('123456');
        console.log(ev.target.value)
		var pri1 = ev.target.value.split(' - ');                    
		console.log(pri1);
		var aa = [];
		this.data.forEach(function(data){
			if(data.good_price >= pri1[0] && data.good_price <= pri1[1]){
				aa.push(data);
			}
		})
		this.message = aa;
        },
  }
  
}
</script>
<style scoped>
header{
    background: pink;
    padding: 8px 10px;
    border-bottom: solid 1px #ccc;
}
header input{
    width: 77%;
    height: 28px;
    font-size: 16px;
    font-weight: 500;
    margin: 0 10px;
    border: none;
    border: solid 1px #ddd;
}
header i{
    color: #fff;
    font-size: 18px;
}
.wrap h5{
    color: #333;
    font-size: 16px;
    font-weight: 500;
    padding: 10px;
}
.wrap img{
    width: 100%;
}
.wrap ul{
    overflow: hidden;
    padding: 0 10px;
}
.wrap ul li{
    float: left;
    list-style: none;
    margin: 5px 5px;
    padding: 3px 8px;
    font-size: 14px;
}
.wrap ul a:first-child li{
    border: solid 1px rgb(151, 194, 138);
    background: rgb(228, 245, 226);
    color: rgba(72,72,72)
}
.wrap ul a:nth-child(2) li{
    background: rgb(232, 246, 246);
    color: rgb(72, 72, 72);
    border: solid 1px rgb(140, 218, 222);
}
.wrap ul a:nth-child(3) li{
    background: rgb(248, 242, 236);
    color: rgb(72, 72, 72);
    border: solid 1px rgb(250, 194, 136);
}
.wrap ul a:nth-child(4) li{
    background: rgb(249, 234, 234);
    color: rgb(72, 72, 72);
    border: solid 1px rgb(252, 160, 167);
}

.shop{
  overflow: hidden;
  padding: 15px;
  border-bottom: solid 1px #eee;
}
.shop img{
  float: left;
  width: 70px;
  height: 80px;
}
.shop .cart{
  width: 65%;
  float: right;
  font-size: 14px;
}
.cart span{
    font-size: 18px;
    color: #333;
}
.shop .num{
  padding: 2px 10px;
}
.pri{
    color: red
}
h2{
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-top: 50px;
}
.jiage{
    float: left;
}
.paixu{
    float: right;
    overflow: hidden;
    padding-top: 10px;
}
.paixu span{
    float: right;
    margin: 0 10px;
    background: pink;
    padding: 1px 5px;
    color: #fff;
    border-radius: 5px;
}
.paixu span:hover{
    background: palevioletred;
}
.hehe{
    overflow: hidden;
}
.prices{
    margin-left: 15px;
}
select{
    margin-top: 10px;
    margin-left: 15px;
    width: 120px;
    height: 30px;
}
</style>

