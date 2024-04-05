function myImage() {
    var form = document.getElementById("profileDetail");
    if (form.style.display === "none") {
        form.style.display = "block";
    } 
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("viewRankings").addEventListener("click", function() {
        document.getElementById("profileStat").style.display = "none";
        document.getElementById("rankingStat").style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("viewProfile").addEventListener("click", function() {
        document.getElementById("rankingStat").style.display = "none";
        document.getElementById("profileStat").style.display = "block";
    });
});