<template>
  <div id="aside01">
      <div id="aside01_top">
          <img src="../assets/head.png" class="headPic"/>
          <span >ape-Caesar</span>
          <span class="add" @mouseover="showQRcode = !showQRcode" @mouseout="showQRcode = !showQRcode"><i class="el-icon-circle-plus-outline"></i>加好友</span><br>
          <span><a href="http://www.tju.edu.cn/" target="blank"><i class="el-icon-location-outline"></i>天津大学</a></span>
          <transition name="el-zoom-in-center">
            <div v-show="showQRcode" class="transition-box">
                <img id="QRcode" src="../assets/head.png" :class="{showQRcode: showQRcode, notshowQRcode: !showQRcode}" />
            </div>
          </transition>
      </div>
      <div style="height:1px; width:100%; margin-top:30px; margin-bottom=20px; border-top:1px #888 solid"></div>
      <div id="aside01_bottom">
          <dl>
            <dt><i class="el-icon-document"></i>blog</dt>
            <dd>{{toAside01Data.blogs}}</dd>
          </dl>
          <dl>
            <dt><i class="el-icon-star-on"></i>访问</dt>
            <dd>{{toAside01Data.visits}}</dd>
          </dl>
          <dl>
            <dt><i class="el-icon-edit-outline"></i>评论</dt>
            <dd>{{toAside01Data.comments}}</dd>
          </dl>
      </div>
  </div>
</template>

<script>
export default {
  props:['toAside01Data'],
  data(){
      return {
          showQRcode: false,
      }
  },
  methods:{
    
  }
}
</script>

<style>
    #aside01_bottom > dl{
        font-size: 14px;
    }
    .add{
        color:  rgb(216, 84, 84);
    }
    .showQRcode{
        display: block;
    }
    .notshowQRcode{
        display: none;
    }
    #QRcode{
        margin:0px;
        width: 200px;
        height: 200px;
        position: absolute;
       
        border-radius: 5%;
        z-index: 2;
    }
    #aside01_top > span {
        margin-top: 50px;
        margin:6%;
        position: relative;
    
    }
    .headPic{
        float:left;
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }
    #aside01 {
        /* display: block; */
        margin-left:10px;
    }
    #aside01_bottom{
        display: flex;
        text-align: center;
        justify-content:center;
        /* align-items:center; */
    }
    #aside01_bottom > dl{ 
        display: block;
        align-self: auto;
        margin:8%;
    }
</style>

