$(document).ready(function() {

    $("#reg-form").submit(function(event) {
        event.preventDefault();
        //alert("Hello World");
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        var details = {
            name: $("#name").val(),
            date: today,
            contact: $("#contact").val(),
            address: $("#address").val(),
            doc: $("#doc").val(),
            dob: $("#dob").val(),
            complications: $("#comp").val(),
            expectedDate: $("#dod").val(),
            remarks: $("#rem").val(),
            education: $("#ed").val(),
            bloodGrp: $("#blgrp").val(),
            occupation: $("#occu").val(),
            height: $("#ht").val(),
            weight: $("#wt").val(),
            allergy: $("#alleg").val(),
            delivery_count: $("#noc").val()
        };

        $.post("/api/signup", details, function(res) {
            console.log(res);
            //showSwal('success-message');
            alert("Successfully Registered!");
            location.href = "/patient_registration"
        });
    });
});