<?php

require_once('testYelp.php');

/* try calling the request method */

$term = 'restaurant';
$location = '10 Wayside Road, Burlington, MA 01803';
$cll = '42.4857853,-71.1911223';

query_api2($term, $location, $cll);

?>
