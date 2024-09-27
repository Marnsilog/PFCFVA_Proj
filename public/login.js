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


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Ensure cookies are sent/received
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            alert('Invalid username or password');
        } else {
            throw new Error('Error logging in');
        }
    })
    .then(data => {
        // Log the session data to the console
        console.log('Login successful. Session data:', data);

        // Redirect based on account type
        const accountType = data.accountType;
        switch (accountType) {
            case 'Admin':
                window.location.href = 'admin_dashboard.html';
                break;
            case 'Volunteer':
                window.location.href = 'volunteer_dashboard.html';
                break;
            case 'Supervisor':
                window.location.href = 'supervisor_dashboard.html';
                break;
            default:
                alert('Unknown account type');
        }
    })
    .catch(error => console.error('Error logging in:', error));
});
