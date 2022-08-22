<?php
    include("connect_db.php");

    $id = $_POST["idProd"];

    $query = "DELETE FROM productos where id_producto = '$id'";


    $result = mysqli_query($connection, $query);


    if($result) {
        echo "Producto eliminado";
    }
?>