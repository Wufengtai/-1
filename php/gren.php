<?php
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "massage" => "");
// var_dump($_POST);
$username = $_POST{"username"};
if (!$username) {
    $responseData["code"]=1;
    $responseData["massage"] = "账号不能为空";
    echo json_encode($responseData);
    exit;
}
//1.连接数据库
// $link = mysqli_connect("localhost", "root", "");
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
   $sql ="SELECT * FROM ge WHERE id='{$username}'";
   //发送sql语句
   $res = mysqli_query($link, $sql);
   $row = mysqli_fetch_assoc($res);
   if (!$row) {
       $responseData["code"]= 4;
       $responseData["massage"] = "账号或者密码错误！";
       echo json_encode($responseData);
   } else {
    
    // while ($row = mysqli_fetch_assoc($res)) {
       //     //数据插入空数组
       //     array_push($arr, $row);
       // }
       //最后转成字符串输出
       echo json_encode($row);
   }
   


   //关闭数据库
mysqli_close($link);
