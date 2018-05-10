<template>
  <div>
    <span @click="click"  class="headermenu">{{dataFromApp.title}}</span><span :class="{arrowUP:isShow, arrowDown:!isShow}"></span><br>
    <ul :class="{show:isShow, not_show:!isShow, position:true}">
        <div style="background:white; border-radius: 6px"> 
            <li v-for="li in dataFromApp.main_lis" :key="li.id" >
                <a :href="'#/'+li.name" @click="click">{{li.name}}</a>
            </li>
        </div>
    </ul>
  </div>
</template>

<script>
import bus from "../bus";
export default {
  name: 'HeaderMenu',
  props: ['dataFromApp'],
  data () {
      return {
          main_lis: [{id:0,name:'blog'}, {id:1,name:'bloglist'}],
          isShow:false,
      }
  },
  methods: {
      click:function(event){
          this.isShow = !this.isShow;
         
       /*    for(let key in event.target){
              if(typeof event.target[key] == 'string'){
                  console.log(`key:${key}, value:${event.target[key]}`)
              }
          } */
          this.$emit('closeOther',{title: event.target.innerHTML});
          
      },
      close:function(){
          this.isShow = false;
      }
  },
  mounted: function(){
        
  }
}
</script>

<style scoped>
    a,span{
        text-decoration: none;
        opacity: 0.5;
        color: black;
    }
    ul {
        list-style-type: none;
        padding: 0px;
        margin: 0px;
      
    }
    li {
        width:60%;
        margin: 0px;
        padding: 4px;
        padding-right: 6px;
    }
    li:hover,span:hover,a:hover{
        /* background-color: rgb(241, 241, 231); */
        opacity: 1;
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


