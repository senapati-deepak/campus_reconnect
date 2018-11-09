$(document).ready(function(){


    var socket = io();

    $("#send").click(function(event) {
        event.preventDefault();
        var msg = $("#msg").val();
        socket.emit("new-message", msg);
    });
    
    socket.on("add-message", function(data) {
        console.log(data.user);
        $("#display-section").append("<div id=\"message\"><p>"+ data.msg +"</p></div>");
    });



});