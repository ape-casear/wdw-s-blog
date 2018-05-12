<template>
  <div class="aside02">
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <div>
          <h4>分类</h4>
      </div>
      <div class="el_button" v-for="type in toAside02Data.types" :key="type.name" >
          <el-row>
            <el-button  :name="type.name" round size="mini" click="javascript:void(0)" @click="click">{{type.name}}</el-button> <span style="font-size:14px; opacity:0.8;">{{type.count}}</span>
          </el-row>
      </div>
  </div>
</template>

<script>
export default {
  props:['toAside02Data'],
  methods:{
      click: function(event){
          console.log(event.target.tagName)
          let type;
          if(event.target.tagName == "SPAN"){
              type = event.target.innerHTML;
              
          }else if(event.target.tagName == "BUTTON"){
              let spans = event.target.getElementsByTagName('span');
              console.log(spans.length)
              type = spans[0].innerHTML;
          }
          if(type == '闲聊'){
              type = 'chart';
          }
          console.log(type)
      
          this.$router.push({name: 'BlogList', query: { type } ,params:{ type}});  
      }
  }
}
</script>

<style>
.aside02{
    min-height: 100px;
}
.el_button button{
    margin-left:0px;
}
.el_button span{
    float: right;
}
</style>
