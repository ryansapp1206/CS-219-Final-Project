// =========================================================
// STEP 13 — Dashboard: menu (Step 5), Settings fields and booking link
// The signed-in check, apiRequest(), getInitials(), the sidebar
// name and Sign out now live in app.js, which loads first.
// =========================================================

// ---------- 1. Find the elements we need ----------
const navButtons = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const mobileMenu = document.getElementById("mobile-menu");

const pageInfo = {
  dashboard: { title: "Dashboard", subtitle: "Here is your schedule for today." },
  appointments: { title: "Appointments", subtitle: "View and manage your scheduled meetings." },
  availability: { title: "Availability", subtitle: "Set the days and times when people can book you." },
  settings: { title: "Settings", subtitle: "Update your basic account information." }
};

// ---------- 2. The menu (same as Step 5) ----------
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

// ---------- 3. Fill the Settings form and the booking link ----------
// (app.js fills the sidebar; this needs the same /api/me data.)

async function loadUser() {
  const user = await apiRequest("GET", "/api/me");
  if (user.error) {
    return;
  }

  // Also fill in the Settings form
  document.getElementById("settings-name").value = user.name;
  document.getElementById("settings-email").value = user.email;

  // NEW in Step 13: the link guests use to book with this user
  const bookingLink = "booking.html?host=" + encodeURIComponent(user.email);
  const shareLink = document.getElementById("share-link");
  shareLink.href = bookingLink;
  shareLink.textContent = window.location.origin + "/" + bookingLink;
}

// ---------- 4. Start ----------
showPage("dashboard");
loadUser();
