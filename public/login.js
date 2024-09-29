// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Update the fetch URL to include '/auth' since we've moved the login route to auth.js
//     fetch('/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else if (response.status === 401) {
//             alert('Invalid username or password');
//         } else {
//             throw new Error('Error logging in');
//         }
//     })
//     .then(data => {
        
//         // Log the session data to the console
//         console.log('Login successful. Session data:', data);

//         // Redirect based on account type
//         const accountType = data.accountType;
//         switch (accountType) {
//             case 'Admin':
//                 window.location.href = 'admin_dashboard.html';
//                 break;
//             case 'Volunteer':
//                 window.location.href = 'volunteer_dashboard.html';
//                 break;
//             case 'Supervisor':
//                 window.location.href = 'supervisor_dashboard.html';
//                 break;
//             default:
//                 alert('Unknown account type');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });


// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: 'include', // Ensure cookies are sent/received
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else if (response.status === 401) {
//             alert('Invalid username or password');
//         } else {
//             throw new Error('Error logging in');
//         }
//     })
//     .then(data => {
//         // Log the session data to the console
//         console.log('Login successful. Session data:', data);

//         // Redirect based on account type
//         const accountType = data.accountType;
//         switch (accountType) {
//             case 'Admin':
//                 window.location.href = 'admin_dashboard.html';
//                 break;
//             case 'Volunteer':
//                 window.location.href = 'volunteer_dashboard.html';
//                 break;
//             case 'Supervisor':
//                 window.location.href = '/supervisor_dashboard';
//                 break;
//             default:
//                 alert('Unknown account type');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('loginForm');
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none'; // Ensure hidden by default

    form.onsubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form); // Collect form data
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/auth/login', { //fetches from auth
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Send form data as JSON
            });

            if (response.ok) {
                const result = await response.json();
                // Redirect to the correct dashboard based on user role
                window.location.href = result.redirectUrl;
            } else {
                const errorResponse = await response.json();
                errorMessageDiv.textContent = errorResponse.message;
                errorMessageDiv.style.display = 'block'; // Show error message
            }
        } catch (error) {
            console.error('Error during login:', error);
            errorMessageDiv.textContent = 'An error occurred during login. Please try again.';
            errorMessageDiv.style.display = 'block';
        }
    };
});


// Get elements
const firstTimeLoginLink = document.getElementById('firstTimeLoginLink');
const loginInstructions = document.getElementById('loginInstructions');

// Toggle the instructions when the link is clicked
firstTimeLoginLink.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent default link behavior
    if (loginInstructions.classList.contains('hidden')) {
        loginInstructions.classList.remove('hidden');  // Show instructions
    } else {
        loginInstructions.classList.add('hidden');  // Hide instructions
    }
});
