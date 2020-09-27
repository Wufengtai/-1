$(function(){
var name2 = document.getElementById('name2');
var work = document.getElementById('work');
var Email = document.getElementById('Email');
var add = document.getElementById('address');
var ONtext = document.getElementById('ONtext');
var url = window.location.toString();
var str = url.indexOf("?");
var str1 = url.substr(str + 1);
var str2 = str1.split("=");
var zan1 = sou1 = 0;
var Onname = '';
var a1 = document.getElementById('a1');
var a2 = document.getElementById('a2');
var a3 = document.getElementById('a3');
var a4 = document.getElementById('a4');
$ajax({
    method: "post",
    url: "../php/gren.php",
    data: {
        username: str2[1],


    },
    success: function (result) {
        // alert(result);
        console.log(result);
        var obj = JSON.parse(result);
        console.log(obj.name, obj.text1);
        console.log(obj.massage)
        Onname = obj.name;
        name2.innerText = "网名：" + obj.name;
        work.innerHTML = "职业：" + obj.work;
        add.innerHTML = "现地址：" + obj.addres;
        Email.innerHTML = "Email:" + obj.eimal;
        a1.href = '../待开发网页/write.html?user=' + str2[1] + '?name=' + obj.name + '?username=' + obj.username;
        a2.href = '../待开发网页/mine.html?user=' + str2[1] ;
        a3.href = '../待开发网页/mineFriend.html?user=' + str2[1] + '?name=' + obj.name + '?username=' + obj.username;
        a4.href = '../zhuye.html?user=' + str2[1] + '?name=' + obj.name;
        var obutton = document.getElementById('obutton');
        var oin = document.getElementById('Ssou');
        obutton.onclick = function () {
            if (!oin.value) {
                alert('搜索的内容不为空！！')
            } else {
                diz = 'http://www.baidu.com/s?wd=' + oin.value;
                window.open(diz);
            }

        }

        $ajax({
            method: "post",
            url: "../php/gern1.php",
            data: {
                username: str2[1],
            },
            success:function(result){
                var obj1 = JSON.parse(result);
                for(var i = (obj1.length-1);i >= 0 ;i--){
                var Onimg = document.createElement('img');
                var Onh4 = document.createElement('h4');
                var Ondiv = document.createElement('div');
                var Onspan = document.createElement('span');
                var Onem = document.createElement('em');
                    Onimg.src = "../music/tou.jpg";
                    Onh4.innerHTML = Onname;
                    Ondiv.className = 'lead';
                    Onspan.className = 'time';
                    Onem.innerText = obj1[i].web;
                    Onspan.innerText = obj1[i].time1 + '\n' + '\n';
                ONtext.appendChild(Onimg);
                ONtext.appendChild(Onh4);
                ONtext.appendChild(Ondiv);
                ONtext.appendChild(Onspan);
                Ondiv.appendChild(Onem);
                }


            },
            error: function (msg) {
                console.log(msg);
            }
        })
    },
    error: function (msg) {
        console.log(msg);
    }
})
})
