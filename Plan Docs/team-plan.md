# SimpleSchedule – Team Plan (CS 219 Final Project)

Updated November 25, 2026

## Overview

We're building SimpleSchedule: a web app where a host signs up, sets weekly hours, and shares a public link that guests use to book a meeting. It has to match the Figma prototype, keep all data in MongoDB after a reload, and hash passwords.

| Item | Detail |
| --- | --- |
| Team | Ryan (backend), Ben, and Abou (frontend, README, presentation) |
| Stack | HTML, CSS, JavaScript; Node.js; MongoDB; Git and GitHub |
| Due date | **Wednesday, December 2, 2026** (Blackboard). Check the exact time on Blackboard; this plan assumes 11:59 PM Eastern |
| Presentation | 8–10 minutes with a live demo; late days can't be used |
| Graded besides the app | Commit history, README with 7 required items, the live demo |
| Starter code | Teacher's [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo. The teacher said we may use all of its code; Step 13 is now committed in our repo |

The full requirements are in the Final Project assignment on Blackboard. The other planning docs are [Start here](start-here.md), the [Ben Checklist](ben.md), the [Abou Checklist](abou.md), the [Task List](task-list.md) and [Snippet steps](snippet-steps.md).

## Status (November 25, evening)

The due date moved up to December 2, so the whole plan runs on the day-by-day Schedule below.

**Done:**

- Step 13's complete code is in the repo.
- The Atlas database exists (project "CS 219", free Cluster0, `0.0.0.0/0` allowed), `npm start` loads `.env`, the app connects to the `simpleschedule` database, and Ben and Abou have the `.env`.

**Still open:**

- No `app.js`; the shared code is still inside `dashboard.js`.
- No `/api/availability` or `/api/settings` routes, not even placeholders. `booking-info` still returns `takenTimes`, not `freeTimes`, `openDays`, `timezone` and `meetingLink`.
- All four app screens are still sections of one `dashboard.html`. `availability.html`, `settings.html`, `appointments.html` and `reset.html` don't exist.
- `README.md` holds only the line `# CS-219---Final-Project`.
- No seed script or test account, and no live URL.

## Who does what

In plain terms: Ryan makes the app save and load data; Ben makes Sign in, Dashboard and Appointments match the prototype; Abou turns Availability and Settings into working pages and fixes the booking page. Testing, rehearsing and presenting are shared.

### Ryan: the backend

**What it is:** the server and database, the part that stores accounts, appointments, hours and settings and hands them to the pages when they ask.

**In order** (the Backend checklist below has the details and days):

1. ~~Atlas database, `.env`, and the start script, then send teammates the `.env`~~ (done Wednesday, November 25).
2. `app.js`, then placeholder availability and settings routes (Friday, November 27; started early).
3. Real availability and settings saving (Saturday, November 28).
4. Booking with saved hours (Sunday, November 29).
5. Seed script and test account, then the live URL on Render (Monday, November 30).
6. Fix what the demo run turns up (Tuesday, December 1).

**Done when:** every route in the API contract works with real data.

### Ben: the pages a signed-in host already has

**What it is:** Sign in, Create account, Reset password, Dashboard and Appointments. All but Reset password already work in Step 13, and Sign in and Create account already match the prototype's wording; the job is building Reset password and making the Dashboard and Appointments match the prototype.

**Start now, no `.env` needed:** build `reset.html` (A3), point "Forgot password?" at it (A1), and restyle `style.css` (L3). These pages open straight from the folder in a browser.

**After that:** on Friday, once Ryan pushes `app.js`, split `dashboard.html` into `dashboard.html` and `appointments.html`, including moving the Dashboard's code from `appointments.js` into `dashboard.js` (L1), and rebuild the sidebar (L4); then the Dashboard greeting and cards, the Appointments rows and form, and the slides. The [Ben Checklist](ben.md) has it day by day, step by step.

**Done when:** each page matches the prototype and shows real data from the server.

**Needs from Ryan:** the `.env` file and `app.js` (task L2). The pages themselves use routes that already work.

### Abou: Availability, Settings, the booking page and the README

**What it is:** Availability (weekly hours), Settings (profile), the public page guests use to book, and the README. Availability and Settings exist in Step 13 only as static sections of `dashboard.html` that save nothing; the booking page works but uses six fixed times and blocks weekends.

**Start now, no `.env` needed:** move Availability and Settings into their own files, `availability.html` and `settings.html`, copied from `dashboard.html`, and fix their layouts to the prototype (all 7 days, the three time zones) (V1, T1). Write the README parts that don't depend on the finished app (R1, R3, R7).

**After that:** load and save both pages through Ryan's routes, make the booking page use the host's saved hours and match the prototype's steps, and finish the README. The [Abou Checklist](abou.md) has it day by day, step by step.

**Done when:** hours and settings save and are still there after a reload, and a guest can book a time.

**Needs from Ryan:** the availability and settings routes. The placeholders are enough to start.

## Starting point

Step 13 of the teacher's snippets is our base, and it's now in our repo unchanged. About half the required screens already work; the rest are the "ideas to finish the project" in its own README.

What each of the 13 snippet steps covers, and where it shows up in our tasks: [Snippet steps](snippet-steps.md)

| Requirement | In our repo now (Step 13) | What's left |
| --- | --- | --- |
| Sign in, Create account | Working, saved in MongoDB, passwords hashed; wording, fields and error messages already match the prototype | The prototype's font (L3); "Forgot password?" link (A1) |
| Reset password | "Forgot password?" links to `#` (goes nowhere) | Build the "Reset link sent" screen |
| Dashboard | Cards and today's list work; booking link card shown | Greeting, card icons and units, "View all", "•••" menu |
| Appointments | Filters, Cancel, New appointment work; tabs are Upcoming, Cancelled, All; form has an extra "Check-in" type | Tab order and row layout from the prototype; only the prototype's two meeting types |
| Availability | A static section of `dashboard.html`: Monday–Friday rows only, no Save button, nothing saves | Its own file, all 7 days, "Unavailable", load and save |
| Settings | A static section of `dashboard.html`; time zones are ET/CT/MT/PT abbreviations; Save does nothing | The prototype's three time zones; load and save all four fields |
| Public booking page | Works end to end (calendar, times, details form, "You're booked" message), but six fixed hourly times (9, 10, 11, 1, 2, 3) and weekends always off | 30-minute slots from saved hours; time zone line; "Next" and "Change date or time" steps; host and meeting link on the confirmation |

## Tech decisions

We keep the snippets' stack, so the teacher's code and ours fit together without rewrites.

- **Server:** Node's built-in `http` module, as in the snippets (no Express).
- **Database:** the official `mongodb` driver, on one shared free MongoDB Atlas database, so nobody has to install MongoDB.
- **Passwords:** hashed with Node's `crypto` (scrypt), as in Step 10. That meets "hashed, never plain text."
- **Sign-in:** a random token saved in a `sessions` collection and sent as `Authorization: Bearer <token>`, as in Step 11.
- **Secrets:** the database link lives in a `.env` file that is never committed; the README explains how to create it. On the hosting site it goes in the site's environment variables instead.
- **Formats:** dates as `YYYY-MM-DD`, times as `HH:MM` in 24-hour form, shown on screen as "9:00 AM".
- **Meetings:** 30 minutes long; the booking page offers a slot every 30 minutes inside the day's hours.
- **Hosting:** the whole app (server and pages together) on Render's free plan. GitHub Pages can't run it. See Hosting the live URL.

## Files

Every screen gets its own HTML file and JavaScript file, so each person owns whole files and rarely edits someone else's. Step 13 instead puts the four app tabs in one `dashboard.html`; we split it up (task L1 in the [Task List](task-list.md)). To avoid waiting on each other, Abou makes `availability.html` and `settings.html` as new files right away, and Ben, after Ryan's `app.js` lands on Friday, trims `dashboard.html` to the Dashboard (removing all three other sections) and makes `appointments.html`. The sidebar is copied into each of the four app pages, and its links go to the other page files; In L1, Ben turns the sidebar's buttons into those links in all four pages; his finished sidebar (L4) then replaces the copies on all four.

| File | Screen | Its JavaScript | Routes it calls | In the repo now |
| --- | --- | --- | --- | --- |
| `index.html` | Sign in | `login.js` | login | Yes |
| `register.html` | Create account | `register.js` | register | Yes |
| `reset.html` | Reset password | `reset.js` | none | No (new) |
| `dashboard.html` | Dashboard | `dashboard.js` | me, appointments | Yes, but holds all four screens, and its cards are drawn by `renderDashboard()` in `appointments.js` until L1 moves it |
| `appointments.html` | Appointments | `appointments.js` | appointments, cancel | No; `appointments.js` exists but runs inside `dashboard.html` |
| `availability.html` | Availability | `availability.js` | availability | No (split out; logic is new) |
| `settings.html` | Settings | `settings.js` | settings | No (split out; logic is new) |
| `booking.html` | Public booking page | `booking.js` | booking-info, book | Yes, needs changes |
| `app.js` | Shared by the four app pages | | me, logout | No; to be split out of `dashboard.js`: signed-in check, `apiRequest()`, `getInitials()`, sidebar name, email and initials, Sign out |
| `style.css` | Shared by every page | | | Yes |

The HTML pages live in `public`, the scripts in `public/js` and the stylesheet in `public/css`. The backend (`server.js`, `database.js`) sits next to `public` and is Ryan's.

## Roles

Ryan owns the backend. The two teammates split the frontend, README and presentation by picking tasks from the [Task List](task-list.md).

| Person | Owns |
| --- | --- |
| Ryan | Server, database, every API route, the shared app.js, booking rules, test account, live URL. See the Backend checklist below. |
| Ben | index.html, register.html, reset.html, dashboard.html, appointments.html, style.css, the sidebar, slides. See the [Ben Checklist](ben.md). |
| Abou | availability.html, settings.html, booking.html, README. See the [Abou Checklist](abou.md). |
| Everyone | Setup, testing the demo flow, rehearsing, presenting. |

## Schedule

Everything is due **Wednesday, December 2**, so there's one week, and Thanksgiving is in it. Each day ends with something all three of us can check. Ben and Abou start on work that doesn't need the `.env` or any new route, so nobody waits on Ryan.

| Day | Ryan | Ben | Abou | Done when |
| --- | --- | --- | --- | --- |
| Wed, Nov 25 (today) | Atlas, `.env`, start script; send the `.env` (done); start `app.js` | A3 (reset page), no `.env` needed | V1 (`availability.html`), no `.env` needed | All 3 can sign in on their own laptop |
| Thu, Nov 26 (Thanksgiving) | Off, or catch up | Off, or A1, L3 | Off, or T1, README R1, R3, R7 | |
| Fri, Nov 27 | `app.js` first thing, then tell Ben and Abou; placeholder availability and settings routes, then tell Abou | L1 (split pages, after `app.js`), L4 (sidebar) | V5 (load `app.js`), V4, B2 | Every page file exists, loads with no console errors, and the sidebar links work |
| Sat, Nov 28 | Real availability and settings saving | D1, D2, D3 | V2, V3, T2, T3 (connect to the routes) | Hours and settings survive a reload |
| Sun, Nov 29 | Booking with saved hours (`timezone`, `meetingLink`, `openDays`, `freeTimes`; refusing times outside hours) | E1–E4 | B3–B6 (booking page) | A guest can book a time inside the saved hours |
| Mon, Nov 30 | Seed script and test account; deploy to Render | D4–D6; start slides P1, P2 | B7, B8; README R4 with Ryan, R5, R6 | Whole demo runs on the live URL |
| Tue, Dec 1 | Fix bugs from the demo run | Fix bugs; P3, P4; screenshots of your pages | Fix bugs; Q2 fresh-clone test; R2 screenshots | Fresh clone works from the README; first rehearsal |
| Wed, Dec 2 (due) | Final check, ZIP (U2) | Slides PDF (U3) | README final check (U4) | Submitted on Blackboard; second rehearsal |

**If we fall behind, cut these first:** E5 (hide past meetings), L5 (phone-width sidebar), D4 ("•••" menu), D5 (New appointment type button), B9 (back link and footer). Never cut anything in the 6-step demo: sign up, save availability, book, see it on the Dashboard and in Appointments, cancel, reload.

The presentation date isn't part of the Blackboard deadline, so confirm it separately; late days can't be used for it.

## API contract

Frontend and backend both build against this list, so nobody waits on anybody. Change it only after telling the whole team.

Every route sends and returns JSON. "Sign-in" means the request carries `Authorization: Bearer <token>`. Every error comes back as `{ error: "message" }` with a 4xx status, as Step 13 already does.

| Method | Route | Sign-in | Sends | Returns | Status (Nov 25) |
| --- | --- | --- | --- | --- | --- |
| POST | `/api/register` | No | name, email, password | message | Working (Step 13) |
| POST | `/api/login` | No | email, password | token, name, email | Working (Step 13) |
| POST | `/api/logout` | Yes | nothing | message | Working (Step 13) |
| GET | `/api/me` | Yes | nothing | name, email | Working (Step 13) |
| GET | `/api/appointments` | Yes | nothing | list of appointments | Working (Step 13) |
| POST | `/api/appointments` | Yes | guestName, guestEmail, date, time, type | the new appointment | Working (Step 13) |
| POST | `/api/appointments/:id/cancel` | Yes | nothing | message | Working (Step 13) |
| GET | `/api/availability` | Yes | nothing | the 7 days | Not started |
| PUT | `/api/availability` | Yes | the 7 days | the saved days | Not started |
| GET | `/api/settings` | Yes | nothing | name, email, timezone, meetingLink | Not started |
| PUT | `/api/settings` | Yes | name, email, timezone, meetingLink | the saved settings (name and email also change the account, so `/api/me`, sign-in and the booking link use them) | Not started |
| GET | `/api/booking-info?host=EMAIL&date=YYYY-MM-DD` | No | nothing | name, timezone, meetingLink, openDays, freeTimes | Step 13 version only (returns name and takenTimes) |
| POST | `/api/book` | No | hostEmail, date, time, guestName, guestEmail, notes | message | Step 13 version only (blocks double bookings, not times outside hours) |

**Data shapes**

- **Appointment:** `{ _id, guestName, guestEmail, date, time, type, notes, status }`, where status is `"upcoming"` or `"cancelled"`.
- **One day of availability:** `{ day: "monday", enabled: true, start: "09:00", end: "17:00" }`, all 7 days, Monday first. New accounts start with the prototype's hours: Monday–Thursday 9–5, Friday 9–3, weekend off.
- **booking-info change:** returns `freeTimes` (that day's open 30-minute slots, booked ones removed) instead of `takenTimes`, plus `timezone`, `meetingLink` (for the confirmation screen) and `openDays` (so the calendar can grey out closed days). The booking page first calls it with an empty `date` when it opens; then it returns everything with `freeTimes` empty.
- **book change:** refuses a time that is outside the host's hours or already booked.
- **Reset password:** no route. The screen only shows "Reset link sent."

**Placeholder routes first.** Ryan adds the four new routes early, each returning the matching example below. Pages can call the real URLs from day one, and when the real database code replaces the placeholders, the pages don't change.

**Rules for the frontend**

1. On the four signed-in pages, every request goes through `apiRequest()` in `app.js`. No `fetch` calls of your own there. The sign-in pages and the public booking page keep their own fetch calls, as in Step 13, because nobody is signed in on them.
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
  "meetingLink": "https://meet.example.com/alex",
  "openDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
  "freeTimes": ["09:00", "09:30", "10:30", "11:00"] }
```

Any error, from any route:

```json
{ "error": "Please sign in first." }
```

## Backend checklist (Ryan)

Work top to bottom, one commit per item. The teacher said we may use all of the snippets' code, so Step 13 went in whole (credited in each commit message); everything below is our own work on top of it.

**1. Wednesday, November 25: database and `.env`** (done)

- [x] Atlas: create a project called "CS219" and a free cluster in it, a database user, `0.0.0.0/0` on Network Access, and copy the connection string (see Setting up the shared database, part 1)
- [x] Create `.env` next to `server.js` with `MONGODB_URI` and `PORT=3000`
- [x] Change the `start` script to `node --env-file=.env server.js`, run `npm install` and `npm start`, and see "Connected to MongoDB database: simpleschedule"
- [x] Create an account in the app and find the `users` collection in Atlas
- [x] Commit and push the start-script change (never the `.env`)
- [x] Send each teammate the `.env` privately

**2. Friday, November 27: unblock the pages**

- [ ] `app.js` first (L2): move the signed-in check, `apiRequest()`, `getInitials()`, the sidebar name, email and initials, and Sign out out of `dashboard.js` into `public/js/app.js`, and load it in `dashboard.html` before `dashboard.js`. It may only use `user-name`, `user-email`, `user-avatar` and `.signout-button`, so it works on every page with the sidebar. Leave the tab switching and the booking link in `dashboard.js`. **Done when:** `dashboard.html` works exactly as before, with no console errors. Ben's L1 and Abou's V5 wait on this, so message both the moment it's pushed
- [ ] Placeholder `GET`/`PUT /api/availability` and `GET`/`PUT /api/settings`, signed-in only, returning the example responses. **Done when:** each returns its example for a signed-in request and `{ error }` with 401 otherwise. Message Abou when pushed

**3. Saturday, November 28: real saving**

- [ ] Real availability saving, with the prototype's default hours for an account that hasn't saved any. **Done when:** a saved week comes back from `GET` after a server restart
- [ ] Real settings saving; the name and email update the account itself; refuse an email another account already uses. **Done when:** after saving a new name, `/api/me` returns it, and saving another account's email returns an error

**4. Sunday, November 29: booking uses saved hours**

- [ ] `booking-info` returns `name`, `timezone`, `meetingLink`, `openDays` and `freeTimes` (30-minute slots inside that day's hours, booked ones removed; empty when no date is sent or the day is off). **Done when:** a host with Friday 9–3 and a 10:00 booking gets `09:00`–`14:30` without `10:00` for a Friday
- [ ] `book` refuses a time outside the host's hours, as well as a double booking. **Done when:** booking Saturday for a host with weekends off returns an error. Message Abou when both are pushed

**5. Monday, November 30: test account and live URL**

- [ ] Seed script that creates the README's test account and a few sample appointments; give the email and password to Abou. **Done when:** a fresh database gets the account by running one command, and you can sign in with it
- [ ] Deploy to Render (see Hosting the live URL), run the 6-step demo there, and give the URL to Abou. **Done when:** the whole demo works on the live URL

**6. Tuesday, December 1 – Wednesday, December 2**

- [ ] Fix whatever the demo run and the fresh-clone test turn up
- [ ] Write README item 4 (install and run) with Abou
- [ ] Make the ZIP without `node_modules` or `.env` and submit (U1, U2)

## Setting up the shared database

Ryan sets up one free MongoDB Atlas database; teammates never open Atlas and only receive a `.env` file. Atlas free clusters don't expire and need no credit card.

**1. Create the database (Ryan, in the Atlas website)**

1. Sign up at [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register).
2. Create a new project called "CS219", then a **Free** cluster inside it. Atlas allows one free cluster per project, so a separate project keeps this apart from anything else you have. Any cloud provider is fine; pick a US East region and keep the default cluster name.
3. Create a **database user**: the username and password the app uses, separate from your Atlas login. Use only letters and numbers in the password (or let Atlas generate one), because symbols like `@` or `/` break the connection string. Save both somewhere safe.
4. On the **Network Access** page, add the address `0.0.0.0/0`, meaning any computer. Campus and home Wi-Fi addresses change, and the hosting site's addresses change too, so this avoids most "can't connect" problems. The database password still protects the data; just never post the connection string anywhere public.
5. Click **Connect** on the cluster, choose **Drivers**, then Node.js, and copy the connection string. Replace `<db_password>` in it with the database user's password.

**2. Hook it up to the app (Ryan, in the repo)**

1. Create a plain text file named exactly `.env` next to `server.js` (not inside `public`) with two lines: `MONGODB_URI=` followed by the whole connection string, and `PORT=3000`. It isn't in the repo and nobody gets it by cloning; Ryan makes it once and sends it on.
2. Set the `start` script in `package.json` to `node --env-file=.env server.js` (needs Node.js 20.6 or newer). Done November 25.
3. Run `npm start`. Step 13's code prints "Connected to MongoDB database: simpleschedule" when it works.
4. Create an account in the app, then check that a `users` collection appeared in Atlas (the cluster's Browse Collections view) or in MongoDB Compass.

**3. Give teammates access**

1. Send each teammate the `.env` file directly. Never put it in the repo or anywhere public.
2. They `git pull`, save it next to `server.js`, then run `npm install` and `npm start`. That's all they need.
3. Everyone shares one database, so put your name in test accounts (`sam-test@example.com`) to tell them apart.

**If it doesn't connect**

| The error mentions | Likely cause | Fix |
| --- | --- | --- |
| `127.0.0.1:27017` | `.env` wasn't loaded, so the code fell back to a local database | Start with `npm start`, keep `.env` next to `server.js`, check the start script |
| `.env: not found` | The start script loads `.env` but the file isn't there | Save the `.env` from Ryan next to `server.js`; the name must start with a dot |
| `bad auth` or `Authentication failed` | Wrong username or password in the string | Copy the string again and re-enter the password; reset it in Atlas if unsure |
| `Server selection timed out` | Your address isn't allowed in | Check `0.0.0.0/0` is on the Network Access page |
| `ENOTFOUND` | The string is mistyped, or the network blocks the lookup | Copy the string again; try a different Wi-Fi or a phone hotspot |

Finder and File Explorer hide files whose names start with a dot; VS Code's file list shows `.env`.

**If the connection string is ever committed by accident,** change the database user's password in Atlas right away and send everyone a new `.env`. Deleting the commit isn't enough, because Git keeps old versions.

## Hosting the live URL

The README's item 5 and the Blackboard text box ask for a live URL if we deploy. Ryan owns this; do it on Monday, November 30, so the demo can be tested on it before the due date.

**GitHub Pages won't work.** It only serves static files, so it can show our HTML but can't run `server.js` or reach MongoDB. Sign-in, appointments and booking would all fail.

**Plan: Render, free plan, whole app in one place.** It runs `server.js` as it is, so the code doesn't change.

1. Sign up at render.com with GitHub, choose **New → Web Service**, and pick our repo.
2. Build command: `npm install`. Start command: `node server.js`. Don't use `npm start` there: Render has no `.env` file, and `--env-file` stops with an error when the file is missing.
3. Under **Environment**, add `MONGODB_URI` with the Atlas connection string. Don't add `PORT`; Render sets it and `server.js` already reads it.
4. Keep `0.0.0.0/0` on Atlas's Network Access page so Render can connect.
5. Render redeploys on every push to `main`. Open the URL, create an account, and run the 6-step demo there.
6. Put the URL in the README (item 5) and the Blackboard text box.

**Catch:** a free Render service goes to sleep after 15 minutes with no visitors, and the first visit after that is slow while it wakes. Open the site a minute or two before presenting.

**Alternative: Vercel.** Vercel can also run a plain Node server: it finds `server.js`, runs it as one Vercel Function, and serves the `public` folder from its CDN. It doesn't sleep the way Render's free plan does. The catch is that Vercel finds the server through the `listen()` call made when the file starts, and our `server.js` only calls `listen()` after it has connected to MongoDB. It may need a small change in `start()` and a test deploy before we rely on it. Use it only if Ryan wants to make and test that change; otherwise Render needs nothing new.

## How we work

Small, frequent commits from all three of us keep the graded history real and stop merge fights.

- Pull before you start, commit small with a clear message ("Add availability save route"), and push the same day.
- Step 13 puts all four app pages in one `dashboard.html`. We split it into one file per screen (see Files), so two people rarely edit the same file.
- Tell the team before editing a shared file such as `style.css`.
- Never commit `.env` or the Atlas password. Share the connection string privately.
- Change the API contract only after telling everyone.
- Add every outside resource you use (snippet step, tutorial, docs page, AI tool) to the README's sources list as you go. The teacher's snippets repo goes first, since most of our starting code comes from it.
- Check in every day or two in the group chat: what's done, what's blocked.

## Definition of done

We're done when a fresh clone, set up using only the README, runs the required demo below with no errors.

- [ ] Create an account and sign in
- [ ] Set availability and save it
- [ ] Open the public booking page and book an appointment
- [ ] See the new appointment on the Dashboard and in Appointments
- [ ] Cancel an appointment and find it under the Cancelled filter
- [ ] Reload the page and see that everything is still there
- [ ] README has all 7 items, slides are ready, the ZIP has no `node_modules` or `.env`, and we've rehearsed twice
