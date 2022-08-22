<?php
    include("connect_db.php");

    $nombre = $_POST["producto"];
    $cantidad = $_POST["cantidad"];
    $precio = $_POST["precio"];
    $tipo = $_POST["sl_tipo_c"];

    $query = "INSERT INTO productos (nombre_p, cantidad, precio, tipo_cantidad) values('$nombre', '$cantidad', '$precio', '$tipo')";
    $result = mysqli_query($connection, $query);

    echo json_encode([$nombre, $cantidad, $precio, $tipo]);

    // if(!$result) {
    //     die("Query failed");
    // }
?>