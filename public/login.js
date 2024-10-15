
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
