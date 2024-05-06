
document.addEventListener("DOMContentLoaded", function() {
    
    var blackBackground = document.getElementById('blackBackround');
    var homepageSec = document.getElementById('homepageSec');
    blackBackground.classList.remove('bg-opacity-50','bg-black');
    homepageSec.classList.remove('opacity-40');
});

function handleLogin() {

    var loginButton = document.getElementById('loginButton');
    var form = document.getElementById("form");
    var blackBackground  = document.getElementById("blackBackround");
    var homepageSec = document.getElementById('homepageSec');


    if (form.style.display === "none") {
        form.style.display = "block";
        blackBackground.classList.add('bg-black');
        blackBackground.classList.add('bg-opacity-50');
        homepageSec.classList.add('opacity-40');
        
    } 
    loginButton.disabled = true;


    var navLinks = document.getElementById('navLinks').getElementsByTagName('a');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].style.pointerEvents = 'none';
    }

   
}

document.addEventListener("DOMContentLoaded", function() {
    var blackBackground  = document.getElementById("blackBackround");
    var homepageSec = document.getElementById('homepageSec');

    document.getElementById("cancel").addEventListener("click", function() {
        document.getElementById("form").style.display = "none";
        blackBackground.classList.remove('bg-black');
        blackBackground.classList.remove('bg-opacity-50');
        homepageSec.classList.remove('opacity-40');

        loginButton.disabled = false;
        var navLinks = document.getElementById('navLinks').getElementsByTagName('a');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].style.pointerEvents = 'auto';
        }
        
    });
});


function directTo() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === "marns" && password === "1234") {

        window.location.href = "volunteer/volunteer.html";
        return false;
    } else {
        alert("Invalid credentials. Please try again.");
        return false; 
    }
}
