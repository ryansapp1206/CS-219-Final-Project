# Ben Checklist: Sign-in Pages, Dashboard, Appointments, Look and Slides

Updated November 25, 2026

You own the sign-in pages (Sign in, Create account, Reset password), the **Dashboard**, the **Appointments** screen, the shared look (`style.css` and the sidebar) and the slides. Everything is due **Wednesday, December 2**, so each task below has a day. Work top to bottom and tick each box as you finish it. Every task ends with **Done when**: if that's true, the task is finished.

## What already exists (Step 13, in our repo now)

Don't rebuild these; the tasks below say exactly what to change.

| Screen | Where it is now | What already works | What's missing |
| --- | --- | --- | --- |
| Sign in | `public/index.html`, `public/js/login.js` | Everything the prototype shows: "WELCOME BACK", heading, subtitle, fields, error messages, sign-in | "Forgot password?" links to `#` (nowhere) |
| Create account | `public/register.html`, `public/js/register.js` | Everything the prototype shows, including "CREATE YOUR WORKSPACE" and error messages | Nothing; it only picks up the new font from L3 |
| Reset password | Doesn't exist | | The whole page |
| Dashboard | A section inside `public/dashboard.html`; its numbers come from `renderDashboard()` in `public/js/appointments.js` | Three cards with real numbers, the booking link card, today's list with initials and times | The greeting, units and icons on the cards, the date and "View all" on today's list, the "•••" menu |
| Appointments | A section inside `public/dashboard.html`, `public/js/appointments.js` | Filter tabs, the list with date badges, Cancel, the New appointment form, saving to the server | Its own file, the tab order, the list header, status pills, the extra "Check-in" type removed |
| Look | `public/css/style.css`, the sidebar in `dashboard.html` | Colours, white cards, sidebar with name, email and Sign out | Inter font (it uses Arial), line icons instead of emojis, menu links to separate page files |

All four app screens (Dashboard, Appointments, Availability, Settings) currently live in one file, `dashboard.html`, and the sidebar buttons switch between them. On Friday that file is split so each screen has its own file. Abou makes Availability and Settings; you make Dashboard and Appointments (L1).

## How to use this checklist

Task numbers (like L1) match the [Task List](task-list.md).

**Every time you work:**

1. `git pull` before you start, so you have everyone's latest work.
2. Commit each small piece with a clear message ("Add reset password page").
3. `git push` the same day. Your commits are graded.

**Ground rules:**

- Your files: `public/index.html`, `public/register.html`, `public/reset.html`, `public/dashboard.html`, `public/appointments.html`, their scripts (`login.js`, `register.js`, `reset.js`, `dashboard.js`, `appointments.js`), `public/css/style.css`, and the sidebar block (`<aside>`) in all four app pages.
- Don't edit `server.js`, `database.js` or `public/js/app.js` (Ryan's). Ask him instead.
- `app.js` is pushed (November 25), so `dashboard.js` and `appointments.js` are yours to edit. `git pull` first so you have it.
- On the four signed-in pages, every request to the server goes through `apiRequest()` from `app.js`. The sign-in pages keep their own `fetch` calls, as in Step 13.
- Tell Abou before you change `style.css` or the sidebar, since his pages use them too.

**Where to look:** the look comes from the [Figma prototype](https://violet-surly-41566398.figma.site/). How the teacher built something is in the [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo, in the step named on each task.

## Wednesday–Thursday, November 25–26: start now

These pages work without the server: open `public/index.html`, `public/register.html` or `public/reset.html` by double-clicking it, and refresh the browser after each change. The forms won't submit until the server runs, which doesn't matter for layout. Thursday is Thanksgiving, so finish what you can.

- [ ] **A3: Make the Reset password page**

    1. Copy `public/index.html` and name the copy `public/reset.html`. Change `<title>` to `Reset password | SimpleSchedule`.
    2. In the card: the heading "Reset your password", one Email address field, and a "Send reset link" button. Remove the password field and the "Forgot password?" row. Change the bottom line to "Remembered it? Sign in" linking to `index.html`.
    3. Create `public/js/reset.js` and load it instead of `login.js`. When the button is clicked: stop the form from submitting, and if the email looks valid, hide the form and show "Reset link sent." No email is sent and no server route is needed. `login.js` shows how to check an email and show a message.

    **Done when:** typing an email and clicking the button shows "Reset link sent.", and an empty or invalid email shows an error instead. Commit and push.

- [ ] **A1: Point "Forgot password?" at the reset page**

    In `index.html`, change the "Forgot password?" link from `href="#"` to `href="reset.html"`. The rest of Sign in already matches the prototype.

    **Done when:** clicking "Forgot password?" opens the reset page.

- [ ] **L3: Make `style.css` match the prototype**

    1. Font: Step 13 uses Arial. Switch to Inter (load it from Google Fonts in each page's `<head>`, or use Inter with `sans-serif` as the fallback).
    2. Compare the prototype's blues, greys, card corners and spacing with the colour variables at the top of `style.css` and adjust them.
    3. Check Sign in, Create account and Reset password first; the app pages pick up the same file.

    **Done when:** the three sign-in pages look like the prototype side by side. Tell Abou when it's pushed.

## Run the app (Ryan sent you the `.env` on November 25)

- [ ] `git pull`, then save the `.env` file Ryan sent you in the same folder as `server.js`. Never commit it. (Finder and File Explorer hide files starting with a dot; VS Code shows it.)
- [ ] Run `npm install`, then `npm start`. Open http://localhost:3000 and create an account named after you (`ben-test@example.com`).
- [ ] Put the prototype and the running app side by side and write down every difference on Dashboard and Appointments. Check it against the D and E tasks below.

    **Done when:** you can sign in and see the Dashboard.

## Friday, November 27: split the pages and connect the sidebar

`app.js` is already pushed (November 25), so you can start these as soon as A3, A1 and L3 are done; `git pull` first. `app.js` handles the signed-in check, `apiRequest()`, `getInitials()`, the sidebar name, email and initials, and Sign out. `dashboard.js` still has the tab switching, the Settings fields and the booking link (in `loadUser()`), so `dashboard.html` works exactly as before until you split it.

- [ ] **L1: Split Dashboard and Appointments into their own files**

    **`appointments.html` (new):**

    1. Copy `public/dashboard.html` and name the copy `public/appointments.html`.
    2. Change `<title>` to `Appointments | SimpleSchedule`, the top bar heading to "Appointments" and the line under it to "View and manage your scheduled meetings." Delete the top bar's "+ New appointment" button (the Appointments section has its own).
    3. Delete the Dashboard, Availability and Settings `<section>` blocks. Change the Appointments section's first line to `<section class="page active" id="appointments-page">`. Without `active`, the stylesheet hides it.
    4. At the bottom, load `js/app.js`, then `js/appointments.js`, and nothing else. Update the comment above the scripts so it says why `app.js` comes first.

    **`dashboard.html`:**

    5. Delete the Appointments, Availability and Settings `<section>` blocks. Change the Dashboard section's first line to `<section class="page active" id="dashboard-page">`.
    6. Change the top bar's "+ New appointment" `<button>` into a link: `<a class="primary-btn" href="appointments.html#new">+ New appointment</a>`.
    7. At the bottom, load `js/app.js`, then `js/dashboard.js`. Remove `appointments.js` from this page, and update the comment above the scripts to match.

    **Sidebar, in all four app pages** (`dashboard.html`, `appointments.html`, and Abou's `availability.html` and `settings.html`; tell Abou first):

    8. Replace each `<button class="nav-link" data-page="...">` with a link to its file, like `<a class="nav-link" href="appointments.html">📅 Appointments</a>`. Keep the emojis for now; L4 replaces them.
    9. Add the class `active` to the current page's link (`class="nav-link active"`), so it's highlighted.
    10. Delete the `<select id="mobile-menu">` dropdown in the mobile bar; it only switched tabs.
    11. Keep `id="user-avatar"`, `id="user-name"`, `id="user-email"` and the class `signout-button` exactly as they are. `app.js` fills and uses them.

    **`dashboard.js`:**

    12. Delete the tab-switching code: the `navButtons`, `pages`, `pageTitle`, `pageSubtitle` and `mobileMenu` lines, `pageInfo`, `showPage()`, the two click and change listeners, and the `showPage("dashboard")` line at the bottom.
    13. In `loadUser()`, delete the two lines that fill `settings-name` and `settings-email`. Keep the booking link code. Update the section comments in `dashboard.js` and the header comment in `appointments.js` so they still describe what's in each file.
    14. Move `toDateString()`, `daysFromToday()`, `formatTime()` and `renderDashboard()` from `appointments.js` into `dashboard.js`. Add `let appointments = [];` and a function that gets the list with `apiRequest("GET", "/api/appointments")`, saves it in `appointments` and calls `renderDashboard()`. Call that function at the bottom.

    **`appointments.js`:**

    15. Delete `renderDashboard()` and the `renderDashboard();` line inside `loadAppointments()`.
    16. Delete the `topbarNewButton` line and its click listener (that button is no longer on this page). In their place, open the form when the address ends in `#new`: `if (window.location.hash === "#new") { openForm(); }`, placed after `openForm()` is defined.

    **Done when:** `dashboard.html` shows the three cards, today's list and the booking link with real data; `appointments.html` lists, filters, adds and cancels; the Dashboard's "+ New appointment" opens Appointments with the form open; the sidebar links move between all four pages with the current one highlighted; and the browser console (F12) shows no red errors on either page. Push the same day and tell Abou.

- [ ] **L4: Rebuild the sidebar's look**

    Replace the emojis with line icons (one consistent set, saved as SVG in the HTML or in a `public/icons` folder), restyle the avatar, name and email at the bottom to match the prototype, and turn "Sign out" into the prototype's sign-out icon. Keep the ids and the `signout-button` class from L1 step 11. Copy the finished `<aside>` into all four app pages, changing only which link has `active` (tell Abou first).

    **Done when:** the sidebar matches the prototype on all four pages and Sign out still works.

## Saturday, November 28: the Dashboard

- [ ] **D1: Greeting**

    Replace the top bar heading "Dashboard" with "Good morning, Alex": "morning" before 12:00, "afternoon" before 17:00, "evening" after, using the user's first name only. Get the name in `dashboard.js` from `apiRequest("GET", "/api/me")`, the same call the booking link uses. The line under it stays "Here is your schedule for today."

    **Done when:** it greets you by first name with the right time of day.

- [ ] **D2: Stat cards**

    1. Add an icon tile to each card.
    2. Change the third label from "Hours booked this week" to "Hours booked".
    3. In `renderDashboard()`, add the units: "3 appointments", "8 appointments", "4.5 this week". Keep Step 13's rule that "this week" is today plus the next 6 days.

    **Done when:** the cards match the prototype and the numbers change when you add or cancel an appointment.

- [ ] **D3: Today's appointments list**

    The rows (initials, name, meeting type, time) already work. Add today's date under the heading ("Tuesday, June 17"), a "View all" link on the right that goes to `appointments.html`, coloured initials, and "30 min" under the time on the right instead of after the meeting type.

    **Done when:** the list matches the prototype.

## Sunday, November 29: Appointments

- [ ] **E1: Filter tabs**

    In `appointments.html`, reorder the buttons to Upcoming, All, Cancelled (Step 13 has Upcoming, Cancelled, All) and style them as the prototype's grey segmented control.

    **Done when:** the order and look match the prototype and each tab still filters.

- [ ] **E2: List header**

    Step 13 shows "3 appointments". Change it to two lines: "Upcoming appointments" (or "All appointments", "Cancelled appointments", following the tab) and "2 appointments found" under it.

    **Done when:** both lines change with the tab.

- [ ] **E3: Appointment rows**

    The date badge, guest name and Cancel already exist. Lay each row out like the prototype: guest email under the name, time and meeting type in their own column, a status pill ("Upcoming" or "Cancelled") for every row, and Cancel as red text on upcoming rows.

    **Done when:** a row matches the prototype for both an upcoming and a cancelled appointment.

- [ ] **E4: New appointment form**

    The form already works. Remove the "Check-in" option so Meeting type has only "Project discussion" and "Quick meeting", and restyle the form to match the prototype.

    **Done when:** the form matches the prototype and still adds appointments.

## Monday, November 30: finish the Dashboard, start the slides

- [ ] **D6: Booking link card**

    It already works; restyle it to match the other cards. (The prototype doesn't show it, but hosts need the link.)

    **Done when:** it looks like the other cards and the link opens the booking page.

- [ ] **D4: "•••" menu on each of today's rows**, with at least a Cancel option. Cut this if you're behind.
- [ ] **D5: "New appointment type" button**: change the top bar link's text from "+ New appointment" to "+ New appointment type", as in the prototype. It keeps going to `appointments.html#new`. Cut this if you're behind.
- [ ] **P1: Slides**: what SimpleSchedule does, who would use it, the tech, who built what, the demo, and what we learned.
- [ ] **P2: Intro script, about 1 minute**: what SimpleSchedule does and who would use it.

## Tuesday, December 1: test, fix, rehearse

- [ ] **Run the whole demo with the team**: create an account, set availability, book on the public page, check the Dashboard and Appointments, cancel one, reload. Fix anything broken on your pages.
- [ ] **Try to break your pages**: wrong password, an email that's already taken, empty forms, cancelling the same appointment twice.
- [ ] **Check your pages at 150% browser zoom**: nothing overlaps or gets cut off.
- [ ] **P3: Demo script**: the 6 required demo steps in order, who clicks, what to say at each, and the test data ready in advance.
- [ ] **P4: Backup plan**: a screen recording or screenshots of the demo, in case the live demo breaks. Send Abou screenshots of your pages for the README.
- [ ] First rehearsal with the team, timed to 8–10 minutes.

## Wednesday, December 2: due

- [ ] **U3:** save the slides as a PDF and upload them to Blackboard.
- [ ] Second rehearsal. Late days can't be used for the presentation.

## Only if there's time

- [ ] **E5:** hide meetings that already happened from the Upcoming tab.
- [ ] **L5:** on phone-width windows the sidebar is hidden and L1 removed the dropdown, so add a small menu with links to the four pages. Step 5 has a starting point.
