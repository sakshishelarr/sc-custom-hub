// orders.js

document.addEventListener('DOMContentLoaded', async function () {
  const token = localStorage.getItem('token');
  const ordersList = document.getElementById('orders-list');

  if (!token) {
    alert('Please login to view your orders.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/orders/myorders', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const result = await res.json();
    if (res.ok) {
      const orders = result.orders || [];

      if (orders.length === 0) {
        ordersList.innerHTML = `
          <p style="text-align: center; font-size: 1.2rem; color: #777;">You have no orders yet.</p>
          <div style="text-align: center;">
            <a href="products.html" class="start-shopping-btn">Start Shopping</a>
          </div>
        `;
      } else {
        orders.forEach(order => {
          const div = document.createElement('div');
          div.classList.add('order-card');

          const date = new Date(order.createdAt).toLocaleDateString();

          div.innerHTML = `
            <div class="order-header">
              <div class="order-date">📅 ${date}</div>
              <div class="order-total">Total: ₹${order.totalAmount}</div>
            </div>
            <ul class="order-products">
              ${order.products.map(p => `<li>🛍️ ${p.name} x${p.quantity}</li>`).join('')}
            </ul>
          `;
          ordersList.appendChild(div);
        });
      }
    } else {
      alert(result.msg || 'Failed to load orders.');
    }
  } catch (err) {
    console.error(err);
    alert('Error loading orders.');
  }
});
