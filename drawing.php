<?php
include_once $_SERVER['DOCUMENT_ROOT']."/DBConfig.php";

$x = intval($_REQUEST['x']);
$y = intval($_REQUEST['y']);

if ($_REQUEST['submit']){
    // print_r(json_encode($newdata));
    $newdata = $_REQUEST['data'];

    $sql = "INSERT INTO canvas ( x , y, filled ) value ( ?, ?, ? ) ON DUPLICATE KEY UPDATE filled = VALUES(filled) ";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("iis",$x, $y, json_encode($newdata));
    
    if($stmt->execute()){
        echo "saved successfully!";
    } else {
        echo "failed to save ".$stmt->error;
    }

    return;
} else if(isset($_REQUEST['x']) && isset($_REQUEST['y'])){

    // print_r($y);

    $sql = "SELECT filled FROM canvas WHERE x=? AND y=?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii",$x, $y);
    $stmt->execute();
    if($con->error) {printf("Error: %s.<br />", $con->error); $con->close();}
    $result = $stmt->get_result();
    $rowcount = mysqli_num_rows($result);
    if($rowcount) {
        while($rs = $result->fetch_assoc()) {
            $data = $rs['filled'];
        }
    }
}

$con->close();

$time = time();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src='/node_modules/jquery/dist/jquery.min.js'></script>
    <link rel="stylesheet" href='/pickr/dist/themes/classic.min.css'>
    <script src='/pickr/dist/pickr.min.js'></script>
    <script src='draw.js?version=<?=$time?>'></script>
    <title>Drawing with PHP/MySql</title>
    <script>
        let FILLED = <?=($data? $data:"{}")?>;
    </script>
</head>
<body>
    <input type="button" onclick="window.location='/'" value="Back">
    <br>
    <br>
    <div id="picker" class="color-picker"></div>
    <div>
        <canvas id="mycanvas" width=500 height=500 style='margin:8px;border:1px #000 solid'></canvas>
    </div>
    <input type="submit" value="Save" onclick="save(<?=$x?>,<?=$y?>)">
</body>
</html>