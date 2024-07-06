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
        // Check if account type is 'Admin'
        const accountType = data.accountType;
        if (accountType === 'Admin') {
            window.location.href = 'temp_attendance.html';
        } else {
            alert('Only Admin accounts are allowed to log in');
        }
    })
    .catch(error => console.error('Error logging in:', error));
});
