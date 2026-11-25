// =========================================================
// STEP 13 — Public booking page: the Step 6 calendar + our server
// Open it like this:  booking.html?host=alex@example.com
// =========================================================

// ---------- 1. Fixed data ----------
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// CHANGED from Step 6: times are stored as "HH:MM" (24-hour), like the database.
// We turn them into "9:00 AM" only when we show them.
const allTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

// ---------- 2. Who are we booking with? Read ?host=... from the address bar ----------
const params = new URLSearchParams(window.location.search);
const hostEmail = params.get("host") || "";

// ---------- 3. Variables that change ----------
const today = new Date();
today.setHours(0, 0, 0, 0);

let shownYear = today.getFullYear();
let shownMonth = today.getMonth();
let selectedDate = null;
let selectedTime = null;
let takenTimes = [];   // NEW: times already booked on the selected day

// ---------- 4. Find the elements we need ----------
const monthLabel = document.getElementById("month-label");
const daysGrid = document.getElementById("days-grid");
const prevButton = document.getElementById("prev-month");
const nextButton = document.getElementById("next-month");
const chosenDateText = document.getElementById("chosen-date");
const timeList = document.getElementById("time-list");
const summary = document.getElementById("selected-summary");
const detailsForm = document.getElementById("details-form");
const detailsError = document.getElementById("details-error");
const pageError = document.getElementById("page-error");

// ---------- 5. Helpers ----------
function toDateString(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function formatTime(timeText) {
  const parts = timeText.split(":");
  let hour = Number(parts[0]);
  const amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }
  return hour + ":" + parts[1] + " " + amPm;
}

function formatLongDate(date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function isAvailable(date) {
  const dayOfWeek = date.getDay();
  return date >= today && dayOfWeek !== 0 && dayOfWeek !== 6;
}

function getInitials(name) {
  const words = name.split(" ");
  let initials = words[0].charAt(0);
  if (words.length > 1) {
    initials = initials + words[words.length - 1].charAt(0);
  }
  return initials.toUpperCase();
}

// ---------- 6. NEW: ask the server about the host (and taken times for a date) ----------
async function getBookingInfo(dateText) {
  const url = "/api/booking-info?host=" + encodeURIComponent(hostEmail) + "&date=" + dateText;
  const response = await fetch(url);
  return await response.json();
}

async function loadHost() {
  const info = await getBookingInfo("");
  if (info.error) {
    pageError.textContent = info.error + " Check that the link ends with ?host=your-email";
    pageError.classList.remove("hidden");
    document.getElementById("booking-card").classList.add("hidden");
    return;
  }
  document.getElementById("host-name").textContent = info.name;
  document.getElementById("host-avatar").textContent = getInitials(info.name);
}

// ---------- 7. Draw the month (same as Step 6) ----------
function drawCalendar() {
  monthLabel.textContent = monthNames[shownMonth] + " " + shownYear;
  daysGrid.innerHTML = "";

  const firstWeekday = new Date(shownYear, shownMonth, 1).getDay();
  const daysInMonth = new Date(shownYear, shownMonth + 1, 0).getDate();

  for (let i = 0; i < firstWeekday; i++) {
    daysGrid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(shownYear, shownMonth, day);
    const button = document.createElement("button");
    button.textContent = day;
    button.className = "day";

    if (isAvailable(date)) {
      button.classList.add("available");
      button.addEventListener("click", function () {
        selectDate(date);
      });
    } else {
      button.disabled = true;
    }

    if (selectedDate !== null && date.getTime() === selectedDate.getTime()) {
      button.classList.add("selected");
    }
    daysGrid.appendChild(button);
  }
}

// ---------- 8. CHANGED: picking a day also asks the server which times are taken ----------
async function selectDate(date) {
  selectedDate = date;
  selectedTime = null;
  detailsForm.classList.add("hidden");
  drawCalendar();

  const info = await getBookingInfo(toDateString(date));
  takenTimes = info.takenTimes || [];
  drawTimes();
}

function drawTimes() {
  chosenDateText.textContent = formatLongDate(selectedDate);
  timeList.innerHTML = "";

  // Only show times that are NOT taken
  const freeTimes = allTimes.filter(function (time) {
    return !takenTimes.includes(time);
  });

  if (freeTimes.length === 0) {
    timeList.innerHTML = '<p class="muted">No times left on this day.</p>';
    return;
  }

  freeTimes.forEach(function (time) {
    const button = document.createElement("button");
    button.textContent = formatTime(time);
    button.className = "time-button";
    if (time === selectedTime) {
      button.classList.add("selected");
    }
    button.addEventListener("click", function () {
      selectedTime = time;
      drawTimes();
      showDetailsForm();
    });
    timeList.appendChild(button);
  });
}

// ---------- 9. NEW: the details form ----------
function showDetailsForm() {
  summary.textContent = formatLongDate(selectedDate) + " at " + formatTime(selectedTime) + " · 30 minutes";
  detailsForm.classList.remove("hidden");
  detailsForm.scrollIntoView({ behavior: "smooth" });
}

detailsForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const booking = {
    hostEmail: hostEmail,
    date: toDateString(selectedDate),
    time: selectedTime,
    guestName: document.getElementById("guest-name").value.trim(),
    guestEmail: document.getElementById("guest-email").value.trim(),
    notes: document.getElementById("guest-notes").value.trim()
  };

  const response = await fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  });
  const data = await response.json();

  if (!response.ok) {
    detailsError.textContent = data.error;
    detailsError.classList.remove("hidden");
    return;
  }

  // Success: hide the booking parts, show the confirmation
  document.getElementById("booking-card").classList.add("hidden");
  detailsForm.classList.add("hidden");
  document.getElementById("success-title").textContent = "You're booked, " + booking.guestName + "!";
  document.getElementById("success-details").textContent =
    formatLongDate(selectedDate) + " at " + formatTime(selectedTime) + " · 30 minutes · Online meeting";
  document.getElementById("success-panel").classList.remove("hidden");
});

// ---------- 10. Previous / next month (same as Step 6) ----------
prevButton.addEventListener("click", function () {
  shownMonth = shownMonth - 1;
  if (shownMonth < 0) {
    shownMonth = 11;
    shownYear = shownYear - 1;
  }
  drawCalendar();
});

nextButton.addEventListener("click", function () {
  shownMonth = shownMonth + 1;
  if (shownMonth > 11) {
    shownMonth = 0;
    shownYear = shownYear + 1;
  }
  drawCalendar();
});

// ---------- 11. Start ----------
loadHost();
drawCalendar();
