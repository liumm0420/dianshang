<template>
  <div>
      <header>
            <a href="#/userinfo"><img src="../assets/xiaoyu.png" alt=""></a>
            <h4>修改头像</h4>
      </header>
      <form action="">

			<p> 用户名：<input type="text" v-model="name"></p>
		</form>

		<div id="img-list">
			<img v-for="i in files" :src="i" class="images" :key="i">
			<label for="file-selector" id="file-label">+</label>
			<input id="file-selector" type="file" accept="image/jpeg,image/png,image/gif" @change="chooseImage" multiple>
		</div>
		<div id="btn">
			<button @click="btnClick">提交</button>
		</div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data:function(){
      return {
          name:'',
          files: [],
				photo: [],
      }
  },
  methods: {
			chooseImage: function(e) {
				var that = this;
				for(var i = 0; i < e.target.files.length; i++) {
					var f = e.target.files[i];
					this.photo.push(f);
					var url = URL.createObjectURL(f);
					this.files.push(url);
				}

			},
			btnClick: function() {
				var data = new FormData();
				for(var i = 0; i < this.photo.length; i++) {
					data.append("img", this.photo[i]);
				}
                data.append('url', this.files);
				data.append('name', this.name);                
				this.$http.post("/mi/touxiang", data, {
						headers: {
							"Content-Type": "multipart/form-data"
						}

					}).then(function(result){
//						console.log(result);
						if(result.data.error == 0){
								location.href = '#/userinfo'
						}else{
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
    background:pink;
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
	#white {
		margin: 8px;
		padding: 8px 15px;
		background-color: #F5F5F5;
	}
	
	#white span {
		font-size: 14px;
		text-align: center;
		color: #29B0FA;
	}
	
	#white input {
		margin-left: 6px;
		height: 36px;
		width: 240px;
		border: none;
		font-size: 11px;
	}
	
	#white input:nth-of-type(1) {
		border-bottom: solid 1px #dddddd;
	}
	
	#top,
	.bottom {
		height: 36px;
		line-height: 36px;
	}
	
	#file-selector {
		display: none;
	}
	
	#file-label {
		width: 100px;
		height: 100px;
		border: solid 1px black;
		border-radius: 5px;
		display: inline-block;
		font-size: 80px;
		text-align: center;
		line-height: 80px;
		margin-left: 10px;
		vertical-align: top;
	}
	
	.images {
		width: 90px;
		height: 100px;
		border-radius: 5px;
		/*border: solid 1px black;*/
		margin-left: 10px;
	}
	
	#root>label {
		font-size: 14px;
		color: #29B0FA;
	}
	
	#btn {
		width: 100%;
		text-align: center;
		margin: 40px 0;
	}
	
	#btn button {
		color: white;
		background-color: pink;
		border: none;
		width: 290px;
		height: 45px;
		border-radius: 5px;
	}
</style>

