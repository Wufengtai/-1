
<?php
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "massage" => "");
// var_dump($_POST);
$userid = $_POST{'id'};
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
   //5.准备sql语句
  $sql = "INSERT INTO ge2(ge2_id) VALUES ('{$userid}')";
   //6.发送sql语句
   $res = mysqli_query($link, $sql);
   if (!$res) {
       $responseData["code"]= 5;
       $responseData["massage"] = "从表插入失败";
       //返回到前台页面
       echo json_encode($responseData);
       exit;//终止后续操作
   } else {
 
      $responseData["massage"] = "注册成功";
       //返回到前台页面
       echo json_encode($responseData);
        
 
   }
//关闭数据库
mysqli_close($link);

 
  ?>