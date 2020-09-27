
<?php
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "massage" => "");
// var_dump($_POST);
$username = $_POST{'username'};
$pass = $_POST{"password"};
$name = $_POST{"name"};
if (!$username) {
    $responseData["code"]=1;
    $responseData["massage"] = "账号不能为空";
    echo json_encode($responseData);
    exit;
}
if (!$pass) {
    $responseData["code"]=2;
    $responseData["massage"] = "密码不能为空";
    echo json_encode($responseData);
    exit;
}
if (!$name) {
    $responseData["code"]=2;
    $responseData["massage"] = "昵称不能为空";
    echo json_encode($responseData);
    exit;
}
//1.连接数据库
$link = mysqli_connect($host = '49.234.231.179', $user = 'root', $password = 'wft123', $database = 'test', $port = '3306');
   
   if (!$link) {
       $responseData["code"]=3;
       $responseData["massage"] = "数据库连接失败";
       //返回到前台页面
       echo json_encode($responseData);
       exit;//终止后续操作
   }
   //3.设置字符集
   mysqli_set_charset($link, 'utf8');
   //4.选择数据库
   mysqli_select_db($link, "test");
   //查重
    $sql1 = "SELECT * FROM ge  WHERE username = '{$username}' OR name = '{$name}'";
    //发送sql语句
    $res1 = mysqli_query($link, $sql1);
    $row1 = mysqli_fetch_assoc($res1);
    if ($row1) {
        $responseData["code"]= 4;
        $responseData["massage"] = "用户或者名称存在！！";
        //返回到前台页面
        echo json_encode($responseData);
        exit;//终止后续操作
    } else {
        //密码加密
        $str = md5(md5(md5($pass)."xxx")."yyy");
        //5.准备sql语句
        $sql = "INSERT INTO ge(name,username,password) VALUES('{$name}','{$username}','{$str}')";
        //6.发送sql语句
        $res = mysqli_query($link, $sql);
        if (!$res) {
            $responseData["code"]= 5;
            $responseData["massage"] = "数据插入失败";
            //返回到前台页面
            echo json_encode($responseData);
            exit;//终止后续操作
        } else{
            $responseData["massage"] = "注册成功";
            //返回到前台页面
            echo json_encode($responseData);
        }
    }
//关闭数据库
mysqli_close($link);

 
  ?>