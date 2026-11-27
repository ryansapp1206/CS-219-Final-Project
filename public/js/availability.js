// availability.js: day rows (V4), load hours (V2), save hours (V3)
// Assumes apiRequest(method, path, body) from app.js returns parsed JSON and throws an Error on failure.

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function $(id) {
  return document.getElementById(id);
}

// V4: show the times or "Unavailable" depending on the checkbox
function updateRow(day) {
  const enabled = $(day + "-enabled").checked;
  $(day + "-times").classList.toggle("hidden", !enabled);
  $(day + "-unavailable").classList.toggle("hidden", enabled);
  validateRow(day);
}

// V4: a checked day's end must be after its start. Returns true if OK.
function validateRow(day) {
  const error = $(day + "-error");
  const enabled = $(day + "-enabled").checked;
  const start = $(day + "-start").value;
  const end = $(day + "-end").value;

  if (enabled && (!start || !end || end <= start)) {
    error.textContent = "End time must be after start time.";
    error.classList.remove("hidden");
    return false;
  }
  error.textContent = "";
  error.classList.add("hidden");
  return true;
}

function showMessage(id, text) {
  // show one of the two message lines, hide the other
  const error = $("availability-error");
  const notice = $("availability-notice");
  error.classList.add("hidden");
  notice.classList.add("hidden");
  if (!text) return;
  const target = $(id);
  target.textContent = text;
  target.classList.remove("hidden");
}

// V2: fill the rows from the server's list
async function loadAvailability() {
  try {
    const days = await apiRequest("GET", "/api/availability");
    days.forEach(function (item) {
      $(item.day + "-enabled").checked = item.enabled;
      $(item.day + "-start").value = item.start;
      $(item.day + "-end").value = item.end;
      updateRow(item.day);
    });
  } catch (err) {
    showMessage("availability-error", err.message || "Could not load your hours.");
  }
}

// V3: build the 7-day list and send it
async function saveAvailability() {
  showMessage("availability-notice", "");

  let allValid = true;
  DAYS.forEach(function (day) {
    if (!validateRow(day)) allValid = false;
  });
  if (!allValid) return; // don't send if V4 found a problem

  const days = DAYS.map(function (day) {
    return {
      day: day,
      enabled: $(day + "-enabled").checked,
      start: $(day + "-start").value,
      end: $(day + "-end").value
    };
  });

  try {
    await apiRequest("PUT", "/api/availability", days);
    showMessage("availability-notice", "Saved.");
  } catch (err) {
    showMessage("availability-error", err.message || "Could not save your hours.");
  }
}

DAYS.forEach(function (day) {
  $(day + "-enabled").addEventListener("change", function () { updateRow(day); });
  $(day + "-start").addEventListener("input", function () { validateRow(day); });
  $(day + "-end").addEventListener("input", function () { validateRow(day); });
});

$("save-availability").addEventListener("click", saveAvailability);

loadAvailability();
