<template>
  <div class="home">
      <header>
             <a @click="clear()"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>用户结算</h4>
            <!-- <i class="fa fa-search"></i>             -->
            
      </header>
      	<div class="bd">
      		
      	</div>
      	<a href="#/chooseaddr"><div class="newadd">
      		添加收货地址
      	</div></a>
      	<div class="addr" v-for="address in address">
          <p class="name">
              <span>{{address.name}}</span><span>{{address.tell}}</span>
          </p>
            <p class="address">{{address.value + address.address}}</p>
      </div>
      <div class="empty">
      	
      </div>
      <div  v-if="isCun && isTrue" v-cloak>
      <div class="shopcart">
        <div class="shop" v-for="(cart,ins) in user.pay_list">
          <img :src="'http://192.168.13.237:2222/images/' + cart.pic_url[0]" alt="">
          <div class="cart">
            <span>{{cart.good_name}}</span>
            <p>数量： {{cart.cart_num}} 件</p>
            <p>总价： <span>{{cart.good_price * cart.cart_num}}</span> 元</p>
          </div>
        </div>
      </div>
      <footer>
        <ul>
          <li class="pay">共<span>{{length}}</span>件 金额：<i>{{calc}}</i> 元</li>
          <a href="#/paymoney"> <li @click="addpay()">去付款</li></a>
          <!-- <a v-if="!isCun" href="#/address"><li style="background:pink;color:#fff" v-if="!isHave">去付款12323</li></a> -->
        </ul>
      </footer>
  </div>
  </div>
  </div>
</template>
<script>
  import { Tabbar,TabbarItem } from 'vux';
import axios from 'axios'
export default {
  data:function(){
    return {
      isShow:false,
      user:{pay_list:[],pic_url:[]},
      length:0,
      users:'',
      totalP:0,
      shop:'',
      isCun:true,
      isTrue:true,
      address:'',
      isHave:true
    }
  },
  components:{
      Tabbar,
      TabbarItem
    },
    mounted:function(){
        this.getuser();
        this.settle();
    },
    methods:{
      getuser:function(){
      var that = this;
          axios.get('/mi/').then(function(result){
              console.log('123')
              if(result.data.error == 0){
                that.user = result.data.user;
                that.length = result.data.user.shop_cart.length;
                if(that.length > 0){
                  that.isCun = true;
                }else{
                  that.isCun = false
                }
                that.isTrue = true;
                that.shop = result.data.user.shop_cart;
               }else{
                 that.isTrue = false;
               }
              return [that.isShow,that.user];
          }).catch(function(err){
              console.log(err);
          })
      },
     settle:function(){
      var that = this;
      axios.post('/mi/checked').then(function(result){
      	console.log(result);
	        if(result.data.error == 0){
            if(result.data.data.length == 0){
              that.isHave = true; 
            }else{
              that.isHave = false; 
            }
	        	that.address = result.data.data;
	        }
	      }).catch(function(err){
	        console.log(err);
	      })
      },
      addpay:function(){
        var that = this;
        axios.post('/mi/addpay',{
          shop:that.user.pay_list
        }).then(function(result){
          console.log(result);
        }).catch(function(err){
          console.log(err);
        })
      },
      xianshi:function(){
        if(this.isHave != false){
          alert('请选择地址')
        }
      },
      clear:function(){
        console.log('1111111111');
        var that = this;
        axios.post('/mi/clear').then(function(result){
          console.log(result);
          if(result.data.error == 0){
            location.href = '#/shopcart'
          }
        }).catch(function(err){
          console.log(err);
        })
      }
      
         
    },
    computed:{
      calc:function(){
          var price = 0;
          var that = this;
            for( var i = 0; i < this.shop.length; i++  ){
              price += this.shop[i].cart_num * this.shop[i].good_price
            }
            return price
          },
            
        },
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
    width: 58%;
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
.empty{
	height: 10px;
	background: #eee;;
}
.bd{
	background: url('../assets/bd1.png');
	height: 3px;
}
.addr{
    margin-top: 10px;
    padding: 5px 15px;
    border:solid 1px #eee; 
}
.name{
    padding: 3px 5px;
    padding-bottom: 5px;
    color: #333;
}
.name span:first-child{
    color: pink;
    font-size: 16px;
     padding-right: 20px;
}

.address{
    padding: 3px 5px;
    font-size: 14px;
    color: #333;
}
footer{
  width: 100%;
  position: fixed;
  bottom: 0;
}
footer ul{
  overflow: hidden;
}
footer ul li{
  padding: 10px 0;
  float: left;
  list-style: none;
  width: 50%;
  text-align: center;
  font-size: 16px;
  
}
footer ul a li{
  /*color: #fff;*/
}
footer ul li{
  font-size: 16px;
  color: pink;
}
footer ul a li{
  color: #fff;
  background: pink;
  color: #fff;
}

footer ul li i{
  font-style: normal;
}
.cart > span{
  color: #000;
  font-size: 18px;
}
.shop{
  overflow: hidden;
  padding: 15px;
  border-bottom: solid 1px #eee;
}
.shop img{
  float: left;
  width: 60px;
  height: 70px;
}
.shop .cart{
  width: 65%;
  float: right;
  color: #757575;
  font-size: 14px;
}

.cart p{
	color: #333;
}
.newadd{
	background: #fff;
	padding: 10px 15px;
	color: #333;
}
.pay{
	background: #fff;
	font-size: 14px;
}

</style>

