// contact.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
  
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Simple Frontend Validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const terms = document.getElementById('terms').checked;
  
      if (!name || !email || !phone || !terms) {
        alert('Please fill all required fields and accept terms.');
        return;
      }
  
      // If everything is fine
      alert('Thank you! Your message has been sent successfully. 📩');
      contactForm.reset();
    });
  });
  