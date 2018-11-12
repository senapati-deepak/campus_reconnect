$(document).ready(function(){



    $("#login-btn").click(function(event) {
        event.preventDefault();
        var data = {
            email: $("#email").val(),
            password: $("#password").val()
        };
        $.post("/api/login", data, function(data, status) {
            console.log(data);
            if(data.success) {
                location.href = "/dashboard"; 
            } else {
                $("#error").text(data.errorMsg);
            }
        });
    });
    


});