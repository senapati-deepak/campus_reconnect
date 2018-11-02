$(document).ready(function () {

    console.log("page loaded");

    var map_url ;

    navigator.geolocation.getCurrentPosition(function (position) {

        console.log("here");
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        map_url = "The location of the patient is : " + " https://www.google.com/maps/@" + position.coords.latitude + "," + position.coords.longitude + ",15z"  + "\nName : Maitree \nContact : 876542087 \nAddress : Plot 35 , Surya Nagar";
        map_url = encodeURI(map_url);
    });
    $("#notification-btn").click(function () {

         $.get("http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles=7381594387&authkey=232467ACIKcpWuJmw5b7820fa&country=91&message=" + map_url , function (data, status) {
             alert("Successfully submited");
             console.log("data : " + data);
             console.log("status : " + status);
         }); 
    });
});