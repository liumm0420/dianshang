<template>
  <div class="home">
      <header>
             <a href="#/settle"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>完成支付</h4>
            
      </header>
      	<div class="bd">
      		
      	</div>
      	<div class="ok">
      		<img src="../assets/ok-2.png" alt="" />
      		<p>恭喜你，完成支付！</p>
      	</div>
      	
      <footer>
        <ul>
          <a href="#/"> <li>去逛逛</li></a>
        </ul>
      </footer>
  </div>
</template>
<script>
  import { Tabbar,TabbarItem } from 'vux';
import axios from 'axios'
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
    padding: 5px 10px;
    border-bottom: solid 1px #ccc;
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
.ok{
	margin-top: 50px;
	text-align: center;
}
img{
	width: 120px;;
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
  width: 100%;
  text-align: center;
  font-size: 16px;
  
}

footer ul a li{
  color: #fff;
  background:pink;
  color: #fff;
}


</style>

