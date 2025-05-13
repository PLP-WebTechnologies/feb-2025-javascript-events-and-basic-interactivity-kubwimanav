// Main JavaScript file for the Interactive Playground

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initEventHandlers();
  initInteractiveElements();
  initFormValidation();
  initSecretFeatures();
});

// =====================================================
// 1. EVENT HANDLING SECTION
// =====================================================
function initEventHandlers() {
  // Button Click Event
  const colorChangerBtn = document.getElementById("color-changer");
  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
  ];
  let colorIndex = 0;

  colorChangerBtn.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    this.style.backgroundColor = colors[colorIndex];
    this.textContent = `Color changed to ${getColorName(colors[colorIndex])}!`;
  });

  // Hover Effects already handled by CSS, but we can add dynamic content
  const hoverBox = document.getElementById("hover-box");

  hoverBox.addEventListener("mouseenter", function () {
    this.innerHTML = "<p>Hovering detected! 🎉</p>";
  });

  hoverBox.addEventListener("mouseleave", function () {
    this.innerHTML = "<p>Hover over me!</p>";
  });

  // Keypress Detection
  const keyDetector = document.getElementById("key-detector");
  const keyOutput = keyDetector.querySelector("#key-output span");

  keyDetector.addEventListener("keydown", function (event) {
    keyOutput.textContent = `${event.key} (Code: ${event.code})`;
    this.style.backgroundColor = getRandomLightColor();
  });

  // Double-click Event (Bonus)
  const specialAction = document.getElementById("special-action");

  specialAction.addEventListener("dblclick", function () {
    showSecretModal();
  });
}

// Helper function to get color name
function getColorName(hexColor) {
  const colorMap = {
    "#3b82f6": "Blue",
    "#ef4444": "Red",
    "#10b981": "Green",
    "#f59e0b": "Orange",
    "#8b5cf6": "Purple",
    "#ec4899": "Pink",
  };

  return colorMap[hexColor] || "Unknown";
}

// Generate random light color
function getRandomLightColor() {
  const r = 200 + Math.floor(Math.random() * 55);
  const g = 200 + Math.floor(Math.random() * 55);
  const b = 200 + Math.floor(Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
}

// =====================================================
// 2. INTERACTIVE ELEMENTS SECTION
// =====================================================
function initInteractiveElements() {
  // Tab System
  initTabs();

  // Image Gallery/Slideshow
  initGallery();

  // Accordion
  initAccordion();

  // Animations
  initAnimations();
}

// Tab System
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// Image Gallery/Slideshow
function initGallery() {
  const images = document.querySelectorAll(".gallery-img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dots = document.querySelectorAll(".dot");
  let currentImageIndex = 0;

  // Function to show specific image
  function showImage(index) {
    // Hide all images
    images.forEach((img) => img.classList.remove("showing"));

    // Remove active class from all dots
    dots.forEach((dot) => dot.classList.remove("active"));

    // Show selected image
    images[index].classList.add("showing");

    // Highlight corresponding dot
    dots[index].classList.add("active");

    // Update current index
    currentImageIndex = index;
  }

  // Previous button
  prevBtn.addEventListener("click", () => {
    let newIndex = currentImageIndex - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    showImage(newIndex);
  });

  // Next button
  nextBtn.addEventListener("click", () => {
    let newIndex = (currentImageIndex + 1) % images.length;
    showImage(newIndex);
  });

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      showImage(index);
    });
  });

  // Auto-advance slides every 5 seconds
  setInterval(() => {
    let newIndex = (currentImageIndex + 1) % images.length;
    showImage(newIndex);
  }, 5000);
}

// Accordion
function initAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;

      // Toggle active class
      accordionItem.classList.toggle("active");

      // Close other accordion items (optional - comment out for multi-open behavior)
      const allItems = document.querySelectorAll(".accordion-item");
      allItems.forEach((item) => {
        if (item !== accordionItem) {
          item.classList.remove("active");
        }
      });
    });
  });
}

// Animations
function initAnimations() {
  const animatedBox = document.getElementById("animated-box");
  const bounceBtn = document.getElementById("animation-bounce");
  const spinBtn = document.getElementById("animation-spin");
  const pulseBtn = document.getElementById("animation-pulse");
  const resetBtn = document.getElementById("animation-reset");

  // Remove all animation classes
  function resetAnimations() {
    animatedBox.classList.remove("bounce", "spin", "pulse");
  }

  bounceBtn.addEventListener("click", () => {
    resetAnimations();
    animatedBox.classList.add("bounce");
  });

  spinBtn.addEventListener("click", () => {
    resetAnimations();
    animatedBox.classList.add("spin");
  });

  pulseBtn.addEventListener("click", () => {
    resetAnimations();
    animatedBox.classList.add("pulse");
  });

  resetBtn.addEventListener("click", resetAnimations);
}

// =====================================================
// 3. FORM VALIDATION SECTION
// =====================================================
function initFormValidation() {
  const form = document.getElementById("validator-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const submitBtn = document.querySelector(".submit-btn");
  const formSuccess = document.getElementById("form-success");

  // Form fields validation state
  const validationState = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  // Username validation
  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();
    const feedback = usernameInput.nextElementSibling;

    if (username === "") {
      setInvalid(usernameInput, feedback, "Username is required");
      validationState.username = false;
    } else if (username.length < 3) {
      setInvalid(
        usernameInput,
        feedback,
        "Username must be at least 3 characters"
      );
      validationState.username = false;
    } else {
      setValid(usernameInput, feedback, "Username looks good!");
      validationState.username = true;
    }

    updateSubmitButton();
  });

  // Email validation
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const feedback = emailInput.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setInvalid(emailInput, feedback, "Email address is required");
      validationState.email = false;
    } else if (!emailRegex.test(email)) {
      setInvalid(emailInput, feedback, "Please enter a valid email address");
      validationState.email = false;
    } else {
      setValid(emailInput, feedback, "Email looks good!");
      validationState.email = true;
    }

    updateSubmitButton();
  });

  // Password validation
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const feedback = passwordInput.nextElementSibling;

    // Password strength requirements
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    // Update requirement indicators
    document
      .getElementById("req-length")
      .classList.toggle("met", requirements.length);
    document
      .getElementById("req-uppercase")
      .classList.toggle("met", requirements.uppercase);
    document
      .getElementById("req-lowercase")
      .classList.toggle("met", requirements.lowercase);
    document
      .getElementById("req-number")
      .classList.toggle("met", requirements.number);
    document
      .getElementById("req-special")
      .classList.toggle("met", requirements.special);

    // Calculate password strength (0-100)
    let strength = 0;
    if (requirements.length) strength += 20;
    if (requirements.uppercase) strength += 20;
    if (requirements.lowercase) strength += 20;
    if (requirements.number) strength += 20;
    if (requirements.special) strength += 20;

    // Update strength bar
    const strengthBar = document.querySelector(".strength-bar");
    strengthBar.style.width = `${strength}%`;

    // Set color based on strength
    if (strength < 40) {
      strengthBar.style.backgroundColor = "#ef4444"; // Red (weak)
    } else if (strength < 80) {
      strengthBar.style.backgroundColor = "#f59e0b"; // Orange (medium)
    } else {
      strengthBar.style.backgroundColor = "#10b981"; // Green (strong)
    }

    // Update strength text
    const strengthText = document.querySelector(".strength-text");
    if (strength < 40) {
      strengthText.textContent = "Password strength: Weak";
    } else if (strength < 80) {
      strengthText.textContent = "Password strength: Medium";
    } else {
      strengthText.textContent = "Password strength: Strong";
    }

    // Validate password
    if (password === "") {
      setInvalid(passwordInput, feedback, "Password is required");
      validationState.password = false;
    } else if (password.length < 8) {
      setInvalid(
        passwordInput,
        feedback,
        "Password must be at least 8 characters"
      );
      validationState.password = false;
    } else if (strength < 60) {
      setInvalid(passwordInput, feedback, "Password is too weak");
      validationState.password = false;
    } else {
      setValid(passwordInput, feedback, "Password is strong enough!");
      validationState.password = true;
    }

    // If confirm password is not empty, validate it against the new password
    if (confirmPasswordInput.value !== "") {
      validateConfirmPassword();
    }

    updateSubmitButton();
  });

  // Confirm password validation
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);

  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const feedback = confirmPasswordInput.nextElementSibling;

    if (confirmPassword === "") {
      setInvalid(
        confirmPasswordInput,
        feedback,
        "Please confirm your password"
      );
      validationState.confirmPassword = false;
    } else if (confirmPassword !== password) {
      setInvalid(confirmPasswordInput, feedback, "Passwords do not match");
      validationState.confirmPassword = false;
    } else {
      setValid(confirmPasswordInput, feedback, "Passwords match!");
      validationState.confirmPassword = true;
    }

    updateSubmitButton();
  }

  // Form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Show success message
    formSuccess.classList.remove("hidden");

    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      formSuccess.classList.add("hidden");

      // Reset validation classes
      const inputs = form.querySelectorAll("input");
      inputs.forEach((input) => {
        input.classList.remove("valid", "invalid");
        input.nextElementSibling.textContent = "";
      });

      // Reset password requirements
      document.querySelectorAll(".password-requirements li").forEach((li) => {
        li.classList.remove("met");
      });

      // Reset password strength
      document.querySelector(".strength-bar").style.width = "0";
      document.querySelector(".strength-text").textContent =
        "Password strength";

      // Reset validation state
      Object.keys(validationState).forEach((key) => {
        validationState[key] = false;
      });

      // Disable submit button
      updateSubmitButton();
    }, 3000);
  });

  // Helper functions for validation
  function setValid(input, feedback, message) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    feedback.textContent = message;
    feedback.style.color = "#10b981"; // Green color for success
  }

  function setInvalid(input, feedback, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    feedback.textContent = message;
    feedback.style.color = "#ef4444"; // Red color for error
  }

  // Enable/disable submit button based on validation state
  function updateSubmitButton() {
    const allValid = Object.values(validationState).every(
      (state) => state === true
    );
    submitBtn.disabled = !allValid;
  }
}

// =====================================================
// 4. SECRET FEATURES
// =====================================================
function initSecretFeatures() {
  // Keyboard shortcut for secret feature (Shift + ?)
  document.addEventListener("keydown", function (event) {
    if (event.shiftKey && event.key === "?") {
      showSecretModal();
    }
  });

  // Close modal
  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", hideSecretModal);

  // Close modal when clicking outside
  const modal = document.getElementById("secret-modal");
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      hideSecretModal();
    }
  });
}

function showSecretModal() {
  const modal = document.getElementById("secret-modal");
  modal.classList.add("show");

  // Create confetti effect
  createConfetti();
}

function hideSecretModal() {
  const modal = document.getElementById("secret-modal");
  modal.classList.remove("show");
}

// Confetti effect for modal
function createConfetti() {
  const confettiContainer = document.querySelector(".confetti-container");
  confettiContainer.innerHTML = "";

  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
  ];

  // Create 50 confetti pieces
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    // Random position
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = -20 + "px";

    // Random rotation
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Animation
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

    // Add to container
    confettiContainer.appendChild(confetti);
  }

  // Add animation style
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(${
                  confettiContainer.clientHeight
                }px) rotate(${Math.random() * 360 + 360}deg);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}
