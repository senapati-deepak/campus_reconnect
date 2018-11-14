$(document).ready(function(){



    $(".response").click(function(event) {
        $btn = $(this);
        var eid = $btn.attr("id").slice(1);
        var verdict = $btn.attr("id")[0];
        var data = {
            eid: eid,
            aor: verdict
        };
        $.post("/api/event-response", data, function(data, status) {
            console.log(data);
            alert(data);
            location.reload();
        });
    });


    $(".createEvent").click(function() {
        $btn = $(this);
        var id = $btn.attr("id");
        var isApproved = id === "acellcreate" ? true : false;
        var data = {
            name: $("#ename").val(),
            content: $("#econtent").val(),
            venue: $("#evenue").val(),
            startTime: $("#efrom").val(),
            endTime: $("#eto").val(),
            isApproved: isApproved
        }; 
        $.post("/api/create-event", data, function(data, status) {
            console.log(data);
            alert("New Event Created!");
            location.reload();
        });
    });
    

    $(".tick-button").click(function() {
        $btn = $(this);
        var ctr = parseInt($("#counter").text());
        var t = $btn.children(".fa").html();
        alert(t);
        if(t === "You're Going") {
            ctr -= 1;
            $("#counter").text(ctr);
            $btn.html("<i class='fa fa-check' style='font-size:20px;color:white; padding-right:20px; ' aria-hidden='true '></i>");
        } else {
            ctr += 1;
            $("#counter").text(ctr);
            $btn.html("<i class='fa fa-check-circle' style='font-size:20px;color:white; padding-right:20px; ' aria-hidden='true '>You're Going</i>");
        }
    });


});