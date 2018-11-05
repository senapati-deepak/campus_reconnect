$(document).ready(function(){

    var socket = io()

    var posts = window.posts;
    console.log(posts);

    function setPosts(posts) {
        $ap = $("#allPosts");
        $ap.html("");
        for(var i = 0; i < posts.length; i++) {
            var comments = "";
            for(var j = 0; j < comments.length; j++) {
                comments += "<div class='card'>" + posts[i].comments[j]; 
            }
            $ap.append("<div class='card'><div class='card-heading bg-primary'>By " + posts[i].user.name + "on" + posts[i].date + "</div><div class='card-body'>" + posts[i].body + "</div><i id='lc" + posts[i]._id + "'>" + posts[i].likes +  "</i><button class='btn btn-info col-md-2 like' id='l" + posts[i]._id + "'>LIKE</button><textarea placeholder='Comment here...' id='cs" + posts[i]._id + "'></textarea><button class='btn btn-info col-md-2 comment' id='c" + posts[i]._id+ "'>COMMENT</button><div id='cd" + posts[i]._id + "'>" + comments + "</div><button class='btn btn-info col-md-2 share'  id='s" + posts[i]._id + "'>SHARE</button></div>");
        }
    }

    function setLikes(data) {
        var t = data.action ? 1 : -1;
        for(var i = 0; i < posts.length; i++) {
            if(posts[i]._id === data.id) {
                posts[i].likes += t;
                var c = parseInt($("#lc" + data.id).text());
                $("#lc" + data.id).text(c + t);
                break;
            }
        }
    }

    setPosts(posts);

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
        console.log(posts);
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
        setLikes(data);
        var temp = lou === "LIKE"? "UNLIKE" : "LIKE";
        console.log(temp);
        $btn.text(temp);
        socket.emit("new-like", data);
    });

    $(".comment").click(function(event) {
        event.preventDefault();
        $btn = $(this)
        var id = $btn.attr("id").slice(1);
        var cs = $("#cs" + id).text();
        if(cs === "") {
            alert("Write something...");
        } else {
            var data =  {
                msg: cs,
                id: id
            };
            
        }
    });

    socket.on("new-like", function(data) {
        console.log(data);
        setLikes(data);
    });

});
