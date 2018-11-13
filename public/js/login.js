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
                if(data.admin === true)
                    location.href = "/institute/5be9bd88a049a3ba47efa411";
                else
                    location.href = "/dashboard"; 
            } else {
                $("#error").text(data.errorMsg);
            }
        });
    });
    


});