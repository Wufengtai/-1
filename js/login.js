$(function(){
    var obut = document.getElementById('submit');
    var aInputs = document.getElementsByTagName('input');
    var omas = document.getElementById('mag');
    obut.onclick = function () {
        $ajax({
            method: "get",
            url: "../php/login.php",
            data: {
                username: aInputs[0].value,
                password: aInputs[1].value,

            },
            success: function (result) {
                // alert(result);

                var obj = JSON.parse(result);
                if (obj.code) {
                    omas.className = 'alert alert-danger';
                    omas.innerHTML = obj.massage;
                } else {
                    omas.className = 'alert alert-success';
                    omas.innerHTML = "登录成功";
                    setTimeout(function () {
                        window.location.href = 'zhuye.html?id=' + obj.id;
                    }, 2000);
                }
                omas.style.textAlign = 'center';
                omas.style.display = 'block';
                
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    $("span").on('click',function(){
    $(".container").slideToggle();
   })

})