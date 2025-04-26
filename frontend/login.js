document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await res.json();
      if (res.ok) {
        alert('Login successful!');
        localStorage.setItem('token', result.token);
        window.location.href = 'products.html';
      } else {
        alert(result.msg || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error, please try again.');
    }
  });
  