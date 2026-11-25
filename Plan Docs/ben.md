# Ben Checklist: Existing Pages

Updated November 25, 2026

You own the pages a host already has: Sign in, Create account, Reset password, Dashboard and Appointments, plus the shared look and the slides. Everything is due **Wednesday, December 2**, so each section below has a day. Work top to bottom and tick each box as you finish it.

## How to use this checklist

Everything you need is written into each step, so you shouldn't have to hunt through the other docs. Task numbers (like L1) match the [Task List](task-list.md), in case you want more detail.

**Every time you work:**

1. `git pull` before you start, so you have everyone's latest work.
2. Commit each small piece with a clear message ("Add greeting to dashboard").
3. `git push` the same day. Your commits are graded.

**Ground rules:**

- Your pages are `index.html`, `register.html`, `reset.html`, `dashboard.html` and `appointments.html`, with their `.js` files, plus `style.css` and the sidebar.
- On the four signed-in pages, every request to the server goes through `apiRequest()` from `app.js`. Ryan writes `app.js`; don't edit it, or `server.js` or `database.js`. The sign-in pages keep their own `fetch` calls, as in Step 13.
- Don't edit `dashboard.js` until Ryan says `app.js` is pushed (Friday). He's moving code out of it.
- Tell Abou before you change `style.css` or the sidebar, since their pages use them too.
- Stuck or blocked? Tell Ryan.

**Where to look:** the look comes from the [Figma prototype](https://violet-surly-41566398.figma.site/). How the teacher built something is in the [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo, in the step named on each task. Our repo already holds his Step 13, so the files you edit are his Step 13 files.

## Wednesday–Thursday, November 25–26: start now, no `.env` needed

These pages work without the server: open `public/index.html`, `public/register.html` or `public/reset.html` by double-clicking it, and refresh the browser after each change. The forms won't submit until the server runs, which doesn't matter for layout. Thursday is Thanksgiving, so finish what you can.

- [ ] A3: Build the Reset password page (`reset.html` and `reset.js`, both new)

    Same card layout as Sign in: "Reset your password", one email field and a "Send reset link" button. Clicking it shows "Reset link sent." No email is sent and no server route is needed. Snippet: Step 2's "Try it yourself" describes this page.

- [ ] A1: Sign in page matches the prototype

    "WELCOME BACK" above "Sign in to your account", the subtitle "Manage your appointments and availability.", and a "Forgot password?" link that goes to `reset.html` (today it links to `#`).

- [ ] A2: Create account page matches the prototype

    "CREATE YOUR WORKSPACE" above "Create an account", the subtitle "Start sharing your appointment page in minutes.", then Full name, Email address and Password (6 or more characters).

- [ ] L3: Make `style.css` match the prototype

    Switch to the Inter font (Step 13 uses Arial), use the prototype's blues and greys, and make cards white with rounded corners on a light grey page. Check it on the three sign-in pages first; the app pages pick it up later.

## As soon as Ryan sends the `.env`: run the app

The `.env` isn't in the repo, so pulling doesn't give it to you. Ryan sends it separately.

- [ ] `git pull`, then save the `.env` file in the same folder as `server.js`. Never commit it. (Finder and File Explorer hide files starting with a dot; VS Code shows it.)
- [ ] Run `npm install`, then `npm start`. Open http://localhost:3000 and create an account. If anything fails, tell Ryan.
- [ ] Put the prototype and the running app side by side. Write down every difference on Dashboard and Appointments; that list is your to-do list for the look.

## Friday, November 27: split the pages and rebuild the sidebar

Wait for Ryan's message that `app.js` is pushed, then `git pull`.

- [ ] L1 (your half): Split the Dashboard and Appointments out of `dashboard.html`

    Make `dashboard.html` hold only the Dashboard section, and make `appointments.html` from the Appointments section. Delete the Availability and Settings sections from `dashboard.html`; Abou has already made those as their own files. Each page loads `app.js` first, then its own script (`dashboard.js` or `appointments.js`). Snippet: Step 5 is the one-file version you're splitting. Push the same day.

- [ ] L4: Rebuild the sidebar

    Turn the menu buttons into links to the page files, with line icons instead of Step 13's emojis, the current page highlighted, an initials avatar with the name and email at the bottom, and a sign-out icon. Copy the finished sidebar into all four signed-in pages (tell Abou before you edit their two files).

## Saturday, November 28: error messages and the Dashboard

- [ ] A4: Clear error messages on all three sign-in pages

    Wrong password, an email that's already taken, a password under 6 characters, empty fields. Snippet: Step 3 shows the pattern.

- [ ] D1: Greeting

    "Good morning, Alex" (morning, afternoon or evening by the clock, first name only) and "Here is your schedule for today." The name comes from `app.js`.

- [ ] D2: Stat cards

    Three cards with icon tiles: Today "3 appointments", This week "8 appointments", Hours booked "4.5 this week". Step 13 counts "this week" as today plus the next 6 days; keep that unless Ryan says otherwise.

- [ ] D3: Today's appointments list

    The date under the heading ("Tuesday, June 17"), a "View all" link to `appointments.html`, coloured initials, and the time with "30 min" on the right.

## Sunday, November 29: Appointments

- [ ] E1: Filter tabs

    Upcoming, All, Cancelled, in that order (Step 13 has Upcoming, Cancelled, All), in the prototype's grey segmented style.

- [ ] E2: List header

    "Upcoming appointments" and "2 appointments found", changing with the tab.

- [ ] E3: Appointment rows

    A date badge (day number over the month), name and email, time and meeting type, a status pill, and a red Cancel.

- [ ] E4: New appointment form

    Opened by "+ New appointment": Guest name, Guest email, Date, Time, and Meeting type (Project discussion, Quick meeting). Remove Step 13's extra "Check-in" type.

## Monday, November 30: finish the Dashboard, start the slides

- [ ] D6: Keep the booking link card on the Dashboard

    Step 13 already shows it; restyle it to match the other cards.

- [ ] D4: "•••" menu on each row, with at least a Cancel option (cut this if you're behind)
- [ ] D5: "+ New appointment type" button that opens the New appointment form on the Appointments page (cut this if you're behind)

- [ ] P1: Slides

    What SimpleSchedule does, who would use it, the tech, who built what, the demo, and what we learned.

- [ ] P2: Intro script, about 1 minute

    What SimpleSchedule does and who would use it.

## Tuesday, December 1: test, fix, rehearse

- [ ] Run the whole demo with the team

    Create an account, set availability, book on the public page, check the Dashboard and Appointments, cancel one, then reload. Fix anything broken on your pages.

- [ ] Try to break your own pages

    Wrong password, an email that's already taken, empty forms, cancelling the same appointment twice.

- [ ] Check your pages at 150% browser zoom

    The presentation is shown zoomed in, so nothing should overlap or get cut off.

- [ ] P3: Demo script

    The 6 required demo steps in order, who clicks, what to say at each, and the test data ready in advance.

- [ ] P4: Backup plan

    A screen recording or screenshots of the demo, in case the live demo breaks. Send Abou screenshots of your pages for the README.

- [ ] First rehearsal with the team, timed to 8–10 minutes

## Wednesday, December 2: due

- [ ] Save the slides as a PDF for Blackboard (U3)
- [ ] Second rehearsal. Late days can't be used for the presentation.

## Only if there's time

- [ ] E5: Hide meetings that already happened from Upcoming
- [ ] L5: Collapse the sidebar on phone-width windows (Step 5 has a starting point)
