<?php
$con = mysqli_connect('localhost', 'user', 'password');
if (!$con)
{
  echo 'Unable to connect to the database server.';
  exit();
}
 
if (!mysqli_set_charset($con, 'UTF8'))
{
  echo 'Unable to set database connection encoding.';
  exit();
}
 
if(!mysqli_select_db($con, 'db'))
{
  echo 'Unable to locate database.';
  exit();  
}
?>
