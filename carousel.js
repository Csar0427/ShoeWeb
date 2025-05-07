document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const leftBtn = document.querySelector(".carousel-arrow.left");
  const rightBtn = document.querySelector(".carousel-arrow.right");
  const dotsContainer = document.getElementById("carouselDots");
  const cards = track.children;

  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let isMobile = window.innerWidth < 768;

  // Get number of cards per slide based on screen width
  function getCardsPerSlide() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  // Create pagination dots for mobile
  function createDots() {
    dotsContainer.innerHTML = "";
    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === currentSlide) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", () => {
        currentSlide = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Update carousel position
  function updateCarousel() {
    const cardsPerSlide = getCardsPerSlide();

    // Calculate the maximum slide index
    const maxSlide = Math.ceil(cards.length / cardsPerSlide) - 1;

    // Ensure currentSlide doesn't exceed maxSlide
    if (currentSlide > maxSlide) {
      currentSlide = maxSlide;
    }

    // Calculate the translation amount based on viewport width
    let translateX;

    if (isMobile) {
      // On mobile, each slide is 100% of the container width
      translateX = currentSlide * 100;
      track.style.transform = `translateX(-${translateX}%)`;
    } else {
      // On desktop, calculate based on the number of cards per slide
      const slideWidth = track.clientWidth / cardsPerSlide;
      translateX = currentSlide * slideWidth * cardsPerSlide;
      track.style.transform = `translateX(-${translateX}px)`;
    }

    // Update button states
    leftBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
    rightBtn.style.opacity = currentSlide >= maxSlide ? "0.5" : "1";

    // Disable buttons when at limits
    leftBtn.disabled = currentSlide === 0;
    rightBtn.disabled = currentSlide >= maxSlide;

    // Update dots
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("active", i === currentSlide);
    }
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
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;

    // Only reset if changing between mobile and desktop modes
    if (wasMobile !== isMobile) {
      currentSlide = 0;
    }

    createDots(); // Recreate dots on resize
    updateCarousel();
  });

  // Initialize carousel
  createDots();
  updateCarousel();
});
