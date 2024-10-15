

// document.addEventListener('DOMContentLoaded', function () {
//     const btnSaveLogs = document.getElementById('btnSaveLogs');

//     // Create a simple change to make the browser think there's unsaved data
//     let isModified = false;

//     // This function marks the page as modified
//     function markAsModified() {
//         isModified = true;
//     }

//     // Make a small change to the page as soon as it loads
//     markAsModified();

//     // Function to handle beforeunload event
//     window.addEventListener('beforeunload', function (e) {
//         // Check if the btnSaveLogs button was clicked
//         const activeElement = document.activeElement;

//         // If the active element is the btnSaveLogs button, ignore the beforeunload prompt
//         if (activeElement === btnSaveLogs) {
//             return;
//         }

//         // Only trigger the unload event if the page is marked as modified
//         if (isModified) {
//             // Prevent the default action (e.g., refresh, close tab)
//             e.preventDefault();
//             e.returnValue = ''; // Display a generic browser confirmation message
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const btnSaveLogs = document.getElementById('btnSaveLogs');
    const frmRegister = document.getElementById('frmRegister'); // Referencing the form by its ID

    // Create a simple change to make the browser think there's unsaved data
    let isModified = true; // Change this to true initially, as we assume the form has unsaved data.

    // Function to handle beforeunload event
    window.addEventListener('beforeunload', function (e) {
        const activeElement = document.activeElement;

        // If the active element is the btnSaveLogs, ignore the beforeunload prompt
        if (activeElement === btnSaveLogs) {
            return;
        }

        // Only trigger the unload event if the page is marked as modified
        if (isModified) {
            // Prevent the default action (e.g., refresh, close tab)
            e.preventDefault();
            e.returnValue = ''; // Display a generic browser confirmation message
        }
    });

    // Exempt form submission from marking the page as modified
    frmRegister.addEventListener('submit', function () {
        isModified = false; // Mark as unmodified to prevent the prompt on successful form submission
    });
});

