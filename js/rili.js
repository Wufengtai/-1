$(function(){
var pre = document.getElementById('prev');
var next1 = document.getElementById('next1');
var year = document.getElementById('year');
var dat = document.getElementsByClassName('li4');
var dat2 = document.getElementsByTagName('i');
var date = document.getElementById('li2');
var shijian = document.getElementById('shijian');
var month = 0;
var y = 0;
var day = 0;
function init() {
    var now1 = new Date();
    day = now1.getDate();
    month = now1.getMonth() + 1;
    date.innerHTML = month + "月";
    y = now1.getFullYear()
    year.style.marginTop = "-40px"
    year.style.fontSize = "20px"
    year.innerHTML = y;
    pre.addEventListener('click', function () {
        if (y > 0) {
            y = y - 1;
            year.innerHTML = y;
        }
    }, false)

    next1.addEventListener('click', function () {
        y = y + 1;

        year.innerHTML = y;

    }, false)
    for (var i = 0; i < dat.length; i++) {
        var k = dat[i].outerHTML;
        var l = k.split(">");
        var h = parseInt(l[1]);
        if (h == day) {
            dat2[i].style.backgroundColor = 'red';

        }

    }

}


//时间
function time0() {
    setInterval(function () {
        var now = new Date();
        shijian.innerText = "当前北京时间" + now.getHours()
            + ":" + now.getMinutes() + ":" + now.getSeconds();
    }, 10)
}


time0();
init();
})