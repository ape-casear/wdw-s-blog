<template>
  <div>
    <h1 :class="{FontWeightNormal:isClass}" v-on:click="click">{{msg}}</h1>
  </div>
</template>
<script>
export default {
  name: 'FirstRouter',
  data () {
    return {
      msg: 'hello vue',
      isClass: true
    }
  },
  methods: {
    click: function () {
      this.isClass = !this.isClass
    }
  }
}
</script>
<style scoped>
.FontWeightNormal{
  font-weight: normal;
}
</style>
