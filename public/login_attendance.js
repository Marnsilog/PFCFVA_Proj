document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/loginAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = data.redirectUrl;
        } else {
            alert(data.message); 
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});
// Function to handle logout
async function logout() {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Show logout message
            window.location.href = '/login'; // Redirect to login page
        } else {
            alert(data.message); // Handle errors if necessary
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Detect back navigation using popstate
window.addEventListener('popstate', (event) => {
    // Logout and redirect to login page
    logout();
});
