function animateProgressBar(targetWidth) {
  
    const progressBar = document.getElementById('progress');
    if (progressBar) {
      progressBar.style.width = targetWidth + '%';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    animateProgressBar(70);
  });
  
  function animateProgressBar2(targetWidth) {
    const progressBar2 = document.getElementById('progress2');
    if (progressBar2) {
      progressBar2.style.width = targetWidth + '%';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    animateProgressBar2(40);
  });



document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('logoutLink');

    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();

            const confirmLogout = confirm("Are you sure you want to log out?");

            if (confirmLogout) {
                window.location.href = '/public/dashboard.html';
            }
        });
    }
});





