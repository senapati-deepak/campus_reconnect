$(document).ready(function(){


    $("#post-btn").click(function(event) {
        event.preventDefault();
        var postBody = $("#post-body").val();
        $.post("/api/new-post", {postBody: postBody}, function(data, status) {
            console.log(data);
            location.href = "/posts"
        });
    });
    



});