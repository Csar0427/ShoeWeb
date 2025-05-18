import {
  auth,
  database,
  ref,
  push,
  onValue,
  serverTimestamp,
  onAuthStateChanged,
} from "./firebase.js"; // Assuming your firebase.js is in the same directory

document.addEventListener("DOMContentLoaded", () => {
  const swapForm = document.querySelector(".swap-form");
  const swapListContainer = document.querySelector(".swap-list");

  // Function to display existing swaps
  const displaySwaps = (swaps) => {
    swapListContainer.innerHTML = ""; // Clear previous listings
    if (swaps) {
      Object.entries(swaps).forEach(([swapId, swapData]) => {
        const swapDiv = document.createElement("div");
        swapDiv.classList.add("swap-item");
        swapDiv.innerHTML = `
          <h3>Offering: ${swapData.offering.name} (Size: ${swapData.offering.size}, Condition: ${swapData.offering.condition})</h3>
          <p>Looking For: ${swapData.lookingFor}</p>
          <p>Contact: ${swapData.contact}</p>
        `;
        swapListContainer.appendChild(swapDiv);
      });
    } else {
      swapListContainer.innerHTML =
        "<p>No swaps available yet. Be the first to post!</p>";
    }
  };

  // Listen for changes in the database to update the swap listings in real-time
  const swapsRef = ref(database, "swaps");
  onValue(swapsRef, (snapshot) => {
    const swapsData = snapshot.val();
    displaySwaps(swapsData);
  });

  swapForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const sneakerName = document.getElementById("sneaker-name").value;
    const sneakerSize = document.getElementById("sneaker-size").value;
    const sneakerCondition = document.getElementById("sneaker-condition").value;
    const wantedSneakers = document.getElementById("wanted-sneakers").value;
    const contactInfo = document.getElementById("contact-info").value;

    // Get the current user's ID
    const user = auth.currentUser;

    if (user) {
      // Create a new swap object
      const newSwap = {
        userId: user.uid,
        offering: {
          name: sneakerName,
          size: sneakerSize,
          condition: sneakerCondition,
        },
        lookingFor: wantedSneakers,
        contact: contactInfo,
        timestamp: serverTimestamp(), // Add a timestamp
      };

      // Push the new swap data to the 'swaps' node in the database
      push(swapsRef, newSwap)
        .then(() => {
          console.log("Swap posted successfully!");
          swapForm.reset(); // Clear the form
        })
        .catch((error) => {
          console.error("Error posting swap:", error);
        });
    } else {
      alert("You need to be logged in to post a swap.");
      // Optionally redirect to the login page
    }
  });
});
