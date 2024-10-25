




// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io();
//     const timers = {};  // Store interval IDs and seconds for each checked attendee (by callSign)
//     let selectedAttendees = [];  // Store selected attendees when msgActivate is clicked

//     // Predefined macro messages (easily editable)
//     const macroMessages = {
//         activate: "activated, they will proceed to the designated areas.",
//         injured: "requires medical assistance.",
//         standown: "has stood down and is awaiting further instructions.",
//         fireOut: "Fire is out, beginning recovery operations.",
//         requestBackUp: "Backup requested, send additional support units.",
//         requestMedical: "URGENT! REQUESTING MEDICAL ASSISTANCE FOR INJURED PERSONNEL.",
//         resupplyWater: "Resupplying water tank, operations paused temporarily.",
//         fallback: "Fallback requested, unforeseen circumstances encountered."
//     };

//     // Fetch the username from the session (replace with your session API route)
//     fetch('/auth/getUsername')
//         .then(response => response.json())
//         .then(data => {
//             const username = data.username;

//             // Sending a typed message
//             document.getElementById('btnSendMessage').addEventListener('click', () => {
//                 const message = document.getElementById('messageBox').value;

//                 if (message.trim() !== '') {
//                     sendMessage(username, message);
//                 }
//             });

//             // Start timers for checked attendees when msgActivate is clicked
//             document.getElementById('msgActivate').addEventListener('click', () => {
//                 sendMessageWithAttendees('activate', username);
//                 resetAndStartTimersForCheckedAttendees();  // Reset and start timers for selected attendees
//             });

//             // Stop timers for checked attendees when msgStandown is clicked
//             document.getElementById('msgStandown').addEventListener('click', () => {
//                 sendMessageWithAttendees('standown', username);
//                 stopTimersForCheckedAttendees();
//             });

//             document.getElementById('msgInjured').addEventListener('click', () => {
//                 sendMessageWithAttendees('injured', username, true);  // Pass `true` to mark it as an injured/medical message
//             });

//             document.getElementById('msgFireOut').addEventListener('click', () => {
//                 sendMessage(username, macroMessages.fireOut); // No names attached to Fire Out message
//             });

//             // document.getElementById('msgBackUp').addEventListener('click', () => {
//             //     sendMessage(username, macroMessages.requestBackUp);
//             // });

//             // document.getElementById('msgMedicalAssistance').addEventListener('click', () => {
//             //     sendMessage(username, macroMessages.requestMedical, true);  // Mark as red and caps
//             // });

//             // document.getElementById('msgResupplyWater').addEventListener('click', () => {
//             //     sendMessage(username, macroMessages.resupplyWater);
//             // });

//             // document.getElementById('msgFallback').addEventListener('click', () => {
//             //     sendMessage(username, macroMessages.fallback);
//             // });

//             // Request Back Up
// document.getElementById('msgBackUp').addEventListener('click', () => {
//     sendMessage(username, macroMessages.requestBackUp, false, 'backUp');
// });

// // Request Medical Assistance
// document.getElementById('msgMedicalAssistance').addEventListener('click', () => {
//     sendMessage(username, macroMessages.requestMedical, true, 'medicalAssistance');
// });

// // Resupply Water Tank
// document.getElementById('msgResupplyWater').addEventListener('click', () => {
//     sendMessage(username, macroMessages.resupplyWater, false, 'resupplyWater');
// });

// // Request Fallback
// document.getElementById('msgFallback').addEventListener('click', () => {
//     sendMessage(username, macroMessages.fallback, false, 'fallback');
// });

//         });

//     // // Function to handle sending messages
//     // function sendMessage(username, message, isInjuredOrMedical = false) {
//     //     const now = new Date();
//     //     const date = now.toLocaleDateString(); // Get the date
//     //     const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // 24-hour format

//     //     const messageData = {
//     //         username: username,
//     //         message: message,
//     //         date: date,
//     //         time: time,
//     //         isInjuredOrMedical: isInjuredOrMedical  // Pass whether it's an injured or medical message
//     //     };

//     //     // Emit the chat message to all clients
//     //     socket.emit('chatMessage', messageData);

//     //     // Save the message to the .txt file
//     //     fetch('/saveChatMessage', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(messageData)
//     //     }).then(response => {
//     //         if (!response.ok) {
//     //             console.error('Failed to save chat message to log file.');
//     //         }
//     //     });

//     //     document.getElementById('messageBox').value = '';  // Clear input box (for typed messages)
//     // }


//     function sendMessage(username, message, isInjuredOrMedical = false, buttonType = '') {
//         const now = new Date();
//         const date = now.toLocaleDateString();
//         const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
//         // Determine the color based on the buttonType
//         let messageStyle = '';
//         if (buttonType === 'backUp') {
//             messageStyle = 'background-color: green; color: white; padding: 5px; border-radius: 3px;';
//         } else if (buttonType === 'medicalAssistance') {
//             messageStyle = 'background-color: gold; color: black; padding: 5px; border-radius: 3px;';
//         } else if (buttonType === 'resupplyWater') {
//             messageStyle = 'background-color: red; color: white; padding: 5px; border-radius: 3px;';
//         } else if (buttonType === 'fallback') {
//             messageStyle = 'background-color: blue; color: white; padding: 5px; border-radius: 3px;';
//         }
    
//         const messageData = {
//             username: username,
//             message: message,
//             date: date,
//             time: time,
//             isInjuredOrMedical: isInjuredOrMedical
//         };
    
//         // Emit the chat message to all clients
//         socket.emit('chatMessage', messageData);
    
//         // Save the message to the .txt file
//         fetch('/saveChatMessage', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(messageData)
//         }).then(response => {
//             if (!response.ok) {
//                 console.error('Failed to save chat message to log file.');
//             }
//         });
    
//         // Display the message in the chat with appropriate style
//         const chatSystem = document.getElementById('chatSystem');
//         const messageElement = document.createElement('div');
//         messageElement.innerHTML = `<strong>${username}</strong>: <span style="${messageStyle}">${message}</span> <span class="text-gray-500">(${date} ${time})</span>`;
//         chatSystem.prepend(messageElement);
    
//         document.getElementById('messageBox').value = '';  // Clear input box
//     }
    

//     // Function to get the call signs of checked attendees
//     function getCheckedAttendees() {
//         const checkedAttendees = [];
//         const rows = document.querySelectorAll('#icsAttendees tr');

//         rows.forEach(row => {
//             const checkbox = row.querySelector('input[type="checkbox"]');
//             const callSign = row.querySelector('td:nth-child(1)').textContent;

//             if (checkbox.checked) {
//                 checkedAttendees.push({ callSign, row });
//             }
//         });

//         return checkedAttendees;
//     }

//     // Function to send a message with the call signs of checked attendees
//     function sendMessageWithAttendees(buttonType, username, isInjuredOrMedical = false) {
//         const attendees = getCheckedAttendees();

//         if (attendees.length > 0) {
//             const attendeeList = attendees.map(attendee => attendee.callSign).join(', ');
//             const message = `${attendeeList} ${macroMessages[buttonType]}`;
//             sendMessage(username, message, isInjuredOrMedical);
//         } else {
//             alert("No attendees selected.");
//         }
//     }

//     // Function to reset and start timers for checked attendees and uncheck checkboxes
//     function resetAndStartTimersForCheckedAttendees() {
//         const checkedAttendees = getCheckedAttendees();
//         selectedAttendees = checkedAttendees;  // Store selected attendees

//         // Reset and start timers for checked attendees
//         checkedAttendees.forEach(({ callSign, row }) => {
//             const timerCell = row.querySelector('td:nth-child(4)');
//             let seconds = 0;  // Always reset to 0

//             // Clear any existing interval before starting a new one
//             if (timers[callSign]?.interval) {
//                 clearInterval(timers[callSign].interval);
//             }

//             timers[callSign] = { seconds };  // Reset the stored seconds

//             timers[callSign].interval = setInterval(() => {
//                 timers[callSign].seconds++;  // Increment stored seconds
//                 const hours = Math.floor(timers[callSign].seconds / 3600);
//                 const minutes = Math.floor((timers[callSign].seconds % 3600) / 60);
//                 const secs = timers[callSign].seconds % 60;
//                 timerCell.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//             }, 1000);
//         });

//         // After starting the timers, uncheck the checkboxes
//         checkedAttendees.forEach(({ row }) => {
//             const checkbox = row.querySelector('input[type="checkbox"]');
//             checkbox.checked = false;
//         });
//     }

//     // Function to stop timers for selected attendees and uncheck the checkboxes
//     function stopTimersForCheckedAttendees() {
//         const checkedAttendees = getCheckedAttendees();

//         if (checkedAttendees.length === 0) {
//             alert("No attendees selected.");
//             return;
//         }

//         checkedAttendees.forEach(({ callSign, row }) => {
//             if (timers[callSign]) {
//                 clearInterval(timers[callSign].interval);  // Stop the timer but don't reset seconds
//             }
//             // Uncheck the checkbox
//             const checkbox = row.querySelector('input[type="checkbox"]');
//             checkbox.checked = false;
//         });
//     }

//     // Load chat messages from the .txt file on page load
//     fetch('/loadChatMessages')
//         .then(response => response.json())
//         .then(chatLogs => {
//             const chatSystem = document.getElementById('chatSystem');
//             chatLogs.forEach(log => {
//                 const messageElement = document.createElement('div');
//                 const timestamp = `${log.date} ${log.time}`;

//                 if (log.isInjuredOrMedical) {
//                     messageElement.innerHTML = `<strong>${log.username}</strong>: <span style="color: red; font-weight: bold;">${log.message}</span> <span class="text-gray-500">(${timestamp})</span>`;
//                 } else {
//                     messageElement.innerHTML = `<strong>${log.username}</strong>: ${log.message} <span class="text-gray-500">(${timestamp})</span>`;
//                 }

//                 chatSystem.prepend(messageElement);  // Prepend to show recent messages on top
//             });
//         })
//         .catch(error => console.error('Failed to load chat messages:', error));

//     // Receiving a message
//     socket.on('chatMessage', (msgData) => {
//         const chatSystem = document.getElementById('chatSystem');

//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');  // Add a class for styling if needed

//         // Display both date and time
//         const timestamp = `${msgData.date} ${msgData.time}`;

//         // Check if the message is an "injured" or "medical assistance" message and apply red color
//         if (msgData.isInjuredOrMedical) {
//             messageElement.innerHTML = `<strong>${msgData.username}</strong>: <span style="color: red; font-weight: bold;">${msgData.message}</span> <span class="text-gray-500">(${timestamp})</span>`;
//         } else {
//             // Append the username, message, and timestamp to the message element
//             messageElement.innerHTML = `<strong>${msgData.username}</strong>: ${msgData.message} <span class="text-gray-500">(${timestamp})</span>`;
//         }

//         chatSystem.prepend(messageElement);  // Prepend to show recent messages on top

//         //store the chat messages in sessionStorage
//     let storedChatLogs = JSON.parse(sessionStorage.getItem('storedChatLogs')) || []; // Retrieve existing logs or create empty array
//     storedChatLogs.push(`${msgData.username}: ${msgData.message} (${timestamp})`); // Add the new message
//     sessionStorage.setItem('storedChatLogs', JSON.stringify(storedChatLogs)); // Store updated chat logs
//     });

//     // Load chat logs when a user connects
// socket.on('loadChatLog', (chatLog) => {
//     const chatSystem = document.getElementById('chatSystem');

//     // Split the chat log into individual messages (if it's not empty)
//     const logMessages = chatLog.trim().split('\n').reverse();  // Reverse to show the latest first

//     logMessages.forEach((logMessage) => {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');  // Add a class for styling if needed

//         // Append each message from the log file
//         messageElement.innerHTML = logMessage;
//         chatSystem.prepend(messageElement);  // Prepend to show recent messages on top
//     });
// });



// });


document.addEventListener('DOMContentLoaded', () => {
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

    // Load chat messages from the .txt file on page load
    // fetch('/loadChatMessages')
    //     .then(response => response.json())
    //     .then(chatLogs => {
    //         const chatSystem = document.getElementById('chatSystem');
    //         chatLogs.forEach(log => {
    //             const messageElement = document.createElement('div');
    //             const timestamp = `${log.date} ${log.time}`;

    //             let messageStyle = '';
    //             if (log.isInjuredOrMedical) {
    //                 messageStyle = 'color: red; font-weight: bold;';
    //             } else if (log.buttonType === 'backUp') {
    //                 messageStyle = 'background-color: green; color: white; padding: 5px; border-radius: 3px;';
    //             } else if (log.buttonType === 'medicalAssistance') {
    //                 messageStyle = 'background-color: gold; color: black; padding: 5px; border-radius: 3px;';
    //             } else if (log.buttonType === 'resupplyWater') {
    //                 messageStyle = 'background-color: red; color: white; padding: 5px; border-radius: 3px;';
    //             } else if (log.buttonType === 'fallback') {
    //                 messageStyle = 'background-color: blue; color: white; padding: 5px; border-radius: 3px;';
    //             }

    //             messageElement.innerHTML = `<strong>${log.username}</strong>: <span style="${messageStyle}">${log.message}</span> <span class="text-gray-500">(${timestamp})</span>`;
    //             chatSystem.prepend(messageElement);  // Prepend to show recent messages on top
    //         });
    //     })
    //     .catch(error => console.error('Failed to load chat messages:', error));

    // Load chat log from the server when the user connects
socket.on('loadChatLog', (chatLogs) => {
    const chatSystem = document.getElementById('chatSystem');

    // Clear the chat system before appending messages
    chatSystem.innerHTML = '';

    // Iterate through each log message and append it to the chat
    chatLogs.forEach((logMessage) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');  // Add a class for styling if needed
        
        // Append each message from the log file
        messageElement.innerHTML = logMessage;
        chatSystem.prepend(messageElement);  // Prepend to show recent messages on top
    });
});


    // // Receiving a message
    // socket.on('chatMessage', (msgData) => {
    //     const chatSystem = document.getElementById('chatSystem');

    //     const messageElement = document.createElement('div');
    //     messageElement.classList.add('message');  // Add a class for styling if needed

    //     const timestamp = `${msgData.date} ${msgData.time}`;

    //     let messageStyle = '';
    //     if (msgData.isInjuredOrMedical) {
    //         messageStyle = 'color: red; font-weight: bold;';
    //     } else if (msgData.buttonType === 'backUp') {
    //         messageStyle = 'background-color: green; color: white; padding: 5px; border-radius: 3px;';
    //     } else if (msgData.buttonType === 'medicalAssistance') {
    //         messageStyle = 'background-color: gold; color: black; padding: 5px; border-radius: 3px;';
    //     } else if (msgData.buttonType === 'resupplyWater') {
    //         messageStyle = 'background-color: red; color: white; padding: 5px; border-radius: 3px;';
    //     } else if (msgData.buttonType === 'fallback') {
    //         messageStyle = 'background-color: blue; color: white; padding: 5px; border-radius: 3px;';
    //     }

    //     messageElement.innerHTML = `<strong>${msgData.username}</strong>: <span style="${messageStyle}">${msgData.message}</span> <span class="text-gray-500">(${timestamp})</span>`;
    //     chatSystem.prepend(messageElement);  // Prepend to show recent messages on top

    //     // Store the chat messages in sessionStorage
    //     let storedChatLogs = JSON.parse(sessionStorage.getItem('storedChatLogs')) || [];
    //     storedChatLogs.push(`${msgData.username}: ${msgData.message} (${timestamp})`);
    //     sessionStorage.setItem('storedChatLogs', JSON.stringify(storedChatLogs));
    // });


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
    }

    messageElement.innerHTML = `<strong>${msgData.username}</strong>: <span style="${messageStyle}">${msgData.message}</span> <span class="text-gray-500">(${timestamp})</span>`;
    chatSystem.prepend(messageElement);  // Prepend to show recent messages on top

     //     // Store the chat messages in sessionStorage
        let storedChatLogs = JSON.parse(sessionStorage.getItem('storedChatLogs')) || [];
        storedChatLogs.push(`${msgData.username}: ${msgData.message} (${timestamp})`);
        sessionStorage.setItem('storedChatLogs', JSON.stringify(storedChatLogs));
});


});
