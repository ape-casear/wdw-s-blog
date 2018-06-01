<template>

    <div id = "content" :name="toViewData.id">
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

      <div class="modify" v-if="JSON.parse(_user) && JSON.parse(_user).name =='wdw'">
        <span  class="sort" style="color:rgb(202, 197, 169);cursor:pointer;"  @click="open_modify"><i class="el-icon-edit"  >modify</i></span>
        <textarea :class="{'textarea': true, 'hidden': hide}"  v-model="bind_content" v-if="hide"/>
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
  }
}
</script>

<style>
  #content  textarea{
    width: 100%;
    min-height: 100px;
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


