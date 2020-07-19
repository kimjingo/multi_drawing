<?php
include_once $_SERVER['DOCUMENT_ROOT']."/DBConfig.php";
$time=time();
if(!$_REQUEST){

    $sql = "CREATE TABLE IF NOT EXISTS canvas ( id int primary key auto_increment, x int, y int, filled JSON, unique(x,y) ) ";
    if ($con->query($sql) === TRUE) {
        echo "Database created successfully";
    } else {
        echo "Error creating database: " . $con->error;
    }
}
$sql = "SELECT * FROM canvas";
$result = $con->query($sql);
$rowcount = mysqli_num_rows($result);
if(!$rowcount) return;
// echo $planid;
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $data[$rs['x'].",".$rs['y']] = $rs['filled'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src='/node_modules/jquery/dist/jquery.min.js'></script>
    <script src='index.js?version=<?=$time?>'></script>
    <title>Big Canvas with PHP/MySql</title>
    <style>
        body {
            background-color: #f0f0f0;
            margin: 16px;
            font-family: Arial, Helvetica, sans-serif;
        }
        #myBigcanvas{
            border: 1px #000 solid;
            background-color: #fff;
            cursor:pointer;
        }
        #myCanvasWrapper {
            position: relative;
        }
        #selectedBox {
            border: 1px rgba(0, 50, 100, 0.5) solid;
            background-color: rgba(0, 50, 100, 0.25);
            position: absolute;
            pointer-events: none;
        }
    </style>
    <script>
        const alldata = <?=(json_encode($data))?>;
    </script>
</head>
<body>
    <h2>
        Practice Big canvas with PHP/MySql
    </h2>
    <div id="myCanvasWrapper">
        <canvas id="myBigcanvas"></canvas>
    </div>
</body>
</html>