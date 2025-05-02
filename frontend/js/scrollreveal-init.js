document.addEventListener('DOMContentLoaded', () => {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1200,
      easing: 'ease-out',
      origin: 'bottom',
      reset: false, 
      mobile: true,
    });
  
    // Hero Section
    sr.reveal('.hero h1', { delay: 100 });
    sr.reveal('.hero p', { delay: 300 });
    sr.reveal('.cta-btn', { delay: 500 });
  
    // Sections
    sr.reveal('.about-section', { delay: 100 });
    sr.reveal('.products-section', { delay: 100 });
    sr.reveal('.occasions-section', { delay: 100 });
    sr.reveal('.newsletter', { delay: 100 });
    sr.reveal('footer', { delay: 100 });
  
    // ✨ Product Cards - Stagger animation
    sr.reveal('.product-card', { 
      interval: 200, // Stagger gap (higher = slower)
      origin: 'bottom',
      distance: '40px'
    });
  
    // ✨ Occasion Cards - Stagger animation
    sr.reveal('.occasion-card', { 
      interval: 200,
      origin: 'bottom',
      distance: '40px'
    });
  });
  