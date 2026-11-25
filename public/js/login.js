// =========================================================
// STEP 11 — Real sign in: the server checks the password
// =========================================================

// 1. Find the elements we need on the page
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("error-message");

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 2. Already signed in? Skip this page and go straight to the dashboard.
if (localStorage.getItem("token")) {
  window.location.href = "dashboard.html";
}

// 3. Send the email and password to the server
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!isValidEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });
    const data = await response.json();

    if (!response.ok) {
      showError(data.error); // "Wrong email or password."
      return;
    }

    // 4. Save the token in the browser. localStorage keeps it even after a refresh.
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } catch (error) {
    showError("Could not reach the server. Is it running?");
  }
});
