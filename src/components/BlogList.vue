<template>
    <div id="bloglist">
        <h1>BlogList</h1>
        <div style="display: block; height:30px; ">
            <div style="float: right">
                <span>排序：</span>
                <span class="sort"><a>时间</a></span>
                <span class="sort"><a>热度</a></span>
            </div>
        </div>
        <div v-for="blog in toViewData" :key="blog.id" >
            <div class="blog">
                <span style="margin:0px;">：）</span>
                <span style="color:rgb(83, 20, 20); font-size:18px">{{blog.browse_count}}</span>
                <span><a class="bloghref" href="javascript:void(0)" @click="clickBlog" :name="blog.id+'::'+blog.browse_count+'::'+blog.pub_date
                    +'::'+blog.like+'::'+blog.author" >{{blog.title}}</a></span>
                <span style="color:rgb(60, 20, 20); font-weight:400;" class="right">{{blog.author}}</span>
                <span class="right">{{blog.pub_date}}</span>
                <span class="right">{{blog.like}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:['toViewData'],
  data () {
      return {
          //bloglist:[],
          msg:'',
          isShow: false
      }
  },
  watch: {
      bloglist: function(){
          console.log('toViewData change')
      }
  },
  mounted:function (){
     
  },
  methods: {
       clickBlog: function (event) {
           let blog = event.target;
          
           this.$router.push({name:'Blog', query: {id: blog.getAttribute('name')}})
       },
       sort: function () {
            this.isShow = !this.isShow;
       }
  }
}
</script>

<style>
.sort{
    border: 1px solid  rgb(202, 197, 169);
    border-radius: 8%;
    margin-right: 10px;
}
.sort > a{
    color:  rgb(112, 108, 87);
}
.sort:hover{
    background-color:  rgb(236, 234, 218);
}
.blog{
    padding:10px;
    background-color: rgb(220, 228, 227);
    margin-bottom: 8px;
    -webkit-box-shadow: 5 5px 8px 5 rgba(0,0,0,0.05);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    /* border-radius: 5px; */
    /* background: -moz-linear-gradient(top, #e4e0e0 0%, #bdb6b6 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e4e0e0), color-stop(100%,#bdb6b6));
    background: -webkit-linear-gradient(top, #e4e0e0 0%,#bdb6b6 100%);
    background: -o-linear-gradient(top, #e4e0e0 0%,#bdb6b6 100%);
    background: -ms-linear-gradient(top, #e4e0e0 0%,#bdb6b6 100%);
    background: linear-gradient(to bottom, #e4e0e0 0%,#bdb6b6 100%); */
}
.blog:hover{
    background-color: rgb(241, 231, 231);
}
.bloghref{
    text-decoration: none;
    opacity: 0.5;
    color:rgb(31, 29, 29);

}
.bloghref:hover{
    font-weight:600;
    text-decoration: none;
    opacity: 1;
    color:rgb(83, 14, 14);
}
.blog > span{
    margin-left :3px;
    margin-right:10px;
}
.right{
    float:right;
}
#bloglist{
   text-align: left;
}
</style>


