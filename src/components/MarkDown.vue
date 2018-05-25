<template>
  <div>
    <div id = "content">
      <div class="article-title-box">
        <span class="article-type">原</span>
        <h2>{{toViewData.title}}</h2>
      </div>
      <div class="article-info-box">
        <div class="article-bar-top d-flex">
          <span class="time">{{toViewData.pub_datetime}}</span>
          <div class="float-right">
            <span class="read-count">阅读数：{{toViewData.browse_count}}</span>
          </div>
        </div>
	    </div>
       <div style="height:1px; width:100%; margin-top:10px; margin-bottom=20px; border-top:1px #aaa solid"></div>
      <vue-markdown :source="toViewData.content"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown  from 'vue-markdown';
export default {
  props:['toViewData'],
  name: "BlogMarkDown",
  data () {
      return {
        content: `# yi32323ji`,

      }
  },
  components: {
      VueMarkdown 
  },
  methods: {
    getParams () {
      console.log(123)
    }
  },
  watch: {
    $route:function(){
      console.log('router')
    }
  },
  mounted: function () {
    console.log('md mouted');
  }

}
</script>

<style>
  .time{
    font-size: 14px;
    opacity: 0.7;
  }
  .float-right{
    margin-left: auto;
    float: right;
  }
  .article-type{
    color:rgb(181, 190, 146);
    border: 1px solid rgb(208, 218, 172);
    border-radius: 50%;
    width: 22px;height: 24px;
    float: left;
    font-size:20px;
    margin-right: 10px;
  }
  #content{
    position:relative;
    text-align: left;
    padding:20px;
  }
</style>


