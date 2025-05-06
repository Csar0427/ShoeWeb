document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const header = document.getElementById("header");
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".mobile-menu-links a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });
  });

  // Scroll event for navbar
  window.addEventListener("scroll", () => {
    // Add scrolled class to navbar when scrolled
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Highlight active section in navigation
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        pageYOffset >= sectionTop - 100 &&
        pageYOffset < sectionTop + sectionHeight - 100
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - (header.offsetHeight - 10),
          behavior: "smooth",
        });
      }
    });
  });
});
