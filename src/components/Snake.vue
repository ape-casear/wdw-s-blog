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
        <input type="radio" class="level" checked name="level" value="100" />fast
        <button  class="button" name="snakeAI"  @click="auto" >{{text}}</button>
        <button  class="button" name="snakeAI"  :disabled="disabled" @click="startgame" >点击开始游戏</button><br/>
        <div>score:<span style="color:red;">{{snakelength.length-3}}</span> <span style="margin-left:30px;">或者按w，a，d开始</span></div>
        <input type="button"  @click="click"  value="重新开始" v-show="youdie.youdie" />
        
    </center>
  </div>
</template>

<script>
import { running, wondering, goBack } from '../lib/snakeAI';
export default {
  data (){
      return {
          imgs: {num:16*16, },
          started: false,
          size: 16,
          youdie: {youdie: false},
          snakebody:[],
          snakelength: { length: 3},
          rows: [],
          snakeAI: false,
          text: 'Human模式',
          disabled: false,
          bottonStart: null
      }
  },
  methods: {
      auto(){
          this.snakeAI = !this.snakeAI;
          this.text = !this.snakeAI? 'Human模式':'SnakeAI模式';
      },
      startgame(){
          this.bottonStart({keyCode: 119});
      },
      click(){
          if(!this.started){
              return;
          }
          this.disabled = false;
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
            let that = this;
            //let snakeAI = this.snakeAI;
            let restBlock = [];
            let type = 0;
            let longStep = 0;
            this.started = true;
            let message = this.$message;
            const lastTail = {x: 0, y: 0}
            //console.log('snake mouted')
            //蛇头
            const snakeHead={"hx":9,"hy":8,"vector":"NORTH","img":null,"length": this.snakelength};
            const ballposition = {x: 0, y: 0}
            //砖块
            function block(x,y){
                this.bx=x;
                this.by=y;
                this.isSnakeBody=false;
                this.isBall=false;
                this.img=null;
            }
            //地图大小
            const size=this.size;

            var presscount=false; //按键次数  用来使interval函数只执行一次
            var die=false;
            //默认速度
            var speed=400;
            var _rows = this.rows;
            var _youdie = this.youdie;
            //给table（地图）初始化

                var table=document.querySelector('#table')
                //console.log(table.childNodes.length)

                for(let i_1=0;i_1<size;i_1++){
                    _rows[i_1]=new Array(size);
                }
                for(let i_2=0;i_2<size;i_2++){
                    for(let j_2=0;j_2<size;j_2++){
                        //每一个rows[][]就是一个小块 block
                        _rows[i_2][j_2]=new block(i_2,j_2);
                        restBlock.push({x:i_2, y:j_2})
                        //给每个block的附上img
                        var tempImg = table.childNodes[i_2*16+j_2];
                        _rows[i_2][j_2].img=tempImg;
                     
                
                    }
                }
                
                ////console.log(_rows[1][0].img.setAttribute('class','red'))
                //console.log(_rows[1].length)
                
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
                    that.disabled = true;
                    let index = Math.floor(Math.random()*restBlock.length)
                    var bx = restBlock[index].x
                    var by = restBlock[index].y
                    console.log(restBlock.length)
                    if(_rows[bx][by].isSnakeBody == false){
                        _rows[bx][by].isBall=true;
                        _rows[bx][by].img.setAttribute('class','red')
                        ballposition.x = bx;
                        ballposition.y = by;
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
                    try{
                        _rows[x][y].img.setAttribute('class','black')
                        _rows[x][y].isSnakeBody=false;
                        lastTail.x = x;
                        lastTail.y = y;
                        restBlock.push({x, y})
                    }catch(e){
                        console.log(x,y)
                    }
                }
                //检查有没有撞自己身上了
                function dieCheck(xx,yy){
                    if(_rows[xx][yy].isSnakeBody==true){
                        /* if(xx == snakelist[0] && yy == snakelist[1]){
                            return false;
                        } */
                        youDIE();
                        return true;
                    }
                    return false;
                }
                //吃到球了
                function checkBall(cx,cy){
                    //restBlock.push({x:snakeHead.hx, Y:snakeHead.hy})
                    restBlock.shift();
                    console.log('type:',type)
                    if(_rows[cx][cy].isBall==true){
                        type = (type + 1)%7;
                        longStep = 0;
                        snakeHead.length.length++;
                        _rows[cx][cy].isBall=false;
                        putBall();
                    }
                }
                //用来存放蛇身
                var snakelist= this.snakebody;
                
                //触发按键
                document.onkeypress = that.bottonStart = function(e){
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
                        if(that.snakeAI){
                        let error = 0;
                        try{
                            let start = {x: snakeHead.hx, y: snakeHead.hy};
                            let end = {x: snakelist[0],y: snakelist[1]}
                            let direction;
                            
                            direction = running(_rows, start, ballposition, false)
                           
                            //console.log('一次头找球执行完毕', direction)
                            //console.log('end', end)
                            //console.log('ballposition', ballposition)
                            let access = running(_rows, ballposition, end, true);
                            if( direction && access){
                                //console.log('向球前进-------OOO', direction)
                                if(snakeHead.length.length > 200 ){
                                    snakeHead.vector = goBack(_rows, start, lastTail, ballposition, true)
                                    longStep++;
                                    if(!snakeHead.vector){
                                        snakeHead.vector = direction;
                                    }
                                }else if(snakeHead.length.length > 120 && type == 6 && longStep < 200){
                                    console.log('难得一次绕着走－－－－－－－－')
                                    snakeHead.vector = goBack(_rows, start, lastTail, ballposition, true)
                                    longStep++;
                                    if(!snakeHead.vector){
                                        snakeHead.vector = direction;
                                    }
                                }else{
                                    console.log('我有绕着走？？？')
                                    snakeHead.vector = direction
                                }
                            }else{
                                //console.log(`向尾巴前进------->>>`)

                                

                                if(snakeHead.length.length > 300){
                                    let wonder = wondering(_rows, {x: snakeHead.hx, y: snakeHead.hy}, snakeHead.vector);
                                    console.log(wonder)
                                    if(running(_rows, wonder.point, lastTail, false)){
                                        snakeHead.vector = wonder.vector;
                                    }else{
                                        let seeTail = running(_rows, start, lastTail, false, ballposition);
                                        if(seeTail){
                                            snakeHead.vector = seeTail;
                                        }else{
                                            snakeHead.vector = wondering(_rows, start, snakeHead.vector).vector;
                                            console.log('瞎逛', snakeHead.vector)
                                        }
                                    }
                                }else{
                                    let vector = goBack(_rows, {x: snakeHead.hx, y: snakeHead.hy}, lastTail, ballposition)
                                    if(vector){
                                        console.log(vector)
                                        snakeHead.vector = vector;
                                    }else{
                                        console.log('没有vector')
                                        /* die = true
                                        clearInterval(inter) */
                                        let seeTail = running(_rows, start, lastTail, false, ballposition);
                                        if(seeTail){
                                            snakeHead.vector = seeTail;
                                        }else{
                                            snakeHead.vector = wondering(_rows, start, snakeHead.vector).vector;
                                            console.log('瞎逛', snakeHead.vector)
                                        }
                                    }
                                }
                            }
                            error--;
                            error = error < 0? 0 : error;
                        }catch(e){
                            error++;
                            if(error > 20){
                                clearInterval(inter)
                            }
                            console.log(e);
                            throw new Error('continue')
                            
                        }}
                        
                        setTimeout(function(){
                            //从蛇身记录器中取出之前被踩过的block的位置
                            let tempX=snakelist.shift();
                            let tempY=snakelist.shift();
                            if(die){
                                /* console.log(tempX,tempY)
                                console.log(snakeHead.hx,snakeHead.hy) */
                                _rows[snakeHead.hx][snakeHead.hy].img.setAttribute('class','head')
                            }else{
                                backToBlock(tempX,tempY);
                            }
                        },snakeHead.length.length*speed);
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
                           /*  setTimeout(function(){
                                let tempX=snakelist.shift();
                                let tempY=snakelist.shift();
                                backToBlock(tempX,tempY);
                            },snakeHead.length.length*speed); */
                            
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
                            /* setTimeout(function(){
                                let tempX=snakelist.shift();
                                let tempY=snakelist.shift();
                                backToBlock(tempX,tempY);
                            },snakeHead.length.length*speed); */
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
                            /* setTimeout(function(){
                                let tempX=snakelist.shift();
                                let tempY=snakelist.shift();
                                backToBlock(tempX,tempY);
                            },snakeHead.length.length*speed); */
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
		width:160px;
		height:160px;
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
    .head{
        background-color: rgb(76, 160, 38);
    }
    .red{
        background-color: rgb(255, 106, 106);
    }
    .button{
        height: 26px;
        width: 86px;
        padding: 3px 5px;
        margin-left: 10px;
        border-radius: 5px;
        font-size: 6px;
    }
</style>