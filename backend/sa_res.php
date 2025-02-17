<?php

function utf8_converter($array)
{
    array_walk_recursive($array, function (&$item)
    {
        if (is_string($item))
        {
            $item = mb_convert_encoding($item, 'UTF-8', 'UTF-8');
        }
    });

    return $array;
}

$server_address = "sql7.freesqldatabase.com";
$admin_username = "sql7763051";
$admin_password = "YXiRZTfvBi";
$db_name = "sql7763051";

$connection = mysqli_connect($server_address, $admin_username, $admin_password, $db_name);

$query = "SELECT `name`, `badge`, `power` FROM `sa_teams`";

$output = mysqli_query($connection, $query);

$teams = [];

if (mysqli_num_rows($output) > 0)
{
    while($row = mysqli_fetch_assoc($output))
    {
        $new_entry = ["name" => $row["name"], "badge" => $row["badge"], "power" => $row["power"]];

        array_push($teams, $new_entry);
    }
}

$teams = utf8_converter($teams);

echo json_encode($teams);

mysqli_close($connection);

?>