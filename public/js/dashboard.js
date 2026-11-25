// =========================================================
// STEP 13 — Dashboard: menu (Step 5) + only for signed-in users (Step 11)
// =========================================================

// ---------- 1. NEW in Step 11: are we signed in? ----------
// login.js saved a token in localStorage. No token = not signed in.
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

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

// ---------- 2. Find the elements we need ----------
const navButtons = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const mobileMenu = document.getElementById("mobile-menu");
const signOutButtons = document.querySelectorAll(".signout-button");

const pageInfo = {
  dashboard: { title: "Dashboard", subtitle: "Here is your schedule for today." },
  appointments: { title: "Appointments", subtitle: "View and manage your scheduled meetings." },
  availability: { title: "Availability", subtitle: "Set the days and times when people can book you." },
  settings: { title: "Settings", subtitle: "Update your basic account information." }
};

// ---------- 3. The menu (same as Step 5) ----------
function showPage(pageName) {
  pages.forEach(function (page) {
    page.classList.remove("active");
  });
  document.getElementById(pageName + "-page").classList.add("active");

  navButtons.forEach(function (button) {
    if (button.dataset.page === pageName) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  pageTitle.textContent = pageInfo[pageName].title;
  pageSubtitle.textContent = pageInfo[pageName].subtitle;
  mobileMenu.value = pageName;
}

navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    showPage(button.dataset.page);
  });
});

mobileMenu.addEventListener("change", function () {
  showPage(mobileMenu.value);
});

// ---------- 4. NEW in Step 11: show who is signed in ----------

// "Alex Smith" -> "AS"
function getInitials(name) {
  const words = name.split(" ");
  let initials = words[0].charAt(0);
  if (words.length > 1) {
    initials = initials + words[words.length - 1].charAt(0);
  }
  return initials.toUpperCase();
}

async function loadUser() {
  const user = await apiRequest("GET", "/api/me");
  if (user.error) {
    return;
  }
  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-avatar").textContent = getInitials(user.name);

  // Also fill in the Settings form
  document.getElementById("settings-name").value = user.name;
  document.getElementById("settings-email").value = user.email;

  // NEW in Step 13: the link guests use to book with this user
  const bookingLink = "booking.html?host=" + encodeURIComponent(user.email);
  const shareLink = document.getElementById("share-link");
  shareLink.href = bookingLink;
  shareLink.textContent = window.location.origin + "/" + bookingLink;
}

// ---------- 5. NEW in Step 11: real sign out ----------
signOutButtons.forEach(function (button) {
  button.addEventListener("click", async function () {
    await apiRequest("POST", "/api/logout"); // the server forgets the token
    localStorage.removeItem("token");        // the browser forgets it too
    window.location.href = "index.html";
  });
});

// ---------- 6. Start ----------
showPage("dashboard");
loadUser();
