
// document.addEventListener("DOMContentLoaded", function() {
    
//     var blackBackground = document.getElementById('blackBackround');
//     var homepageSec = document.getElementById('homepageSec');
//     blackBackground.classList.remove('bg-opacity-50','bg-black');
//     homepageSec.classList.remove('opacity-40');
// });


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

// document.addEventListener("DOMContentLoaded", function() {
//     var blackBackground  = document.getElementById("blackBackround");
//     var homepageSec = document.getElementById('homepageSec');

//     document.getElementById("cancel").addEventListener("click", function() {
//         document.getElementById("form").style.display = "none";
//         blackBackground.classList.remove('bg-black');
//         blackBackground.classList.remove('bg-opacity-50');
//         homepageSec.classList.remove('opacity-40');

//         loginButton.disabled = false;
//         var navLinks = document.getElementById('navLinks').getElementsByTagName('a');
//         for (var i = 0; i < navLinks.length; i++) {
//             navLinks[i].style.pointerEvents = 'auto';
//         }
        
//     });
// });



// document.addEventListener('DOMContentLoaded', function () {
//     const menuToggle = document.getElementById('menu-toggle');
//     const mobileMenu = document.getElementById('mobile-menu');


//     menuToggle.addEventListener('click', function () {
//         if (mobileMenu.style.display === 'block') {
//             mobileMenu.style.display = 'none';
//         } else {
//             mobileMenu.style.display = 'block';
//         }
//     });

//     const mobileMenuItems = mobileMenu.querySelectorAll('a');
//     mobileMenuItems.forEach(function (item) {
//         item.addEventListener('click', function () {
//             mobileMenu.style.display = 'none';
//         });
//     });

//     document.addEventListener('click', function (event) {
//         if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
//             mobileMenu.style.display = 'none';
//         }
//     });
// });

document.getElementById('reset-password-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = event.target.email.value;
    const loadingContainer = document.getElementById('loading-container');

    // Show loading spinner
    loadingContainer.style.display = 'block';
   
    try {
        const response = await fetch('/auth/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            loadingContainer.style.display = 'none';
            window.location.href = '/login';
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('An error occurred. Please try again later.');
    } finally {
        // Hide loading spinner once the request completes
        loadingContainer.style.display = 'none';
    }
});





// JavaScript to handle form toggle
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('reset-password-form');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginLink = document.getElementById('backToLoginLink');

    forgotPasswordLink.addEventListener('click', function(event) { 
        if (loginForm) {
            loginForm.reset();
        }

        event.preventDefault();
        loginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
    });

    backToLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        forgotPasswordForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // forgotPasswordForm.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     const email = document.getElementById('forgotPasswordEmail').value;

    //     // Make an API call to your server to handle password reset
    //     fetch('/forgot-password', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ emailAddress: email })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             alert('Password reset link has been sent to your email.');
    //             forgotPasswordForm.style.display = 'none';
    //             loginForm.style.display = 'block';
    //         } else {
    //             alert('Error: ' + data.message);
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert('An error occurred. Please try again later.');
    //     });
    // });
});

