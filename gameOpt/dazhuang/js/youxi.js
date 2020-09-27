//获取id函数
function $(id) {
    return document.getElementById(id);
}
var bb = new block();
//随机数
function randonNum(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

//初始化函数
var ball = document.getElementById('qiu');
var wai = document.getElementById('wai3');
var ban = document.getElementById('ban');
var fen = 0;
var ci = 0;
function block() {
    this.list = document.getElementsByTagName('li');
    this.time1 = $('span1');
    this.tai = $('span2');
    this.cishu = $('span3');
    this.defen = $('span4');
    this.but = $('but');
    this.listLeft = 0;
    this.listtop = 0;
    this.bollx = 1;
    this.bolly = -1;
}

//摆放方块
block.prototype.init = function () {
    for (var i = 0; i < this.list.length; i++) {
        this.list[i].style.backgroundColor = "rgb(" + randonNum(0, 255) + "," + randonNum(0, 255) + "," + randonNum(0, 255) + ")";
        var x = this.listLeft * this.list[0].offsetWidth;
        var y = this.listtop;
        this.list[i].style.left = x + "px";
        this.list[i].style.top = y + "px";
        this.listLeft++;

        if ((i + 1) % 10 == 0) {
            this.listLeft = 0;
            this.listtop += this.list[0].offsetHeight;
        }

    }
}




//小球滚动
block.prototype.ballinit = function () {
    var that = this;
    balltime = setInterval(function () {
        ball.style.left = ball.offsetLeft + that.bollx + "px";
        ball.style.top = ball.offsetTop + that.bolly + "px";
        if (ball.offsetLeft >= (wai.offsetLeft + wai.offsetWidth - 40)) {
            that.bollx *= -1;
        }

        if (ball.offsetTop <= 0) {
            that.bolly *= -1;
        }

        if (ball.offsetLeft <= 0) {
            that.bollx *= -1;
        }

        if (ball.offsetTop >= (wai.offsetTop + wai.offsetHeight - 40)) {
            //游戏结束
            clearInterval(balltime);
            clearInterval(bantime);
            clearInterval(fantime);
            var jieshu = document.createElement('div');
            jieshu.className = 'jieshu';
            jieshu.innerHTML = "游戏结束";
            wai.appendChild(jieshu);
            that.tai.style.fontSize = "24px";
            that.tai.innerText = "游戏结束";
            that.cishu.style.color = "green";
            that.defen.style.color = "green";
            that.cishu.style.fontSize = "24px";
            that.defen.style.fontSize = "24px";
            that.cishu.innerHTML = ci;
            that.defen.innerHTML = fen;
            that.but.style.backgroundColor = 'red';
            that.but.innerText = "返回开始"
            that.but.addEventListener('click', function () {
                window.location.reload();


            }, false)

        }

    }, 10)
}
//挡板滑动
block.prototype.baninit1 = function () {
    var that = this;
    document.onkeydown = function (e) {
        var ev = e || window.event;
        //左键
        if (ev.keyCode == 37) {
            ban.style.left = ban.offsetLeft + -15 + "px";
            if (ban.offsetLeft <= 0) {
                ban.style.left = "0px";
            }
        }
        //右键
        if (ev.keyCode == 39) {
            ban.style.left = ban.offsetLeft + 15 + "px";
            if (ban.offsetLeft >= (wai.offsetLeft + wai.offsetWidth - 173)) {
                ban.style.left = wai.offsetLeft + wai.offsetWidth - 173 + "px";
            }
        }
    }
}

//小球与挡板碰撞
block.prototype.baninit = function () {
    var that = this;
    bantime = setInterval(function () {
        if ((ball.offsetTop + ball.offsetHeight) >= ban.offsetTop) {
            if (ball.offsetLeft >= ban.offsetLeft) {
                if (ball.offsetLeft <= (ban.offsetLeft + ban.offsetWidth)) {
                    that.bolly *= -1;
                    ci++;
                    that.cishu.style.color = "green";
                    that.cishu.style.fontSize = "24px";
                    that.cishu.innerHTML = ci;
                }
            }
        }

    }, 10)
}

//小球与方块碰撞
block.prototype.faninit = function () {
    var that = this;
    fantime = setInterval(function () {
        for (var i = 0; i < that.list.length; i++)
            if (ball.offsetTop <= (that.list[i].offsetTop + that.list[i].offsetHeight)) {
                if (ball.offsetLeft >= that.list[i].offsetLeft) {
                    if (ball.offsetLeft <= (that.list[i].offsetLeft + that.list[i].offsetWidth)) {
                        that.list[i].style.display = "none";
                        that.bolly *= -1;
                        fen++;
                        that.defen.style.color = "green";
                        that.defen.style.fontSize = "24px";
                        that.defen.innerHTML = fen;
                    }
                }
            }
    }, 10)

}
//信息模块
block.prototype.xinxiinit = function () {
    var that = this;
    that.but.addEventListener('click', function () {
        that.tai.style.color = "green";
        that.tai.style.fontSize = "24px";
        that.tai.innerText = "游戏开始";
        bb.ballinit();
        bb.baninit1();
        setInterval(function () {
            var time = new Date();
            that.time1.style.fontSize = "24px";
            that.time1.style.color = "green";
            that.time1.innerText = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + '\n' + time.getHours()
                + ":" + time.getMinutes() + ":" + time.getSeconds();
        }, 10)

    }, false)
}
bb.init();
bb.xinxiinit();
bb.baninit();
bb.faninit();


