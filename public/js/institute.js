$(document).ready(function(){

    $("#events").css("display", "block");
    $("#posts").css("display", "none");

    $(".adminBtn").click(function() {
        $btn = $(this);
        $(".active").removeClass("active");
        if($btn.text() === "POSTS") {
            $btn.addClass("active");
            $("#events").css("display", "none");
            $("#posts").css("display", "block");
        } else {
            $btn.addClass("active");
            $("#posts").css("display", "none");
            $("#events").css("display", "block");
        }
    });    

});