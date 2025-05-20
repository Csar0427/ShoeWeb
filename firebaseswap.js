// firebaseswap.js
import {
  auth,
  database,
  ref,
  push,
  onValue,
  serverTimestamp,
} from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const swapForm = document.querySelector(".swap-form");
  const swapListContainer = document.querySelector(".swap-list");

  // Display swaps
  const displaySwaps = (swaps) => {
    swapListContainer.innerHTML = "";
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

  // Load existing swaps
  const swapsRef = ref(database, "swaps");
  onValue(swapsRef, (snapshot) => {
    const swapsData = snapshot.val();
    console.log("Loaded swaps:", swapsData); // Debug
    displaySwaps(swapsData);
  });

  // Handle form submission
  swapForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const sneakerName = document.getElementById("sneaker-name").value;
    const sneakerSize = document.getElementById("sneaker-size").value;
    const sneakerCondition = document.getElementById("sneaker-condition").value;
    const wantedSneakers = document.getElementById("wanted-sneakers").value;
    const contactInfo = document.getElementById("contact-info").value;

    const user = auth.currentUser;

    if (user) {
      const newSwap = {
        userId: user.uid,
        offering: {
          name: sneakerName,
          size: sneakerSize,
          condition: sneakerCondition,
        },
        lookingFor: wantedSneakers,
        contact: contactInfo,
        timestamp: serverTimestamp(),
      };

      push(swapsRef, newSwap)
        .then(() => {
          alert("Swap posted successfully!");
          swapForm.reset();
        })
        .catch((error) => {
          console.error("Error posting swap:", error);
          alert("Failed to post swap.");
        });
    } else {
      alert("You need to be logged in to post a swap.");
    }
  });
});
