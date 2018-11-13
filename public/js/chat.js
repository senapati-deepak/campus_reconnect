$(document).ready(function(){


    var socket = io();

    function updateScroll(){
        var element = document.getElementById("chat-area");
        element.scrollTop = element.scrollHeight;
    }

    $("#send").click(function(event) {
        event.preventDefault();
        var msg = $("#msg").val();
        socket.emit("new-message", msg);
    });

    $(".room-btn").click(function(event) {
        event.preventDefault();
        $btn = $(this);
        var data = {
            roomId: $btn.attr("id"),
        }
        socket.emit("join-room", data);
    });

    $(".conn-btn").click(function(event) {
        event.preventDefault();
        $btn = $(this);
        $("#recipient").text($btn.text());
        var uid = $btn.attr("id").slice(0, 24);
        var reid = $btn.attr("id").slice(24);
        socket.emit("join-room", { roomId: "", members: [uid, reid] })
    });

    socket.on("load-msgs", function(data) {
        console.log(data);
        var txt = ""
        for(var i = 0; i < data.length; i++) {
            txt += "<h6 class=\"message\"><img src=\"../images/faces/face2.jpg\" class=\"chat-headimage\"><a href = '/profile/" + data[i].sender._id + "'>" + data[i].sender.name + "</a></h6><p>" + data[i].body +"</p>"
        }
        $("#chat-area").html("");
        $("#chat-area").append(txt);
        updateScroll();
    });
    
    socket.on("add-message", function(data) {
        console.log(data.user);
        $("#chat-area").append("<h6 class=\"message\"><img src=\"../images/faces/face2.jpg\" class=\"chat-headimage\"><a href = '/profile/" + data.user._id + "'>" + data.user.name + "</a></h6><p>" + data.msg +"</p>");
        updateScroll();
    });



});