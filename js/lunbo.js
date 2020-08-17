var next = res = 0;
var bb = new block();
function $(id){
    return document.getElementById(id);
}

function block(){
    this.wai1 = $('lunbo1');
    this.imglist = document.getElementsByTagName('img');
    this.liList = document.getElementsByClassName('li1')
    this.but1 =$('but1');
    this.but2 =$('but2');
}


//向左
block.prototype.zuo=function(){
    var that = this;
    that.imglist[res].style.display = 'none';
    that.liList[res].style.backgroundColor = 'black';
    that.liList[res].style.color = 'black';
    res = next;
    next ++;
    that.imglist[res].style.display = 'block';
    that.liList[res].style.backgroundColor = 'yellow';
    that.liList[res].style.color = 'black';
    if(next == 5){
        next = 0;
    }
    
}

//按钮
block.prototype.but=function(){
    var that = this;
    that.but1.addEventListener('click',function(){
        that.imglist[next].style.display = 'none';
        that.liList[next].style.backgroundColor = 'black';
        that.liList[next].style.color = 'black';
        //显示
        that.imglist[res].style.display = 'block';
        that.liList[res].style.backgroundColor = 'yellow';
        that.liList[res].style.color = 'black';
        next = res;
        res--;
        if(res == -1){
            res = 4;
        }
      
    },false)

    that.but2.addEventListener('click',function(){
       
        bb.zuo();
    },false)

}

//列表
block.prototype.listinit=function(){
    var that = this;
    listTimer = setInterval(function(){
        
        for(var i = 0;i<that.liList.length;i++){
               that.liList[i].index = i;
               that.liList[i].onclick=function(){
               clearInterval(tuTime);
               that.imglist[res].style.display = 'none';
               that.liList[res].style.backgroundColor = 'black';
               that.liList[res].style.color = 'black';
                next = this.index;
                bb.zuo();

               }
               

            
        }
    },10)
}



//自动轮播
block.prototype.lunTu=function(){
    var that = this;

    tuTime=setInterval(function(){
        bb.zuo();       
    },2000)


}

//鼠标检测
block.prototype.mouse=function(){
var that = this;
    mousetime=setInterval(function(){
        that.wai1.onmouseover = function () {
            clearInterval(tuTime);
            that.but1.style.display = 'block';
            that.but2.style.display = 'block';
        
        
         }
         that.wai1.onmouseout= function () {
            that.but1.style.display = 'none';
            that.but2.style.display = 'none';
            bb.lunTu();
         }
    },50)

}
bb.lunTu();
bb.but();
bb.listinit();
bb.mouse();