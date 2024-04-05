function showProfile() {
    var form = document.getElementById("profileDetail");
    if (form.style.display === "none") {
        form.style.display = "block";
    } 
}

function editProfile() {
    var form = document.getElementById("editProfile");
    var form2 = document.getElementById("profileDetail");
    if (form.style.display === "none") {
        form.style.display = "block";
        form2.style.display = "none";
    } 
}


function Cancel() {
    var form = document.getElementById("profileDetail");
    var form2 = document.getElementById("editProfile");


    var confirmCancel = window.confirm("Are you sure you want to discard changes?");

    if (confirmCancel) {
        // If user confirms, revert the form visibility
        if (form.style.display === "none") {
            form.style.display = "block";
            form2.style.display = "none";
        }
    } else {
        return false; 
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


document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('logoutLink');

    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();

            const confirmLogout = confirm("Are you sure you want to log out?");

            if (confirmLogout) {
                window.location.href = '/public/dashboard.html';
            }
        });
    }
});





