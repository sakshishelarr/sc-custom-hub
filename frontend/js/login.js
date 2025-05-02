document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://sc-custom-hub-production.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Login successful!');
      localStorage.setItem('token', result.token);

       // 🛠️ Now wait until token is stored, then fetch user details
      const userRes = await fetch('http://sc-custom-hub-production.up.railway.app/api/auth/get-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${result.token}`
        }
      });
      const user = await userRes.json();

      console.log('Fetched user details:', user); // 🔥 Debugging
      console.log('User fetched from /get-user:', user);

      localStorage.setItem('user', JSON.stringify(user)); // Save user object
      
      //localStorage.setItem('user', JSON.stringify({ fullname: result.fullname })); // ✨ save fullname
      window.location.href = 'products.html';
    } else {
      alert(result.msg || 'Login failed.');
    }
  } catch (err) {
    console.error(err);
    alert('Server error, please try again.');
  }
});
