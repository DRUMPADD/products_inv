<?php 
    $connection = mysqli_connect("localhost", "root", "", "inventario_db", 3306);
    if(!$connection) {
        echo mysqli_error($connection);
    }
?>