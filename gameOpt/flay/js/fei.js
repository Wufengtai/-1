//背景轮播
var bei = document.getElementById('bei');
var jsbg1 = document.getElementById('bei2');
var jsbg2 = document.getElementById('bei3');
var feiji1 = document.getElementById('feiji');
//分数
var count = 0;
var timer = setInterval(function(){
    jsbg1.style.top = jsbg1.offsetTop + 1 + "px";
    jsbg2.style.top = jsbg2.offsetTop + 1 + "px";
    if(jsbg1.offsetTop >= 660){
        jsbg1.style.top = "-660px";
    }else {
        if(
            jsbg2.offsetTop >= 660
        ){
            jsbg2.style.top = "-660px";
        }
    }
},10)

feiji1.addEventListener("mousedown",function(e){
    var ev =e || window.event;
    basex = ev.pageX;
    basey = ev.pageY;

    moveX = 0;
    moveY = 0;

//给屏幕添加移动事件
    bei.addEventListener("mousemove",function(e){
        var en = e || window.event;   
        moveX = en.pageX - basex;
        basex = en.pageX;
        moveY = en.pageY - basey;
        basey = en.pageY;

        feiji1.style.left = feiji1.offsetLeft + moveX + "px";
        feiji1.style.top = feiji1.offsetTop + moveY + "px";

     
        
    },false)
},false)

//子弹
var timerBull = setInterval(function(){
     var bullent = document.createElement('div');
     bei.appendChild(bullent);
     bullent.className = "bull";
     bullent.style.left = feiji1.offsetLeft + 40 + "px";
     bullent.style.top = feiji1.offsetTop - 10 + "px";
    

     var feidan = setInterval(function(){
         bullent.style.top = bullent.offsetTop - 5 + "px";
         if(bullent.offsetTop <= -20){
             clearInterval(feidan);
             bei.removeChild(bullent);
         }   
     },20)
     bullent.timer = feidan;
},500)
//随机数字
function randonNum(min,max){
        return parseInt(Math.random() * (max - min) + min);
}

//敌机
 
var timerdi = setInterval(function(){
        var diji = document.createElement('div');
        bei.appendChild(diji);
        diji.className = "diji";
        diji.style.left = randonNum(0,480) + "px";
        diji.style.top = "0px";

        var feidiji = setInterval(function(){
            diji.style.top =diji.offsetTop + 10 + "px";
            if(diji.offsetTop >= 660){
                clearInterval(feidiji);
                bei.removeChild(diji);
            }   
        },1000)
        diji.timer = feidiji;
},1000)

//碰撞试验
var pztimer = setInterval(function(){
    var Allzidan = document.getElementsByClassName("bull");
    var Alldiji = document.getElementsByClassName("diji");
    
    
    for(var i =0; i < Allzidan.length; i++){
        for(var j = 0; j < Alldiji.length; j++){
            var b = Allzidan[i];
            var t = Alldiji[j];
            if(fei(b,t)){
                count++;
                clearInterval(b.timer);
                clearInterval(t.timer);
                bei.removeChild(b);
                bei.removeChild(t);
                
            }
            
    
        }
    }
},200)

//死亡
var die = setInterval(function(){
    var Alldiji = document.getElementsByClassName("diji");
    var fenshu = document.createElement('div');
    var xin = document.getElementById('button');
    fenshu.className = "fenshu";
    for(var k =0; k < Alldiji.length; k++){
        var a = Alldiji[k];
        if(fei(feiji1,a)){
            for(var i = 0; i < 100; i++){
                clearInterval(i);
            }
            fenshu.innerText = "游戏结束！得分：" + count + '\n' + "再接再厉"+ '\n' +"！！！！！";
                bei.appendChild(fenshu);
          xin.style.visibility = "visible";
          xin.addEventListener("click",function(){
                window.location.reload();
          },false)
            
        }
    }

},50)

 

//碰撞函数
function fei(fei1,fei2){
    var feileft1 = fei1.offsetLeft;
    var feiwidth1 = feileft1 + fei1.offsetWidth;
    var feitop1 = fei1.offsetTop;
    var feiheight1 = feitop1 + fei1.offsetHeight;


    var feileft2 = fei2.offsetLeft;
    var feiwidth2 = feileft2 + fei2.offsetWidth;
    var feitop2 = fei2.offsetTop;
    var feiheight2 = feitop2 + fei2.offsetHeight;


    if(!(feileft1 > feiwidth2 || feiwidth1 < feileft2 || feitop1 > feiheight2 || feiheight1 < feitop2)){
        return true;
    }else{
        return false;
    }

}





