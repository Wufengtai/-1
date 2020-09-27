<?php
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "massage" => "");
 $text1 = $_GET{'text1'};
 $username = $_GET{"username"};
 $Name = $_GET{"Name"};
 $time1 = $_GET{"time1"};
 $g2_user = $_GET{"g2_user"};
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
    //插入入数据
$sql="UPDATE ge2 set web = '{$text1}',time1 = '{$time1}',ge2_name = '{$Name}',g2_user = '{$g2_user}' WHERE  ge2_id='{$username}' ANd web is null AND time1 is null";
//6.发送sql语句
$res = mysqli_query($link, $sql);
if (!$res) {
    $responseData["code"]= 5;
    $responseData["massage"] = "提交失败";
    //返回到前台页面
    echo json_encode($responseData);
    exit;//终止后续操作
} else {
    $responseData["massage"] = "提交成功";
    //返回到前台页面
    echo json_encode($responseData);
}





   //关闭数据库
   mysqli_close($link);
