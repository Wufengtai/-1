// method,url,data,形参success（数据下载成功以后），error（数据下载失败以后）
function $ajax({ method = "get", url, data, success, error }) {

    var xhr = null;
    try {
        //1.创建ajax对象(try处理？)
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //判断如果数据存在
    if (data) {
        data = querystring(data);
    }
    //2.open方法（get和post）
    if (method == "get" && data) {
        url += "?" + data;
    }
    xhr.open(method, url, true);

    if (method == "get") {
        //发送请求
        xhr.send();
    } else {
        //3设定请求头，指明body中的数据是何格式
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //发送请求
        xhr.send(data);
    }


    //等待数据响应
    xhr.onreadystatechange = function () {
        //当xhr对象的readyState属性发生了改变，这个事件就会触发
        //readyState：0===》xhr对象已经创建，但是还没有进行初始化操作，1===》xhr对象已经调用了open，2===》xhr已经发出ajax请求
        //3===》已经返回了部分数据，4===》数据以及全部返回
        if (xhr.readyState == 4) {
            //判断本次下载的状态码都是多少
            if (xhr.status == 200) {
                // //数据放在了xhr.responseText的属性中（String）
                // document.querySelector('h1').innerHTML = xhr.responseText;  

                //如何去处理数据操作不确定，回调函数，
                //判断success和error存不存在
                if (success) { success(xhr.responseText); }

            } else {
                if (error) { error("ERROR:" + xhr.status); }

            }
        }
    }


}

// ?name1=value1   search
//name1=value1&name2=value2  querystring  (*)
//拼接
function querystring(obj) {
    var str = "";
    for (var attr in obj) {
        str += attr + "=" + obj[attr] + "&";
    }
    //从零开始
    return str.substring(0, str.length - 1);

}
        //用法
    //   var str = querystring({
    //         name1:"value1",
    //         name2:"value2",
    //         name3:"value3"
    //     });