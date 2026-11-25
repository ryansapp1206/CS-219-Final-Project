// =========================================================
// STEP 10 — Send the Create account form to our Node.js server
// =========================================================

// 1. Find the elements we need on the page
const form = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("error-message");
const successBox = document.getElementById("success-message");

// 2. Helpers to show messages
function showError(message) {
  successBox.classList.add("hidden");
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function showSuccess(message) {
  errorBox.classList.add("hidden");
  successBox.textContent = message;
  successBox.classList.remove("hidden");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 3. "async" lets us "await" the answer from the server
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // a) Quick checks in the browser (the server checks again)
  if (name.length < 2) {
    showError("Please enter your full name.");
    return;
  }
  if (!isValidEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  // b) NEW: send the data to the server with fetch()
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password })
    });
    const data = await response.json();

    // c) response.ok is true for status 200-299
    if (!response.ok) {
      showError(data.error); // e.g. "An account with this email already exists."
      return;
    }

    // d) Success! Wait 1.5 seconds, then go to the sign in page
    showSuccess(data.message + " Taking you to sign in...");
    form.reset();
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    showError("Could not reach the server. Is it running?");
  }
});
