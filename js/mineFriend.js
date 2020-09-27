$(function () {
    var url = window.location.toString();
    var str = url.indexOf("?");
    var str1 = url.substr(str + 1);
    var st = str1.split("?");
    var st1 = st[0].split("=");//st1[1]为id
    var st2 = st[1].split("=");//st2[1]为名称
    var st3 = st[2].split("=");
    var a1 = document.getElementById('a1');
    var a2 = document.getElementById('a2');
    var a3 = document.getElementById('a3');
    var a4 = document.getElementById('a4');
    var Fdiv = document.getElementById('F');
    var Fh4 = document.createElement('h4');
    var Fbut1 = document.createElement('button');
    var Fbut2 = document.createElement('button');
    var friend_id = '';
    var FrName = '';
    var num = '';
    var fanhuizhi = '';
    var friendid = '';
    a1.href = './write.html?user=' + st1[1] + '?name=' + st2[1] + '?username=' + st3[1];
    a2.href = '../zhuye.html?user=' + st1[1];
    a3.href = './mine.html?user=' + st1[1];
    a4.href = './mineFriend.html?user=' + st1[1] + '?name=' + st2[1] + '?username=' + st3[1];
    var vm = new Vue({
        el: "#box",
        data: {
            class1: {
                left1: false,
            },
            class2: {
                SeeLeft: false,
                animate__animated: false,
                animate__pulse: false,

            },
            class3: {
                imgLeft: false,
            },
            class4: {
                WriteLeft: false,


            },
            istext: false,
            isCreated: true,
            class5: {
                animate__animated: false,
                animate__bounce: false,
            }
        },
        methods: {
            RightBut() {
                this.class1.left1 = !this.class1.left1
                this.class2.SeeLeft = !this.class2.SeeLeft
                this.class3.imgLeft = !this.class3.imgLeft
                this.class4.WriteLeft = !this.class4.WriteLeft
                this.istext = !this.istext
                this.isCreated = !this.isCreated
                this.class2.animate__animated = !this.class2.animate__animated
                this.class2.animate__pulse = !this.class2.animate__pulse
                this.class5.animate__animated = !this.class5.animate__animated
                this.class5.animate__bounce = !this.class5.animate__bounce

            }
        },
        computed: {
            show() {
                if (this.isCreated == true) {
                    $.post("../php/mineFriend.php",
                        {
                            Name: st1[1],
                        },
                        function (data, status) {
                            var obj = JSON.parse(data);
                            for (var i = (obj.length - 1); i >= 0; i--) {
                                var Onimg = document.createElement('img');
                                var Onh4 = document.createElement('p');
                                var Ondiv = document.createElement('div');
                                var Onspan = document.createElement('span');
                                var Onem = document.createElement('em');
                                var ONtext = document.getElementById('ONtext');
                                Onimg.src = "../music/tou.jpg";
                                var id = obj[i].ge2_name + '，账号为' + obj[i].g2_user;
                                Onh4.innerHTML = id;
                                Onh4.style.color = "blue";
                                Onspan.className = 'time';
                                Onem.innerText = obj[i].web;
                                Onspan.innerText = obj[i].time1 + '\n' + '\n';
                                ONtext.appendChild(Onimg);
                                ONtext.appendChild(Onh4);
                                ONtext.appendChild(Ondiv);
                                ONtext.appendChild(Onspan);
                                Ondiv.appendChild(Onem);
                            }
                            $('p').each(function (i, item) {
                                $(item).click(function () {
                                    if ($(this).is($('p').eq(i))) {
                                        Fdiv.style.display = 'block';
                                        Fh4.innerHTML = "是否添加:" + $(this).text() + "为好友"
                                        Fbut1.innerHTML = "确定";
                                        Fbut2.innerHTML = "取消";
                                        Fbut1.style.margin = '30px';
                                        Fbut1.style.marginLeft = '0px';
                                        Fbut1.style.backgroundColor = 'black';
                                        Fbut2.style.backgroundColor = 'black';
                                        var Fstr = $(this).text().split("，账号为");
                                        FrName = Fstr[0];
                                        friend_id = Fstr[1];
                                        Fdiv.appendChild(Fh4);
                                        Fdiv.appendChild(Fbut1);
                                        Fdiv.appendChild(Fbut2);
                                    }
                                });

                            });
                        });
                }




            },
            num() {
                $.post("../php/mineFriend2.php",
                    {
                        Name: st1[1],
                        mynum: st3[1],
                    },
                    function (data, status) {
                        var obj1 = JSON.parse(data);
                        if (obj1.length > 0) {
                            $("#TopRight").html("共有：" + obj1.length + "个待确认的新友").css("color", "red");
                            for (var j = 0; j < obj1.length; j++) {
                                var Rh4 = document.createElement('p');
                                var Rbut1 = document.createElement('button');
                                var Rbut2 = document.createElement('button');
                                var Rh5 = document.createElement('div');
                                var ShowRight = document.getElementById('ShowRight');
                                Rh4.className = 'Rh4';
                                Rh4.innerHTML = obj1[j].myname + '(' + obj1[j].myid + ')';
                                Rbut1.className = 'but1';
                                Rbut2.className = 'But';
                                Rbut1.innerHTML = "确定";
                                Rbut2.innerHTML = "拒绝";
                                Rh5.className = 'rh5';
                                Rh4.style.innerHTML = '\n';
                                ShowRight.appendChild(Rh4);
                                ShowRight.appendChild(Rbut1);
                                ShowRight.appendChild(Rbut2);
                                ShowRight.appendChild(Rh5);
                            }
                            $("#ShowRight .but1").click(function () {
                                num = 0;
                                fanhuizhi = 2;
                                console.log($(this).prev($(Rh4)).text());
                                var Rshow = $(this).prev($(Rh4)).text();
                                var Rid = Rshow.split('(')[1].split(')')[0];
                                console.log(Rshow.split('(')[1].split(')')[0]);
                                $.post("../php/mineFriend4.php",
                                    {
                                        Name: st1[1],
                                        Mid: st3[1],
                                        FID: Rid,
                                        fanhuizhi: fanhuizhi,
                                        Fyes: num,
                                    },
                                    function (data, status) {
                                        var obj2 = JSON.parse(data);
                                        console.log(obj2.massage)


                                    })
                                $(this).prev(Rh4).css("display", "none");
                                $(this).next(Rbut2).css("display", "none");
                                $(this).next().next().css("display", "none");
                                $(this).css("display", "none");
                            })


                            $("#ShowRight .But").click(function () {
                                num = 0;
                                fanhuizhi = 3;
                                console.log($(this).prev().prev().text());
                                var Rshow = $(this).prev().prev().text();
                                var Rid = Rshow.split('(')[1].split(')')[0];
                                console.log(Rshow.split('(')[1].split(')')[0]);
                                $.post("../php/mineFriend4.php",
                                    {
                                        Name: st1[1],
                                        Mid: st3[1],
                                        FID: Rid,
                                        fanhuizhi: fanhuizhi,
                                        Fyes: num,
                                    },
                                    function (data, status) {
                                        var obj2 = JSON.parse(data);
                                        console.log(obj2.massage)


                                    })
                                $(this).prev().prev().css("display", "none");
                                $(this).prev().css("display", "none");
                                $(this).next().css("display", "none");
                                $(this).css("display", "none");
                            })
                            $("#TopRight").on('click', function () {
                                $(".ButtonRight").slideToggle();
                            })

                        } else {
                            $("#TopRight").html("我的好友列表").css("color", "blue");
                            $.post("../php/mineFriend3.php",
                                {
                                    my: st3[1],
                                },
                                function (data, status) {
                                    var obj1 = JSON.parse(data);
                                    console.log(obj1)
                                    for (var j = 0; j < obj1.length; j++) {
                                        var Rimg = document.createElement('img');
                                        var Rh4 = document.createElement('p');
                                        var Rh5 = document.createElement('div');
                                        var ShowRight = document.getElementById('ShowRight');
                                        var Rbut = document.createElement('button');
                                        Rimg.src = "../music/tou.jpg"
                                        Rimg.style.marginTop = '15px';
                                        Rh4.className='Rh4';
                                        Rh4.innerHTML = obj1[j].friendName + '(' + obj1[j].friend + ')';
                                        Rh5.className = 'rh5';
                                        Rbut.innerHTML = "聊天";
                                        Rbut.className = 'but3'
                                        Rh4.style.innerHTML = '\n';
                                        ShowRight.appendChild(Rimg);
                                        ShowRight.appendChild(Rh4);
                                        ShowRight.appendChild(Rbut);
                                        ShowRight.appendChild(Rh5);
                                    }

                                })
                            $("#TopRight").on('click', function () {
                                $(".ButtonRight").slideToggle();

                            })
                        }
                    })
            },
        }
    })

    $(Fbut1).on('click', function () {
        console.log(st3[1])
        console.log()
        num = 1;
        fanhuizhi = 1;
        $ajax({
            method: "get",
            url: "../php/mineFriend0.php",
            data: {
                username: st1[1],
            },
            success: function (result) {
                var obj = JSON.parse(result);
                if (obj.code) {
                    console.log("创建2时失败")
                } else {

                    $.post("../php/mineFriend1.php",
                        {
                            my: st1[1],
                            Name: st3[1],
                            FrName1: FrName,
                            friend_id1: friend_id,
                            friendY: num,
                            fanhuizhi1: fanhuizhi,
                            myname: decodeURIComponent(st2[1]),
                        },
                        function (data, status) {
                            var obj1 = JSON.parse(data);
                            console.log(obj1)
                            if (obj1.code == 0) {
                                alert("添加请求发送成功！");
                            }
                            Fdiv.style.display = 'none';

                        })

                }


            },
            error: function (msg) {
                console.log(msg);
            }
        })

    })

    $(Fbut2).on('click', function () {
        Fdiv.style.display = 'none';
    })

})