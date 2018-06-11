<template>
    <div class="zhihu">
        <h3 style="margin:5px;">刚开始弄，目前是每天自动从知乎爬10篇高赞回答，顺便把热评也爬下来了 :)</h3>
        <el-collapse v-model="activeNames" @change="handleChange">
            
            <el-collapse-item  v-for="zhihu in toViewData" :key="zhihu.id" :title="zhihu.title" :name="zhihu.id">
                <div><span style="font-size:16px">
                    <a  target="_blank" :href="zhihu.author_link" style="text-decoration:underline;"><b>{{zhihu.author}}:</b></a>
                    </span><span class="like">{{zhihu.like}}</span></div>
                <div v-html="zhihu.content"></div>
                <h4>评论</h4>
                <div v-for="(comment, index) in zhihu.comments" :key="index" class="comment">
                    <div style="color: #999;">{{comment.name}}<span style="float: right; color: #999; font-size: .95em;">赞：{{comment.like}}</span></div>
                    <div style="min-height: 22px; word-wrap: break-word; color: #222;" v-html="comment.content"></div>
                    
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    props:['toViewData'],
    data() {
      return {
        activeNames: []
        
      };
    },
    created:function(){
        this.$emit('api_from_child',{name: this.$route.name, query: { } })
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
}
</script>

<style>
.zhihu .comment{
    border:rgb(216, 216, 198) solid 1px;
    background-color: rgb(243, 238, 232);
    border-radius: 3px;
}
.zhihu{
    text-align: left;
}
.zhihu .el-collapse-item__header{
    margin-left: 10px; 
    font-size: 16px;
    font-weight: 400;
}
.zhihu .el-collapse-item__content{
    margin-left:10px;
    margin-right:10px;
}
.zhihu .el-collapse-item__content img{
    max-width: 800px;
}
.zhihu .like{
    float: right;
    color:rgb(182, 83, 83);
    font-size: 14px;
}
</style>
