$(document).ready(function(){


    $("#post-btn").click(function(event) {
        event.preventDefault();
        var postBody = $("#post-body").val();
        $.post("/api/new-post", {postBody: postBody}, function(data, status) {
            console.log(data);
            location.href = "/posts";
        });
    });


    $(".like").click(function(event) {
        event.preventDefault();
        $btn = $(this)
        var id = $btn.attr("id").slice(1);
        var lou = $btn.text();
        console.log(id); 
        var action = true;
        action = lou === "LIKE"? true : false;
        var data =  {
            action: action,
            id: id
        };
        var temp = lou === "LIKE"? "UNLIKE" : "LIKE";
        $btn.text(temp);
        $.post("/api/new-like", data, function(data, status) {
            console.log(data);
            location.href = "/posts"
        });
    });

    $(".comment").click(function(event) {
        event.preventDefault();
        $btn = $(this)
        var id = $btn.attr("id").slice(1);
        var cs = $("#cs" + id).val();
        if(cs === "") {
            alert("Write something...");
        } else {
            var data =  {
                msg: cs,
                id: id
            };
            $.post("/api/new-comment", data, function(data, status) {
                console.log(data);
                location.href = "/posts"
            });
        }
    });


});
