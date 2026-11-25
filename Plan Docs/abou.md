# Abou Checklist: New Pages and Booking

Updated November 25, 2026

You own the pages that don't exist yet: Availability and Settings, plus the public booking page guests use, and the README. Everything is due **Wednesday, December 2**, so each section below has a day. Work top to bottom and tick each box as you finish it.

## How to use this checklist

Everything you need is written into each step, so you shouldn't have to hunt through the other docs. Task numbers (like V1) match the [Task List](task-list.md), in case you want more detail.

**Every time you work:**

1. `git pull` before you start, so you have everyone's latest work.
2. Commit each small piece with a clear message ("Add availability rows").
3. `git push` the same day. Your commits are graded.

**Ground rules:**

- Your pages are `availability.html`, `settings.html` and `booking.html`, with their `.js` files, plus `README.md`.
- On Availability and Settings, every request to the server goes through `apiRequest()` from `app.js`. Ryan writes `app.js`; don't edit it, or `server.js` or `database.js`.
- The booking page is public (guests aren't signed in), so it doesn't load `app.js` and keeps its own `fetch` calls, as in Step 13.
- Show what the server sends back. Working out which times are free, or blocking double bookings, is the server's job, not your page's.
- `dashboard.html`, `style.css` and the sidebar belong to Ben. Ask before changing any of them.
- Stuck or blocked? Tell Ryan.

**Where to look:** the look comes from the [Figma prototype](https://violet-surly-41566398.figma.site/). How the teacher built something is in the [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo, in the step named on each task. Our repo already holds his Step 13.

## Wednesday–Thursday, November 25–26: start now, no `.env` needed

You make your two pages as brand-new files, so you don't wait on anyone. Leave out the `<script>` tags for now: then you can open each file by double-clicking it and refresh the browser after each change. Put the example data straight into the HTML until the routes exist. Thursday is Thanksgiving, so finish what you can.

- [ ] L1 (your half), then V1: Create `availability.html` with the Weekly hours layout

    Copy `public/dashboard.html` to `public/availability.html`, keep the sidebar and the `<head>`, and replace everything inside `<main>` with the Availability page. Step 13's Availability section (in `dashboard.html`) is a starting point. The page: a "Weekly hours" card with 7 rows, Monday to Sunday, each with a checkbox, the day name, a start time, "to", and an end time. An unchecked day shows "Unavailable" instead of times. A "Save availability" button at the bottom. Don't change `dashboard.html` itself; Ben removes the old sections on Friday.

- [ ] L1 (your half), then T1: Create `settings.html` with the Profile card

    Same way, from Step 13's Settings section. "Profile" and "This information appears on your public booking page.", an initials avatar with "Profile photo" and "Initials are enough for the minimal version.", then Full name, Email address, Time zone, Meeting link, and "Save settings". The time zones must be exactly "Eastern Time (US & Canada)", "Central Time (US & Canada)" and "Pacific Time (US & Canada)"; Step 13's ET, CT, MT, PT options are wrong.

- [ ] README R1: Title, our three names, and 2–3 sentences on what the app does
- [ ] README R3: Technologies used

    HTML, CSS, JavaScript, Node.js, MongoDB (Atlas), Git and GitHub.

- [ ] README R7: Every outside resource we used, with links

    The teacher's snippets repo first, since our starting code is its Step 13 (https://github.com/ShahinurEdu/SimpleSchedule-Snippets). Then docs pages, tutorials, AI tools. Ask Ryan and Ben for theirs and keep adding as you go.

## As soon as Ryan sends the `.env`: run the app

The `.env` isn't in the repo, so pulling doesn't give it to you. Ryan sends it separately.

- [ ] `git pull`, then save the `.env` file in the same folder as `server.js`. Never commit it. (Finder and File Explorer hide files starting with a dot; VS Code shows it.)
- [ ] Run `npm install`, then `npm start`. Open http://localhost:3000 and create an account. If anything fails, tell Ryan.

## Friday, November 27: hook up `app.js`, start the booking page

Ryan pushes `app.js` and placeholder routes on Friday; `git pull` once he says so. The placeholders send back exactly the example data shown in the Saturday section.

- [ ] Load `app.js` in both pages, then your own script (`availability.js`, `settings.js`)

    The sidebar name, email and sign-out now work. Open the pages through the server (http://localhost:3000/availability.html), not by double-clicking.

- [ ] V4: Check the times

    The end time must be after the start time; show the message next to that day.

- [ ] B1: Three-column layout for `booking.html`

    One white card: the host panel on the left, "Select a date" in the middle, "Available times" on the right. Builds on Step 13's `booking.html` and `booking.js`.

- [ ] B2: Host panel

    Initials avatar, host name, "Project discussion", "A short meeting to discuss your project, questions, and next steps.", then "30 minutes" and "Online meeting" with icons.

## Saturday, November 28: connect Availability and Settings

Ryan makes the routes save for real on Saturday. Your code doesn't change when he does.

The availability route sends, and expects back, all 7 days in this shape:

```json
[
  { "day": "monday",   "enabled": true,  "start": "09:00", "end": "17:00" },
  { "day": "friday",   "enabled": true,  "start": "09:00", "end": "15:00" },
  { "day": "saturday", "enabled": false, "start": "09:00", "end": "17:00" }
]
```

(The real list has all 7 days, Monday first.)

- [ ] V2: Load saved hours

    When the page opens, fill the rows from `GET /api/availability`.

- [ ] V3: Save

    Send all 7 days to `PUT /api/availability` and show "Saved" or the server's error. Reload the page to check the hours stayed.

The settings route sends, and expects back:

```json
{ "name": "Alex Smith", "email": "alex@example.com",
  "timezone": "Eastern Time (US & Canada)", "meetingLink": "https://meet.example.com/alex" }
```

- [ ] T2: Load settings

    Fill the fields from `GET /api/settings`.

- [ ] T3: Save settings

    Send to `PUT /api/settings` and show "Saved" or the error. Then reload the page so the sidebar shows any new name or email.

## Sunday, November 29: the booking flow

Ryan changes the booking route on Sunday. For a picked date it will send:

```json
{ "name": "Alex Smith", "timezone": "Eastern Time (US & Canada)",
  "openDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
  "freeTimes": ["09:00", "09:30", "10:30", "11:00"] }
```

Build against this example until his change is pushed. Step 13's version sends `takenTimes` instead and uses six fixed times; replace that logic.

- [ ] B3: Calendar

    Month arrows and a SUN–SAT header. Only days in `openDays` that are today or later are blue and clickable; the picked day is filled blue. Snippet: Step 6 draws the calendar.

- [ ] B4: Time zone line

    "Time zone · Eastern Time (US & Canada)" under the calendar, from `timezone`.

- [ ] B5: Available times

    One button per time in `freeTimes`, shown as "9:00 AM". Picking one shows a blue "Next" button beside it.

- [ ] B6: Details step

    "← Change date or time", a grey summary box ("June 18, 2025 at 10:00 AM"), then Name, Email, Notes (optional, several lines) and a "Confirm appointment" button.

## Monday, November 30: finish booking, README setup items

- [ ] B7: Confirmation screen

    Not in the screenshots, so match the same style: show the date, time, host name and meeting link.

- [ ] B8: Error states

    A link to a host who doesn't exist, and a time someone else booked a moment ago (the server says so; show its message and the free times again).

- [ ] README R4: How to install and run it

    Clone, `npm install`, create `.env` (what goes in it, without the real password), `npm start`. Write this with Ryan.

- [ ] README R5: Live URL (Ryan is deploying to Render today; get the address from him)
- [ ] README R6: The test account email and password the instructor signs in with (get it from Ryan)

## Tuesday, December 1: test, screenshots, rehearse

- [ ] Run the whole demo with the team

    Create an account, set availability, book on the public page, check the Dashboard and Appointments, cancel one, then reload. Steps 2 and 3 of the demo are your pages, so fix anything broken there first.

- [ ] Try to break your own pages

    End time before start time, empty booking forms, booking the same time twice, a date the host has turned off.

- [ ] Check your pages at 150% browser zoom

    The presentation is shown zoomed in, so nothing should overlap or get cut off.

- [ ] README R2: A screenshot of every required screen, saved in a folder in the repo

    Sign in, Create account, Reset password, Dashboard, Appointments, Availability, Settings, and each step of the booking page. Ben sends you his pages.

- [ ] Q2: Fresh-clone test

    Clone the repo into a new folder and follow only the README. Fix the README wherever it's wrong.

- [ ] First rehearsal with the team, timed to 8–10 minutes

## Wednesday, December 2: due

- [ ] U4: Check the README displays correctly on GitHub and has all 7 items
- [ ] Second rehearsal. Late days can't be used for the presentation.

## Only if there's time

- [ ] B9: "← Back to dashboard" at the top left of the booking page (shown only to a signed-in host), and the footer "Simple scheduling for student projects"
