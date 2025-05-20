// --- Modal JavaScript ---

// Get the modal elements by their IDs and classes
const productModal = document.getElementById("productModal");
const closeButton = document.querySelector(".close-button");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductImage = document.getElementById("modalProductImage");
const productSizeSelect = document.getElementById("productSize");
const addToBasketBtn = document.getElementById("addToBasketBtn");

// Get all product cards to attach click listeners for opening the modal
// This needs to be inside DOMContentLoaded if the script loads before HTML
const productCards = document.querySelectorAll(".product-card");

// Function to open the product modal with specific product data
function openProductModal(product) {
  // Populate modal content with product details
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = product.price; // Keep as string as received from HTML
  modalProductImage.src = product.image;
  modalProductImage.alt = product.name;
  productSizeSelect.value = ""; // Reset size selection for a new product view

  // Display the modal using flex to center it
  productModal.style.display = "flex";

  // Store product data in the modal's dataset for easy access when 'Add to Basket' is clicked
  productModal.dataset.productId = product.id;
  productModal.dataset.productName = product.name;
  productModal.dataset.productPrice = product.price;
  productModal.dataset.productImage = product.image; // Store image path
}

// Function to close the product modal
function closeProductModal() {
  productModal.style.display = "none"; // Hide the modal
}

// --- Event Listeners for Modal Interaction ---

// 1. Event listeners for opening the modal when a product card is clicked
// We attach the click listener to each product card itself
productCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // Prevent the "Quick View" button click from also triggering the main card click
    if (event.target.classList.contains("quick-view-btn")) {
      return; // Exit if the quick view button was clicked
    }

    // Extract product details from the clicked product card
    const productName = card.querySelector("h3").textContent;
    const productPrice = card.querySelector(".product-price").textContent;
    const productImage = card.querySelector(".product-image img").src;
    const productId = card.getAttribute("data-product-id");

    // Create a product object to pass to the openProductModal function
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
    };
    openProductModal(product); // Open the modal with this product's details
  });
});

// 2. Event listener for closing the modal (using the 'x' button)
closeButton.addEventListener("click", closeProductModal);

// 3. Event listener for clicking outside the modal content to close it
window.addEventListener("click", (event) => {
  if (event.target === productModal) {
    // If the click target is the modal overlay itself
    closeProductModal();
  }
});

// 4. Event listener for the 'Add to Basket' button inside the modal
addToBasketBtn.addEventListener("click", () => {
  const selectedSize = productSizeSelect.value;

  // Retrieve product details from the modal's dataset
  const productId = productModal.dataset.productId;
  const productName = productModal.dataset.productName;
  const productPrice = productModal.dataset.productPrice;
  const productImage = productModal.dataset.productImage;

  if (selectedSize) {
    // Ensure a size has been selected
    const item = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      size: selectedSize,
      quantity: 1, // Default quantity when added from modal
    };

    // Use the unified `addToCart` function from `cart.js`
    // This function must be globally accessible or imported if using modules
    if (typeof addToCart === "function") {
      addToCart(item);
    } else {
      console.error(
        "addToCart function is not defined. Ensure cart.js is loaded before modal.js"
      );
      alert("Error adding to cart. Please try again.");
    }

    closeProductModal(); // Close the modal after adding to basket
  } else {
    alert("Please select a size before adding to basket."); // Prompt user if no size selected
  }
});
