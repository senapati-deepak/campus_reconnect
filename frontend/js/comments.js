function comment() {
    var x = document.getElementById("post-comment-area");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}