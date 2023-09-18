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



// Dialog Animation

// JavaScript (script.js)

const dialogText = [
  "Hello, I'm Paolo Papania, a versatile creator in the fields of UX/UI design and Front-End development.",
  "With a passion for crafting user-friendly experiences and a knack for turning ideas into pixel-perfect reality, I embark on a journey to bring imagination to life.",
  
];

const dialogElement = document.getElementById('dialog-text');

// Function to animate text typing effect for a single paragraph
function typeTextForParagraph(text) {
  return new Promise((resolve) => {
      let index = 0;
      const typingInterval = setInterval(() => {
          if (index < text.length) {
              dialogElement.innerHTML += text.charAt(index);
              index++;
          } else {
              clearInterval(typingInterval);
              setTimeout(() => {
                  resolve();
              }, 1000); // Adjust the delay between paragraphs (in milliseconds)
          }
      }, 30); // Adjust typing speed (smaller value for faster typing)
  });
}

// Function to display all paragraphs with line breaks between them
async function displayAllParagraphs(paragraphs) {
  for (let i = 0; i < paragraphs.length; i++) {
      if (i > 0) {
          dialogElement.innerHTML += '<br><br>'; // Add line breaks between paragraphs
      }
      await typeTextForParagraph(paragraphs[i]); // Type the current paragraph
  }
}

// Start displaying all paragraphs when the page loads
window.onload = function () {
  displayAllParagraphs(dialogText);
};
