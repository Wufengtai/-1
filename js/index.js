$(function(){
    var obut = document.getElementById('submit');
    var aInputs = document.getElementsByTagName('input');
    var omas = document.getElementById('mag');
    var userid = null;
    obut.onclick = function () {
        $ajax({
            method: "post",
            url: "../php/user.php",
            data: {
                name: aInputs[0].value,
                username: aInputs[1].value,
                password: aInputs[2].value,

            },
            success: function (result) {
                // alert(result);
                var obj = JSON.parse(result);
                if (obj.code) {
                    omas.className = 'alert alert-danger';
                    omas.innerHTML = obj.massage;
                } else {
                    $ajax({
                        method: "post",
                        url: "../php/UserInID.php",
                        data: {
                            username: aInputs[1].value,

                        },
                        success: function (result) {
                            var obj1 = JSON.parse(result);
                            userid = obj1.id;
                            console.log(userid)
                            if (obj1.code) {
                                omas.className = 'alert alert-danger';
                                omas.innerHTML = obj1.massage;
                            } else {
                                $ajax({
                                    method: "post",
                                    url: "../php/userid.php",
                                    data: {
                                        id: userid

                                    },
                                    success: function (result) {
                                        var obj2 = JSON.parse(result);
                                        if (obj1.code) {
                                            omas.className = 'alert alert-danger';
                                            omas.innerHTML = obj2.massage;
                                        } else {
                                            omas.className = 'alert alert-success';
                                            omas.innerHTML = obj2.massage;
                                        }
                                    },
                                    error: function (msg2) {
                                        console.log(msg2);
                                    }
                                })
                            }
                        },
                        error: function (msg) {
                            console.log(msg);
                        }
                    })

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