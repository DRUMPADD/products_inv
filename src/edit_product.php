<?php
    include("connect_db.php");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $cantidad = $_POST["cantidad"];
    $precio = $_POST["precio"];


    $query = "UPDATE productos set nombre_p = '$nombre', cantidad = '$cantidad', precio = '$precio' where id_producto = '$id'";

    $result = mysqli_query($connection, $query);

    if($result) {
        echo "Producto actualizado";
    }
?>