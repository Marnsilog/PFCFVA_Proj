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
//         // Check if account type is 'Admin'
//         const accountType = data.accountType;
//         if (accountType === 'Admin') {
//             // Redirect to attendance_dashboard.html
//             window.location.href = 'attendance_dashboard.html';
//         } else {
//             alert('Only Admin accounts are allowed to log in');
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
            const response = await fetch('/auth/login', {
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
