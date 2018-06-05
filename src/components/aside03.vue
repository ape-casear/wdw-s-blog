<template>
  <el-carousel indicator-position="outside" interval="5000">
    <el-carousel-item v-for="(url,index) in urls" :key="index">
      <img :src="url">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data(){
    return{
      urls: ['http://www.weidongwei.com:88/img/expressImg/0{num}01.jpg',
      'http://www.weidongwei.com:88/img/expressImg/0{num}02.jpg',
      'http://www.weidongwei.com:88/img/expressImg/0{num}03.jpg',
      'http://www.weidongwei.com:88/img/expressImg/0{num}04.jpg',
      'http://www.weidongwei.com:88/img/expressImg/0{num}05.jpg',
      'http://www.weidongwei.com:88/img/expressImg/0{num}06.jpg',
      'http://www.weidongwei.com:88/img/expressImg/0{num}07.jpg',
      'http://www.weidongwei.com:88/img/expressImg/0{num}08.jpg']
    }
  },
  created: function(){
    let num = (new Date()).getDate() % 5;
    num += 1;
    this.urls = this.urls.map(url=>{
      return url.replace('{num}', num)
    })
  }
}
</script>


<style>
  .el-carousel__item img {
    width: 100%;
    height: 100%;
    font-size: 18px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  

</style>