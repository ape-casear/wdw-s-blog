<template>

    <div id = "content" :name="toViewData.id" > 
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

      <div class="modify" v-if="JSON.parse(_user).name =='wdw'">
        <span  class="sort" style="color:rgb(202, 197, 169);cursor:pointer;"  @click="open_modify"><i class="el-icon-edit"  >modify</i></span>
        <span  class="sort" style="color:rgb(180, 179, 169);cursor:pointer; background-color:rgb(180, 179, 169)"  v-if="hide" @click="submit"><i class="el-icon-edit"  >submit</i></span>
        <textarea :class="{'textarea': true, 'hidden': hide}"  v-model="bind_content" v-if="hide"/>
      </div>
    </div>
 
</template>

<script>
import Vue from 'vue'
import VueMarkdown  from 'vue-markdown';
import Hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

export default {
  props:['toViewData'],
  name: "BlogMarkDown",
  data () {
      return {
        content: `# yi32323ji`,
        bind_content: '',
        hide: false,
        _user:''
      }
  },
  components: {
      VueMarkdown 
  },
  methods: {
    getParams () {
      console.log(123)
    },
    open_modify: function(){
      console.log(this.bind_content = this.toViewData.content)
      this.hide = !this.hide;
    },
    submit(){
      this.$emit('modify', { bloglistid: this.toViewData.id, content: this.bind_content})
    }
  },
  watch: {
    $route:function(){
      console.log('router')
    }
  },
  created: function () {
    if(!this.$route.query.json_str_data){
      console.log('没有bloglist参数')
      return;
    }
    let json_str_data = JSON.parse(this.$route.query.json_str_data)
    this.$emit('api_from_child',{name: this.$route.name, query: { json_str_data } })
   
  },
  beforeMount: function(){
    this._user = window.localStorage.user;
    if(!this._user){
      this._user = '{}';
    }
  },
  mounted: function(){
    console.log('markdown rander')
    setTimeout(()=>{

      let blocks = document.querySelectorAll('pre code');
      console.log(blocks.length)
      blocks.forEach((block) => {
        Hljs.highlightBlock(block)
      })
    }, 1000)
  }
}
</script>

<style>
  #content img{
    margin: 20px 0 20px 0;
    width: 100%;
  }
  #content h2 h3 h4 {
    margin-top:20px;
  }
  #content blockquote{
    padding: 20px;
    margin-bottom: 25px;
    background-color: #f7f7f7;
    border-left: 6px solid #b4b4b4;
    word-break: break-word!important;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    margin: 0 0 20px;
  }
  #content pre{
    margin-bottom: 20px;
    padding: 15px;
    font-size: 13px;
    word-wrap: normal;
    word-break: break-word!important;
    word-break: break-all;
    white-space: pre;
    overflow: auto;
    border-radius: 4px;
    display: block;
    color: #abb2bf;
    background: #282c34;
  }
  #content pre code{
    padding: 0;
    background-color: transparent;
    white-space: pre;
    border: none;
    font-size: 12px;
    vertical-align: middle;
    color: inherit;
    font-family: Menlo,Monaco,Consolas,Courier New,monospace;
  }
  #content p code{
    padding: 2px 4px;
    background-color: #282c34;
    border: none;
    font-size: 12px;
    white-space: pre-wrap;
    vertical-align: middle;
    color: #abb2bf;
    font-family: Menlo,Monaco,Consolas,Courier New,monospace;
  }
  #content li{
    line-height: 30px; 
  }
  #content  textarea{
    width: 100%;
    min-height: 200px;
    overflow: auto;  
    font-size: 16px;
    background-color: rgb(252, 255, 240);
  }
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


