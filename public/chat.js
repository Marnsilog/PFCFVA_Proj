

// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io();

//     // Fetch the username from the session (replace with your session API route)
//     fetch('/auth/getUsername')
//         .then(response => response.json())
//         .then(data => {
//             const username = data.username;  // Get the username from the session

//             // Sending a message
//             document.getElementById('btnSendMessage').addEventListener('click', () => {
//                 const message = document.getElementById('messageBox').value;
                
//                 if (message.trim() !== '') {
//                     // Create a message object with the username and timestamp
//                     const messageData = {
//                         username: username,
//                         message: message,
//                         time: new Date().toLocaleTimeString()  // Current time
//                     };
//                     socket.emit('chatMessage', messageData);  // Send message object to server
//                     document.getElementById('messageBox').value = '';  // Clear input box
//                 }
//             });
//         });

//     // Receiving a message
//     socket.on('chatMessage', (msgData) => {
//         const chatSystem = document.getElementById('chatSystem');

//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');  // Add a class for styling if needed

//         // Append the username, message, and timestamp to the message element
//         messageElement.innerHTML = `<strong>${msgData.username}</strong>: ${msgData.message} <span class="text-gray-500">(${msgData.time})</span>`;

//         chatSystem.appendChild(messageElement);
//         chatSystem.scrollTop = chatSystem.scrollHeight;  // Auto-scroll to the bottom
//     });
// });



document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Predefined macro messages (easily editable)
    const macroMessages = {
        activate: "Incident activated, all units proceed to designated areas.",
        injured: "Medical assistance required, an individual has been injured.",
        standown: "All units, stand down and await further instructions.",
        fireOut: "Fire is out, beginning recovery operations.",
        requestBackUp: "Backup requested, send additional support units.",
        requestMedical: "Requesting medical assistance for injured personnel.",
        resupplyWater: "Resupplying water tank, operations paused temporarily.",
        fallback: "Fallback requested, unforeseen circumstances encountered."
    };

    // Fetch the username from the session (replace with your session API route)
    fetch('/auth/getUsername')
        .then(response => response.json())
        .then(data => {
            const username = data.username;

            // Sending a typed message
            document.getElementById('btnSendMessage').addEventListener('click', () => {
                const message = document.getElementById('messageBox').value;

                if (message.trim() !== '') {
                    sendMessage(username, message);
                }
            });

            // Sending a macro message when buttons are clicked
            document.getElementById('msgActivate').addEventListener('click', () => {
                sendMessage(username, macroMessages.activate);
            });

            document.getElementById('msgInjured').addEventListener('click', () => {
                sendMessage(username, macroMessages.injured);
            });

            document.getElementById('msgStandown').addEventListener('click', () => {
                sendMessage(username, macroMessages.standown);
            });

            document.getElementById('msgFireOut').addEventListener('click', () => {
                sendMessage(username, macroMessages.fireOut);
            });

            document.getElementById('msgBackUp').addEventListener('click', () => {
                sendMessage(username, macroMessages.requestBackUp);
            });

            document.getElementById('msgMedicalAssistance').addEventListener('click', () => {
                sendMessage(username, macroMessages.requestMedical);
            });

            document.getElementById('msgResupplyWater').addEventListener('click', () => {
                sendMessage(username, macroMessages.resupplyWater);
            });

            document.getElementById('msgFallback').addEventListener('click', () => {
                sendMessage(username, macroMessages.fallback);
            });
        });

    // Function to handle sending messages
    function sendMessage(username, message) {
        const messageData = {
            username: username,
            message: message,
            time: new Date().toLocaleTimeString()
        };
        socket.emit('chatMessage', messageData);
        document.getElementById('messageBox').value = '';  // Clear input box (for typed messages)
    }

    // Receiving a message
    socket.on('chatMessage', (msgData) => {
        const chatSystem = document.getElementById('chatSystem');

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');  // Add a class for styling if needed

        // Append the username, message, and timestamp to the message element
        messageElement.innerHTML = `<strong>${msgData.username}</strong>: ${msgData.message} <span class="text-gray-500">(${msgData.time})</span>`;

        chatSystem.appendChild(messageElement);
        chatSystem.scrollTop = chatSystem.scrollHeight;  // Auto-scroll to the bottom
    });
});
