# Teammate 2 Checklist: New Pages and Booking

Updated November 23, 2026

You own the pages that don't exist yet: Availability and Settings, plus the public booking page guests use, and the README. Work top to bottom and tick each box as you finish it.

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
- `style.css` and the sidebar belong to Teammate 1. Ask them before changing either.
- Stuck or blocked? Tell Ryan.

**Where to look:** the look comes from the [Figma prototype](https://violet-surly-41566398.figma.site/). How the teacher built something is in the [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo, in the step named on each task.

## Setup: by Wednesday, November 25

- [ ] Agree with Teammate 1 that you're Teammate 2, and tell Ryan.
- [ ] Install Node.js 20.6 or newer from nodejs.org (the LTS version). Check it with `node -v` in a terminal.
- [ ] Accept Ryan's GitHub invite and clone the repo.
- [ ] Once Ryan has pushed the server, save the `.env` file he sends you in the same folder as `server.js`. Never commit it.
- [ ] Run `npm install`, then `npm start`. Open http://localhost:3000 and create an account. If anything fails, tell Ryan.
- [ ] Open the prototype's Availability and Settings screens and the booking page screenshots. Note how each looks; Step 13's versions are placeholders you'll replace.

## Build: by Wednesday, December 2

Do these in order. You can build every page before Ryan's real code exists: his placeholder routes send back the sample data shown in each section.

### Availability (`availability.html`)

The server sends, and expects back, all 7 days in this shape:

```json
[
  { "day": "monday",   "enabled": true,  "start": "09:00", "end": "17:00" },
  { "day": "friday",   "enabled": true,  "start": "09:00", "end": "15:00" },
  { "day": "saturday", "enabled": false, "start": "09:00", "end": "17:00" }
]
```

(The real list has all 7 days, Monday first.)

- [ ] V1: Weekly hours layout

    A "Weekly hours" card with 7 rows, Monday to Sunday: a checkbox, the day name, a start time, "to", and an end time. An unchecked day shows "Unavailable" instead of times. A "Save availability" button at the bottom. Waits on Teammate 1's L1, which creates the file.

- [ ] V4: Check the times

    The end time must be after the start time; show the message next to that day.

- [ ] V2: Load saved hours

    When the page opens, fill the rows from `GET /api/availability`.

- [ ] V3: Save

    Send all 7 days to `PUT /api/availability` and show "Saved" or the server's error. Reload the page to check the hours stayed.

### Settings (`settings.html`)

The server sends, and expects back:

```json
{ "name": "Alex Smith", "email": "alex@example.com",
  "timezone": "Eastern Time (US & Canada)", "meetingLink": "https://meet.example.com/alex" }
```

- [ ] T1: Profile card layout

    "Profile" and "This information appears on your public booking page.", an initials avatar with "Profile photo" and "Initials are enough for the minimal version.", then Full name, Email address, Time zone (Eastern, Central or Pacific Time (US & Canada)), Meeting link, and "Save settings".

- [ ] T2: Load settings

    Fill the fields from `GET /api/settings`.

- [ ] T3: Save settings

    Send to `PUT /api/settings` and show "Saved" or the error. Then reload the page so the sidebar shows any new name or email.

### Public booking page (`booking.html`)

This builds on Step 13's `booking.html` and `booking.js`. For a picked date, the server sends:

```json
{ "name": "Alex Smith", "timezone": "Eastern Time (US & Canada)",
  "openDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
  "freeTimes": ["09:00", "09:30", "10:30", "11:00"] }
```

- [ ] B1: Three-column layout

    One white card: the host panel on the left, "Select a date" in the middle, "Available times" on the right.

- [ ] B2: Host panel

    Initials avatar, host name, "Project discussion", "A short meeting to discuss your project, questions, and next steps.", then "30 minutes" and "Online meeting" with icons.

- [ ] B3: Calendar

    Month arrows and a SUN–SAT header. Only days in `openDays` that are today or later are blue and clickable; the picked day is filled blue. Snippet: Step 6 draws the calendar.

- [ ] B4: Time zone line

    "Time zone · Eastern Time (US & Canada)" under the calendar, from `timezone`.

- [ ] B5: Available times

    One button per time in `freeTimes`, shown as "9:00 AM". Picking one shows a blue "Next" button beside it.

- [ ] B6: Details step

    "← Change date or time", a grey summary box ("June 18, 2025 at 10:00 AM"), then Name, Email, Notes (optional, several lines) and a "Confirm appointment" button.

- [ ] B7: Confirmation screen

    Not in the screenshots, so match the same style: show the date, time, host name and meeting link.

- [ ] B8: Error states

    A link to a host who doesn't exist, and a time someone else booked a moment ago (the server says so; show its message and the free times again).

- [ ] B9: Back link and footer

    "← Back to dashboard" at the top left, shown only to a signed-in host, and the footer "Simple scheduling for student projects".

## Connect and test: by Saturday, December 5

- [ ] Run the whole demo with the team

    Create an account, set availability, book on the public page, check the Dashboard and Appointments, cancel one, then reload. Steps 2 and 3 of the demo are your pages, so fix anything broken there first.

- [ ] Try to break your own pages

    End time before start time, empty booking forms, booking the same time twice, a date the host has turned off.

- [ ] Check your pages at 150% browser zoom and at phone width

    The presentation is shown zoomed in, so nothing should overlap or get cut off.

## Wrap up: by Tuesday, December 8

You own the README; Teammate 1 owns the presentation. The README needs exactly these 7 items. R1, R3 and R7 can be written any time.

- [ ] R1: Title, our three names, and 2–3 sentences on what the app does
- [ ] R2: A screenshot of every required screen, saved in a folder in the repo

    Take them once the pages look final: Sign in, Create account, Reset password, Dashboard, Appointments, Availability, Settings, and each step of the booking page.

- [ ] R3: Technologies used

    HTML, CSS, JavaScript, Node.js, MongoDB (Atlas), Git and GitHub.

- [ ] R4: How to install and run it

    Clone, `npm install`, create `.env`, `npm start`. Write this with Ryan.

- [ ] R5: Live URL, only if Ryan deploys the app
- [ ] R6: The test account email and password the instructor signs in with (get it from Ryan)
- [ ] R7: Every outside resource we used, with links

    The teacher's snippets repo, docs pages, tutorials, AI tools. Ask Ryan and Teammate 1 for theirs.

- [ ] Q2: Fresh-clone test

    Clone the repo into a new folder and follow only the README. Fix the README wherever it's wrong.

- [ ] Rehearse the presentation twice with the team

    Late days can't be used for the presentation.
