<template>
  <div>
    <div id = "content">
      <vue-markdown :source="content"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown  from 'vue-markdown';
export default {
  name: "BlogMarkDown",
  data () {
      return {
        content: "# Hello First Blog"+"\r\n"+
          " &nbsp;&nbsp; 1. child_1"+"\r\n"+
          " &nbsp;&nbsp; 2. child_2"
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
  #content{
    position:relative;
    text-align: left;
    padding:10px;
  }
</style>


