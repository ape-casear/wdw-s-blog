<template>
  <div>
    <span @click="click"  >menu_1</span><span :class="{arrowUP:isShow, arrowDown:!isShow}"></span><br>
    <ul :class="{show:isShow, not_show:!isShow, position:true}">
            <li v-for="li in main_lis" :key="li.id" >
                <a>{{li.name}}</a>
            </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HeaderMenu',
  props: [],
  data () {
      return {
          main_lis: [{id:0,name:'blog'},{id:1,name:'game'}],
          isShow: false
      }
  },
  methods: {
      click:function(event){
        this.isShow = !this.isShow
      }
  }
}
</script>

<style scoped>
    a{
        text-decoration: none;
    }
    ul {
        list-style-type: none;
        padding: 0px;
        margin: 0px;
      
    }
    li {
        margin: 0px;
        padding: 0px;
    }
    li:hover,span:hover{
        background-color: rgb(204, 212, 193);
        cursor:pointer;
    }
    .show{
        display: inline-block;
    }
    .not_show{
        display: none;
    }
    .position{
        position: absolute;
    }
    .arrowDown{  
        display: inline-block;  
        margin: 3px;  
        border-left: 2px solid; border-bottom: 2px solid;  
        width: 3px; height: 3px;  
        transform: rotate(45deg);  
    }  
    .arrowUP{  
        display: inline-block;  
        margin: 3px;  
        border-left: 2px solid; border-bottom: 2px solid;  
        width: 3px; height: 3px;  
        transform: rotate(-45deg);  
    }  
</style>


