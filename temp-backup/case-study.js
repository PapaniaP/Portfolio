// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg-canvas"),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create animated background particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: "#209cee",
});

const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);
scene.add(particlesMesh);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  particlesMesh.rotation.x += 0.0001;
  particlesMesh.rotation.y += 0.0001;
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// NES-style typewriter effect
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Scroll animations with typewriter effect
const sections = document.querySelectorAll(".case-study-section");
const typewriterElements = document.querySelectorAll(
  ".typewriter-text"
);

const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Start typewriter effect for text in this section
      const typewriterTexts = entry.target.querySelectorAll(
        ".typewriter-text"
      );
      typewriterTexts.forEach((text) => {
        const originalText = text.textContent;
        typeWriter(text, originalText);
      });

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Add hover sound effect for interactive elements
const interactiveElements = document.querySelectorAll(
  "a, .finding-card, .process-step, .solution-img"
);

function playHoverSound() {
  const audio = new Audio(
    "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"
  );
  audio.volume = 0.1;
  audio.play().catch(() => {}); // Catch and ignore autoplay restrictions
}

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", playHoverSound);
});
