# SimpleSchedule – Team Plan (CS 219 Final Project)

Updated November 23, 2026

## Overview

We're building SimpleSchedule: a web app where a host signs up, sets weekly hours, and shares a public link that guests use to book a meeting. It has to match the Figma prototype, keep all data in MongoDB after a reload, and hash passwords.

| Item | Detail |
| --- | --- |
| Team | Ryan (backend) and two teammates (frontend, README, presentation) |
| Stack | HTML, CSS, JavaScript; Node.js; MongoDB; Git and GitHub |
| Due date | Tuesday, December 8, 2026, 11:59 PM Eastern (Blackboard) |
| Presentation | 8–10 minutes with a live demo; late days can't be used |
| Graded besides the app | Commit history, README with 7 required items, the live demo |
| Starter code | Teacher's [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo |

The full requirements are in the Final Project assignment on Blackboard. The other planning docs are the [Task List](task-list.md) and [Snippet steps](snippet-steps.md).

## Before you leave today

By the end of today's meeting, each of you should know your pages, your first task, and when you next check in.

- [x] Look up the due date on Blackboard and add it to the Overview
- [ ] Teammates choose the Teammate 1 or Teammate 2 role below (swap pages if you like), agree on tasks between yourselves, then tell Ryan so he can fill in the Owner column of the Task List
- [ ] Ryan invites both teammates to the GitHub repo
- [ ] Pick a group chat and two check-in times a week
- [x] Put a deadline on each of the four phases, counting back from the due date
- [ ] Everyone installs Node.js before the first check-in

## Who does what

In plain terms: Ryan makes the app save and load data; Teammate 1 makes the existing pages look like the prototype; Teammate 2 builds the pages that don't exist yet. Testing, rehearsing and presenting are shared.

### Ryan: the backend

**What it is:** the server and database, the part that stores accounts, appointments, hours and settings and hands them to the pages when they ask.

**This week:**

1. Invite both teammates to the repo, set up the shared Atlas database (see Setting up the shared database), and send them the `.env` file privately.
2. Get Step 13's server running in our repo, a few commits at a time.
3. Add placeholder versions of the four new routes (see API contract) so your teammates can use them right away.

**After that:** real saving for availability and settings, a booking page that uses saved hours, the shared `app.js`, the test account, and connecting each page as it's finished.

**Done when:** every route in the API contract works with real data.

### Teammate 1: the pages a signed-in host already has

**What it is:** Sign in, Create account, Reset password, Dashboard and Appointments. Most of these already work in Step 13; the job is making them match the prototype.

**This week:**

1. Install Node.js, clone the repo, run it, and create an account.
2. Open the prototype and the running app side by side and list every difference.
3. Split `dashboard.html` into the four page files (task L1) and push it early, since Teammate 2 needs two of them.

**After that:** the shared look (`style.css`, the sidebar), the Reset password page, the Dashboard greeting and cards, the Appointments rows and form, and the slides.

**Done when:** each page matches the prototype and shows real data from the server.

**Needs from Ryan:** nothing new; these pages use routes that already work.

### Teammate 2: the new pages and the booking page

**What it is:** Availability (weekly hours), Settings (profile), and the public page guests use to book. These are mostly new.

**This week:**

1. Install Node.js, clone the repo, run it, and create an account.
2. Once Teammate 1 has split the pages, build the Availability layout (7 days, checkboxes, start and end times) using the example data in the API contract.
3. Build the Settings form layout the same way.

**After that:** connect both pages to Ryan's routes, rebuild `booking.html` to match the prototype, and write the README.

**Done when:** hours and settings save and are still there after a reload, and a guest can book a time.

**Needs from Ryan:** the availability and settings routes. The placeholders are enough to start.

## Starting point

Step 13 of the teacher's snippets is our base. About half the required screens already work there; the rest are the "ideas to finish the project" in its own README.

What each of the 13 snippet steps covers, and where it shows up in our tasks: [Snippet steps](snippet-steps.md)

| Requirement | In Step 13 | What's left |
| --- | --- | --- |
| Sign in, Create account | Working, saved in MongoDB, passwords hashed | Match the prototype's look |
| Reset password | "Forgot password?" goes nowhere | Build the "Reset link sent" screen |
| Dashboard | Cards and today's list work | Greeting, card icons, "View all", "•••" menu |
| Appointments | Filters, Cancel, New appointment work | Tab order and row layout from the prototype |
| Availability | Static page, Monday–Friday only, nothing saves | All of it: 7 days, load and save |
| Settings | Static form, Save does nothing | Load and save all four fields |
| Public booking page | Works, but fixed times and no weekends | Use saved hours; prototype layout; confirmation screen |

## Tech decisions

We keep the snippets' stack, so the teacher's code and ours fit together without rewrites.

- **Server:** Node's built-in `http` module, as in the snippets (no Express).
- **Database:** the official `mongodb` driver, on one shared free MongoDB Atlas database, so nobody has to install MongoDB.
- **Passwords:** hashed with Node's `crypto` (scrypt), as in Step 10. That meets "hashed, never plain text."
- **Sign-in:** a random token saved in a `sessions` collection and sent as `Authorization: Bearer <token>`, as in Step 11.
- **Secrets:** the database link lives in a `.env` file that is never committed; the README explains how to create it.
- **Formats:** dates as `YYYY-MM-DD`, times as `HH:MM` in 24-hour form, shown on screen as "9:00 AM".
- **Meetings:** 30 minutes long; the booking page offers a slot every 30 minutes inside the day's hours.

## Files

Every screen gets its own HTML file and JavaScript file, so each person owns whole files and rarely edits someone else's. Step 13 instead puts the four app tabs in one `dashboard.html`; we split it up (task L1 in the [Task List](task-list.md)). The sidebar is copied into each of the four app pages, and its links go to the other page files.

| File | Screen | Its JavaScript | Routes it calls | Compared with Step 13 |
| --- | --- | --- | --- | --- |
| `index.html` | Sign in | `login.js` | login | Exists |
| `register.html` | Create account | `register.js` | register | Exists |
| `reset.html` | Reset password | `reset.js` | none | New |
| `dashboard.html` | Dashboard | `dashboard.js` | me, appointments | Exists, but holds all four tabs today |
| `appointments.html` | Appointments | `appointments.js` | appointments, cancel | Split out of `dashboard.html` |
| `availability.html` | Availability | `availability.js` | availability | Split out; logic is new |
| `settings.html` | Settings | `settings.js` | settings | Split out; logic is new |
| `booking.html` | Public booking page | `booking.js` | booking-info, book | Exists, needs changes |
| `app.js` | Shared by the four app pages | | me, logout | Split out of `dashboard.js`: `apiRequest`, signed-in check, sidebar name, sign-out |
| `style.css` | Shared by every page | | | Exists |

All of these live in the `public` folder. The backend (`server.js`, `database.js`) sits next to it and is Ryan's.

## Roles

Ryan owns the backend. The two teammates split the frontend, README and presentation by picking tasks from the [Task List](task-list.md).

| Person | Owns |
| --- | --- |
| Ryan | Server, database, every API route, the shared app.js, booking rules, test account, deploy (optional). See the Backend checklist below. |
| Teammate 1 | Picks from the task list. Suggested: index.html, register.html, reset.html, dashboard.html, appointments.html, slides. |
| Teammate 2 | Picks from the task list. Suggested: availability.html, settings.html, booking.html, README. |
| Everyone | Setup, testing the demo flow, rehearsing, presenting. |

## Phases

Each phase ends with a check all three of us can run.

| Phase | What happens | Done by | Done when |
| --- | --- | --- | --- |
| 1. Setup | GitHub repo, shared Atlas database, everyone runs Step 13, API contract agreed | Wed, Nov 25 | All 3 can sign in on their own laptop |
| 2. Build | Ryan: new routes. Teammates: screens from the Task List. Commit as you go | Wed, Dec 2 | Every screen works with a real route |
| 3. Connect and test | Wire screens to the API, run the 6-step demo, fix the bugs found, test a fresh clone | Sat, Dec 5 | Demo runs end to end from a fresh clone |
| 4. Wrap up | README and screenshots, slides, test account, ZIP and submit, rehearse twice | Tue, Dec 8, 11:59 PM | Submitted on Blackboard |

The phases run in order. Inside Build, Ryan and the teammates work at the same time against the API contract below. Thanksgiving (November 26) falls inside Build. The presentation date isn't part of the Blackboard deadline, so confirm it separately; late days can't be used for it.

## API contract

Frontend and backend both build against this list, so nobody waits on anybody. Change it only after telling the whole team.

Every route sends and returns JSON. "Sign-in" means the request carries `Authorization: Bearer <token>`. Every error comes back as `{ error: "message" }` with a 4xx status, as Step 13 already does.

| Method | Route | Sign-in | Sends | Returns | Status |
| --- | --- | --- | --- | --- | --- |
| POST | `/api/register` | No | name, email, password | message | In Step 13 |
| POST | `/api/login` | No | email, password | token, name, email | In Step 13 |
| POST | `/api/logout` | Yes | nothing | message | In Step 13 |
| GET | `/api/me` | Yes | nothing | name, email | In Step 13 |
| GET | `/api/appointments` | Yes | nothing | list of appointments | In Step 13 |
| POST | `/api/appointments` | Yes | guestName, guestEmail, date, time, type | the new appointment | In Step 13 |
| POST | `/api/appointments/:id/cancel` | Yes | nothing | message | In Step 13 |
| GET | `/api/availability` | Yes | nothing | the 7 days | New |
| PUT | `/api/availability` | Yes | the 7 days | the saved days | New |
| GET | `/api/settings` | Yes | nothing | name, email, timezone, meetingLink | New |
| PUT | `/api/settings` | Yes | name, email, timezone, meetingLink | the saved settings | New |
| GET | `/api/booking-info?host=EMAIL&date=YYYY-MM-DD` | No | nothing | name, timezone, openDays, freeTimes | Changed |
| POST | `/api/book` | No | hostEmail, date, time, guestName, guestEmail, notes | message | Changed |

**Data shapes**

- **Appointment:** `{ _id, guestName, guestEmail, date, time, type, notes, status }`, where status is `"upcoming"` or `"cancelled"`.
- **One day of availability:** `{ day: "monday", enabled: true, start: "09:00", end: "17:00" }`, all 7 days, Monday first. New accounts start with the prototype's hours: Monday–Thursday 9–5, Friday 9–3, weekend off.
- **booking-info change:** returns `freeTimes` (that day's open slots, booked ones removed) instead of `takenTimes`, plus `openDays` so the calendar can grey out closed days.
- **book change:** refuses a time that is outside the host's hours or already booked.
- **Reset password:** no route. The screen only shows "Reset link sent."

**Placeholder routes first.** Ryan adds the four new routes early, each returning the matching example below. Pages can call the real URLs from day one, and when the real database code replaces the placeholders, the pages don't change.

**Rules for the frontend**

1. Every request goes through `apiRequest()` in `app.js`. No `fetch` calls of your own.
2. Use the field names in this section exactly.
3. Don't edit `server.js`, `database.js` or `app.js`. Ask Ryan instead.
4. Show what the server returns. Deciding which times are free, or blocking double bookings, is the server's job.

**Example responses**

`GET /api/me`

```json
{ "name": "Alex Smith", "email": "alex@example.com" }
```

`GET /api/appointments`

```json
[
  { "_id": "6650a1f2c3", "guestName": "Jordan Miller", "guestEmail": "jordan@example.com",
    "date": "2026-12-03", "time": "10:00", "type": "Project discussion", "notes": "", "status": "upcoming" }
]
```

`GET /api/availability` (the `PUT` sends the same list back)

```json
[
  { "day": "monday",    "enabled": true,  "start": "09:00", "end": "17:00" },
  { "day": "tuesday",   "enabled": true,  "start": "09:00", "end": "17:00" },
  { "day": "wednesday", "enabled": true,  "start": "09:00", "end": "17:00" },
  { "day": "thursday",  "enabled": true,  "start": "09:00", "end": "17:00" },
  { "day": "friday",    "enabled": true,  "start": "09:00", "end": "15:00" },
  { "day": "saturday",  "enabled": false, "start": "09:00", "end": "17:00" },
  { "day": "sunday",    "enabled": false, "start": "09:00", "end": "17:00" }
]
```

`GET /api/settings` (the `PUT` sends the same fields; `timezone` is the text shown in the dropdown)

```json
{ "name": "Alex Smith", "email": "alex@example.com",
  "timezone": "Eastern Time (US & Canada)", "meetingLink": "https://meet.example.com/alex" }
```

`GET /api/booking-info?host=alex@example.com&date=2026-12-03`

```json
{ "name": "Alex Smith", "timezone": "Eastern Time (US & Canada)",
  "openDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
  "freeTimes": ["09:00", "09:30", "10:30", "11:00"] }
```

Any error, from any route:

```json
{ "error": "Please sign in first." }
```

## Backend checklist (Ryan)

Build in this order, one commit per item, adapting each snippet step instead of pasting Step 13 in whole.

- [ ] Repo (already created): invite both teammates; add `package.json`, a `.gitignore` covering `node_modules` and `.env`, and the folder layout (Steps 8–9)
- [ ] Server serves the pages and connects to the shared Atlas database from `.env`; `node --env-file=.env server.js` loads it with no extra package on Node 20.6 or newer (Steps 8–9)
- [ ] Send both teammates the `.env` file privately
- [ ] Register and login with hashed passwords, then logout and `/api/me` (Steps 10–11)
- [ ] Placeholder availability and settings routes returning the example responses (do this early: your teammates are waiting on them)
- [ ] `app.js`: the shared `apiRequest`, signed-in check, sidebar name and email, sign-out
- [ ] Appointments: list, add, cancel (Step 12)
- [ ] Public booking: `booking-info` and `book` (Step 13)
- [ ] Real availability saving, with default hours for new accounts
- [ ] Real settings saving; refuse an email another account already uses
- [ ] `booking-info` returns free times from saved hours, and `book` refuses times outside them
- [ ] Seed script that creates the README's test account and a few sample appointments
- [ ] Optional: deploy to a Node host with Atlas for a live URL

## Setting up the shared database

Ryan sets up one free MongoDB Atlas database on day one; teammates never open Atlas and only receive a `.env` file. Atlas free clusters don't expire and need no credit card.

**1. Create the database (Ryan, in the Atlas website)**

1. Sign up at [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register).
2. Create a **Free** cluster. Any cloud provider is fine; pick a US East region and keep the default cluster name.
3. Create a **database user**: the username and password the app uses, separate from your Atlas login. Use only letters and numbers in the password (or let Atlas generate one), because symbols like `@` or `/` break the connection string. Save both somewhere safe.
4. On the **Network Access** page, add the address `0.0.0.0/0`, meaning any computer. Campus and home Wi-Fi addresses change, so this avoids most "can't connect" problems. The database password still protects the data; just never post the connection string anywhere public.
5. Click **Connect** on the cluster, choose **Drivers**, then Node.js, and copy the connection string. Replace `<db_password>` in it with the database user's password.

**2. Hook it up to the app (Ryan, in the repo)**

1. Make sure `.gitignore` lists `.env` before you create the file.
2. Create `.env` next to `server.js` with two lines: `MONGODB_URI=` followed by the whole connection string, and `PORT=3000`.
3. Set the `start` script in `package.json` to `node --env-file=.env server.js` (needs Node.js 20.6 or newer).
4. Run `npm start`. Step 13's code prints "Connected to MongoDB database: simpleschedule" when it works.
5. Create an account in the app, then check that a `users` collection appeared in Atlas (the cluster's Browse Collections view) or in MongoDB Compass.

**3. Give teammates access**

1. Send each teammate the `.env` file directly. Never put it in the repo or anywhere public.
2. They save it next to `server.js`, then run `npm install` and `npm start`. That's all they need.
3. Everyone shares one database, so put your name in test accounts (`sam-test@example.com`) to tell them apart.

**If it doesn't connect**

| The error mentions | Likely cause | Fix |
| --- | --- | --- |
| `127.0.0.1:27017` | `.env` wasn't loaded, so the code fell back to a local database | Start with `npm start`, keep `.env` next to `server.js`, check the start script |
| `bad auth` or `Authentication failed` | Wrong username or password in the string | Copy the string again and re-enter the password; reset it in Atlas if unsure |
| `Server selection timed out` | Your address isn't allowed in | Check `0.0.0.0/0` is on the Network Access page |
| `ENOTFOUND` | The string is mistyped, or the network blocks the lookup | Copy the string again; try a different Wi-Fi or a phone hotspot |

**If the connection string is ever committed by accident,** change the database user's password in Atlas right away and send everyone a new `.env`. Deleting the commit isn't enough, because Git keeps old versions.

## How we work

Small, frequent commits from all three of us keep the graded history real and stop merge fights.

- Pull before you start, commit small with a clear message ("Add availability save route"), and push the same day.
- Step 13 puts all four app pages in one `dashboard.html`. We split it into one file per screen (see Files), so two people rarely edit the same file.
- Tell the team before editing a shared file such as `style.css`.
- Never commit `.env` or the Atlas password. Share the connection string privately.
- Change the API contract only after telling everyone.
- Add every outside resource you use (snippet step, tutorial, docs page, AI tool) to the README's sources list as you go.
- Check in twice a week: what's done, what's blocked.

## Definition of done

We're done when a fresh clone, set up using only the README, runs the required demo below with no errors.

- [ ] Create an account and sign in
- [ ] Set availability and save it
- [ ] Open the public booking page and book an appointment
- [ ] See the new appointment on the Dashboard and in Appointments
- [ ] Cancel an appointment and find it under the Cancelled filter
- [ ] Reload the page and see that everything is still there
- [ ] README has all 7 items, slides are ready, the ZIP has no `node_modules` or `.env`, and we've rehearsed twice
