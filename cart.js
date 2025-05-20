// --- Cart Management Functions ---

// Retrieves the cart from local storage
function getCart() {
  let cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Saves the cart to local storage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Adds an item to the cart
function addToCart(item) {
  // Accepts a full item object
  let cart = getCart();

  // Check if the item (by ID and size) already exists in the cart
  // Using ID and size for uniqueness, as multiple sizes of the same product might be added
  const existingItemIndex = cart.findIndex(
    (i) => i.id === item.id && i.size === item.size
  );

  if (existingItemIndex > -1) {
    // If item with same ID and size exists, increment its quantity
    cart[existingItemIndex].quantity += item.quantity || 1;
  } else {
    // If it's a new item or a new size for an existing product, add it
    cart.push({ ...item, quantity: item.quantity || 1 }); // Ensure quantity defaults to 1
  }

  saveCart(cart); // Save the updated cart to local storage

  // Optional: Provide immediate feedback to the user
  alert(`${item.name} added to cart!`);

  // Update the cart display on the page
  updateCartDisplay();
}

// Updates the HTML display of the cart
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  let cart = getCart(); // Get current cart items

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = ""; // Clear existing display
  }
  let total = 0;

  // Iterate through cart items and build display
  cart.forEach((item) => {
    if (cartItemsContainer) {
      const listItem = document.createElement("div");
      // Ensure price is parsed as a number for calculation and formatted for display
      const itemPrice = parseFloat(item.price.replace("$", ""));
      // Display item name, price, quantity, and size
      listItem.textContent = `${item.name} - $${itemPrice.toFixed(2)} x ${
        item.quantity
      } (Size: ${item.size || "N/A"})`;
      cartItemsContainer.appendChild(listItem);
    }
    total += parseFloat(item.price.replace("$", "")) * item.quantity;
  });

  // Update total price display
  if (cartTotalElement) {
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Call updateCartDisplay when the DOM is fully loaded to show any existing cart items
document.addEventListener("DOMContentLoaded", updateCartDisplay);
