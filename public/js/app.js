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

const signOutButtons = document.querySelectorAll(".signout-button");

function getInitials(name) {
  const words = name.split(" ");
  let initials = words[0].charAt(0);
  if (words.length > 1) {
    initials = initials + words[words.length - 1].charAt(0);
  }
  return initials.toUpperCase();
}

signOutButtons.forEach(function (button) {
  button.addEventListener("click", async function () {
    await apiRequest("POST", "/api/logout"); // the server forgets the token
    localStorage.removeItem("token");        // the browser forgets it too
    window.location.href = "index.html";
  });
});

async function loadSidebarUser() {
  const user = await apiRequest("GET", "/api/me");
  if (user.error) {
    return;
  }

  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-avatar").textContent = getInitials(user.name);
}

loadSidebarUser();

