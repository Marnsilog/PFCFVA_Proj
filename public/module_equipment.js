//for equipment


//past working code 000000000000000000000000000000000000000000000000000000000000
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
            const searchQuery = document.getElementById('inventorySearchBox').value.toLowerCase(); // Get search query

            const filteredData = data.filter(item => {
                const matchesVehicle = selectedVehicle ? item.vehicleAssignment === selectedVehicle : true;
                const matchesSearch = item.itemName.toLowerCase().includes(searchQuery);
                return matchesVehicle && matchesSearch; // Filter based on search query and selected vehicle
            });

            filteredData.forEach(item => {
                const div = document.createElement('div');
                div.className = 'w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between'; // Class name for layout
                div.innerHTML = `
                    <div class="flex justify-normal space-x-5 py-2">
                        <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md" alt="Equipment Image"> <!-- Image for equipment -->
                        <p class="py-8 ml-5 text-2xl font-bold">${item.itemName}</p> <!-- Equipment name -->
                        <p class="py-8 ml-5 text-xl font-[300] pl-6">${item.vehicleAssignment}</p> <!-- Vehicle assignment -->
                    </div>
                    <div class="flex justify-normal space-x-10 mr-10 py-8">
                        <svg class="w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        <!-- Delete icon -->

                        <svg class="w-8 h-8 cursor-pointer mt-2" onclick="edit()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                        <!-- Edit icon -->
                    </div>
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
    document.getElementById('sortVehicleAssignment').addEventListener('change', loadEquipment); // Event listener for sort select

    // Add event listener to search box
    document.getElementById('inventorySearchBox').addEventListener('input', loadEquipment); // Event listener for search box
});
