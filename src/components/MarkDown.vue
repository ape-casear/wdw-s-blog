<template>
  <vue-markdown :source="content"></vue-markdown>
</template>

<script>
import VueMarkdown  from 'vue-markdown';
export default {
  name: "BlogMarkDown",
  data () {
      return {
        content: "# Hello First Blog"+"\r\n"+
          "* child_1"+"\r\n"+
          "* child_2"
      }
  },
  components: {
      VueMarkdown 
  }
}
</script>

<style>

</style>


