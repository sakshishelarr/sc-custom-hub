document.addEventListener('DOMContentLoaded', function() {
  const profileName = document.getElementById('profile-name');
  const loginLink = document.getElementById('login-link');
  const accountLink = document.getElementById('account-link');
  const ordersLink = document.getElementById('orders-link');
  const logoutBtn = document.getElementById('logout-btn');

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    profileName.textContent = `Hi ${user.fullname.split(' ')[0]}`; // Show first name
    loginLink.style.display = 'none';
    accountLink.style.display = 'block';
    ordersLink.style.display = 'block';
    logoutBtn.style.display = 'block';
  }

  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});
