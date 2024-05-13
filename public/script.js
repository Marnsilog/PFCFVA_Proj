
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

        window.location.href = "volunteer.html";
        return false;
    } else {
        alert("Invalid credentials. Please try again.");
        return false; 
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');


    menuToggle.addEventListener('click', function () {
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'block';
        }
    });

    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            mobileMenu.style.display = 'none';
        });
    });

    document.addEventListener('click', function (event) {
        if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.style.display = 'none';
        }
    });
});




//PAMPA KABA
// function updateCountdown() {
//     const countdownElement = document.getElementById('countdown');
//     const deadline = new Date('2024-05-19T00:00:00');
//     const currentTime = new Date();
  
//     const timeDiff = deadline - currentTime;

//     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//     countdownElement.innerHTML = `Countdown to Capstone:<br>${hours} hours, ${minutes} minutes, ${seconds} seconds`;
// }

// setInterval(updateCountdown, 1000);

// updateCountdown();
