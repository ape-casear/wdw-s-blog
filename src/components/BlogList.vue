<template>
    <div id="bloglist">
        <h1>BlogList</h1>
        <div v-for="blog of bloglist" :key="blog.id">
            {{blog.id}}--{{blog.blogtitle}}
        </div>
    </div>
</template>

<script>
export default {
  props:['bloglist'],
  data () {
      return {
          //bloglist:[],
          msg:''
      }
  },
  watch: {
      bloglist: function(){
          console.log('bloglist change')
      }
  }
}
</script>

<style>

</style>


