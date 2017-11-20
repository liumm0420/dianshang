<template>
  <div class="home">
      <header>
             <a href="#/"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>购物车</h4>
             <a href="#/search"><i class="fa fa-search"></i></a>             
      </header>
      <div  v-if="!isCun && isTrue" v-cloak>
      <div class="shopcart">
        <div class="shop" v-for="(cart,ins) in user.shop_cart">
          <span class="xuan" :id="cart._id" title="false"  @click="choose(ins,$event)"></span>
          <img :src="'http://192.168.13.237:2222/images/' + cart.pic_url[0]" alt="">
          <div class="cart">
            <span>{{cart.good_name}}</span>
            <p>售价：<span>{{cart.good_price}}</span></p>
            <div class="remove">
              <button @click="minus(ins)">-</button><span class="num">{{cart.cart_num}}</span><button @click="add(ins)">+</button>
              <i @click="deleted(ins)" class="fa fa-trash"></i>
            </div>
          </div>
        </div>
        
      </div>
      <div class="quan">
        <div><span class="choo" title="false" @click="allchecked($event)"></span><p>全选</p></div>
        
      </div>
      <footer>
        <ul>
          <li> 金额：<i>{{money}}</i> 元</li>
          <a href="#/"> <li>继续购物</li></a>
          <a @click="jiesuan()"><li> 去结算</li></a>
        </ul>
      </footer>
  </div>
  <div class="none" v-if="isCun || !isTrue" v-cloak>
    <h4 v-if="isTrue">暂无商品，快去加购吧~</h4>
    <div v-if="!isTrue" class="deng">
      <p>登录后享受更多优惠</p>
      <a href="#/login"><span>去登录</span></a>
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
      <tabbar-item selected link="/shopcart">
        <i slot="icon" class="fa fa-shopping-cart"></i>
        <span slot="label">购物车</span>
        
      </tabbar-item>
      <tabbar-item link="/userinfo">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
    
      </tabbar-item>
    </tabbar>
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
      user:'',
      length:0,
      users:'',
      totalP:0,
      shop:'',
      isCun:true,
      isTrue:true,
      arr:[],
      money:0,
      num:0
    }
  },
  components:{
      Tabbar,
      TabbarItem
    },
    mounted:function(){
      this.getuser();
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
                  that.isCun =false ;
                }else{
                  that.isCun = true
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
      add:function(ins){
        var addnum = 0;
       addnum = ++ this.user.shop_cart[ins].cart_num
        console.log(addnum);
        var that = this;
        axios.post('/mi/addnums',{
          
            addnum:addnum,
            id:that.user.shop_cart[ins]._id,
            user_id:that.user._id
          
        }).then(function(result){
          console.log(result);
          that.users = result.data.user;
          // that.users.shop_cart.forEach(function(data){
          //   that.money += data.cart_num * data.good_price;
          // })
        }).catch(function(err){
          console.log(err);
        })
        
      },
      minus:function(ins){
        var nums = 0;
        if(this.user.shop_cart[ins].cart_num >1){
          nums = --this.user.shop_cart[ins].cart_num; 
        }
        if(nums <= 1){
            nums = 1;
          }
        console.log(nums);
        var that = this;
        axios.get('/mi/jian',{
          params:{
            nums:nums,
            id:that.user.shop_cart[ins]._id,
            user_id:that.user._id
          }
        }).then(function(result){
          console.log(result);
        }).catch(function(err){
          console.log(err);
        })
      },
      deleted:function(ins){
        var that = this;
        axios.post('/mi/deleted',{
            id:that.user.shop_cart[ins]._id,
            user_id:that.user._id
        }).then(function(result){
          console.log(result);
          if(result.data.error == 0){
            location.reload();
          }
        }).catch(function(err){
          console.log(err);
        })
      },
      choose:function(ins,ev){
        var that = this;        
        // console.log(ins);
        if(ev.target.title == 'true'){
          $(ev.target).attr('title',false);
          $(ev.target).removeClass('active');
        }else{
          $(ev.target).attr('title',true);
          $(ev.target).addClass('active');
        }
        if(ev.target.title == 'true'){
          console.log($('.xuan'));
          var isCun = false;
          $('.xuan').each(function(){
            console.log($(this));
            if(!$(this).hasClass('active')){
              isCun = true;
            }
          })
          if(!isCun){
            $('.choo').addClass('active');
            $('.choo').attr('title',true);
          }
          
          that.money = 0;
          
        that.user.shop_cart.forEach(function(cart){
          if(cart._id == ev.target.id){
            console.log('12356');
            // console.log(cart);
            that.arr.push(cart);
           
            that.arr.forEach(function(data){
              that.money += data.cart_num * data.good_price
            })
            
          }
        })
        }else{
          if($('.choo').hasClass('active')){
            $('.choo').attr('title',false);
            $('.choo').removeClass('active');
          }
          that.money = 0;
          that.arr.forEach(function(cart,ins){
            if(cart._id == ev.target.id){
            that.arr.splice(ins,1);
             console.log(that.arr);
            console.log(that.user.shop_cart)
            that.arr.forEach(function(data){
              that.money += data.cart_num * data.good_price
            })
            }
          })
        }
      },
      allchecked:function(ev){
        console.log('123');
        var that = this;
        // $(ev.target).addClass('active');
        if(ev.target.title == 'true'){
          $(ev.target).attr('title',false);
          $(ev.target).removeClass('active');
          $('span.xuan').attr('title',false);
          $('.xuan').removeClass('active');
          that.arr = [];
              that.money = 0
        }else{
          $(ev.target).attr('title',true);
          $(ev.target).addClass('active');
          $('span.xuan').attr('title',true);
          $('span.xuan').addClass('active');
          that.arr = [];
          that.user.shop_cart.forEach(function(data){
            that.arr.push(data);
          })
          that.money = that.calc;
        }
          console.log(that.arr);
      },
      jiesuan:function(){
        console.log('1222222222222');
        var that = this;
        axios.post('/mi/paymoney',{
          arr:that.arr
        }).then(function(result){
          console.log(result);
          if(result.data.error == 0){
            location.href = '#/settle'
          }a
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
    border-bottom: solid 1px #ccc;
}
header img{
  margin-top: 2px;
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
    color: #fff;
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
  
  padding: 5px 0;
  float: left;
  list-style: none;
  width: 33.3%;
  text-align: center;
  font-size: 16px;
  
  color: #fff;
}
footer ul a:nth-child(2) li{
  height: 30px;
  padding: 15px 0 5px 0;
  background: #eee;
  color: #757575;
}
footer ul a:last-child li{
  height: 30px;
  padding: 15px 0 5px 0;
}
footer ul li:first-child{
  font-size: 12px;
  background: #fff;
  color: #757575;
  height: 40px;
}
footer ul a:nth-child(2) li{
  color: #333;
  font-size: 16px;
}
footer ul a:nth-child(3) li{
  color: #fff;
  background: pink;
  font-size: 16px;
}
footer ul li i{
  font-size: 16px;
  color: pink;
  font-style: normal;
}
.cart > span{
  color: #000;
  font-size: 18px;
}
.xuan.active{
  background: pink;
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
  margin-left: 10px;
}
.shop .cart{
  width: 60%;
  float: right;
  color: #757575;
  font-size: 14px;
}
.shop .num{
  padding: 2px 10px;
}
.shop button{
  padding: 4px 10px;
  border: none;
  background: pink;
  color: #fff;
}
.remove i{
  float: right;
  margin-top: 4px;
  font-size: 18px;
  margin-right: 10px;
}
.tab{
  position: fixed;
  bottom: 0;
}
.none h4{
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin-top: 50px;
}
.deng{
  overflow: hidden;
  background: #fff;
  padding: 10px 15px;
}
.deng p{
  float: left;
}
.deng a{
  float: right;
  
}
.deng a span{
  color: #757575;
}
.xuan{
  padding: 6px;
  border: solid 2px pink;
  float: left;
  margin-top: 30px;
  border-radius: 50%;
  overflow: hidden;
}
.quan{
  position: fixed;
  bottom: 50px;
  background: #fff;
  overflow: hidden;
  width: 100%;
}
.quan > div{
  overflow: hidden;
  float: right;
}
.quan p{
  float: left;
  margin-right: 20px;
  padding: 5px 0;
  width: 40px;
  margin-left: 5px;
}
.quan span{
  border: solid 2px pink;
  /* padding: 0 8px; */
  display: block;
  /* margin-right: 5px;
   */
   margin-top: 10px;
   width: 10px;
   height: 10px;
   float: left;
  border-radius: 50%;
  overflow: hidden;
}
.quan span.active{
  background: pink;
}
</style>

