document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const signinBtn = document.getElementById('signin-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileIcon = document.getElementById('profile-icon');
    const logoutBtn = document.getElementById('logout-btn');
  
    if (token) {
      // Fetch user info from backend
      fetch('http://localhost:5000/api/auth/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          // Hide Sign In button
          signinBtn.style.display = 'none';
          // Show profile dropdown
          profileDropdown.style.display = 'inline-block';
          // Set user's initial
          profileIcon.textContent = data.name.charAt(0).toUpperCase();
        }
      })
      .catch(err => {
        console.error('Error fetching user info:', err);
      });
    }
  
    // Logout functionality
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  });
  