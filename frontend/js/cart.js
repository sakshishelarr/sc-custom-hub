document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountEl = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
  
    if (!token) {
      alert('Please login to view your cart.');
      window.location.href = 'login.html';
      return;
    }
  
    async function fetchCart() {
      try {
        const res = await fetch('http://sc-custom-hub.railway.internal/api/cart/view', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
  
        if (res.ok) {
          cartItemsContainer.innerHTML = '';
          const cartProducts = result.products || [];
          let totalAmount = 0;
  
          if (cartProducts.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalAmountEl.textContent = '0';
          } else {
            cartProducts.forEach(product => {
              totalAmount += product.price * (product.quantity || 1);
  
              const div = document.createElement('div');
              div.classList.add('cart-item');
              div.innerHTML = `
                <h4>${product.name}</h4>
                <div class="quantity-controls">
                  <button class="qty-btn decrease" data-id="${product.productId}">-</button>
                  <span>${product.quantity}</span>
                  <button class="qty-btn increase" data-id="${product.productId}">+</button>
                </div>
                <p>₹${product.price}</p>
              `;
              cartItemsContainer.appendChild(div);
            });
  
            totalAmountEl.textContent = totalAmount.toFixed(2);
          }
  
          // Bind quantity buttons
          const decreaseBtns = document.querySelectorAll('.decrease');
          const increaseBtns = document.querySelectorAll('.increase');
  
          decreaseBtns.forEach(button => {
            button.addEventListener('click', async function () {
              const productId = this.getAttribute('data-id');
              await updateCart(productId, 'decrease');
            });
          });
  
          increaseBtns.forEach(button => {
            button.addEventListener('click', async function () {
              const productId = this.getAttribute('data-id');
              await updateCart(productId, 'increase');
            });
          });
  
        } else {
          alert(result.msg || 'Failed to fetch cart.');
        }
      } catch (err) {
        console.error(err);
        alert('Error loading cart.');
      }
    }
  
    async function updateCart(productId, action) {
      try {
        const res = await fetch('http://sc-custom-hub.railway.internal/api/cart/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId, action })
        });
  
        const result = await res.json();
        if (res.ok) {
          fetchCart(); // Refresh cart after update
        } else {
          alert(result.msg || 'Failed to update cart.');
        }
      } catch (err) {
        console.error(err);
        alert('Error updating cart.');
      }
    }
  
    checkoutBtn.addEventListener('click', async function () {
      try {
        const res = await fetch('http://sc-custom-hub.railway.internal/api/orders/checkout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
    
        const result = await res.json();
        if (res.ok) {
          alert('Checkout successful! Redirecting to your orders...');
          window.location.href = 'orders.html'; // 👈 Redirect after checkout
        } else {
          alert(result.msg || 'Checkout failed.');
        }
      } catch (err) {
        console.error(err);
        alert('Error during checkout.');
      }
    });
    
  
    fetchCart(); // Initial load
  });
