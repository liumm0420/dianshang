<template>
  <div class="home">
    <header>
        <a href="#/"><img src="../assets/xiaoyu.png" alt=""></a>
        <h4>编辑</h4>           
      </header>
    <div>
      <form action="">
			<p>商品分类： <select name="" id="" v-model="good.category">
        <option>-请选择-</option>
        <option value="手机"> 手机 </option>
        <option value="电视"> 电视 </option>
        <option value="电脑"> 电脑 </option>
        <option value="智能"> 智能 </option>
      </select></p> 
			<p> 商品名称：<input type="text" v-model="good.good_name"></p>
			<p> 商品价格：<input type="text" v-model="good.good_price"></p>
			<p> 商品介绍：<input type="text" v-model="good.introduce"></p>
			<p> 商品优惠：<input type="text" v-model="good.youhui"></p>
			<p> 商品简介：<input type="text" v-model="good.good_intro"></p>
      <button @click="edit">确认编辑</button>
    </form>
      
      </div>
      <p class="showp" v-if="!isShow">{{message}}</p>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data:function(){
      return {
          category:'',
          good:'',
          message:'',
          isShow:true

      }
  },
  mounted:function(){
    this.getuserid();
  },
  methods:{
    getuserid:function(){
          var _id = this.$route.params;
          console.log(_id);
          var that = this;
          axios.get('/mi/xiang',{
              params:{
                  id:_id.id
              }
          }).then(function(result){
              console.log(result);
              that.good = result.data.good;
              return that.good;
          }).catch(function(err){
              console.log(err);
          })
      },
    //   sctp:function(event){
    //   this.good_img = event.target.files[0].name;
    //   console.log(this.good_img)
    // },
    edit:function(){
      var that = this;
      axios.post('/mi/edits',{
        good:that.good
      }).then(function(result){
        console.log(result);
        if(result.data.error == 0){
          that.isShow = false;
          that.message = result.data.message;
          setTimeout(function(){
            console.log('111111111111111')
            location.href = "#/"
          },2000)
        }else{
          that.isShow = true;
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
  padding-bottom: 50px;
}
	header{
    background: #eee;
    padding: 5px 10px;
    border-bottom: solid 1px #ccc;
}
header img{
    width: 25px;
}
header h4{
    width: 55%;
    float:right;
    font-size: 16px;
    font-weight: 500;
}
header i.fa{
    position: absolute;
    right: 19px;
    top: 10px;
    color: #757575;
}
form{
  overflow: hidden;
}
form p{
    margin: 10px 0 10px 15px;
    border-bottom:solid 1px #eee;
}
form select{
	width: 200px;
	border: none;
	background: none;
}
form input{
    height: 35px;
    width: 60%;
    border: none;
    background: none;
}
/*  */
button{
  padding: 5px 10px;
  border: none;
  background: brown;
  color: #fff;
  border-radius: 3px;
  margin-top: 5px;
  float:right;
  margin-right: 20px;
}
.showp{
  color: red;
  text-align: center;
  background: #fff;
  margin-top: 10px;
}
</style>

