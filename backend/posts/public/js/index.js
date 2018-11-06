$(document).ready(function(){


    var socket = io();

    $("#send").click(function(event) {
        event.preventDefault();
        var msg = $("#msg").val();
        socket.emit("new-message", msg);
    });
    
    socket.on("add-message", function(data) {
        $("#display-section").append("<div id=\"message\"><p>"+ data +"</p></div>");
    });



});