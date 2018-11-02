$(document).ready(function () {

    console.log("page loaded");
    $("#findFiles").click(function (event) {
        event.preventDefault();
        console.log("Clickeddd");
        var patid = $("#patid").val();
        $.get('/get_records/' + patid, function (files, status) {
            console.log(files);
            var insert_html = "<h2 class='page-title'>Found Records</h2><br>";
        if(files){
            files.forEach(function(f) {
                insert_html+="<span class='pictures'>";

                if (f.isImage) {
                    insert_html+="<img class = 'img-thumbnail'src='image\/" + f.filename + "\/' alt=''>";
                }
                else {
                    insert_html+="<a href = '\/files\/" + f.filename + "\/' target='_blank'>" + f.filename + "</a>";
                }
                // <form method="POST" action="/files/<%= file._id %>?_method=DELETE">
                //         <button class="btn btn-danger btn-block mt-4">Delete</button>
                //         </form>
                //         </div>

                console.log(f)
                insert_html += "</span>";
            })
                } else {
            insert_html+="<p>No files to show</p>";
                }
                $("#results").html(insert_html);
        });
    });
});