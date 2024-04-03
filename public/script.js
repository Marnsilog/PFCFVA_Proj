function showLogin(){
    var form = document.getElementById("form");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

function directTo(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username=="marns"&&password=="1234"){
        window.location.href = "volunteer/volunteer.html";
    }
    

}