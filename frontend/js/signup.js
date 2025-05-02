document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;
  
    if (!terms) {
      alert('You must agree to the Terms and Conditions.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    try {
      const res = await fetch('http://sc-custom-hub-production.up.railway.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
      });
  
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        localStorage.setItem('token', result.token);
        window.location.href = 'login.html';
      } else {
        alert(result.msg || 'Signup failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again later.');
    }
  });
  