// JavaScript (script.js)

// Get all menu items
const menuItems = document.querySelectorAll(".menu-item");

// Add event listeners to each menu item
menuItems.forEach((menuItem) => {
  menuItem.addEventListener("mouseenter", () => {
    // Hide the arrow on all menu items
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    // Show the arrow only on the hovered menu item
    menuItem.classList.add("active");
  });
});

// Function to handle leaving the game screen
function leaveGameScreen() {
  // Find the last hovered menu item and keep the arrow there
  const lastHoveredMenuItem = document.querySelector(".menu-item.active");
  if (lastHoveredMenuItem) {
    lastHoveredMenuItem.classList.remove("active");
  }
}

// Initial setup to show the arrow on the first menu item
menuItems[0].classList.add("active");
