document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Predefined macro messages (easily editable)
    const macroMessages = {
        activate: "Incident activated, all units proceed to designated areas.",
        injured: "MEDICAL ASSISTANCE REQUIRED, AN INDIVIDUAL HAS BEEN INJURED.",
        standown: "All units, stand down and await further instructions.",
        fireOut: "Fire is out, beginning recovery operations.",
        requestBackUp: "Backup requested, send additional support units.",
        requestMedical: "URGENT! REQUESTING MEDICAL ASSISTANCE FOR INJURED PERSONNEL.",
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
                sendMessage(username, macroMessages.injured, true);  // Mark as red and caps
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
                sendMessage(username, macroMessages.requestMedical, true);  // Mark as red and caps
            });

            document.getElementById('msgResupplyWater').addEventListener('click', () => {
                sendMessage(username, macroMessages.resupplyWater);
            });

            document.getElementById('msgFallback').addEventListener('click', () => {
                sendMessage(username, macroMessages.fallback);
            });
        });

    // Function to handle sending messages
    function sendMessage(username, message, isInjuredOrMedical = false) {
        const messageData = {
            username: username,
            message: message,
            time: new Date().toLocaleTimeString(),
            isInjuredOrMedical: isInjuredOrMedical  // Pass whether it's an injured or medical message
        };
        socket.emit('chatMessage', messageData);
        document.getElementById('messageBox').value = '';  // Clear input box (for typed messages)
    }

    // Receiving a message
    socket.on('chatMessage', (msgData) => {
        const chatSystem = document.getElementById('chatSystem');

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');  // Add a class for styling if needed

        // Check if the message is an "injured" or "medical assistance" message and apply red color
        if (msgData.isInjuredOrMedical) {
            messageElement.innerHTML = `<strong>${msgData.username}</strong>: <span style="color: red; font-weight: bold;">${msgData.message}</span> <span class="text-gray-500">(${msgData.time})</span>`;
        } else {
            // Append the username, message, and timestamp to the message element
            messageElement.innerHTML = `<strong>${msgData.username}</strong>: ${msgData.message} <span class="text-gray-500">(${msgData.time})</span>`;
        }

        chatSystem.appendChild(messageElement);
        chatSystem.scrollTop = chatSystem.scrollHeight;  // Auto-scroll to the bottom
    });
});
