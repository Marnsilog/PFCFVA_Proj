



//for attendance NAV
document.addEventListener('DOMContentLoaded', function() {
    fetch('/attendanceDetails')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const attendanceLogs = document.getElementById('attendanceLogs');
            const searchBox = document.getElementById('attendanceSearchBox'); // Added search box reference for attendance

            // Function to display the data
            function displayAttendanceData(records) { // Added displayAttendanceData function
                attendanceLogs.innerHTML = ''; // Clear existing logs
                records.forEach(record => {
                    const row = document.createElement('tr');
                    const dateFormattedTimeIn = new Date(record.dateOfTimeIn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }); // Format date to "Month Day, Year"
                    const dateFormattedTimeOut = record.dateOfTimeOut ? new Date(record.dateOfTimeOut).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : '-';
                    row.innerHTML = `
                        <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                        <td>${record.callSign}</td>
                        <td>${dateFormattedTimeIn}</td>
                        <td>${record.timeIn}</td>
                        <td>${dateFormattedTimeOut}</td>
                        <td>${record.timeOut || '-'}</td>
                        
                    `;
                    attendanceLogs.appendChild(row);
                });
            }

            //for inner html (removed)
            // <td>${record.status}</td>
            // <td class="flex justify-center mt-[5px]">${record.accountType} <span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-[5px]" viewBox="0 0 320 512"><path fill="limegreen" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg></span></td>
            // <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 448 512"><path fill="black" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg></td>
            // <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 128 512"><path fill="black" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg></td>
           
            // Initial display of data
            displayAttendanceData(data); // Call displayAttendanceData with initial data

            // Add event listener to search box
            searchBox.addEventListener('input', function() { // Added event listener for attendance
                const searchTerm = searchBox.value.toLowerCase();
                const filteredData = data.filter(record => {
                    const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
                    return fullName.includes(searchTerm);
                });
                displayAttendanceData(filteredData); // Call displayAttendanceData with filtered data
            });
        })
        .catch(error => {
            console.error('Error fetching recent attendance logs:', error);
        });
});


//for Volunteer Accounts Configuration

document.addEventListener('DOMContentLoaded', function() {
    fetch('/accountsAll')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const volunteerAccountsDetails = document.getElementById('volunteerAccountsDetails');
            const searchBox = document.getElementById('volunteerAccountsSearchBox'); // Added search box reference for attendance

            // Function to display the data
            function displayAttendanceData(records) {
                volunteerAccountsDetails.innerHTML = ''; // Clear existing logs
                records.forEach(record => {
                    const rank = record.callSign.replace(/\d/g, ''); // Remove numbers from callSign
                    const row = document.createElement('tr');

                    // Updated HTML to make names clickable with showEdit function
                    row.innerHTML = `
                        <td class="py-2 px-4 border-b">
                            <a href="javascript:void(0);" class="hover:underline text-blue-500" onclick="showEdit()">
                                ${record.firstName} ${record.middleInitial}. ${record.lastName}
                            </a>
                        </td>
                        <td>${record.callSign}</td>
                        <td>${rank}</td>
                        <td>${record.accountType}</td>
                        <td>${record.status}</td>
                        <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 448 512"><path fill="black" d="..."></path></svg></td>
                        <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 128 512"><path fill="black" d="..."></path></svg></td>
                    `;
                    volunteerAccountsDetails.appendChild(row);
                });
            }

            displayAttendanceData(data); // Call displayAttendanceData with initial data

            // Add event listener to search box
            searchBox.addEventListener('input', function() {
                const searchTerm = searchBox.value.toLowerCase();
                const filteredData = data.filter(record => {
                    const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
                    return fullName.includes(searchTerm);
                });
                displayAttendanceData(filteredData); // Call displayAttendanceData with filtered data
            });
        })
        .catch(error => {
            console.error('Error fetching recent attendance logs:', error);
        });
});




//attendance nav recent working no search
// document.addEventListener('DOMContentLoaded', function() {
//     //asd
//     fetch('/attendanceDetails')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const attendanceLogs = document.getElementById('attendanceLogs');
//             attendanceLogs.innerHTML = ''; // Clear existing logs
//             data.forEach(record => {
//                 const row = document.createElement('tr');
//                 const dateFormattedTimeIn = new Date(record.dateOfTimeIn).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                 }); // Change: Format date to "Month Day, Year"
//                 const dateFormattedTimeOut = new Date(record.dateOfTimeOut).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                 });
//                 row.innerHTML = `
//                     <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
//                     <td>${record.callSign}</td>
//                     <td>${dateFormattedTimeIn}</td>
//                     <td>${record.timeIn}</td>
//                     <td>${dateFormattedTimeOut}</td>
//                     <td>${record.timeOut || '-'}</td>
//                     <td>${record.status}</td>
//                     <td class="flex justify-center mt-[5px]">${record.accountType} <span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-[5px]" viewBox="0 0 320 512"><path fill="limegreen" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg></span></td>
//                     <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 448 512"><path fill="black" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg></td>
//                     <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 128 512"><path fill="black" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg></td>
//                 `;
//                 attendanceLogs.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching recent attendance logs:', error);
//         });
// });


//Merit Tracking Nav
document.addEventListener('DOMContentLoaded', function() {
    fetch('/volunteerDetails')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const volunteerDetails = document.getElementById('volunteerDetails');
        const searchBox = document.getElementById('volunteerSearchBox'); // Added search box reference

        // Function to display the data
        function displayData(records) { // Added displayData function
          volunteerDetails.innerHTML = ''; // Clear existing data
          records.forEach(record => {
            const row = document.createElement('tr');
            const rank = record.callSign.replace(/\d/g, ''); // Remove numbers from callSign
            row.innerHTML = `
              <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
              <td>${record.callSign}</td>
              <td>${rank}</td>
              <td>${record.dutyHours}</td>
              <td>${record.cumulativeDutyHours}</td>
              <td>${record.fireResponsePoints}</td>
              <td>${record.inventoryPoints}</td>
              <td>${record.activityPoints}</td>
              
            `;
            volunteerDetails.appendChild(row);
          });
        }

        //removed from td
        //<td>${record.accountType}</td>

        // Initial display of data
        displayData(data); // Call displayData with initial data

        // Add event listener to search box
        searchBox.addEventListener('input', function() { // Added event listener
          const searchTerm = searchBox.value.toLowerCase();
          const filteredData = data.filter(record => {
            const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
            return fullName.includes(searchTerm);
          });
          displayData(filteredData); // Call displayData with filtered data
        });
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
      });
  });


//volulnteers NAV (recent working no search)
// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/volunteerDetails')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         const volunteerDetails = document.getElementById('volunteerDetails');
//         volunteerDetails.innerHTML = ''; // Clear existing data

//         data.forEach(record => {
//           const row = document.createElement('tr');
//           const rank = record.callSign.replace(/\d/g, ''); // remove numbers from callSign
//           row.innerHTML = `
//             <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
//             <td>${record.callSign}</td>
//             <td>${rank}</td>
//             <td>${record.dutyHours}</td>
//             <td>${record.cumulativeDutyHours}</td>
//             <td>${record.fireResponsePoints}</td>
//             <td>${record.inventoryPoints}</td>
//             <td>${record.activityPoints}</td>
//             <td>${record.accountType}</td>
//           `;
//           volunteerDetails.appendChild(row);
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching volunteer details:', error);
//       });
//   });
























// function fetchRecentAttendance() {
//     fetch('/attendance')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         const attendanceLogs = document.getElementById('attendanceLogs');
//         attendanceLogs.innerHTML = ''; // Clear existing logs

//         data.forEach(record => {
//           const row = document.createElement('tr');
//           row.innerHTML = `
//             <td class="md:static md:pt-3 pt-2 sticky-col bg-white">${record.fullName}</td>
//             <td>${record.callSign}</td>
//             <td>${new Date(record.dateOfTimeIn).toLocaleDateString()}</td>
//             <td>${record.timeIn}</td>
//             <td>${record.dateOfTimeOut ? new Date(record.dateOfTimeOut).toLocaleDateString() : '-'}</td>
//             <td>${record.timeOut || '-'}</td>
//             <td>${record.status}</td>
//             <td class="flex justify-center mt-[5px]">${record.accountType} <span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-[5px]" viewBox="0 0 320 512"><path fill="limegreen" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg></span></td>
//             <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 448 512"><path fill="black" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg></td>
//             <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 128 512"><path fill="black" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg></td>
//           `;
//           attendanceLogs.appendChild(row);
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching recent attendance logs:', error);
//       });
//   }

//   document.addEventListener('DOMContentLoaded', fetchRecentAttendance);



// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/attendance')
//       .then(response => response.json())
//       .then(data => {
//         const tbody = document.getElementById('attendance-body');
//         tbody.innerHTML = ''; // Clear existing data

//         data.forEach(record => {
//           const row = document.createElement('tr');
//           row.innerHTML = `
//             <td class="md:static md:pt-3 pt-2 sticky-col bg-white">${record.fullName}</td>
//             <td>${record.callSign}</td>
//             <td>${new Date(record.dateOfTimeIn).toLocaleDateString()}</td>
//             <td>${record.timeIn}</td>
//             <td>${record.dateOfTimeOut ? new Date(record.dateOfTimeOut).toLocaleDateString() : '-'}</td>
//             <td>${record.timeOut || '-'}</td>
//             <td>${record.status}</td>
//             <td class="flex justify-center mt-[5px]">${record.accountType} <span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-[5px]" viewBox="0 0 320 512"><path fill="limegreen" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg></span></td>
//             <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 448 512"><path fill="black" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg></td>
//             <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 128 512"><path fill="black" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg></td>
//           `;
//           tbody.appendChild(row);
//         });
//       });
//   });








// Function to toggle the visibility of the add equipment form
function toggleAddEquipmentForm() {
    var form = document.getElementById('addEquipmentForm');
    form.style.display = (form.style.display === 'none' ? 'block' : 'none');
}

// Event listener for the ADD button
document.getElementById('btnAddEquip').addEventListener('click', function() {
    toggleAddEquipmentForm(); // Show the form
});

// Handling form submission
document.querySelector('#addEquipmentForm form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    
    fetch('/uploadEquipment', {
        method: 'POST',
        body: formData  // No need to set Content-Type header because FormData takes care of it
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text || 'Server responded with status: ' + response.status) });
        }
        return response.json();
    })
    .then(data => {
        alert('Success: ' + data.message);
        toggleAddEquipmentForm(); // Close the form after submission
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting the form: ' + error.message);
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/getEquipment')
//         .then(response => response.json())
//         .then(data => {
//             const container = document.getElementById('equipmentGrid');
//             data.forEach(item => {
//                 const div = document.createElement('div');
//                 div.className = 'w-52 h-64 border-2 border-black';
//                 div.innerHTML = `
//                     <div class="mt-2 w-full flex justify-end">
//                         <!-- Additional control icons can go here -->
//                     </div>
//                     <div class="w-full flex justify-center">
//                         <div class="w-[170px] h-[170px] border-2 border-black">
//                             <img src="${item.itemImage}" class="w-full h-full object-fill" alt="Equipment Image">
//                         </div>
//                     </div>
//                     <p class="text-base font-Inter text-center">${item.itemName}</p>
//                 `;
//                 container.appendChild(div);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading equipment:', error);
//         });
// });


// Function to load and display equipment
function loadEquipment() {
    fetch('/getEquipment')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('equipmentGrid');
            container.innerHTML = ''; // Clear the container

            const selectedVehicle = document.getElementById('sortVehicleAssignment').value;
            const filteredData = selectedVehicle ? data.filter(item => item.vehicleAssignment === selectedVehicle) : data; // Marked change: Filter data based on selected vehicle

            filteredData.forEach(item => {
                const div = document.createElement('div');
                div.className = 'w-52 h-64 border-2 border-black';
                div.innerHTML = `
                    <div class="mt-2 w-full flex justify-end">
                        <!-- Additional control icons can go here -->
                    </div>
                    <div class="w-full flex justify-center">
                        <div class="w-[170px] h-[170px] border-2 border-black">
                            <img src="${item.itemImage}" class="w-full h-full object-fill" alt="Equipment Image">
                        </div>
                    </div>
                    <p class="text-base font-Inter text-center">${item.itemName}</p>
                    <p class="text-sm font-Inter text-center">${item.vehicleAssignment}</p> <!-- Marked change: Display vehicle assignment -->
                `;
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error loading equipment:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadEquipment();

    // Add event listener to sort select
    document.getElementById('sortVehicleAssignment').addEventListener('change', loadEquipment); // Marked change: Event listener for sort select
});