<template>
  <div>
      <header>
             <a href="#/"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>商家回复</h4>
            <!-- <i class="fa fa-search"></i>             -->
      </header>
      <div class="wrap">
          <div class="imgwrap">
                <!-- <img :src="'http://localhost:2222/images/' + mess.touxiang" alt=""> -->
                <p>
                    <span>415869</span><br>
                    <i>156</i>
                </p>
          </div>
          <p>12356</p>
          <!-- <a :href="'#/reply/' + good._id + '/' + mess._id"><span v-if="isCun">回复</span></a> -->
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data:function(){
      return {
          isCun:true,
          reply:[],
          good:'',
          isCun:true
      }
  },
  mounted:function(){
      this.getreply();
    //   this.getuser();
  },
  methods:{
      getreply:function(){
          var moment = require('moment');
          moment.locale("zh-cn")
          var id = this.$route.params.id;
          console.log(id)
          var that = this;
        //   axios.post('/mi/replys',{
        //           id:id
        //   }).then(function(result){
        //       console.log(result);
        //       if(result.data.error == 0){
        //          var replys = result.data.reply;
        //           replys.forEach(function(data){
        //               data.create_time = moment(data.create_time).fromNow()
        //               that.reply.push(data);
        //           })
        //           that.good = result.data.good;
        //           that.isCun = true;
        //       }else{
        //           that.isCun = false;
        //       }
        //   }).catch(function(err){
        //       console.log(err);
        //   })
      },
      getuser:function(){
      var that = this;
          axios.get('/mi/').then(function(result){
//            console.log(result);
            if(result.data.error == 0){
                if(result.data.user.username == 'aaaaaa'){
                    that.isCun = true;
                }else{
                    that.isCun = false;
                }
                
              }
          }).catch(function(err){
              console.log(err);
          })
      },
  }
}
</script>
<style scoped>
header{
    background: pink;
    padding: 7px 10px;
    /* border-bottom: solid 1px #ccc;*/
    position: fixed;
    top: 0;
    width: 100%
}
header img{
    width: 25px;
}
header h4{
    width: 60%;
    float:right;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
}
.wrap{
    padding: 10px 15px;
    border-bottom: solid 1px #ddd;
    padding-top: 50px;
}
.imgwrap{
    overflow: hidden;
}
.imgwrap img{
    width: 50px;
    height: 50px;
    float: left;
    border-radius: 50%;
}
.imgwrap > p{
    padding-top: 5px;
    width: 75%;
    float: right;
    font-size: 14px;
}
.imgwrap > p i{
    color: #757575;
    font-style: normal;
}
.wrap{
    overflow: hidden;
}
.wrap > p{
    font-size: 14px;
    margin-top: 10px;
    /* border: solid 1px #eee; */
}
.reply{
    padding: 10px 15px;
    color:black;
    margin-top: 45px;
}
.reply span{
    color: #757575;
}
.wrap >a span{
    float: right;
    background: pink;
    padding: 2px 10px;
    color: #fff;
    border-radius: 5px;
}
</style>
