document.addEventListener('DOMContentLoaded', function() {
    fetchCurrentPresent(); // Call function to fetch current present attendees
});

// Fetch the current attendees whose timeInStatus is '1' (currently present)
function fetchCurrentPresent() {
    fetch('/getCurrentPresent') // Adjust this URL to match your backend route
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current present attendees');
            }
            return response.json();
        })
        .then(data => {
            const currentPresentDiv = document.getElementById('currentPresent');
            currentPresentDiv.innerHTML = ''; // Clear any existing data

            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${record.callSign}</td>
                    <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                    <td class="py-2 px-4 border-b text-center">
                        <a href="#" onclick="removeFromTable(this)">
                            <i class="fa-solid fa-x text-red-500 cursor-pointer"></i>
                        </a>
                    </td>
                `;
                currentPresentDiv.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching present attendees:', error);
        });
}

// Function to remove attendee from the front-end table only
function removeFromTable(element) {
    const row = element.closest('tr'); // Get the row that contains the clicked "X"
    row.remove(); // Remove the row from the table
}
