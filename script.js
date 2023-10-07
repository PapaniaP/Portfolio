// Function to open a profile in a new tab
function openProfile(profileUrl) {
	window.open(profileUrl, "_blank");
}

// Function to open a profile based on the icon clicked
function openProfileByIcon(icon) {
	if (icon.classList.contains("github-icon")) {
		const githubProfileUrl = "https://github.com/PapaniaP";
		openProfile(githubProfileUrl);
	} else if (icon.classList.contains("linkedin-icon")) {
		const linkedinProfileUrl = "https://www.linkedin.com/in/papaniap/";
		openProfile(linkedinProfileUrl);
	}
}

// Get all elements with class 'profile-link' and add click event listeners
const profileIcons = document.querySelectorAll(".profile-link");
profileIcons.forEach((icon) => {
	icon.addEventListener("click", () => openProfileByIcon(icon));
});

function adjustContent(className, contentAbove900px, contentBelow900px) {
	var screenWidth = window.innerWidth;
	var elements = document.getElementsByClassName(className);

	for (var i = 0; i < elements.length; i++) {
		if (screenWidth < 900) {
			elements[i].textContent = contentBelow900px;
		} else {
			elements[i].textContent = contentAbove900px;
		}
	}
}

adjustContent("tag-js", "JavaScript", "JS");
adjustContent("tag-wp", "WordPress", "WP");

window.addEventListener("resize", function () {
	adjustContent("tag-js", "JavaScript", "JS");
	adjustContent("tag-wp", "WordPress", "WP");
});

// const burgerButton = document.getElementById("burger-button");
// const menu = document.getElementById("menu");

// let isMenuOpen = false;

// // Toggle the mobile menu with animation
// burgerButton.addEventListener("click", () => {
// 	if (!isMenuOpen) {
// 		// Open the menu with animation
// 		menu.classList.add("open");
// 	} else {
// 		// Close the menu with animation
// 		menu.classList.remove("open");
// 	}

// 	isMenuOpen = !isMenuOpen;
// });

// const burgerButton = document.getElementById("burger-button");
// const menu = document.getElementById("menu");
// const burgerLines = document.querySelectorAll(".burger-line");

// let isMenuOpen = false;

// // Toggle the mobile menu with animation and change the icon
// burgerButton.addEventListener("click", () => {
// 	if (!isMenuOpen) {
// 		// Open the menu with animation
// 		menu.classList.add("open");

// 		// Change the icon to an "X"
// 		burgerLines[0].style.transform = "translateY(9px) rotate(45deg)";
// 		burgerLines[1].style.opacity = "0";
// 		burgerLines[2].style.transform = "translateY(-9px) rotate(-45deg)";
// 	} else {
// 		// Close the menu with animation
// 		menu.classList.remove("open");

// 		// Change the icon back to the burger lines
// 		burgerLines.forEach((line) => {
// 			line.style.transform = "translateY(0) rotate(0)";
// 			line.style.opacity = "1";
// 		});
// 	}

// 	isMenuOpen = !isMenuOpen;
// });

const burgerButton = document.getElementById("burger-button");
const menu = document.getElementById("menu");
const burgerLines = document.querySelectorAll(".burger-line, .burger-line-home");

let isMenuOpen = false;

// Toggle the mobile menu with animation and change the icon
burgerButton.addEventListener("click", () => {
	if (!isMenuOpen) {
		// Open the menu with animation
		menu.classList.add("open");

		// Change the icon to an "X"
		burgerLines.forEach((line, index) => {
			if (index === 0) {
				line.style.transform = "translateY(9px) rotate(45deg)";
			} else if (index === 1) {
				line.style.opacity = "0";
			} else if (index === 2) {
				line.style.transform = "translateY(-9px) rotate(-45deg)";
			}
		});
	} else {
		// Close the menu with animation
		menu.classList.remove("open");

		// Change the icon back to the burger lines
		burgerLines.forEach((line, index) => {
			if (index === 0) {
				line.style.transform = "translateY(0) rotate(0)";
			} else if (index === 1) {
				line.style.opacity = "1";
			} else if (index === 2) {
				line.style.transform = "translateY(0) rotate(0)";
			}
		});
	}

	isMenuOpen = !isMenuOpen;
});
