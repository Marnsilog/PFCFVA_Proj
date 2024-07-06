//for attendance


 // Event listener to handle RFID input
 document.addEventListener('DOMContentLoaded', function() {
    const rfidInput = document.getElementById('rfidInput');
    rfidInput.focus();

    rfidInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Handle RFID scan
            const rfidValue = rfidInput.value;
            rfidInput.value = ''; // Clear the input for the next scan
            console.log('RFID Scanned:', rfidValue); // You can remove this line in production

            // Call your function to handle the RFID value
            handleRFIDScan(rfidValue);
        }
    });
});

function handleRFIDScan(rfid) {
    // Handle the RFID scan logic here
    console.log('Handling RFID scan:', rfid); // You can remove this line in production
    // You can add your code here to handle the scanned RFID value
}








// document.addEventListener('DOMContentLoaded', function() {
//     const rfidInput = document.getElementById('rfidInput');
//     rfidInput.focus();

//     rfidInput.addEventListener('keypress', function(event) {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             // Handle RFID scan
//             const rfidValue = rfidInput.value;
//             rfidInput.value = ''; // Clear the input for the next scan
//             console.log('RFID Scanned:', rfidValue); // You can remove this line in production

//             // Call your function to handle the RFID value
//             handleRFIDScan(rfidValue);
//         }
//     });
// });

// function handleRFIDScan(rfid) {
//     // Handle the RFID scan logic here
//     console.log('Handling RFID scan:', rfid); // You can remove this line in production

//     // Example: Make an AJAX call to record attendance
//     fetch('/recordAttendance', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ rfid: rfid })
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Error recording attendance');
//         }
//     })
//     .then(data => {
//         // Update the UI with the response data
//         document.getElementById('FullName').textContent = data.fullName;
//         document.getElementById('CallSign').textContent = data.callSign;
//         document.getElementById('DutyHours').textContent = data.dutyHours;
//         document.getElementById('FireResponsePoints').textContent = data.fireResponsePoints;
//         document.getElementById('InventoryPoints').textContent = data.inventoryPoints;
//         document.getElementById('ActivityPoints').textContent = data.activityPoints;
//         document.getElementById('TimeIn').textContent = data.timeIn;
//         document.getElementById('DateTimeIn').textContent = data.dateTimeIn;
//         document.getElementById('TimeOut').textContent = data.timeOut;
//         document.getElementById('DateTimeOut').textContent = data.dateTimeOut;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Error recording attendance');
//     });
// }

