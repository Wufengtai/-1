$(function(){
var next = res = 0;
var bb = new block();
function block() {
    this.wai1 = $("#lunbo1");
    this.imglist = document.getElementsByTagName('img');
    this.liList = document.getElementsByClassName('li1')
}


//向左
block.prototype.zuo = function () {
    var that = this;
    that.imglist[res].style.display = 'none';
    that.liList[res].style.backgroundColor = 'black';
    that.liList[res].style.color = 'black';
    res = next;
    next++;
    that.imglist[res].style.display = 'block';
    that.liList[res].style.backgroundColor = 'yellow';
    that.liList[res].style.color = 'black';
    if (next == 5) {
        next = 0;
    }

}


//列表
block.prototype.listinit = function () {
    var that = this;
    listTimer = setInterval(function () {

        for (var i = 0; i < that.liList.length; i++) {
            that.liList[i].index = i;
            that.liList[i].onclick = function () {
                clearInterval(tuTime);
                that.imglist[res].style.display = 'none';
                that.liList[res].style.backgroundColor = 'black';
                that.liList[res].style.color = 'black';
                next = this.index;
                bb.zuo();

            }



        }
    }, 10)
}



//自动轮播
block.prototype.lunTu = function () {
    var that = this;

    tuTime = setInterval(function () {
        bb.zuo();
    }, 2000)


}

//鼠标检测
block.prototype.mouse = function () {
    var that = this;
        that.wai1.mouseover (function () {
            clearInterval(tuTime);
        })
        that.wai1.mouseout(function () {
            bb.lunTu();
        })
   

}
bb.lunTu();
bb.listinit();
bb.mouse();
})