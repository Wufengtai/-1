
<?php
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "massage" => "");
// var_dump($_POST);
$username = $_POST{'Name'};
$FrName1 = $_POST{"FrName1"};
$friend_id1 = $_POST{"friend_id1"};
$friendY = $_POST{"friendY"};
$myname = $_POST{"myname"};
$fanhuizhi = $_POST{"fanhuizhi1"};
$my = $_POST{"my"};
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
        $sql = " UPDATE ge3 set myid = '{$username}',friend = '{$friend_id1}',friendName = '{$FrName1}',yes = '{$friendY}',myname = '{$myname}',fanhuizhi = '{$fanhuizhi}' WHERE  ge3_id='{$my}' ANd friend is null AND friendName is null ANd myid is null AND yes is null ANd myname is null AND fanhuizhi is null";
        //6.发送sql语句
        $res = mysqli_query($link, $sql);
        if (!$res) {
            $responseData["code"]= 5;
            $responseData["massage"] = "发送失败";
            //返回到前台页面
            echo json_encode($responseData);
            exit;//终止后续操作
        } else {
            $responseData["massage"] = "添加好友请求发送成功！";
            //返回到前台页面
            echo json_encode($responseData);
        }
    
//关闭数据库
mysqli_close($link);

 
  ?>