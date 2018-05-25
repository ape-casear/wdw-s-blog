<template>
    <div class="zhihu">
        <h3 style="margin:5px;">刚开始弄，目前是每天自动从知乎爬10篇高赞回答，有时间再把每篇的热评也顺便爬一下 :)</h3>
        <el-collapse v-model="activeNames" @change="handleChange">
            
            <el-collapse-item  v-for="zhihu in toViewData" :key="zhihu.id" :title="zhihu.title" :name="zhihu.id">
                <div><span style="font-size:16px">
                    <a  target="_blank" :href="zhihu.author_link" style="text-decoration:underline;"><b>{{zhihu.author}}:</b></a>
                    </span><span class="like">{{zhihu.like}}</span></div>
                <div v-html="zhihu.content"></div>
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
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
}
</script>

<style>
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
