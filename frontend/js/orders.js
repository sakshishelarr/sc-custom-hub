// orders.js
document.addEventListener('DOMContentLoaded', async function () {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    alert('Please login first.');
    window.location.href = 'login.html';
    return;
  }

  // Fill user info
  document.getElementById('contact-email').textContent = user.email;
  document.getElementById('thank-you-message').textContent = `Thank you ${user.fullname.split(' ')[0]}!`;

  try {
    const res = await fetch('http://sc-custom-hub-production.up.railway.app/api/orders/latest', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const result = await res.json();
    if (res.ok) {
      const order = result.order;

      if (!order) {
        document.getElementById('order-items').innerHTML = `<p>No orders yet. Start shopping!</p>`;
        return;
      }

      document.getElementById('order-number').textContent = `Order #${order._id}`;
      
      const itemsContainer = document.getElementById('order-items');
      itemsContainer.innerHTML = '';

      let subtotal = 0;
      order.products.forEach(product => {
        subtotal += product.price * product.quantity;
        const item = document.createElement('div');
        item.classList.add('order-item');
        item.innerHTML = `
          <div class="item-image" style="background-color: #f5f5f5;"></div>
          <div class="item-details">
            <div class="item-name">${product.name}</div>
            <div class="item-quantity">×${product.quantity}</div>
          </div>
          <div class="item-price">₹${product.price * product.quantity}</div>
        `;
        itemsContainer.appendChild(item);
      });

      document.getElementById('order-items-count').textContent = order.products.length;
      document.getElementById('subtotal').textContent = `₹${subtotal}`;
      document.getElementById('shipping-cost').textContent = 'Free';
      document.getElementById('tax-amount').textContent = '₹50';
      document.getElementById('total-amount').textContent = `₹${subtotal + 50}`;

    } else {
      alert(result.msg || 'Failed to load order.');
    }
  } catch (err) {
    console.error(err);
    alert('Error loading order.');
  }
  // Add animations after data is populated
document.querySelector('.checkout-left').classList.add('animate-slide-in');
document.querySelector('.checkout-right').classList.add('animate-slide-in');
document.getElementById('thank-you-message').classList.add('animate-fade-scale');

});
