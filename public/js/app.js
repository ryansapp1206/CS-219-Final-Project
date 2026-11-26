// =========================================================
// app.js — shared code for every signed-in page
// (dashboard.html now; appointments.html, availability.html and
// settings.html after the page split).
// Load it BEFORE the page's own script, because those scripts
// use apiRequest() and getInitials() from here.
// =========================================================

// ---------- 1. Are we signed in? ----------
// login.js saved a token in localStorage. No token = not signed in.
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

// ---------- 2. Talk to our server ----------
// Helper: talk to our server and attach the token.
// Example: await apiRequest("GET", "/api/me")
async function apiRequest(method, url, data) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  // 401 means "I don't know this token" -> sign in again
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
  return await response.json();
}

// ---------- 3. Find the elements we need ----------
const signOutButtons = document.querySelectorAll(".signout-button");

// ---------- 4. Initials for avatars ----------
// "Alex Smith" -> "AS". Also used by appointments.js.
function getInitials(name) {
  const words = name.split(" ");
  let initials = words[0].charAt(0);
  if (words.length > 1) {
    initials = initials + words[words.length - 1].charAt(0);
  }
  return initials.toUpperCase();
}

// ---------- 5. Sign out ----------
// Every page has a Sign out button in the sidebar and one in the phone bar.
signOutButtons.forEach(function (button) {
  button.addEventListener("click", async function () {
    await apiRequest("POST", "/api/logout"); // the server forgets the token
    localStorage.removeItem("token");        // the browser forgets it too
    window.location.href = "index.html";
  });
});

// ---------- 6. Show who is signed in ----------
// Fills the account block at the bottom of the sidebar.
async function loadSidebarUser() {
  const user = await apiRequest("GET", "/api/me");
  if (user.error) {
    return;
  }

  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-avatar").textContent = getInitials(user.name);
}

// ---------- 7. Start ----------
loadSidebarUser();

