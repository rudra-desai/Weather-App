<?php

$z = $_GET["zip"];
if(strpos($z, ",") !== false)
{
   $lat = substr($z, 0, strrpos($z, ","));
   $long = substr($z, strrpos($z, ",")+1);
   $url = "http://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$long}&units=metric&appid={{YOUR API KEY HERE}}";
}
else
{
   $url = "http://api.openweathermap.org/data/2.5/weather?zip=$z,us&units=metric&appid={{YOUR API KEY HERE}}"; 
}

$fp = fopen ( $url , "r" ); 

$contents = "";
while ($more = fread ( $fp, 1000)) 
{
   $contents .=  $more ;
}  

echo $contents; 
?>