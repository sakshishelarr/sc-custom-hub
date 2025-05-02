// products.js

document.addEventListener('DOMContentLoaded', function () {
    let currentCartCount = 0;
    const cartCount = document.getElementById('cart-count');

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    let activeFilters = new Set();

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // Toggle active state
        if (activeFilters.has(filter)) {
            activeFilters.delete(filter);
            this.classList.remove('active');
        } else {
            activeFilters.add(filter);
            this.classList.add('active');
        }

        filterProducts();
        });
    });

    function filterProducts() {
        productItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (activeFilters.size === 0 || activeFilters.has(itemCategory)) {
            item.style.display = 'block';
            setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
            item.style.display = 'none';
            }, 300);
        }
        });
    }

  // Initially show all products
  filterProducts();


    // Quick View Button Functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productName = this.closest('.product-item').querySelector('h3').textContent;
            alert(`Quick view for ${productName} - Feature coming soon!`);
        });
    });

    // Add to Cart Button Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async function (e) {
            e.preventDefault();
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please login to add items to cart.');
                window.location.href = 'login.html';
                return;
            }

            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.product-price').textContent;

            try {
                const res = await fetch('http://sc-custom-hub.railway.internal/api/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productId: productItem.getAttribute('data-id') || productName,
                        productName: productName,
                        productPrice: Number(productPrice.replace('₹', '').trim())
                    })
                });

                const result = await res.json();
                if (res.ok) {
                    currentCartCount += 1;
                    cartCount.textContent = currentCartCount;

                    // Animation when added to cart
                    const originalText = this.textContent;
                    this.textContent = 'Added!';
                    this.style.backgroundColor = '#4CAF50';

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = '';
                    }, 1500);

                } else {
                    alert(result.msg || 'Could not add to cart.');
                }
            } catch (err) {
                console.error(err);
                alert('Error adding to cart.');
            }
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                emailInput.value = '';
            }
        });
    }

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.padding = '15px 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });

    // Initialize all products to be visible on page load
    productItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
    });
});
