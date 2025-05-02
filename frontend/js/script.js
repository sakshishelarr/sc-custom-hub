// script.js

let currentIndex = 0;
const images = document.querySelectorAll(".carousel-images img");
const totalImages = images.length;

function changeSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = -currentIndex * 100;
    document.querySelector(".carousel-images").style.transform = `translateX(${offset}%)`;
}

// Change slide every 3 seconds
setInterval(changeSlide, 3000);

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = 'products.html';
    });
  });
  