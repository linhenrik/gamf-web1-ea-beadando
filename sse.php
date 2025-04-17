<?php
$hello = 1;
while (true) {
    echo "Eddig küldött üzenetek: $hello\n\n";
    $hello = $hello+1;
    ob_flush();
    flush();
    sleep(1);
}
?>