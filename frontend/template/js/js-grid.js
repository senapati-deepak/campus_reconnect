(function($) {
    'use strict';
    $(function() {

        //basic config
        $("#js-grid").jsGrid({
            height: "500px",
            width: "100%",
            filtering: true,
            editing: true,
            inserting: true,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 15,
            pageButtonCount: 5,
            deleteConfirm: "Do you really want to delete the client?",
            controller: db,
            fields: [{
                    name: "Name",
                    type: "text",
                    width: 150
                },
                {
                    name: "Age",
                    type: "number",
                    width: 50
                },
                {
                    name: "Address",
                    type: "text",
                    width: 200
                },
                {
                    name: "Country",
                    type: "select",
                    items: db.countries,
                    valueField: "Id",
                    textField: "Name"
                },
                {
                    name: "Married",
                    type: "checkbox",
                    title: "Is Married",
                    sorting: false
                },
                {
                    type: "control"
                }
            ]
        });

        //Static
        $("#js-grid-static").jsGrid({
            height: "500px",
            width: "100%",

            sorting: true,
            paging: true,

            data: db.clients,

            fields: [{
                    name: "Name",
                    type: "text",
                    width: 150
                },
                {
                    name: "Age",
                    type: "number",
                    width: 50
                },
                {
                    name: "Address",
                    type: "text",
                    width: 200
                },
                {
                    name: "Country",
                    type: "select",
                    items: db.countries,
                    valueField: "Id",
                    textField: "Name"
                },
                {
                    name: "Married",
                    type: "checkbox",
                    title: "Is Married"
                }
            ]
        });

        //sortable
        $("#js-grid-sortable").jsGrid({
            height: "500px",
            width: "100%",

            autoload: true,
            selecting: false,

            controller: db,

            fields: [{
                    name: "Name",
                    type: "text",
                    width: 150
                },
                {
                    name: "Age",
                    type: "number",
                    width: 50
                },
                {
                    name: "Address",
                    type: "text",
                    width: 200
                },
                {
                    name: "Country",
                    type: "select",
                    items: db.countries,
                    valueField: "Id",
                    textField: "Name"
                },
                {
                    name: "Married",
                    type: "checkbox",
                    title: "Is Married"
                }
            ]
        });


        $("#sort").click(function() {
            var field = $("#sortingField").val();
            $("#js-grid-sortable").jsGrid("sort", field);
        });
    });
})(jQuery);
