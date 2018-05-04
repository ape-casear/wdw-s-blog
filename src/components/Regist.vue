<template>
  <div id="regist">
    <h1>{{msg}}</h1>
    <span>username:</span><input type="text" v-model="input_username"  placeholder="please type your name" style="width:140px">
    <input type="submit" value="submit" @click="submit"/>
  </div>
</template>

<script>
import bus from "../bus";
export default {
  name: 'Regist',
  data () {
    return {
      msg: 'Welcome to wdw\'s Vue.js App',
      input_username: '',
    }
  },
  methods: {
    submit: function () {
      console.log(this.input_username)
      bus.$emit('userlogin',{name:this.input_username,age:22})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  padding:20px;
  font-weight: normal;
}
#regist{
  height: 300px;
}

</style>
