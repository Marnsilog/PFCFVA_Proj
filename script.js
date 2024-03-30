function login() {
    document.querySelector(".container").style.display = "block";
    document.querySelector(".nav").style.filter = "blur(10px)";
}

document.getElementById('btnLogIn').addEventListener('click', function() {
    // Redirect to volunteer.html inside the volunteer folder
    window.location.href = "volunteer/volunteer.html";
});
