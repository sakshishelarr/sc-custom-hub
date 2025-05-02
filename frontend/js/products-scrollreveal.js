document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.products-hero-content');
    const reveals = document.querySelectorAll('.reveal');
    const products = document.querySelectorAll('.product-item');
  
    // Animate Hero immediately
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('active');
      }, 300);
    }
  
    // Scroll animations for normal sections
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
  
    reveals.forEach(reveal => {
      observer.observe(reveal);
    });
  
    // STAGGER animation for product items
    const productObserver = new IntersectionObserver((entries, productObserver) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100); // 100ms stagger between each product
          productObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    products.forEach(product => {
      productObserver.observe(product);
    });
  });
  