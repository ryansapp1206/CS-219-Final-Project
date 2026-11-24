# Ben Checklist: Existing Pages

Updated November 23, 2026

You own the pages a host already has: Sign in, Create account, Reset password, Dashboard and Appointments, plus the shared look and the slides. Work top to bottom and tick each box as you finish it.

## How to use this checklist

Everything you need is written into each step, so you shouldn't have to hunt through the other docs. Task numbers (like L1) match the [Task List](task-list.md), in case you want more detail.

**Every time you work:**

1. `git pull` before you start, so you have everyone's latest work.
2. Commit each small piece with a clear message ("Add greeting to dashboard").
3. `git push` the same day. Your commits are graded.

**Ground rules:**

- Your pages are `index.html`, `register.html`, `reset.html`, `dashboard.html` and `appointments.html`, with their `.js` files, plus `style.css`.
- On the four signed-in pages, every request to the server goes through `apiRequest()` from `app.js`. Ryan writes `app.js`; don't edit it, or `server.js` or `database.js`. The sign-in pages keep their own `fetch` calls, as in Step 13.
- Tell Abou before you change `style.css` or the sidebar, since their pages use them too.
- Stuck or blocked? Tell Ryan.

**Where to look:** the look comes from the [Figma prototype](https://violet-surly-41566398.figma.site/). How the teacher built something is in the [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo, in the step named on each task.

## Setup: by Wednesday, November 25

- [ ] Agree with Abou that you're Ben, and tell Ryan.
- [ ] Install Node.js 20.6 or newer from nodejs.org (the LTS version). Check it with `node -v` in a terminal.
- [ ] Accept Ryan's GitHub invite and clone the repo.
- [ ] Once Ryan has pushed the server, save the `.env` file he sends you in the same folder as `server.js`. Never commit it.
- [ ] Run `npm install`, then `npm start`. Open http://localhost:3000 and create an account. If anything fails, tell Ryan.
- [ ] Put the prototype and the running app side by side. Write down every difference you see on Sign in, Create account, Dashboard and Appointments; that list is your to-do list for the look.

## Build: by Wednesday, December 2

Do these in order. The first one unblocks Abou, so do it as soon as setup works.

### Shared pieces first

- [ ] L1: Split `dashboard.html` into one file per page

    Make `dashboard.html`, `appointments.html`, `availability.html` and `settings.html`, each with the same sidebar, plus an empty `reset.html`. Each of the four signed-in pages loads `app.js` before its own script. Push it the same day, because Abou builds in two of these files. Snippet: Step 5 is the one-file version you're splitting.

- [ ] L3: Make `style.css` match the prototype

    Switch to the Inter font (Step 13 uses Arial), use the prototype's blues and greys, and make cards white with rounded corners on a light grey page.

- [ ] L4: Rebuild the sidebar

    Line icons instead of Step 13's emojis, links to the page files, the current page highlighted, an initials avatar with the name and email at the bottom, and a sign-out icon. Copy the finished sidebar into all four signed-in pages. Waits on L1 and L3.

### Sign in, Create account, Reset password

- [ ] A1: Sign in page matches the prototype

    "WELCOME BACK" above "Sign in to your account", the subtitle "Manage your appointments and availability.", and a "Forgot password?" link that goes to `reset.html`.

- [ ] A2: Create account page matches the prototype

    "CREATE YOUR WORKSPACE" above "Create an account", the subtitle "Start sharing your appointment page in minutes.", then Full name, Email address and Password (6 or more characters).

- [ ] A3: Build the Reset password page

    "Reset your password", one email field and a "Send reset link" button. Clicking it shows "Reset link sent." No email is sent and no server route is needed.

- [ ] A4: Clear error messages on all three pages

    Wrong password, an email that's already taken, a password under 6 characters, empty fields. Snippet: Step 3 shows the pattern.

### Dashboard

- [ ] D1: Greeting

    "Good morning, Alex" (morning, afternoon or evening by the clock, first name only) and "Here is your schedule for today." The name comes from `app.js`, so this waits on Ryan's L2.

- [ ] D2: Stat cards

    Three cards with icon tiles: Today "3 appointments", This week "8 appointments", Hours booked "4.5 this week". Ask Ryan whether "this week" means Monday to Sunday or the next 7 days (Step 13 uses the next 7).

- [ ] D3: Today's appointments list

    The date under the heading ("Tuesday, June 17"), a "View all" link to `appointments.html`, coloured initials, and the time with "30 min" on the right.

- [ ] D4: "•••" menu on each row

    At least a Cancel option.

- [ ] D5: "+ New appointment type" button

    It opens the New appointment form on the Appointments page.

- [ ] D6: Keep the booking link card on the Dashboard

    Step 13 already shows it; restyle it to match the other cards.

### Appointments

- [ ] E1: Filter tabs

    Upcoming, All, Cancelled, in that order (Step 13 has Upcoming, Cancelled, All), in the prototype's grey segmented style.

- [ ] E2: List header

    "Upcoming appointments" and "2 appointments found", changing with the tab.

- [ ] E3: Appointment rows

    A date badge (day number over the month), name and email, time and meeting type, a status pill, and a red Cancel.

- [ ] E4: New appointment form

    Opened by "+ New appointment": Guest name, Guest email, Date, Time, and Meeting type (Project discussion, Quick meeting).

### Only if you have time

- [ ] E5: Hide meetings that already happened from Upcoming
- [ ] L5: Collapse the sidebar on phone-width windows (Step 5 has a starting point)

## Connect and test: by Saturday, December 5

- [ ] Run the whole demo with the team

    Create an account, set availability, book on the public page, check the Dashboard and Appointments, cancel one, then reload. Fix anything broken on your pages.

- [ ] Try to break your own pages

    Wrong password, an email that's already taken, empty forms, cancelling the same appointment twice.

- [ ] Check your pages at 150% browser zoom and at phone width

    The presentation is shown zoomed in, so nothing should overlap or get cut off.

## Wrap up: by Tuesday, December 8

You own the presentation; Abou owns the README.

- [ ] P1: Slides

    What SimpleSchedule does, who would use it, the tech, who built what, the demo, and what we learned. Save a PDF copy for Blackboard.

- [ ] P2: Intro script, about 1 minute

    What SimpleSchedule does and who would use it.

- [ ] P3: Demo script

    The 6 required demo steps in order, who clicks, what to say at each, and any test data ready in advance.

- [ ] P4: Backup plan

    A screen recording or screenshots of the demo, in case the live demo breaks.

- [ ] P5: Rehearse twice with the team

    Time it to 8–10 minutes, with the browser zoomed in. Camera on if presenting online. Late days can't be used for the presentation.
