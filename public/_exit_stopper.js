// document.addEventListener('DOMContentLoaded', function () {
//     const btnSaveLogs = document.getElementById('btnSaveLogs');
//     let allowUnload = false;

//     // Function to handle beforeunload event
//     function beforeUnloadHandler(e) {
//         if (allowUnload) {
//             return;
//         }
//         e.preventDefault();
//         e.returnValue = ''; // Standard way to trigger the dialog in modern browsers
//     }

//     // Attach the beforeunload event listener
//     window.addEventListener('beforeunload', beforeUnloadHandler);

//     // Add a click event listener to btnSaveLogs
//     if (btnSaveLogs) {
//         btnSaveLogs.addEventListener('click', function () {
//             // Allow unload for this action
//             allowUnload = true;

//             // Optionally remove the event listener completely if no further use is needed
//             window.removeEventListener('beforeunload', beforeUnloadHandler);
//         });
//     }
// });


document.addEventListener('DOMContentLoaded', function () {
    const btnSaveLogs = document.getElementById('btnSaveLogs');

    // Function to handle beforeunload event
    window.addEventListener('beforeunload', function (e) {
        // Check if the btnSaveLogs button was clicked
        const activeElement = document.activeElement;

        // If the active element is the btnSaveLogs button, ignore the beforeunload prompt
        if (activeElement === btnSaveLogs) {
            return;
        }

        // For all other cases (e.g., refresh, closing tab), prevent the default action
        e.preventDefault();
        e.returnValue = ''; // Display a generic browser confirmation message
    });
});
