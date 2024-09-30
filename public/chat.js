

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Fetch the username from the session (replace with your session API route)
    fetch('/auth/getUsername')
        .then(response => response.json())
        .then(data => {
            const username = data.username;  // Get the username from the session

            // Sending a message
            document.getElementById('btnSendMessage').addEventListener('click', () => {
                const message = document.getElementById('messageBox').value;
                
                if (message.trim() !== '') {
                    // Create a message object with the username and timestamp
                    const messageData = {
                        username: username,
                        message: message,
                        time: new Date().toLocaleTimeString()  // Current time
                    };
                    socket.emit('chatMessage', messageData);  // Send message object to server
                    document.getElementById('messageBox').value = '';  // Clear input box
                }
            });
        });

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
