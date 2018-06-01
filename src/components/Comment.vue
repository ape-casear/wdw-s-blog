<template>
  <div class="comment_box" :data_id="toCommentData.bloglistid" >
      <h2>评论</h2>
      <div v-for="(comment,index) in toCommentData.comments" :key="comment.id">
        <div :name="comment.id">
          <span class="floor" >#{{index+1}}楼</span>
          <span class="comment_datatime">{{comment.comment_datetime}}</span>
          <span  >{{comment.author}}</span>
          <span class="reply" @click="open_reply" :name="comment.id">回复</span>
         
        </div>
        <div class="comment_main">
          <p>{{comment.comment}}</p>
        </div>
        <div v-if="comment.sub_comment" class="sub_comment" >
          <div v-for="(sub_comment, sub_index) in comment.sub_comment" :key="sub_comment.id">
            <div>
              <span class="sub_floor" >{{sub_index+1}}层</span>
              <span class="sub_comment_datatime">{{sub_comment.comment_datatime}}</span>
              <span  style="font-size:14px;">{{sub_comment.author}}</span>
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
  data(){
    return{
      bloglistid:0,
      author:'',
      content:'',
      parent:0
    }
  },
  data(){
    return {
      show_reply_input:false
    }
  },
  mounted:function(){
  
  },
  methods: {
    add_comment: function (event) {
      if(!window.localStorage.user){
        this.$confirm('评论需要先登录，是否登录?','提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'info'
        }).then(()=>{
          this.$router.push({name: 'Regist'})
        }).catch((()=>{}))
      }else{

        let add_comment = document.querySelector('div.comment_box textarea[name=add_comment]');
        console.log(add_comment.value)
        this.content = add_comment.value;
        this.bloglistid = document.querySelector('div.comment_box').getAttribute('data_id')
  
        this.$emit('add_comment', { bloglistid: this.bloglistid, author:'', comment: this.content, parent: this.parent} )
        add_comment.value = '';
      }
    },
    add_reply: function (data) {
      if(!window.localStorage.user){
        this.$router.push({name: 'Regist'})
      }
      
      this.bloglistid = document.querySelector('div.comment_box').getAttribute('data_id')
   
      this.$emit('add_reply', { bloglistid: this.bloglistid, author:'', comment: data.value, parent: this.parent} )
    },
    open_reply: function (event){
      if(!window.localStorage.user){
        this.$confirm('评论需要先登录，是否登录?','提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'info'
        }).then(()=>{
          this.$router.push({name: 'Regist'})
        }).catch((()=>{}))
      }else{

        let ele = event.target;
        let id = ele.getAttribute('name');
        this.parent = id;
        
        this.$prompt('虾说什么……','：）',{
          confirmButtonText: '回复',
          cancelButtonText: '取消',
          inputType: 'textarea',
          inputValidator: function(value){if(value==''){return false}else{return true}},
          inputErrorMessage: '别空着啊'
        }).then((value)=>{
          console.log(value.value)
          
          this.add_reply(value)
        }).catch(()=>{})
      }


    }
  }
}
</script>

<style>
  .reply_input{
    position: absolute;
  }
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

