document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profile-pic');
    const profilePicButton = document.getElementById('profile-pic-button');
    const loadingContainer = document.getElementById('loading-container');
    const resPonsivepic = document.getElementById('resPonsivepic');
    function fetchProfilePic(element) {
        setTimeout(() => {
            loadingContainer.style.display = 'block';

            fetch('/auth/get-profilePic') 
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        element.src = data.profilePicPath || 'img/user.png'; 
                    } else {
                        console.error('Failed to fetch profile picture:', data.message);
                    }
                })
                .catch(error => console.error('Error fetching profile picture:', error))
                .finally(() => {
                    loadingContainer.style.display = 'none';
                });
        }, 200);
    }

    fetchProfilePic(profilePic);
    fetchProfilePic(profilePicButton);
    fetchProfilePic(resPonsivepic);
});
