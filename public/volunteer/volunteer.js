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

  //Changable form
    function Profile() {
      document.getElementById('frmMyprofile').style.display = 'block';
      document.getElementById('frmRankings').style.display = 'none';
      document.getElementById('frmAchievement').style.display = 'none';
      document.getElementById('frmRecord').style.display = 'none';

    }

    function Achievements() {
      document.getElementById('frmAchievement').style.display = 'block';
      document.getElementById('frmMyprofile').style.display = 'none';
      document.getElementById('frmRankings').style.display = 'none';
      document.getElementById('frmRecord').style.display = 'none';
  
    }
    function Rankings() {
      document.getElementById('frmRankings').style.display = 'block';
      document.getElementById('frmMyprofile').style.display = 'none';
      document.getElementById('frmAchievement').style.display = 'none';
      document.getElementById('frmRecord').style.display = 'none';
  
    }
    function Records() {
      document.getElementById('frmRecord').style.display = 'block';
      document.getElementById('frmMyprofile').style.display = 'none';
      document.getElementById('frmAchievement').style.display = 'none';
      document.getElementById('frmRankings').style.display = 'none';
    }

    function toggleSetting() {
      var profileForm = document.getElementById('Setting');
      

      if (profileForm.style.display === 'none' || profileForm.style.display === '') {
       
          profileForm.style.display = 'block';
      } else {
        
          profileForm.style.display = 'none';
      }
  }
   

  function showDashboard(){
    document.getElementById('frmDashboard').style.display = 'block';
    document.getElementById('frmContactus').style.display = 'none';
    document.getElementById('frmHtvolunteer').style.display = 'none';
    document.getElementById('frmInventory').style.display = 'none';
    document.getElementById('frmMainProfile').style.display = 'none';
    document.getElementById('Setting').style.display = 'none';
    
  }
  function showContactus(){
    document.getElementById('frmDashboard').style.display = 'block';
    document.getElementById('frmContactus').style.display = 'block';
    document.getElementById('frmHtvolunteer').style.display = 'none';
    document.getElementById('frmInventory').style.display = 'none';
    document.getElementById('frmMainProfile').style.display = 'none';
    document.getElementById('Setting').style.display = 'none';
    
  }
  function showHwVolunteer(){
    document.getElementById('frmHtvolunteer').style.display = 'block';
    document.getElementById('frmContactus').style.display = 'none';
    document.getElementById('frmInventory').style.display = 'none';
    document.getElementById('frmDashboard').style.display = 'none';
    document.getElementById('frmMainProfile').style.display = 'none';
    document.getElementById('Setting').style.display = 'none';
    
  }
  function myProfile(){
    document.getElementById('frmMainProfile').style.display = 'block';
    document.getElementById('frmContactus').style.display = 'none';
    document.getElementById('frmHtvolunteer').style.display = 'none';
    document.getElementById('frmDashboard').style.display = 'none';
    document.getElementById('frmInventory').style.display = 'none';
    document.getElementById('Setting').style.display = 'none';
    
  }
   
    function showInventory(){
      document.getElementById('frmInventory').style.display = 'block';
      document.getElementById('frmContactus').style.display = 'none';
      document.getElementById('frmHtvolunteer').style.display = 'none';
      document.getElementById('frmDashboard').style.display = 'none';
      document.getElementById('frmMainProfile').style.display = 'none';
      document.getElementById('Setting').style.display = 'none';
      
    }
    //Changable form

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





