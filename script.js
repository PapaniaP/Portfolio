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
		const linkedinProfileUrl = "https://www.linkedin.com/in//";
		openProfile(linkedinProfileUrl);
	}
}

// Get all elements with class 'profile-link' and add click event listeners
const profileIcons = document.querySelectorAll(".profile-link");
profileIcons.forEach((icon) => {
	icon.addEventListener("click", () => openProfileByIcon(icon));
});
