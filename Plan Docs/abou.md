# Abou Checklist: Availability, Settings, Booking Page and README

Updated November 25, 2026

You own four things: the **Availability** screen, the **Settings** screen, the public **booking page** guests use, and the **README**. Everything is due **Wednesday, December 2**, so each task below has a day. Work top to bottom and tick each box as you finish it. Every task ends with **Done when**: if that's true, the task is finished.

## What already exists (Step 13, in our repo now)

Don't rebuild these; the tasks below say exactly what to change.

| Screen | Where it is now | What already works | What's missing |
| --- | --- | --- | --- |
| Availability | A section inside `public/dashboard.html` (shown with the Availability tab) | The "Weekly hours" card, Monday–Friday rows with a checkbox and two times, the "Keep it simple" box | Its own file, Saturday and Sunday rows, "Unavailable" for unchecked days, Friday 9–3, a Save button, loading and saving |
| Settings | A section inside `public/dashboard.html` (shown with the Settings tab) | The "Profile" card with Full name, Email address, Time zone, Meeting link and "Save settings" | Its own file, the right three time zones, the initials avatar, loading and saving (Save does nothing) |
| Booking page | `public/booking.html` and `public/js/booking.js` | The three-column card (host, calendar, times), month arrows, picking a date and time, the details form, booking, the "You're booked" message, the message for a bad link | Times from the host's saved hours (it uses six fixed times and blocks weekends), the time zone line, a "Next" step, "← Change date or time", the host and meeting link on the confirmation |
| README | `README.md` | Nothing: it holds only the line `# CS-219---Final-Project` | All 7 required items |

## How to use this checklist

Task numbers (like V1) match the [Task List](task-list.md).

**Every time you work:**

1. `git pull` before you start, so you have everyone's latest work.
2. Commit each small piece with a clear message ("Add availability page").
3. `git push` the same day. Your commits are graded.

**Ground rules:**

- Your files: `public/availability.html`, `public/settings.html`, `public/booking.html`, `public/js/availability.js`, `public/js/settings.js`, `public/js/booking.js`, and `README.md`.
- Don't edit `server.js`, `database.js` or `public/js/app.js` (Ryan's), or `dashboard.html`, `style.css` and the sidebar (Ben's). Ask the owner instead. The one exception is on Friday: Ben edits the sidebar block (`<aside>`) inside your two files, so pull before you work that day and leave the `<aside>` block to him.
- On Availability and Settings, every request to the server goes through `apiRequest()` from `app.js`. The booking page is public (guests aren't signed in), so it doesn't load `app.js` and keeps its own `fetch` calls, as in Step 13.
- Show what the server sends back. Working out which times are free, or blocking double bookings, is the server's job, not your page's.
- Stuck or blocked? Tell Ryan.

**Where to look:** the look comes from the [Figma prototype](https://violet-surly-41566398.figma.site/). How the teacher built something is in the [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo, in the step named on each task.

## Wednesday–Thursday, November 25–26: start now, no `.env` needed

Your two screens become their own files. Until Friday they have no `<script>` tags, so you can open them by double-clicking and refresh after each change. Thursday is Thanksgiving, so finish what you can.

- [ ] **V1: Make `availability.html`**

    1. Copy `public/dashboard.html` and name the copy `public/availability.html`. Don't change `dashboard.html`.
    2. In the copy, change `<title>` to `Availability | SimpleSchedule`. In the top bar, change the heading to "Availability" and the line under it to "Set the days and times when people can book you." Delete the top bar's "+ New appointment" button.
    3. Delete the Dashboard, Appointments and Settings `<section>` blocks. Keep the Availability section and change its first line to `<section class="page active" id="availability-page">`. Without `active`, the stylesheet hides the section and the page looks empty.
    4. Delete the two `<script>` lines at the bottom.
    5. Make 7 rows, Monday to Sunday (Step 13 has only Monday–Friday). Each row: a checkbox, the day name, a start time, "to", an end time. Starting values: Monday–Thursday checked, 9:00 AM to 5:00 PM; Friday checked, 9:00 AM to 3:00 PM; Saturday and Sunday unchecked, 9:00 AM to 5:00 PM.
    6. Give every input an id: `monday-enabled`, `monday-start`, `monday-end`, and the same pattern for the other six days. Your script finds them by these ids later.
    7. Add the word "Unavailable" to each row. For Saturday and Sunday (unchecked), show "Unavailable" and hide the two times; for the other days, hide "Unavailable".
    8. Keep the "Keep it simple" box. Below it, add a `Save availability` button with `id="save-availability"`.

    **Done when:** double-clicking `availability.html` shows the sidebar and 7 rows that match the prototype, Saturday and Sunday say "Unavailable", the Save button is there, and `dashboard.html` is unchanged. Commit and push.

- [ ] **T1: Make `settings.html`**

    1. Copy `public/dashboard.html` and name the copy `public/settings.html`.
    2. Change `<title>` to `Settings | SimpleSchedule`, the top bar heading to "Settings" and the line under it to "Update your basic account information." Delete the top bar's "+ New appointment" button.
    3. Delete every `<section>` except Settings, and change its first line to `<section class="page active" id="settings-page">`. Delete the two `<script>` lines.
    4. Replace the four time zone options with exactly these three: `Eastern Time (US & Canada)`, `Central Time (US & Canada)`, `Pacific Time (US & Canada)`.
    5. Above Full name, add an initials avatar ("AS" for now) with "Profile photo" and "Initials are enough for the minimal version." beside it.
    6. Keep the field ids as they are (`settings-name`, `settings-email`, `settings-timezone`, `settings-link`) and give the Save button `id="save-settings"`.

    **Done when:** double-clicking `settings.html` shows the Profile card matching the prototype with the three time zones. Commit and push.

- [ ] **R1: README title, names and description**

    Replace `# CS-219---Final-Project` with `# SimpleSchedule`, then our three names, then 2–3 sentences on what the app does and who would use it.

    **Done when:** the README on GitHub shows the title, three names and the description.

- [ ] **R3: README technologies**

    A "Technologies used" section listing HTML, CSS, JavaScript, Node.js, MongoDB (Atlas), Git and GitHub.

    **Done when:** the section is on GitHub.

- [ ] **R7: README outside resources**

    A "Resources" section with links: the teacher's snippets repo first (https://github.com/ShahinurEdu/SimpleSchedule-Snippets), since our starting code is its Step 13. Ask Ryan and Ben for theirs and keep adding as you go.

    **Done when:** the section is on GitHub with the snippets repo listed first. Keep adding until December 2.

## As soon as Ryan sends the `.env`: run the app

- [ ] `git pull`, then save the `.env` file in the same folder as `server.js`. Never commit it. (Finder and File Explorer hide files starting with a dot; VS Code shows it.)
- [ ] Run `npm install`, then `npm start`. Open http://localhost:3000 and create an account named after you (`abou-test@example.com`). If anything fails, tell Ryan.

    **Done when:** you can sign in and see the Dashboard.

## Friday, November 27: connect your pages to `app.js`, start the booking page

Ryan pushes `app.js` and the placeholder routes on Friday and messages the team. Then `git pull`. The placeholder routes send back exactly the example data in the Saturday section.

- [ ] **V5: Load `app.js` in both pages**

    1. Create two empty files: `public/js/availability.js` and `public/js/settings.js`.
    2. At the bottom of `availability.html`, just before `</body>`, add `<script src="js/app.js"></script>` and then `<script src="js/availability.js"></script>`. Do the same in `settings.html` with `settings.js`.
    3. From now on, open the pages through the server (http://localhost:3000/availability.html), not by double-clicking.

    **Done when:** signed in, both pages show your real name and email in the sidebar, Sign out works, and the browser console (F12) shows no red errors. Signed out, opening either page sends you to Sign in.

- [ ] **V4: Make the day rows behave (in `availability.js`)**

    1. Unchecking a day hides its two times and shows "Unavailable"; checking it shows the times again.
    2. If a checked day's end time isn't after its start time, show "End time must be after start time." next to that day.

    **Done when:** both work for every day.

- [ ] **B2: Host panel on `booking.html`**

    The left panel already has the avatar, host name, description, "30 minutes" and "Online meeting". Change the heading "30 Minute Meeting" to "Project discussion", and replace the 🕒 and 🎥 emojis with line icons (use the same icon style Ben picks for the sidebar).

    **Done when:** the panel matches the prototype.

## Saturday, November 28: load and save Availability and Settings

The routes answer with placeholder data on Friday and save for real once Ryan finishes Saturday. Your code doesn't change when he does.

`GET /api/availability` sends, and `PUT /api/availability` expects, all 7 days, Monday first:

```json
[
  { "day": "monday",   "enabled": true,  "start": "09:00", "end": "17:00" },
  { "day": "friday",   "enabled": true,  "start": "09:00", "end": "15:00" },
  { "day": "saturday", "enabled": false, "start": "09:00", "end": "17:00" }
]
```

(The real list has all 7 days.)

- [ ] **V2: Load saved hours**

    When the page opens, call `apiRequest("GET", "/api/availability")` and set each row's checkbox, start and end from it, including the "Unavailable" state.

    **Done when:** the rows show what the server sends.

- [ ] **V3: Save hours**

    Clicking "Save availability" builds the 7-day list in the shape above and sends it with `apiRequest("PUT", "/api/availability", days)`. Don't send if V4 found a problem. Show "Saved." or the server's `error` message.

    **Done when:** after Ryan's real route is in, you change Tuesday to 10:00 AM–2:00 PM, save, reload, and it's still 10–2.

`GET /api/settings` sends, and `PUT /api/settings` expects:

```json
{ "name": "Alex Smith", "email": "alex@example.com",
  "timezone": "Eastern Time (US & Canada)", "meetingLink": "https://meet.example.com/alex" }
```

- [ ] **T2: Load settings**

    When the page opens, call `apiRequest("GET", "/api/settings")` and fill the four fields and the avatar initials.

    **Done when:** the fields show what the server sends.

- [ ] **T3: Save settings**

    Clicking "Save settings" sends the four fields with `apiRequest("PUT", "/api/settings", settings)`. On an error (for example, an email another account uses), show the server's message. On success, reload the page so the sidebar shows the new name and email.

    **Done when:** after Ryan's real route is in, you change the meeting link, save, reload, and the new link is still there.

## Sunday, November 29: the booking flow

Ryan changes `booking-info` on Sunday. Build against this example until he messages you. For a host and a date it will send:

```json
{ "name": "Alex Smith", "timezone": "Eastern Time (US & Canada)",
  "meetingLink": "https://meet.example.com/alex",
  "openDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
  "freeTimes": ["09:00", "09:30", "10:30", "11:00"] }
```

`booking.js` already calls this route twice: once with no date when the page opens (`loadHost()`), and again when a date is picked (`selectDate()`). Without a date, `freeTimes` is empty.

- [ ] **B3: Calendar uses the host's open days**

    Step 13's `isAvailable()` blocks Saturday and Sunday for everyone. In `loadHost()`, save `info.openDays` in a variable and redraw the calendar. Change `isAvailable()` so a day is clickable only if it's today or later and its weekday name is in `openDays`. The month arrows, the SUN–SAT header and the filled-blue picked day already work.

    **Done when:** turning Monday off on Availability makes every Monday grey on the booking page.

- [ ] **B4: Time zone line**

    Under the calendar, add "Time zone · " followed by `info.timezone` from `loadHost()`.

    **Done when:** it shows the host's saved time zone.

- [ ] **B5: Times come from the server**

    Delete `allTimes` and everything that uses `takenTimes`. In `selectDate()`, show one button per time in `info.freeTimes`, written as "9:00 AM" (`formatTime()` already does this). Picking a time highlights it and shows a blue "Next" button beside it. The details form opens only when "Next" is clicked; in Step 13 it opens as soon as a time is picked.

    **Done when:** the times match the host's saved hours in 30-minute steps, booked times are missing, and the form waits for "Next".

- [ ] **B6: Details step**

    1. Clicking "Next" hides the date-and-time card and shows the details form (in Step 13 the form appears underneath the card).
    2. Add "← Change date or time" at the top of the form; it hides the form and shows the card again.
    3. Show the choice in a grey summary box, like "June 18, 2025 at 10:00 AM".
    4. Change Notes from a one-line `<input>` to a `<textarea>`. Name, Email and "Confirm appointment" already exist.

    **Done when:** you can go to the details step, back to the times, and forward again without losing the picked date.

## Monday, November 30: finish booking, README setup items

- [ ] **B7: Confirmation shows the host and meeting link**

    The "You're booked" panel already shows the date and time. Add the host's name and the meeting link (`info.meetingLink`, as a clickable link).

    **Done when:** after booking, the confirmation shows date, time, host name and meeting link.

- [ ] **B8: "Just booked" error**

    A bad host link is already handled. When `/api/book` answers "Sorry, that time was just booked. Please pick another time.", show that message, go back to the times step, and load that date's free times again.

    **Done when:** booking a time in one browser tab and then the same time in another tab shows the message and the fresh times.

- [ ] **R4: README install and run steps (with Ryan)**

    Clone, `npm install`, create `.env` next to `server.js` with `MONGODB_URI=` and `PORT=3000` (no real password in the README), `npm start`, open http://localhost:3000.

    **Done when:** someone could set up the app from these steps alone.

- [ ] **R5: README live URL**

    Ryan deploys to Render today and sends you the address.

    **Done when:** the URL is in the README and opens the app.

- [ ] **R6: README test account**

    Ryan's seed script creates it and he sends you the email and password.

    **Done when:** the account is in the README and you've signed in with it.

## Tuesday, December 1: test, screenshots, rehearse

- [ ] **Run the whole demo with the team**: create an account, set availability, book on the public page, check the Dashboard and Appointments, cancel one, reload. Steps 2 and 3 of the demo are your pages, so fix anything broken there first.
- [ ] **Try to break your pages**: end time before start time, empty booking forms, booking the same time twice, a date the host has turned off.
- [ ] **Check your pages at 150% browser zoom**: nothing overlaps or gets cut off.
- [ ] **R2: Screenshots** of Sign in, Create account, Reset password, Dashboard, Appointments, Availability, Settings, and each booking step (date and time, details, confirmation), saved in a `screenshots` folder in the repo and shown in the README. Ben sends you his pages.

    **Done when:** every required screen appears in the README on GitHub.

- [ ] **Q2: Fresh-clone test**: clone the repo into a new folder and follow only the README. Fix the README wherever it's wrong.

    **Done when:** the app runs from a fresh clone using only the README.

- [ ] First rehearsal with the team, timed to 8–10 minutes.

## Wednesday, December 2: due

- [ ] **U4:** the README displays correctly on GitHub and has all 7 items.
- [ ] Second rehearsal. Late days can't be used for the presentation.

## Only if there's time

- [ ] **B9:** "← Back to dashboard" at the top left of the booking page (shown only when a token is saved, meaning the host is signed in), and the footer "Simple scheduling for student projects".
