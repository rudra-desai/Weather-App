var temp_cel;
var temp_cel_min;
var temp_cel_max;

$(document).ready(function()
{	
   $("#btn").click(function()
   { 
	 var zip = $("#zip").val();
	 callAjax("getData.php", zip);
	
  });
$(".onOff").click(function()
  {
	if($("#content").text().includes("C"))
  	{
		$(".temper #content").html("<span id ='content'>" + ((temp_cel*(9/5))+32).toFixed(2) + "&deg;F</span>").fadeIn(900);	
		$(".min #content").html("<span id ='content'>" + ((temp_cel_min*(9/5))+32).toFixed(2) + "&deg;F</span>").fadeIn(900);
		$(".max #content").html("<span id ='content'>" + ((temp_cel_max*(9/5))+32).toFixed(2) + "&deg;F</span>").fadeIn(900);
		$(".onOff").val("off");
	 }
	 else
	 {
		$(".temper #content").html("<span id ='content'>" + temp_cel + "&deg;C</span>").fadeIn(900);	
		$(".min #content").html("<span id ='content'>" + temp_cel_min + "&deg;C</span>").fadeIn(900);
		$(".max #content").html("<span id ='content'>" + temp_cel_max + "&deg;C</span>").fadeIn(900);
		$(".onOff").val("on");

	 }
  });
  
  $("#press").click(function(){
	$(".change").html("<h2 class = 'mb-4 pt-3 title'><div class='spinner-border text-success mr-2' role='status'><span class='sr-only'>Loading...</span></div>Getting Coordinates</h2></div>");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(result) {
			$("#zip").val("");
			callAjax("getData.php", result.coords.latitude + "," + result.coords.longitude)
		});
	} else { 
		$(".title").hide().text("Browser Error").fadeIn(900);
	}
  });
});

function callAjax(urlPassed, dataPassed)
{
	$.ajax({
		type:  "GET",
		url:   urlPassed,
		data:  "zip=" + dataPassed,
		
	   beforeSend: function()
					{ 		
					   $(".change").html("<h2 class = 'mb-4 pt-3 title'><div class='spinner-border text-success mr-2' role='status'><span class='sr-only'>Loading...</span></div>Waiting...</h2></div>");
				   },
	
		error: 	function(xhr, status, error) 
					{  
					   alert( "Error Mesaage:  \r\nNumeric code is: "  + xhr.status + " \r\nError is " + error);   
				   },
		
		success: 	function(result)
					{
					   try{
						   r = JSON.parse(result);
					   }catch(err) 
					   {
						   $(".title").hide().text("Not a Valid Zip").fadeIn(900);
						   $("#main").fadeOut(300);
						   $(".fah").fadeOut(300);
						   $(".cel").fadeOut(300);
						   $(".toogle").fadeOut(300);
						   $(".row").fadeOut(300);
						   $('#inside').animate({
							   height: "200px",
							   width: "300px",
						   },300);
						   return;
					   }
					   var desc = (r.weather[0].description).substring(0,1).toUpperCase() + (r.weather[0].description).substring(1);
					   var sunrise = (new Date(1000*r.sys.sunrise)).getHours() + ":" + (new Date(1000*r.sys.sunrise)).getMinutes() + " AM";
					   var sunset = (new Date(1000*r.sys.sunset)).getHours() + ":" + (new Date(1000*r.sys.sunset)).getMinutes() + " PM";
					   temp_cel = r.main.temp;
					   temp_cel_min = r.main.temp_min;
					   temp_cel_max = r.main.temp_max;
					   
					   $('#inside').animate({
						   height: "480px",
						   width: "500px",
					   },300,function(){
						   window.setTimeout(function(){
						   $("#main").fadeIn(300);
						   $(".row").fadeIn(300);

							   if(desc.includes("thunderstorm"))
						   {
							   $("#animate").attr("src","./assets/states/thunder.svg").hide().fadeIn(900);
						   }
						   else if(desc.includes("drizzle"))
						   {
							   $("#animate").attr("src","./assets/states/rainy.svg").hide().fadeIn(900);
						   }
						   else if(desc.includes("rain"))
						   {
							   $("#animate").attr("src","./assets/states/rainy.svg").hide().fadeIn(900);
						   }
						   else if(desc.includes("snow"))
						   {
							   $("#animate").attr("src","./assets/states/snowy.svg").hide().fadeIn(900);
						   }
						   else if(desc.includes("Clear sky"))
						   {
							   $("#animate").attr("src","./assets/states/day.svg").hide().fadeIn(900);
						   }
						   else if(desc.includes("clouds"))
						   {
							   $("#animate").attr("src","./assets/states/cloudy.svg").hide().fadeIn(900);
						   }
						   
						   if($(".onOff").val() === "on")
						   {
							   $(".temper").hide().html("<i class='fas fa-thermometer-full'></i><span id ='heading'>Temperature: </span> " +
													"<span id ='content'>" + r.main.temp + "&deg;C</span>").fadeIn(900);
							   $(".min").hide().html("<span id ='heading'>Min: </span> " +
													"<span id ='content'>" + r.main.temp_min + "&deg;C</span>").fadeIn(900);
							   $(".max").hide().html("<span id ='heading'>Max: </span> " +
													"<span id ='content'>" + r.main.temp_max + "&deg;C</span>").fadeIn(900);
						   }else
						   {
							   $(".temper").hide().html("<i class='fas fa-thermometer-full'></i><span id ='heading'>Temperature: </span> " +
													"<span id ='content'>" + ((r.main.temp*(9/5))+32).toFixed(2) + "&deg;F</span>").fadeIn(900);
							   $(".min").hide().html("<span id ='heading'>Min: </span> " +
													"<span id ='content'>" + ((r.main.temp_min*(9/5))+32).toFixed(2) + "&deg;F</span>").fadeIn(900);
							   $(".max").hide().html("<span id ='heading'>Max: </span> " +
													"<span id ='content'>" + ((r.main.temp_max*(9/5))+32).toFixed(2) + "&deg;F</span>").fadeIn(900);
						   }
						   
						   $(".humidity").hide().html("<i class='wi wi-humidity'></i><span id ='heading'>Humidity: </span> " +
													"<span id ='content'>" + r.main.humidity + "%</span>").fadeIn(900);

						   $(".sunrise").hide().html("<i class='wi wi-sunrise'></i><span id ='heading'>Sunrise: </span> " +
													"<span id ='content'>" + sunrise + "</span>").fadeIn(900);			 
						   $(".sunset").hide().html("<i class='wi wi-sunset'></i><span id ='heading'>Sunset: </span> " +
													"<span id ='content'>" + sunset + "</span>").fadeIn(900);
						   $(".windspeed").hide().html("<i class='wi wi-windy'></i><span id ='heading'>Wind Speed: </span> " +
													"<span id ='content'>" + (r.wind.speed*2.237).toFixed(2) + " mph</span>").fadeIn(900);
						   var gusts = r.wind.gust;
						   if(gusts == null)
						   {
							 gusts = 0;
						   }
						   $(".gusts").hide().html("<i class='wi wi-strong-wind'></i><span id ='heading'>Gusts: </span> " +
													"<span id ='content'>" + (gusts*2.237).toFixed(2) + " mph</span>").fadeIn(900);
						    var visib = r.visibility;
							if(visib == null){
								visib = "N/A";
								$(".visibility").hide().html("<i class='fas fa-eye'></i><span id ='heading'>Visibility: </span> " +
								"<span id ='content'>" + visib + " mi</span>").fadeIn(900);
						    }else{
								$(".visibility").hide().html("<i class='fas fa-eye'></i><span id ='heading'>Visibility: </span> " +
								"<span id ='content'>" + (r.visibility/1609).toFixed(2) + " mi</span>").fadeIn(900);
							}
						   
						   $(".pressure").hide().html("<i class='wi wi-cloud-down'></i><span id ='heading'>Pressure: </span> " +
													"<span id ='content'>" + (r.main.pressure) + " hPa</span>").fadeIn(900);

						   $(".title").hide().text(r.name).fadeIn(900);
						   $("#des").hide().text(desc).fadeIn(900);
						   $(".cel").fadeIn(900).css("display", "inline");
						   $(".fah").fadeIn(900).css("display", "inline");
						   $(".onOff").fadeIn(900);
						   $(".toogle").fadeIn(900);
						   }, 200);
						   
						   
					   });
				   }	
   });
}
