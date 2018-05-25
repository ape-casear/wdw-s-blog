<template>
    <div class="write">
        <h1>好好学习，天天向上</h1>
        <div>
            <form method="post" action="http://www.weidongwei.com:88/blog" enctype="multipart/form-data">
                <center>
                    <table>
                        <tr>
                            <td><span>作者：</span></td><td><input type="text" value="wdw" name="author"/></td>
                        </tr>
                        <tr>
                            <td><span>类型：</span></td><td><input type="text" value="nodejs" name="type"/></td>
                        </tr>
                        <tr>
                            <td><span>标题：</span></td><td><input type="text" value="" name="title"/></td>
                        </tr>
                        <tr>
                            <td><span>内容：</span></td><td><input type="file" name="blog" multiple/></td>
                        </tr>
                        <tr>
                            <td><span>提交：</span></td><td><input type="submit" value="submit" /></td>
                        </tr>
                    </table>
                </center>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            author:'',
        }
    }
}
</script>

<style>
.write{
    min-height: 300px;
}
.write div{
    margin-top: 50px;
}
</style>
