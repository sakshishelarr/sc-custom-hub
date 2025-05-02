document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
  
    // Elements from new UI
    const profilePhoto = document.getElementById('profile-photo');
    const uploadPhotoInput = document.getElementById('upload-photo');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const welcomeMessage = document.getElementById('welcome-message');
    const editNameBtn = document.getElementById('edit-name-btn');
    const editEmailBtn = document.getElementById('edit-email-btn');
    const logoutBtn = document.getElementById('logout');
    const menuItems = document.querySelectorAll('.menu-item[data-section]');
  
    // Check if user is logged in
    if (!user || !token) {
      window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        document.getElementById('user-name').value = user.fullname;
        document.getElementById('user-email').value = user.email;
        document.getElementById('welcome-message').textContent = `Welcome, ${user.fullname.split(' ')[0]}!`;
    }
  
    // Logout functionality
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('profilePhoto');
      window.location.href = "index.html";
    });
  
    // Profile Photo
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      profilePhoto.src = savedPhoto;
    }
  
    // In the new UI, we're using the photo-overlay instead of a button
    uploadPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = function(event) {
        profilePhoto.src = event.target.result;
        localStorage.setItem('profilePhoto', event.target.result);
        showToast('Profile photo updated!');
      };
      reader.readAsDataURL(file);
    });
  
    // Edit Name Button
    editNameBtn.addEventListener('click', () => {
      if (nameInput.disabled) {
        nameInput.disabled = false;
        nameInput.focus();
        editNameBtn.innerHTML = '<i class="fas fa-check"></i>';
        showSaveChangesRow();
      } else {
        nameInput.disabled = true;
        user.fullname = nameInput.value;
        localStorage.setItem('user', JSON.stringify(user));
        welcomeMessage.textContent = `Welcome, ${user.fullname.split(' ')[0]}!`;
        editNameBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        hideSaveChangesRow();
        showToast('Name updated successfully!');
      }
    });
  
    // Edit Email Button
    editEmailBtn.addEventListener('click', () => {
      if (emailInput.disabled) {
        emailInput.disabled = false;
        emailInput.focus();
        editEmailBtn.innerHTML = '<i class="fas fa-check"></i>';
        showSaveChangesRow();
      } else {
        emailInput.disabled = true;
        user.email = emailInput.value;
        localStorage.setItem('user', JSON.stringify(user));
        editEmailBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        hideSaveChangesRow();
        showToast('Email updated successfully!');
      }
    });
  
    // Save Changes Row functionality
    const saveChangesRow = document.getElementById('save-personal-info');
    if (saveChangesRow) {
      const saveBtn = saveChangesRow.querySelector('.save-btn');
      saveBtn.addEventListener('click', async () => {
        if (!nameInput.disabled || !emailInput.disabled) {
          const updatedFullname = nameInput.value;
          const updatedEmail = emailInput.value;
      
          user.fullname = updatedFullname;
          user.email = updatedEmail;
          localStorage.setItem('user', JSON.stringify(user));
      
          // 🛠️ Now update on server as well
          try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://sc-custom-hub-production.up.railway.app/api/auth/update-profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ fullname: updatedFullname, email: updatedEmail })
            });
      
            const result = await res.json();
            if (res.ok) {
              showToast('Profile updated successfully!');
            } else {
              showToast(result.msg || 'Failed to update profile.', 'error');
            }
          } catch (error) {
            console.error(error);
            showToast('Server error. Try again later.', 'error');
          }
        }
      
        nameInput.disabled = true;
        emailInput.disabled = true;
        editNameBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editEmailBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        hideSaveChangesRow();
      });
      
    }
  
    // Change Password Logic
    const changePasswordForm = document.getElementById('change-password-form');
  
    changePasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
  
      if (newPassword !== confirmPassword) {
        showToast('New passwords do not match!', 'error');
        return;
      }
  
      try {
        const token = localStorage.getItem('token');
  
        const res = await fetch('https://sc-custom-hub-production.up.railway.app/api/auth/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
  
        const result = await res.json();
        if (res.ok) {
          showToast('Password updated successfully!');
          changePasswordForm.reset();
        } else {
          showToast(result.msg || 'Failed to change password', 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Server error. Try again later.', 'error');
      }
    });
  
    // Tab navigation
    menuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all menu items and content sections
        document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(cs => cs.classList.remove('active'));
        
        // Add active class to clicked menu item
        this.classList.add('active');
        
        // Show corresponding content section
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
      });
    });
  
    // Password visibility toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });
  
    // Helper functions
    function showSaveChangesRow() {
      if (saveChangesRow) {
        saveChangesRow.style.display = 'flex';
      }
    }
  
    function hideSaveChangesRow() {
      if (saveChangesRow) {
        saveChangesRow.style.display = 'none';
      }
    }
  
    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      if (!toast) return;
      
      const toastIcon = toast.querySelector('.toast-icon i');
      const toastMessage = toast.querySelector('.toast-message');
      
      // Set icon and color based on type
      if (type === 'success') {
        toast.style.backgroundColor = '#4caf50';
        toastIcon.className = 'fas fa-check-circle';
      } else if (type === 'error') {
        toast.style.backgroundColor = '#f44336';
        toastIcon.className = 'fas fa-exclamation-circle';
      }
      
      // Set message
      toastMessage.textContent = message;
      
      // Show toast
      toast.classList.add('show');
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // Scroll Animation
    const scrollElements = document.querySelectorAll('.scroll-fade');

    const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
    };

    const displayScrollElement = (element) => {
    element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
        displayScrollElement(el);
        }
    });
    };

    window.addEventListener('scroll', () => {
    handleScrollAnimation();
    });

  });