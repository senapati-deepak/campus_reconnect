$(document).ready(function(){


    $("#post-btn").click(function(event) {
        event.preventDefault();
        var postBody = $("#post-body").val();
        $.post("/api/new-post", {postBody: postBody}, function(data, status) {
            console.log(data);
            location.reload();
        });
    });

    $("#logout-btn").click(function(event) {
        event.preventDefault();
        $.get("/api/logout", function(data, status) {
            console.log(data);
            location.href = "/login";
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
        $.post("/api/new-like", data, function(data, status) {
            console.log(data);
            location.reload();
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
                location.reload();
            });
        }
    });


    $(".del-post").click(function(event) {
        event.preventDefault();
        $btn = $(this);
        var id = $btn.attr("id").slice(2);
        $.get("/api/del-post/" + id, function(data, status) {
            console.log(data);
            location.reload();
        });
    }); 


    $(".del-comm").click(function(event) {
        event.preventDefault();
        $btn = $(this);
        var postId = $btn.attr("id").slice(2, 26);
        var commentId = $btn.attr("id").slice(26);
        console.log(postId);
        console.log(commentId);
        $.get("/api/del-comm/" + postId + "/" + commentId, function(data, status) {
            console.log(data);
            location.reload();
        });
    }); 


});
