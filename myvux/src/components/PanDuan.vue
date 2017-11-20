<template>
  <div class="home">
      <a href="">我是小米商家</a>
      <a href="#/login">我只是买买买</a>
  </div>
</template>
<script>
export default {
  data:function(){
      return {

      }
  }
}
</script>
<style scoped>
.home{
    width: 100%;
    padding: 150px 0;
}
img{
    width: 50px;
}
a{
    display: block;
    width: 80%;
    text-align: center;
    margin: 0 auto;
    border-radius: 15px;
}
a:first-child{
    padding: 5px 0;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 500;
    background: #ed5b00;
    color: #f9f9f9;
}
a:last-child{
    padding: 5px 0;
    font-size: 18px;
    font-weight: 500;
    background: #33b4ff;
    color: #f9f9f9;
}
</style>


