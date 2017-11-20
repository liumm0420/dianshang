<template>
	<div id="root">
		<header>
			<a href="#/"><img src="../assets/xiaoyu.png" alt=""></a>
			<h4>发布商品</h4>
			<!--<i class="fa fa-search"></i>-->
		</header>
		<!-- <div class="addr"> -->
		<form action="">
			<p>商品分类： <select name="" id="" v-model="category">
        <option>-请选择-</option>
        <option value="手机"> 手机 </option>
        <option value="电视"> 电视 </option>
        <option value="电脑"> 电脑 </option>
        <option value="智能"> 智能 </option>
      </select></p> 
			<p> 商品名称：<input type="text" v-model="good_name"></p>
			<p> 商品价格：<input type="text" v-model="good_price"></p>
			<p> 商品介绍：<input type="text" v-model="introduce"></p>
			<p> 商品优惠：<input type="text" v-model="youhui"></p>
			<p> 商品简介：<input type="text" v-model="good_intro"></p>
		</form>

		<div id="img-list">
			<img v-for="i in files" :src="i" class="images" :key="i">
			<label for="file-selector" id="file-label">+</label>
			<input id="file-selector" type="file" accept="image/jpeg,image/png,image/gif" @change="chooseImage" multiple>
		</div>
		<div id="btn">
			<button @click="btnClick">提交</button>
		</div>
			<p v-if="isShow" style="background: #fff;color: red;padding: 5px;">{{message}}</p>
	</div>
</template>
<script>
	import '../index.js'
	import axios from 'axios'

	export default {
		data: function() {
			return {
				files: [],
				photo: [],
				good_name:'',
	      good_price:'',
	      category:'',
	      youhui:'',
	      introduce:'',
	      good_intro:'',
	      message:'',
	      isShow:false,
			};
		},
		methods: {
			chooseImage: function(e) {
				var that = this;
				// console.log(this.$refs);
				for(var i = 0; i < e.target.files.length; i++) {
					var f = e.target.files[i];
					this.photo.push(f);
					var url = URL.createObjectURL(f);
					this.files.push(url);
				}
//				console.log(this.files);

			},
			btnClick: function() {
				var data = new FormData();
				for(var i = 0; i < this.photo.length; i++) {
					data.append("img", this.photo[i]);
				}
				data.append('url', this.files);
				data.append("good_name", this.good_name);
				data.append("good_price", this.good_price);
				data.append("youhui", this.youhui);
				data.append("introduce", this.introduce);
				data.append("category", this.category);
				data.append("good_intro", this.good_intro);
				console.log(data);
				this.$http.post("/mi/publish", data, {
						headers: {
							"Content-Type": "multipart/form-data"
						}

					}).then(function(result){
//						console.log(result);
						if(result.data.error == 0){

								location.href = '#/'
//							},2000)
						}else{
//							that.isShow = false;
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
    width: 65%;
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