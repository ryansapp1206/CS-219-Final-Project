# Snippet steps

The teacher's snippets build SimpleSchedule in 13 steps, one folder each, and every step adds one thing to the step before. Steps 1–7 run in the browser alone, Steps 8–13 need Node.js, and Steps 9–13 also need MongoDB. Step 13 is our starting point: Ryan committed its complete code to our repo on November 25, with the teacher's permission to use all of it. Credit the snippets repo in the README (item 7).

The full code for every step is in the teacher's [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo on GitHub. Our plan is in the [Team Plan](team-plan.md); task numbers below refer to the [Task List](task-list.md).

| Step | Folder | What it adds | How to run it |
| --- | --- | --- | --- |
| 1 | `01-login-page` | Sign in page in HTML and CSS | Open `index.html` |
| 2 | `02-registration-page` | Create account page, linked to sign in | Open `index.html` |
| 3 | `03-form-validation` | JavaScript checks on both forms, with error messages | Open `index.html` |
| 4 | `04-sidebar-layout` | App layout: sidebar, top bar, stat cards, today's list | Open `index.html`, then sign in |
| 5 | `05-menu-navigation` | Sidebar switches between four pages in one file; phone menu | Open `dashboard.html` |
| 6 | `06-calendar` | Month calendar and time buttons for booking | Open `booking.html` |
| 7 | `07-appointments-list` | Appointments list with filters, Cancel and a form (data kept in an array) | Open `dashboard.html` |
| 8 | `08-node-server` | A Node.js server that serves the pages | `node server.js` |
| 9 | `09-mongodb-connect` | A test that Node can save to and read from MongoDB | `npm install`, then `npm start` |
| 10 | `10-register-api` | Create account saves users, with hashed passwords | `npm install`, then `npm start` |
| 11 | `11-login-api` | Real sign in with a token, sign out, signed-in-only pages | `npm install`, then `npm start` |
| 12 | `12-appointments-api` | Appointments saved in MongoDB; real Dashboard numbers | `npm install`, then `npm start` |
| 13 | `13-booking-page` | Public booking page connected to the server; your booking link | `npm install`, then `npm start` |

## Step 1: Sign in page

**Files:** `index.html`, `style.css`

- Colours are stored once as variables (like `--blue`) at the top of `style.css` and reused everywhere.
- Flexbox centres the white card on the screen, and `max-width` keeps it narrow.
- Each `<label for>` matches an input's `id`, so clicking the label puts the cursor in the field.

**In our plan:** A1 (`index.html`) and L3 (`style.css`).

## Step 2: Create account page

**New:** `register.html`. **Unchanged:** `index.html`, `style.css`

- `register.html` starts as a copy of `index.html` with new text and a Full name field.
- Both pages share one `style.css`, so the same classes look the same.
- Its "Try it yourself" suggests building the Forgot password page, which is our task A3.

**In our plan:** A2 and A3.

## Step 3: Form validation

**New:** `login.js`, `register.js`. **Changed:** both pages and `style.css` (error, success and hidden styles)

- The rules come from the prototype: a name of at least 2 characters, a valid-looking email, a password of at least 6 characters.
- `novalidate` on the form turns off the browser's own pop-ups, so the JavaScript shows its messages instead.
- On submit, the script stops the page reloading, reads and trims the values, checks each rule, and shows the first error.

**In our plan:** A4.

## Step 4: Sidebar layout

**New:** `dashboard.html`. **Changed:** `login.js` now opens the dashboard (sign-in is fake until Step 11)

- The sidebar is fixed on the left at full height, with the user box pushed to the bottom.
- The main area leaves 240 px for the sidebar; the three stat cards are a 3-column CSS grid.
- Each appointment row is a flex row: avatar, name and type, time.

**In our plan:** L4 (sidebar), D2 and D3.

## Step 5: Menu navigation

**New:** `dashboard.js`. **Changed:** `dashboard.html`, `style.css`

- All four app pages are sections of one file, and CSS shows only the one marked `active`.
- `showPage()` switches the section, highlights the menu item and changes the page title.
- On narrow screens the sidebar hides and a dropdown menu takes over.

**Different in our plan:** each page is its own HTML file (see Files in the [Team Plan](team-plan.md)), so the sidebar uses plain links instead of `showPage()`. The phone-menu idea is still task L5.

## Step 6: Calendar

**Files:** `booking.html`, `calendar.js`, `style.css` (works on its own; Step 13 connects it to the server)

- JavaScript fills an empty 7-column grid with one button per day of the month.
- `new Date(year, month, 1).getDay()` finds which weekday the 1st falls on; day 0 of the next month gives this month's last day.
- Months count from 0 (January is 0). Past days and weekends are disabled.

**In our plan:** B3 and B5. Ours enables days from the host's saved hours instead of blocking weekends.

## Step 7: Appointments list

**New:** `appointments.js`. **Changed:** `dashboard.html`, `style.css`

- Appointments are an array of objects (`guestName`, `guestEmail`, `date`, `time`, `type`, `status`), so a refresh resets them until Step 12.
- `filter()` picks the current tab's appointments; Cancel sets `status` to `"cancelled"` and redraws.
- Safety rule: build each row's shape with `innerHTML`, but put anything a user typed in with `textContent`.

**In our plan:** E1–E4.

## Step 8: Node.js server

**New:** `server.js`, `package.json`, and a `public` folder holding the Step 7 pages

- The browser can't reach the database directly, so it asks our server, and the server asks MongoDB.
- It uses only Node's built-in modules (`http`, `fs`, `path`). Files come from `public`; URLs starting `/api/` answer with JSON.
- Run it with `node server.js`, open http://localhost:3000, and stop it with Ctrl + C.

**In our plan:** the repo and server items on Ryan's Backend checklist.

## Step 9: Connect to MongoDB

**Files:** `test-connection.js`, `package.json`

- It needs MongoDB running on your laptop, or an Atlas connection string in `MONGODB_URI`.
- A database is like a spreadsheet file, a collection like one sheet, and a document like one row; every document gets an `_id`.
- It saves one document and reads them all back; run it again and the count grows.

**In our plan:** setup (task S3) and Ryan's server item.

## Step 10: Register API

**New:** `database.js`. **Changed:** `server.js`, `public/register.js`

- `POST /api/register` checks the data again on the server, refuses an email already in use, and saves the user.
- Passwords are hashed with a random salt per user using Node's `crypto`; the real password is never stored.
- The page sends the form with `fetch()` and shows the server's `error` message if it fails.

**In our plan:** the register and login item on Ryan's Backend checklist.

## Step 11: Sign in and sign out

**Changed:** `server.js`, `public/login.js`, `public/dashboard.js`

- Signing in returns a random token, saved in the `sessions` collection and in the browser's `localStorage`.
- Every later request sends `Authorization: Bearer <token>`; `apiRequest()` adds it, and signs you out if the server answers 401.
- Without a token, the dashboard sends you back to sign in. Sign out deletes the token on both sides.

**In our plan:** Ryan's register and login item, and `app.js` (task L2). Its "Try it yourself" greeting is task D1.

## Step 12: Appointments API

**Changed:** `server.js`, `public/appointments.js`

- Three routes: list, add and cancel. All of them need a signed-in user.
- You only ever see and cancel your own appointments, because every query matches your user id.
- The page loads the list from the server and the Dashboard numbers come from it. MongoDB ids are called `_id`, not `id`.

**In our plan:** Ryan's Appointments item; tasks E1–E4, D2 and D3 use these routes.

## Step 13: Public booking page

**New:** `booking.html`, `booking.js`. **Changed:** `server.js`, `dashboard.html`, `dashboard.js`

- Two public routes, no sign-in needed: one returns the host's name and the times already taken on a date; the other books a time and refuses double bookings.
- The booking link is `booking.html?host=` followed by your email, shown on the Dashboard.
- Picking a day asks the server which times are taken and shows only the free ones; confirming shows "You're booked".
- Its "Ideas to finish the project" are our remaining work: Availability, Settings and Forgot password.

**In our plan:** Ryan's booking items and tasks B1–B9. We change `booking-info` to return free times from saved hours (see the API contract in the [Team Plan](team-plan.md)).
