// document.addEventListener("DOMContentLoaded", () => {
//     const currentUrl = window.location.pathname;
//     const tokenFromUrl = currentUrl.split('/').pop(); 

//     if (tokenFromUrl) {
//         document.getElementById("token").value = tokenFromUrl; 
//         console.log("Token from URL:", tokenFromUrl);
//     }

//     const form = document.getElementById("resetPasswordForm");

//     form.addEventListener("submit", async (event) => {
//         event.preventDefault(); 

//         const token = document.getElementById("token").value;
//         const password = form.elements["password"].value; 

//         console.log("Password:", password);
//         console.log("Token:", token);
        
//         try {
//             const response = await fetch("/auth/reset-password", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ token, password }), 
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert(data.message);
//                 window.location.href = "/"; 
//             } else {
//                 alert(data.message); 
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("An error occurred while resetting the password.");
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.pathname;
    const tokenFromUrl = currentUrl.split('/').pop(); 

    if (tokenFromUrl) {
        document.getElementById("token").value = tokenFromUrl; 
        //console.log("Token from URL:", tokenFromUrl);
    }

    const form = document.getElementById("resetPasswordForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const token = document.getElementById("token").value;
        const password = document.getElementById("newPassword").value; 
        const confirmPassword = document.getElementById("confirmPasswod").value;

        // Define the password pattern
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Validate password strength
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long, contain at least one special character, one uppercase letter, and one number.");
            return;
        }

        console.log("Password:", password);
        console.log("Token:", token);
        
        try {
            const response = await fetch("/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }), 
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = "/"; 
            } else {
                alert(data.message); 
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while resetting the password.");
        }
    });
});
