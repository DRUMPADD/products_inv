<?php
    include("connect_db.php");


    $query = "SELECT * FROM productos";

    $result = mysqli_query($connection, $query);

    $arr = array();

    while($row = mysqli_fetch_assoc($result)) {
        $arr[] = array(
            'id' => $row["id_producto"],
            'nombre' => $row["nombre_p"],
            'cantidad' => $row["cantidad"],
            'precio' => $row["precio"],
            'tipo' => $row["tipo_cantidad"]
        );
    }

    echo json_encode($arr);
?>