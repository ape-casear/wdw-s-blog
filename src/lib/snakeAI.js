/**
 * if(蛇头看得见球，从球那也能看得到尾巴)｛
 *      去吃球
 * ｝else｛
 *      if（看得见尾巴）｛
 *          去尾巴那
 *      ｝else｛
 *          随便逛，贴着墙或者尾巴
 *      ｝
 * ｝
 */
import { underscore2 } from './underscore';
const _ = underscore2;

let orientation = {
    'Orientation_-1_0': 'NORTH',
    'Orientation_1_0': 'SOUTH',
    'Orientation_0_-1': 'WEST',
    'Orientation_0_1': 'EAST',
}
const display = function(){
    //if(this[0]&&this[0][0]){
        this.forEach(x=>{
            let arr = '';
            x.forEach(y=>{
                if(y == 1){
                    arr +=`\u001b[31m${y}\u001b[39m\t`;
                }else if(y == 88){
                    arr +=`\u001b[33m${y}\u001b[39m\t`;
                }else{
                    arr +=`${y}\t`;
                }
            })
            //console.log(arr)
            //console.log()
        })
   // }
}
function get2DimensionArr(rows){
    let length = rows.length;
    let map = new Array(length).fill(0);
    map = map.map(item=>{
        item = new Array(length).fill(0);
        return item;
    })
    for(let i = 0; i < rows.length; i++){
        for(let j = 0; j < rows[i].length; j++){
            if(rows[i][j].isSnakeBody){
                map[i][j] = 88;
            }
        }
    }
    /* if(options){
        options.forEach(line=>{
            for(let i = 0; i < line.length; i++){
                if(line.direction = 'x'){
                    map[line.x + i][line.y] = 88
                }else if(line.direction = 'y'){
                    map[line.x][line.y + i] = 88;
                }
            }
        })
    } */
    return map;
}
function checkPoint(x, y, map){
    if(x < 0 || x > map.length - 1 || y < 0 || y > map[0].length - 1 || map[x][y] != 0 ){
        return false;
    }
    return true;
}
function ManhattanDistense(start, end){
  /*   //console.log(start)
    //console.log(end) */
    let res = Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
    return res
}
/* //console.log(ManhattanDistense({x:1,y:1},{x:8,y:8}))
//console.log(ManhattanDistense({x:3,y:1},{x:8,y:8}))
return; */
function run(rows, start, end, tail, ballPosition){
    if(!end.x && !end.y && end.y !=0 && end.x != 0){
        return true;
    }
    //console.log(_.find)
    let result;
    
    //const map = get2DimensionArr([{x: 3, y: 5, direction: 'x', length: 3}]);
    const map = get2DimensionArr(rows)
    
    
    //let path = get2DimensionArr();
    class Point{
        constructor(x,y,p,s,c,m){
            this.x = x;
            this.y = y;
            this.parent = p;
            this.step = s;
            this.check = c;
            this.ManDis = m;
        }
    }
    let init_X = start.x;
    let init_Y = start.y;
    let end_X = end.x;
    let end_Y = end.y;
    if(tail){
        map[end_X][end_Y] = 0;
    }
    let util_arr = [[-1,0],[1,0],[0,-1],[0,1]]
    
    let open = [];
    let first = new Point(init_X, init_Y, null, 0, false)
    open.push(first)
    map[init_X][init_Y] = 1;
    let record = open.concat([]);
    let safe = 1000;
    let border = [];
    border.push(first)
    while(true){
        if(safe <= 0)break;
        if(map[end_X][end_Y] != 0){
            //console.log('找到路径')
            result = true;
            break
        }
        if(open.length == 0){
            break
        }
        
        
        let cur_point = open.shift();
        let temp_dnxb = [];
        for(let i = 0; i < 4; i++){
            border = border.map(item=>{
                if(cur_point.x == item.x && cur_point.y == item.y){
                    item.check = true;
                }
                return item;
            })
            let temp_x = cur_point.x + util_arr[i][0]
            let temp_y = cur_point.y + util_arr[i][1]
            if(checkPoint(temp_x, temp_y, map)){
                if(_.find(border, (item)=>{
                    return item.x == temp_x && item.y == temp_y;
                })){
                    ////console.log('出现重复的了',temp_x,temp_y)
                }else{
                    if(ballPosition){
                        border.push(new Point(temp_x, temp_y, cur_point, cur_point.step + 1, false, ManhattanDistense({x: temp_x, y: temp_y}, ballPosition)))
                    }else{
                        border.push(new Point(temp_x, temp_y, cur_point, cur_point.step + 1, false, ManhattanDistense({x: temp_x, y: temp_y}, {x: end_X, y: end_Y})))
                    }
                }
            }
        }
        
        border = border.filter(item=>{
            /* //console.log(map[item.x][item.y])
            //console.log(item) */
            return map[item.x][item.y] == 0 || item.check == false;
        })
    
        //border.forEach(item=>//console.log(item.x,item.y))
        ////console.log('****border.length',border.length)
        if(border.length == 0){
            //console.log('没有找到路径')
            result = false;
            break
        }
        let value;
        if(ballPosition){
            value = Math.max(...border.map(item=>item.ManDis))
            if(safe == 20){
                border.forEach(item=>console.log(item.ManDis))
                console.log(value)
            }
        }else{
            value = Math.min(...border.map(item=>item.ManDis))
        }
        temp_dnxb = border.filter(item=>{
            return item.ManDis == value;
        })
        temp_dnxb = temp_dnxb.map(item=>{
            let dx1 = item.x - end_X;
            let dy1 = item.y - end_Y;
            let dx2 = init_X - end_X;
            let dy2 = init_Y - end_Y;
            item.liner = Math.abs(dx1*dy2 - dx2*dy1)
            return item;
        })
        temp_dnxb = [_.max(temp_dnxb, (item)=>{
            return item.liner;
        })]
        ////console.log(temp_dnxb.length)
        ////console.log('open.length',open.length)
        //temp_dnxb.forEach(item=>//console.log(item.x,item.y))
        //console.log()
        temp_dnxb.map(item=>{
            let temp_x = item.x;
            let temp_y = item.y;
            let cur_point = item.parent;
            
            if(_.find(open, (item)=>{
                return item.x == temp_x && item.y == temp_y;
            })){
                ////console.log('出现重复的了',temp_x,temp_y)
            }else{
                open.push( item )
                record.push( item )
                /* console.log(item)
                console.log(cur_point) */
                map[temp_x][temp_y] = cur_point.step + 1;
            }
        })
        safe--;
    }







    ////console.log(record[record.length - 1])
    let last_point = record[record.length - 1];
    if(result){
        let curNode;
        while(last_point.parent){
            //path[last_point.x][last_point.y] = 1;
            curNode = last_point;
            last_point = last_point.parent;
        }
        //console.log(curNode)
        //console.log(last_point)
        let direction = "Orientation_" + (curNode.x - last_point.x) + "_" + (curNode.y - last_point.y );
        //console.log(orientation[direction])
        return orientation[direction];
    }else{
        return false;
    }
    
    //display.call(map)
    ////console.log('-----------------')
    //display.call(path)
}
function wonder(rows, start, direction){
    let util_arr = [[-1,0],[1,0],[0,-1],[0,1]]

    let wonder_map = get2DimensionArr(rows);
    let count = 0;
    let escape = '12';
    let nextPoint = [];
    for(let i=0; i < util_arr.length; i++){
        let temp_x = start.x + util_arr[i][0]
        let temp_y = start.y + util_arr[i][1]
        if(checkPoint(temp_x, temp_y, wonder_map)){
            if(wonder_map[temp_x][temp_y] == 0){
                count++;
                escape = "Orientation_" + util_arr[i][0] + "_" + util_arr[i][1];
            }
        }
        nextPoint.push({x:temp_x,y:temp_y})
    }
    if(count == 4){
        return {vector: 'NORTH', point: nextPoint[0]}
    }
    if(count == 3){
        if(direction == 'NORTH'){
            return {vector: 'WEST', point: nextPoint[2]}
        }else if(direction == 'WEST'){
            return {vector: 'SOUTH', point: nextPoint[1]}
        }else if(direction == 'SOUTH'){
            return {vector: 'EAST', point: nextPoint[3]}
        }else{
            return {vector: 'NORTH', point: nextPoint[0]}
        }
    }
    if(count == 2){
        if(direction == 'NORTH'){
            let west = !checkPoint(start.x, start.y-1, wonder_map) || wonder_map[start.x][start.y - 1]
            let east = !checkPoint(start.x, start.y+1, wonder_map) || wonder_map[start.x][start.y + 1]
            if(west || east){
                return {vector: 'NORTH', point: nextPoint[0]}
            }else{
                return {vector: 'WEST', point: nextPoint[2]}
            }
        }else if(direction == 'WEST'){
            let north = !checkPoint(start.x-1, start.y, wonder_map) || wonder_map[start.x - 1][start.y]
            let south = !checkPoint(start.x+1, start.y, wonder_map) || wonder_map[start.x + 1][start.y]
            if(south || north){
                return {vector: 'WEST', point: nextPoint[2]}
            }else{
                return {vector: 'SOUTH', point: nextPoint[1]}
            }
        }else if(direction == 'SOUTH'){
            let west = !checkPoint(start.x, start.y-1, wonder_map) || wonder_map[start.x][start.y - 1]
            let east = !checkPoint(start.x, start.y+1, wonder_map) || wonder_map[start.x][start.y + 1]
            if(west || east){
                return {vector: 'SOUTH', point: nextPoint[1]}
            }else{
                return {vector: 'EAST', point: nextPoint[3]}
            }
        }else{
            let north = !checkPoint(start.x-1, start.y, wonder_map) || wonder_map[start.x - 1][start.y]
            let south = !checkPoint(start.x+1, start.y, wonder_map) || wonder_map[start.x + 1][start.y]
            if(south || north){
                return {vector: 'EAST', point: nextPoint[3]}
            }else{
                return {vector: 'NORTH', point: nextPoint[0]}
            }
        }
    }
    if(count == 1){
        
        let tem = {
            'NORTH': {vector: 'NORTH', point: nextPoint[0]},
            'SOUTH': {vector: 'SOUTH', point: nextPoint[1]},
            'WEST': {vector: 'WEST', point: nextPoint[2]},
            'EAST': {vector: 'EAST', point: nextPoint[3]},
        }
        return tem[orientation[escape]]
        
    }
    if(count == 0){
        return {vector: 'NORTH', point: nextPoint[0]}
    }
}

function maxDistanceMove(rows, start, tail, ballPosition, canSeeBall){
    let util_arr = [[-1,0],[1,0],[0,-1],[0,1]]

    let wonder_map = get2DimensionArr(rows);
    let nextPoint = [];
    for(let i=0; i < util_arr.length; i++){
        let temp_x = start.x + util_arr[i][0]
        let temp_y = start.y + util_arr[i][1]
        if(checkPoint(temp_x, temp_y, wonder_map)){
            if(wonder_map[temp_x][temp_y] == 0){
                
                nextPoint.push({
                    point: {x: temp_x,y: temp_y}, 
                    distance: ManhattanDistense({x: temp_x, y: temp_y}, ballPosition),
                    escape: "Orientation_" + util_arr[i][0] + "_" + util_arr[i][1]
                })
            }
        }
    }
    nextPoint = _.sortBy(nextPoint, item=>{
        return item.distance;
    })
    for(let i = nextPoint.length - 1; i >= 0; i--){
        
        let access_tail = run(rows, nextPoint[i].point, tail, false);
        rows[nextPoint[i].point.x][nextPoint[i].point.y].isSnakeBody = true;
        let access_ball = run(rows, ballPosition, tail, false);
        rows[nextPoint[i].point.x][nextPoint[i].point.y].isSnakeBody = false;
        if(canSeeBall){
            if(access_tail && access_ball){
                return orientation[nextPoint[i].escape];
            }else{
                console.log( i+'没有');
            }
        }else{
            if(access_tail){
                return orientation[nextPoint[i].escape];
            }else{
                console.log( i+'没有');
            } 
        }
    }

}
export const running = run;
export const wondering = wonder;
export const goBack = maxDistanceMove;