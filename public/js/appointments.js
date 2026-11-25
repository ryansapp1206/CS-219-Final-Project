// =========================================================
// STEP 12 — Appointments saved in MongoDB
// Same screens as Step 7, but the data now comes from our server.
// apiRequest(), showPage() and getInitials() come from dashboard.js.
// =========================================================

// ---------- 1. Date helpers (same as Step 7) ----------

function toDateString(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function daysFromToday(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

function formatTime(timeText) {
  const parts = timeText.split(":");
  let hour = Number(parts[0]);
  const minutes = parts[1];
  const amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }
  return hour + ":" + minutes + " " + amPm;
}

function splitDate(dateText) {
  const parts = dateText.split("-");
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return { month: monthShort[Number(parts[1]) - 1], day: String(Number(parts[2])) };
}

// ---------- 2. Our data: CHANGED — starts empty, filled from the server ----------
let appointments = [];
let currentFilter = "upcoming";

// ---------- 3. Find the elements we need ----------
const appointmentList = document.getElementById("appointment-list");
const recordsHeading = document.getElementById("records-heading");
const filterButtons = document.querySelectorAll(".filter-button");
const appointmentForm = document.getElementById("appointment-form");
const toggleFormButton = document.getElementById("toggle-form-button");
const topbarNewButton = document.getElementById("topbar-new-button");
const appointmentError = document.getElementById("appointment-error");
const appointmentNotice = document.getElementById("appointment-notice");

// ---------- 4. NEW: load appointments from the server ----------
async function loadAppointments() {
  const data = await apiRequest("GET", "/api/appointments");
  if (data.error) {
    return;
  }
  appointments = data;
  renderAppointments();
  renderDashboard();
}

// ---------- 5. Draw the Appointments list (same idea as Step 7) ----------
function renderAppointments() {
  const visible = appointments.filter(function (appointment) {
    if (currentFilter === "all") {
      return true;
    }
    return appointment.status === currentFilter;
  });

  recordsHeading.textContent = visible.length + " appointments";
  appointmentList.innerHTML = "";

  if (visible.length === 0) {
    appointmentList.innerHTML = '<p class="empty-state">No appointments here.</p>';
    return;
  }

  visible.forEach(function (appointment) {
    const dateParts = splitDate(appointment.date);

    const row = document.createElement("div");
    row.className = "appointment-row";
    row.innerHTML = `
      <div class="date-block">
        <span class="month"></span>
        <span class="day-number"></span>
      </div>
      <div class="appointment-info">
        <p class="appointment-name"></p>
        <p class="appointment-meta"></p>
      </div>
      <div class="row-action"></div>
    `;
    row.querySelector(".month").textContent = dateParts.month;
    row.querySelector(".day-number").textContent = dateParts.day;
    row.querySelector(".appointment-name").textContent = appointment.guestName;
    row.querySelector(".appointment-meta").textContent =
      formatTime(appointment.time) + " · " + appointment.type + " · " + appointment.guestEmail;

    const actionArea = row.querySelector(".row-action");
    if (appointment.status === "upcoming") {
      const cancelButton = document.createElement("button");
      cancelButton.className = "text-button danger";
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", function () {
        cancelAppointment(appointment._id); // MongoDB ids are called "_id"
      });
      actionArea.appendChild(cancelButton);
    } else {
      actionArea.innerHTML = '<span class="badge-cancelled">Cancelled</span>';
    }

    appointmentList.appendChild(row);
  });
}

// ---------- 6. NEW: fill in the Dashboard page with real numbers ----------
function renderDashboard() {
  const todayText = toDateString(new Date());
  const weekEndText = daysFromToday(6); // "this week" = today + the next 6 days

  const upcoming = appointments.filter(function (a) {
    return a.status === "upcoming";
  });
  const todays = upcoming.filter(function (a) {
    return a.date === todayText;
  });
  // Dates like "2026-12-03" can be compared as text: "2026-12-03" < "2026-12-10"
  const thisWeek = upcoming.filter(function (a) {
    return a.date >= todayText && a.date <= weekEndText;
  });

  document.getElementById("stat-today").textContent = todays.length;
  document.getElementById("stat-week").textContent = thisWeek.length;
  document.getElementById("stat-hours").textContent = thisWeek.length * 0.5; // each meeting = 30 min

  // Today's list
  const todayList = document.getElementById("today-list");
  todayList.innerHTML = "";
  if (todays.length === 0) {
    todayList.innerHTML = '<p class="empty-state">No appointments today.</p>';
    return;
  }
  todays.forEach(function (appointment) {
    const row = document.createElement("div");
    row.className = "appointment-row";
    row.innerHTML = `
      <div class="avatar"></div>
      <div class="appointment-info">
        <p class="appointment-name"></p>
        <p class="appointment-meta"></p>
      </div>
      <span class="time-tag"></span>
    `;
    row.querySelector(".avatar").textContent = getInitials(appointment.guestName);
    row.querySelector(".appointment-name").textContent = appointment.guestName;
    row.querySelector(".appointment-meta").textContent = appointment.type + " · 30 min";
    row.querySelector(".time-tag").textContent = formatTime(appointment.time);
    todayList.appendChild(row);
  });
}

// ---------- 7. CHANGED: cancel on the server ----------
async function cancelAppointment(id) {
  if (!confirm("Cancel this appointment?")) {
    return;
  }
  const data = await apiRequest("POST", "/api/appointments/" + id + "/cancel");
  if (data.error) {
    alert(data.error);
    return;
  }
  loadAppointments(); // get the fresh list from the server
}

// ---------- 8. Filter tabs (same as Step 7) ----------
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(function (otherButton) {
      otherButton.classList.remove("active");
    });
    button.classList.add("active");
    renderAppointments();
  });
});

// ---------- 9. Show / hide the form (same as Step 7) ----------
function openForm() {
  appointmentForm.classList.remove("hidden");
  toggleFormButton.textContent = "Close form";
}

function closeForm() {
  appointmentForm.classList.add("hidden");
  toggleFormButton.textContent = "+ New appointment";
}

toggleFormButton.addEventListener("click", function () {
  if (appointmentForm.classList.contains("hidden")) {
    openForm();
  } else {
    closeForm();
  }
});

topbarNewButton.addEventListener("click", function () {
  showPage("appointments");
  openForm();
});

// ---------- 10. CHANGED: add a new appointment on the server ----------
appointmentForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const newAppointment = {
    guestName: document.getElementById("guest-name").value.trim(),
    guestEmail: document.getElementById("guest-email").value.trim(),
    date: document.getElementById("appointment-date").value,
    time: document.getElementById("appointment-time").value,
    type: document.getElementById("meeting-type").value
  };

  // The server checks everything and sends back an error if something is wrong
  const data = await apiRequest("POST", "/api/appointments", newAppointment);
  if (data.error) {
    appointmentError.textContent = data.error;
    appointmentError.classList.remove("hidden");
    return;
  }

  appointmentError.classList.add("hidden");
  appointmentForm.reset();
  closeForm();
  appointmentNotice.textContent = "Appointment added.";
  appointmentNotice.classList.remove("hidden");
  loadAppointments();
});

// ---------- 11. Load everything when the page opens ----------
loadAppointments();
