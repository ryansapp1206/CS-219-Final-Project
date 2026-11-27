// settings.js: load settings (T2), save settings (T3)
// Assumes apiRequest(method, path, body) and getInitials(name) from app.js.

function $(id) {
  return document.getElementById(id);
}

function showSettingsMessage(kind, text) {
  const error = $("settings-error");
  const notice = $("settings-notice");
  error.classList.add("hidden");
  notice.classList.add("hidden");
  if (!text) return;
  const target = kind === "error" ? error : notice;
  target.textContent = text;
  target.classList.remove("hidden");
}

function updateAvatar() {
  $("settings-avatar").textContent = getInitials($("settings-name").value);
}

// T2: fill the four fields and the avatar
async function loadSettings() {
  try {
    const s = await apiRequest("GET", "/api/settings");
    $("settings-name").value = s.name;
    $("settings-email").value = s.email;
    $("settings-timezone").value = s.timezone;
    $("settings-link").value = s.meetingLink;
    updateAvatar();
  } catch (err) {
    showSettingsMessage("error", err.message || "Could not load your settings.");
  }
}

// T3: send the four fields; reload on success so the sidebar updates
async function saveSettings(event) {
  event.preventDefault();
  showSettingsMessage("", "");

  const settings = {
    name: $("settings-name").value.trim(),
    email: $("settings-email").value.trim(),
    timezone: $("settings-timezone").value,
    meetingLink: $("settings-link").value.trim()
  };

  try {
    await apiRequest("PUT", "/api/settings", settings);
    window.location.reload();
  } catch (err) {
    showSettingsMessage("error", err.message || "Could not save your settings.");
  }
}

$("settings-name").addEventListener("input", updateAvatar);
$("settings-form").addEventListener("submit", saveSettings);

loadSettings();
