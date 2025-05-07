document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const leftBtn = document.querySelector(".carousel-arrow.left");
  const rightBtn = document.querySelector(".carousel-arrow.right");
  const cards = track.children;

  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Get number of cards per slide based on screen width
  function getCardsPerSlide() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  // Update carousel position
  function updateCarousel() {
    const cardsPerSlide = getCardsPerSlide();
    const cardWidth = track.clientWidth / cardsPerSlide;
    track.style.transform = `translateX(-${
      currentSlide * cardWidth * cardsPerSlide
    }px)`;

    // Update button states
    const maxSlide = Math.ceil(cards.length / cardsPerSlide) - 1;
    leftBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
    rightBtn.style.opacity = currentSlide >= maxSlide ? "0.5" : "1";
  }

  // Next slide button
  rightBtn.addEventListener("click", () => {
    const cardsPerSlide = getCardsPerSlide();
    const maxSlide = Math.ceil(cards.length / cardsPerSlide) - 1;
    if (currentSlide < maxSlide) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Previous slide button
  leftBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  // Touch events for mobile swipe
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    const swipeThreshold = 50;
    const cardsPerSlide = getCardsPerSlide();
    const maxSlide = Math.ceil(cards.length / cardsPerSlide) - 1;

    // Swipe left (next slide)
    if (touchStartX - touchEndX > swipeThreshold && currentSlide < maxSlide) {
      currentSlide++;
      updateCarousel();
    }

    // Swipe right (previous slide)
    if (touchEndX - touchStartX > swipeThreshold && currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    // Reset to first slide on resize to avoid layout issues
    currentSlide = 0;
    updateCarousel();
  });

  // Initialize carousel
  updateCarousel();
});
