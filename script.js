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

// Function to adjust content based on screen width
function adjustContent(className, contentAbove900px, contentBelow900px) {
	var screenWidth = window.innerWidth;
	var elements = document.getElementsByClassName(className);

	for (var i = 0; i < elements.length; i++) {
		if (screenWidth < 900) {
			// Screen width is below 900px, set the content to contentBelow900px
			elements[i].textContent = contentBelow900px;
		} else {
			// Screen width is 900px or more, set the content to contentAbove900px
			elements[i].textContent = contentAbove900px;
		}
	}
}

// Call the adjustContent function for different classes and texts
adjustContent("tag-js", "JavaScript", "JS");
adjustContent("tag-wp", "WordPress", "WP");

// Add an event listener to adjust the content when the window is resized
window.addEventListener("resize", function () {
	adjustContent("tag-js", "JavaScript", "JS");
	adjustContent("tag-wp", "WordPress", "WP");
});
