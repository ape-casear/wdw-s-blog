<template>
  <div>
    <h1>贪吃蛇游戏</h1>
    <center>
        <div id="table">
            <span v-for="index in imgs.num" :key="index"  :name="index"  style="width:10px; height:10px; display: block; float: left;"><!-- {{index + 1}} --></span>
        </div>
        <!-- <span class='block'></span><br>
        <span class='block'></span><br> -->
        
        <input type="radio" class="level" name="level" value="200" />slow
        <input type="radio" class="level" name="level" value="150" />medium
        <input type="radio" class="level" name="level" value="100" />fast<br/>
        <div>score:{{snakelength.length-3}} <span style="margin-left:30px;">按w，a，d开始</span></div>
        <input type="button"  @click="click"  value="重新开始" v-show="youdie.youdie" />
        
    </center>
  </div>
</template>

<script>

export default {
  data (){
      return {
          imgs: {num:1296, },
          started: false,
          size: 36,
          youdie: {youdie: false},
          snakebody:[],
          snakelength: { length: 3},
          rows: []
      }
  },
  methods: {
      click(){
          if(!this.started){
              return;
          }
          for(let i=0; i<this.size; i++){
            for(let j=0; j<this.size; j++){
             
               
                this.rows[i][j].img.setAttribute('class','black');
                this.rows[i][j].isSnakeBody = false;
                this.rows[i][j].isBall = false;
                //把小块的图显示到table中，即是在div中
        
            }
          }
          //this.snakebody.splice(0, this.snakebody.length);
          this.snakebody = [];
          this.youdie.youdie = false;
          this.snakelength.length = 3;
          
          this.start();
       },
       start(){
            this.started = true;
            let message = this.$message;
            console.log('snake mouted')
            //蛇头
            const snakeHead={"hx":9,"hy":8,"vector":"NORTH","img":null,"length": this.snakelength};
            //砖块
            function block(x,y){
                this.bx=x;
                this.by=y;
                this.isSnakeBody=false;
                this.isBall=false;
                this.img=null;
            }
            //地图大小
            const size=36;

            var presscount=false; //按键次数  用来使interval函数只执行一次
            var die=false;
            //默认速度
            var speed=150;
            var _rows = this.rows;
            var _youdie = this.youdie;
            //给table（地图）初始化

                var table=document.querySelector('#table')
                console.log(table.childNodes.length)

                for(let i_1=0;i_1<size;i_1++){
                    _rows[i_1]=new Array(size);
                }
                for(let i_2=0;i_2<size;i_2++){
                    for(let j_2=0;j_2<size;j_2++){
                        //每一个rows[][]就是一个小块 block
                        _rows[i_2][j_2]=new block(i_2,j_2);
                        //给每个block的附上img
                        var tempImg = table.childNodes[i_2*36+j_2];
                        _rows[i_2][j_2].img=tempImg;
                     
                
                    }
                }
                
                //console.log(_rows[1][0].img.setAttribute('class','red'))
                console.log(_rows[1].length)
                
                //给蛇头上img
                var headImg=document.createElement("img");
                headImg.class='black';
                snakeHead.img=headImg;
                //设置lock，使得蛇每移动一次，才能有按键下一次的操作（防止按得太快，在蛇向下走的时候，在一次间隔内，按了左、上，就判断自己撞了自己）
                var lock=false;
                //按键判断
                function setVector(e){
                    if(lock){
                        return;
                    }
                    if(e.keyCode==119){
                        //alert("你按了w");
                        if(snakeHead.vector=="SOUTH"){ //向南走的过程中不能换方向向北
                            return;					
                        }
                        snakeHead.vector="NORTH";
                    }else if(e.keyCode==97){
                        //alert("你按了a");
                        if(snakeHead.vector=="EAST"){
                            return;					
                        }
                        snakeHead.vector="WEST";
                    }else if(e.keyCode==115){
                        //alert("你按了s");
                        if(snakeHead.vector=="NORTH"){
                            return;					
                        }
                        snakeHead.vector="SOUTH";
                    }else{
                        //alert("你按了d");
                        if(snakeHead.vector=="WEST"){
                            return;					
                        }
                        snakeHead.vector="EAST";
                    }
                    lock=true;
                }
                //放球
                function putBall(){
                    var bx=Math.floor(Math.random()*size);
                    var by=Math.floor(Math.random()*size);
                    if(_rows[bx][by].isSnakeBody==false){
                        _rows[bx][by].isBall=true;
                        _rows[bx][by].img.setAttribute('class','red')
                    }else{
                        putBall();
                    }
                }
                
                //死了
                function youDIE(){
                    _youdie.youdie = true;
                    message({message:"you die",type: 'warning'})
                    die=true;
                }
                //蛇身变回砖块
                function backToBlock(x,y){
                    _rows[x][y].img.setAttribute('class','black')
                    _rows[x][y].isSnakeBody=false;
                }
                //检查有没有撞自己身上了
                function dieCheck(xx,yy){
                    if(_rows[xx][yy].isSnakeBody==true){
                        youDIE();
                        return true;
                    }else{}
                        return false;
                }
                //吃到球了
                function checkBall(cx,cy){
                    if(_rows[cx][cy].isBall==true){
                        snakeHead.length.length++;
                        _rows[cx][cy].isBall=false;
                        putBall();
                    }
                }
                //用来存放蛇身
                var snakelist= this.snakebody;
                
                //触发按键
                document.onkeypress=function(e){
                    //设置方向			
                    setVector(e);
                    //如果是第一次以后按键事件，就直接return，不再开启新的线程执行setInterval了，
                    if(presscount){
                        return;
                    }
                    //若是点击了难度选择，就根据选择设置难度
                    var level = document.querySelector('.level:checked');
                    
                    if(level){speed=level.getAttribute('value');}
                    //蛇的移动
                    var inter=setInterval(function interval(){   
                        
                        if(snakeHead.vector=="NORTH"){
                            //撞墙判断
                            if(snakeHead.hx-1<0){
                                youDIE();
                                if(die==true){clearInterval(inter)}
                                return;
                            }
                            //撞身体判断
                            var check=dieCheck(snakeHead.hx-1,snakeHead.hy);
                            if(check){
                                clearInterval(inter);
                                return;
                            }
                            //砖块被蛇头踩过后变蛇身了
                            _rows[snakeHead.hx-1][snakeHead.hy].img.setAttribute('class','yellow')
                            _rows[snakeHead.hx-1][snakeHead.hy].isSnakeBody=true;
                            snakeHead.hx=snakeHead.hx-1;
                            checkBall(snakeHead.hx,snakeHead.hy);
                            //将被踩过的block的位置记录起来，snakelist蛇身中
                            snakelist.push(snakeHead.hx);
                            snakelist.push(snakeHead.hy);
                            //固定时间后（蛇身长度），蛇身变回砖块
                            setTimeout(function(){
                                //从蛇身记录器中取出之前被踩过的block的位置
                                let tempX=snakelist.shift();
                                let tempY=snakelist.shift();
                                backToBlock(tempX,tempY);
                            },snakeHead.length.length*speed);
                        }else if(snakeHead.vector=="WEST"){
                            if(snakeHead.hy-1<0){
                                youDIE();
                                if(die==true){clearInterval(inter)}
                                return;
                            }
                            var check=dieCheck(snakeHead.hx,snakeHead.hy-1);
                            if(check){
                                clearInterval(inter);
                                return;
                            }
                            _rows[snakeHead.hx][snakeHead.hy-1].img.setAttribute('class','yellow')
                            _rows[snakeHead.hx][snakeHead.hy-1].isSnakeBody=true;
                            snakeHead.hy=snakeHead.hy-1;
                            checkBall(snakeHead.hx,snakeHead.hy);
                            snakelist.push(snakeHead.hx);
                            snakelist.push(snakeHead.hy);
                            setTimeout(function(){
                                let tempX=snakelist.shift();
                                let tempY=snakelist.shift();
                                backToBlock(tempX,tempY);
                            },snakeHead.length.length*speed);
                            
                        }else if(snakeHead.vector=="SOUTH"){
                            if(snakeHead.hx+1>size-1){
                                youDIE();
                                if(die==true){clearInterval(inter)}
                                return;
                            }
                            var check=dieCheck(snakeHead.hx+1,snakeHead.hy);
                            if(check){
                                clearInterval(inter);
                                return;
                            }
                            _rows[snakeHead.hx+1][snakeHead.hy].img.setAttribute('class','yellow')
                            _rows[snakeHead.hx+1][snakeHead.hy].isSnakeBody=true;
                            snakeHead.hx=snakeHead.hx+1;
                            checkBall(snakeHead.hx,snakeHead.hy);
                            snakelist.push(snakeHead.hx);
                            snakelist.push(snakeHead.hy);
                            setTimeout(function(){
                                let tempX=snakelist.shift();
                                let tempY=snakelist.shift();
                                backToBlock(tempX,tempY);
                            },snakeHead.length.length*speed);
                        }else{
                            if(snakeHead.hy+1>size-1){
                                youDIE();
                                if(die==true){clearInterval(inter)}
                                return;
                            }
                            var check=dieCheck(snakeHead.hx,snakeHead.hy+1);
                            if(check){
                                clearInterval(inter);
                                return;
                            }
                            _rows[snakeHead.hx][snakeHead.hy+1].img.setAttribute('class','yellow')
                            _rows[snakeHead.hx][snakeHead.hy+1].isSnakeBody=true;
                            snakeHead.hy=snakeHead.hy+1;
                            checkBall(snakeHead.hx,snakeHead.hy);
                            snakelist.push(snakeHead.hx);
                            snakelist.push(snakeHead.hy);
                            setTimeout(function(){
                                let tempX=snakelist.shift();
                                let tempY=snakelist.shift();
                                backToBlock(tempX,tempY);
                            },snakeHead.length.length*speed);
                        }
                        lock=false;
                    },speed);
                    presscount=true;
                    putBall();
                };
       }
  },
  mounted: function () {
    	this.start();
	 
  }

}
</script>

	

<style>
    #table{
		width:360px;
		height:360px;
        background-color: #333;
	    -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
        box-shadow:  0 5px 10px rgba(0, 0, 0, 0.6);
	}
	.block{
		width:10px;
		height:10px;
        display: block;
        float: left;
	}
    .black{
        background-color: #333;
    }
    .yellow{
        background-color: rgb(253, 255, 113);
    }
    .red{
        background-color: rgb(255, 106, 106);
    }
</style>