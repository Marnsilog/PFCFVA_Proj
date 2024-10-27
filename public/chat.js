

document.addEventListener('DOMContentLoaded', () => {
    const chatSystem = document.getElementById('chatSystem');
    chatSystem.innerHTML = '';
    const socket = io();
    const timers = {};  // Store interval IDs and seconds for each checked attendee (by callSign)
    let selectedAttendees = [];  // Store selected attendees when msgActivate is clicked

    // Predefined macro messages (easily editable)
    const macroMessages = {
        activate: "activated, they will proceed to the designated areas.",
        injured: "requires medical assistance.",
        standown: "has stood down and is awaiting further instructions.",
        fireOut: "Fire is out, beginning recovery operations.",
        requestBackUp: "Backup requested, send additional support units.",
        requestMedical: "URGENT! REQUESTING MEDICAL ASSISTANCE FOR INJURED PERSONNEL.",
        resupplyWater: "Resupplying water tank, operations paused temporarily.",
        fallback: "Fallback requested, unforeseen circumstances encountered.",
        fireAlarm: "FIRE ALARM LEVEL INCREASED; proceed with heightened caution."  // New Fire Alarm message
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

            // Start timers for checked attendees when msgActivate is clicked
            document.getElementById('msgActivate').addEventListener('click', () => {
                sendMessageWithAttendees('activate', username);
                resetAndStartTimersForCheckedAttendees();  // Reset and start timers for selected attendees
            });

            // Stop timers for checked attendees when msgStandown is clicked
            document.getElementById('msgStandown').addEventListener('click', () => {
                sendMessageWithAttendees('standown', username);
                stopTimersForCheckedAttendees();
            });

            document.getElementById('msgInjured').addEventListener('click', () => {
                sendMessageWithAttendees('injured', username, true);  // Pass `true` to mark it as an injured/medical message
            });

            document.getElementById('msgFireOut').addEventListener('click', () => {
                sendMessage(username, macroMessages.fireOut); // No names attached to Fire Out message
            });

            document.getElementById('msgBackUp').addEventListener('click', () => {
                sendMessage(username, macroMessages.requestBackUp, false, 'backUp');
            });

            document.getElementById('msgMedicalAssistance').addEventListener('click', () => {
                sendMessage(username, macroMessages.requestMedical, true, 'medicalAssistance');
            });

            document.getElementById('msgResupplyWater').addEventListener('click', () => {
                sendMessage(username, macroMessages.resupplyWater, false, 'resupplyWater');
            });

            document.getElementById('msgFallback').addEventListener('click', () => {
                sendMessage(username, macroMessages.fallback, false, 'fallback');
            });

            // New event listener for msgFireAlarm button
            document.getElementById('msgFireAlarm').addEventListener('click', () => {
                sendMessage(username, macroMessages.fireAlarm, false, 'fireAlarm');
            });

        });

    // Function to handle sending messages
    function sendMessage(username, message, isInjuredOrMedical = false, buttonType = '') {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const messageData = {
            username: username,
            message: message,
            date: date,
            time: time,
            isInjuredOrMedical: isInjuredOrMedical,
            buttonType: buttonType  // Send buttonType to handle message styling
        };

        // Emit the chat message to all clients via the server
        socket.emit('chatMessage', messageData);

        // Save the message to the .txt file
        fetch('/saveChatMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        }).then(response => {
            if (!response.ok) {
                console.error('Failed to save chat message to log file.');
            }
        });

        document.getElementById('messageBox').value = '';  // Clear input box (for typed messages)
    }

    // Function to get the call signs of checked attendees
    function getCheckedAttendees() {
        const checkedAttendees = [];
        const rows = document.querySelectorAll('#icsAttendees tr');

        rows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            const callSign = row.querySelector('td:nth-child(1)').textContent;

            if (checkbox.checked) {
                checkedAttendees.push({ callSign, row });
            }
        });

        return checkedAttendees;
    }

    // Function to send a message with the call signs of checked attendees
    function sendMessageWithAttendees(buttonType, username, isInjuredOrMedical = false) {
        const attendees = getCheckedAttendees();

        if (attendees.length > 0) {
            const attendeeList = attendees.map(attendee => attendee.callSign).join(', ');
            const message = `${attendeeList} ${macroMessages[buttonType]}`;
            sendMessage(username, message, isInjuredOrMedical, buttonType);
        } else {
            alert("No attendees selected.");
        }
    }

    // Function to reset and start timers for checked attendees and uncheck checkboxes
    function resetAndStartTimersForCheckedAttendees() {
        const checkedAttendees = getCheckedAttendees();
        selectedAttendees = checkedAttendees;  // Store selected attendees

        // Reset and start timers for checked attendees
        checkedAttendees.forEach(({ callSign, row }) => {
            const timerCell = row.querySelector('td:nth-child(4)');
            let seconds = 0;  // Always reset to 0

            // Clear any existing interval before starting a new one
            if (timers[callSign]?.interval) {
                clearInterval(timers[callSign].interval);
            }

            timers[callSign] = { seconds };  // Reset the stored seconds

            timers[callSign].interval = setInterval(() => {
                timers[callSign].seconds++;  // Increment stored seconds
                const hours = Math.floor(timers[callSign].seconds / 3600);
                const minutes = Math.floor((timers[callSign].seconds % 3600) / 60);
                const secs = timers[callSign].seconds % 60;
                timerCell.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }, 1000);
        });

        // After starting the timers, uncheck the checkboxes
        checkedAttendees.forEach(({ row }) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            checkbox.checked = false;
        });
    }

    // Function to stop timers for selected attendees and uncheck the checkboxes
    function stopTimersForCheckedAttendees() {
        const checkedAttendees = getCheckedAttendees();

        if (checkedAttendees.length === 0) {
            alert("No attendees selected.");
            return;
        }

        checkedAttendees.forEach(({ callSign, row }) => {
            if (timers[callSign]) {
                clearInterval(timers[callSign].interval);  // Stop the timer but don't reset seconds
            }
            // Uncheck the checkbox
            const checkbox = row.querySelector('input[type="checkbox"]');
            checkbox.checked = false;
        });
    }

    //DONT DELETE CODES BELOW++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //DONT DELETE CODES BELOW++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //DONT DELETE CODES BELOW++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//     // Load chat log from the server when the user connects
// socket.on('loadChatLog', (chatLogs) => {
//     const chatSystem = document.getElementById('chatSystem');

//     // Clear the chat system before appending messages
//     chatSystem.innerHTML = '';

//     // Iterate through each log message and append it to the chat
//     chatLogs.forEach((logMessage) => {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');  // Add a class for styling if needed
        
//         // Append each message from the log file
//         messageElement.innerHTML = logMessage;
//         chatSystem.prepend(messageElement);  // Prepend to show recent messages on top
//     });
// });


    // // Load chat log without storing it in session storage
    // socket.on('loadChatLog', (chatLogs) => {
    //     chatSystem.innerHTML = '';  // Clear chat system on page load

    //     // Only display past messages, do not store in sessionStorage
    //     chatLogs.forEach((logMessage) => {
    //         const messageElement = document.createElement('div');
    //         messageElement.classList.add('message');
    //         messageElement.innerHTML = logMessage;
    //         chatSystem.prepend(messageElement);
    //     });
    // });

     //DONT DELETE CODES ABOVE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //DONT DELETE CODES ABOVE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //DONT DELETE CODES ABOVE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 
    // Receiving a new message
socket.on('chatMessage', (msgData) => {
    const chatSystem = document.getElementById('chatSystem');

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');  // Add a class for styling if needed

    const timestamp = `${msgData.date} ${msgData.time}`;

    // Display the message with the appropriate styling for different message types
    let messageStyle = '';
    if (msgData.isInjuredOrMedical) {
        messageStyle = 'color: red; font-weight: bold;';
    } else if (msgData.buttonType === 'backUp') {
        messageStyle = 'background-color: green; color: white; padding: 5px; border-radius: 3px;';
    } else if (msgData.buttonType === 'medicalAssistance') {
        messageStyle = 'background-color: gold; color: black; padding: 5px; border-radius: 3px;';
    } else if (msgData.buttonType === 'resupplyWater') {
        messageStyle = 'background-color: red; color: white; padding: 5px; border-radius: 3px;';
    } else if (msgData.buttonType === 'fallback') {
        messageStyle = 'background-color: blue; color: white; padding: 5px; border-radius: 3px;';
    }   else if (msgData.buttonType === 'fireAlarm') {  // Styling for Fire Alarm message
        messageStyle = 'background-color: red; color: white; padding: 5px; border-radius: 3px;';
    }

    messageElement.innerHTML = `<strong>${msgData.username}</strong>: <span style="${messageStyle}">${msgData.message}</span> <span class="text-gray-500">(${timestamp})</span>`;
    chatSystem.prepend(messageElement);  // Prepend to show recent messages on top

    //  //     // Store the chat messages in sessionStorage
    //     let storedChatLogs = JSON.parse(sessionStorage.getItem('storedChatLogs')) || [];
    //     storedChatLogs.push(`${msgData.username}: ${msgData.message} (${timestamp})`);
    //     sessionStorage.setItem('storedChatLogs', JSON.stringify(storedChatLogs));

     // Store only new messages in sessionStorage
     let storedChatLogs = JSON.parse(sessionStorage.getItem('storedChatLogs')) || [];
     storedChatLogs.push(`${msgData.username}: ${msgData.message} (${timestamp})`);
     sessionStorage.setItem('storedChatLogs', JSON.stringify(storedChatLogs));
});


});
