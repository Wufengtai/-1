<?php
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "massage" => "");
 $UpGrader = $_GET{'UpGrader'};
 $Upage = $_GET{'Upage'};
 $Upiphon = $_GET{'Upiphon'};
 $Upaddres = $_GET{'Upaddres'};
 $Upemail = $_GET{'Upemail'};
 $Upwork = $_GET{'Upwork'};
 $Upuser = $_GET{"username"};
 if (!$Upuser) {
     $responseData["code"]=1;
     $responseData["massage"] = "无效地址";
     echo json_encode($responseData);
     exit;
 }
 if (!$UpGrader) {
     $responseData["code"]=1;
     $responseData["massage"] = "性别不能为空";
     echo json_encode($responseData);
     exit;
 }
 if (!$Upage) {
     $responseData["code"]=1;
     $responseData["massage"] = "年龄不能为空";
     echo json_encode($responseData);
     exit;
 }
if (!$Upiphon) {
    $responseData["code"]=1;
    $responseData["massage"] = "电话不能为空";
    echo json_encode($responseData);
    exit;
}
if (!$Upaddres) {
    $responseData["code"]=1;
    $responseData["massage"] = "地址不能为空";
    echo json_encode($responseData);
    exit;
}
if (!$Upemail) {
    $responseData["code"]=1;
    $responseData["massage"] = "邮箱不能为空";
    echo json_encode($responseData);
    exit;
}
if (!$Upwork) {
    $responseData["code"]=1;
    $responseData["massage"] = "职业不能为空";
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
//插入入数据
$sql="UPDATE ge set eimal = '{$Upemail}', addres = '{$Upaddres}', iphon = '{$Upiphon}', age = '{$Upage}', Gender = '{$UpGrader}', work = '{$Upwork}' WHERE  id='{$Upuser}'";
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
