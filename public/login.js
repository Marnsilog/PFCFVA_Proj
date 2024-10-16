// //working recent
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/login', {
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
//         // Redirect based on account type
//         const accountType = data.accountType;
//         switch (accountType) {
//             case 'Admin':
//                 window.location.href = 'admin.html';
//                 break;
//             case 'Volunteer':
//                 window.location.href = 'volunteer.html';
//                 break;
//             case 'Supervisor':
//                 window.location.href = 'supervisor.html';
//                 break;
//             default:
//                 alert('Unknown account type');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });


//session working recent, volunteer only
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/login', {
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
//         const accountType = data.accountType;
//         if (accountType === 'Volunteer') {
//             window.location.href = 'volunteer.html';
//         } else {
//             alert('Unknown account type');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });



document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

