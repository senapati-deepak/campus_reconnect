$(document).ready(function(){

    $(".workplace").click(function(event) {
        event.preventDefault();
        $btn = $(this);
        var iid = $btn.attr("id");
        $.get("/api/change-workplace/" + iid, function(data, status) {
            console.log(data);
            location.reload();
        });
    });


});
