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
      urls: ['http://www.weidongwei.com:88/img/0201.jpg','http://www.weidongwei.com:88/img/0202.jpg','http://www.weidongwei.com:88/img/0203.jpg']
    }
  },
  mounted: function(){

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