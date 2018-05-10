<template>
  <div class="comment_box">
      <h2>评论</h2>
      <div v-for="(comment,index) in toCommentData.comments" :key="comment.id">
        <div :name="comment.id">
          <span class="floor" >#{{index+1}}楼</span>
          <span class="comment_datatime">{{comment.comment_datatime}}</span>
          <span  >{{comment.user}}</span>
          <span class="reply" @click="add_reply" :name="comment.id">回复</span>
         
        </div>
        <div class="comment_main">
          <p>{{comment.comment}}</p>
        </div>
        <div v-if="comment.sub_comment" class="sub_comment" >
          <div v-for="(sub_comment, sub_index) in comment.sub_comment" :key="sub_comment.id">
            <div>
              <span class="sub_floor" >{{sub_index+1}}层</span>
              <span class="sub_comment_datatime">{{sub_comment.comment_datatime}}</span>
              <span  style="font-size:14px;">{{sub_comment.user}}</span>
            </div>
            <div class="sub_comment_main">
              <p>{{sub_comment.comment}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="add_comment">
        <h3>添加评论</h3>
        <textarea class="textarea"  name="add_comment" placeholder="说些什么……" wrap="physical"/>
        
          <button  name="submit" value="提交" @click="add_comment">提交</button>
   
      </div>
      
  </div>
</template>

<script>
export default {
  props: ['toCommentData'],
  methods: {
    add_comment: function (event) {
      console.log(this.$ajax)
    },
    add_reply: function (event) {
      let ele = event.target;
      console.log(ele) 
      let id = ele.getAttribute('name');
      console.log(id)
      this.$emit('add_reply',)
    }
  }
}
</script>

<style>
  .add_comment > textarea{
    width: 100%;
    min-height: 100px;
    overflow: auto;  
    font-size: 16px;
    background-color: rgb(252, 255, 240);
  }
  button{
    padding: 5px 5px;
    margin-bottom: 10px;
    font-size: 16px;
  
  }
  .reply{
    float:right;
    color:rgb(87, 116, 35);
    font-size: 15px;
  }
  .reply:hover{
    cursor: pointer;
    color:rgb(121, 158, 53);
  }
  .floor{
    font-weight: 600;
    font-size: 17px;
    color:rgb(219, 101, 101);
  }
  .comment_datatime{
    opacity: 0.7;
    margin-right: 10px;
  }
  .comment_main > p{
    margin: 10px;
  }
  .sub_comment{
    background-color: rgb(236, 235, 235);
  }
  .sub_floor{
    margin-left: 50px;
    font-weight: 300;
    font-size: 14px;
    color:rgb(182, 101, 101);
  }
  .sub_comment_datatime{
   
    opacity: 0.7;
    margin-right: 10px;
    font-size: 14px;
  }
  .sub_comment_main > p{
 
    font-size: 14px;
    margin-left:   50px;
  }
  .comment_box{
    margin:10px;
  }
</style>

