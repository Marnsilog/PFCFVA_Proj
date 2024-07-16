



//for attendance NAV
document.addEventListener('DOMContentLoaded', function() {
    //asd
    fetch('/attendanceDetails')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const attendanceLogs = document.getElementById('attendanceLogs');
            attendanceLogs.innerHTML = ''; // Clear existing logs
            data.forEach(record => {
                const row = document.createElement('tr');
                const dateFormattedTimeIn = new Date(record.dateOfTimeIn).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }); // Change: Format date to "Month Day, Year"
                const dateFormattedTimeOut = new Date(record.dateOfTimeOut).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                    <td>${record.callSign}</td>
                    <td>${dateFormattedTimeIn}</td>
                    <td>${record.timeIn}</td>
                    <td>${dateFormattedTimeOut}</td>
                    <td>${record.timeOut || '-'}</td>
                    <td>${record.status}</td>
                    <td class="flex justify-center mt-[5px]">${record.accountType} <span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-[5px]" viewBox="0 0 320 512"><path fill="limegreen" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg></span></td>
                    <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 448 512"><path fill="black" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg></td>
                    <td><svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 128 512"><path fill="black" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg></td>
                `;
                attendanceLogs.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching recent attendance logs:', error);
        });
});



























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