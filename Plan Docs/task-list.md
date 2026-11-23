# SimpleSchedule – Task List (pick yours)

Updated November 23, 2026

## How to use this list

Agree on tasks between yourselves first, then tell Ryan which ones you're taking; he records them in the Owner column. Ryan's backend work is in the [Team Plan](team-plan.md) and isn't repeated here.

- **Size** is a rough guess: S = under an hour, M = a few hours, L = a day or more.
- **Needs** names what should be done first. "Route" means a backend route from Ryan. You can build and style a screen before its route exists, then hook it up later.
- **The look to match** is the [Figma prototype](https://violet-surly-41566398.figma.site/) for every screen.
- Try to split the work evenly. The Team Plan's suggested split is a starting point, not a rule.

## Setup (everyone)

All three of us do these first, before picking anything else.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| S1 | Install Node.js 20.6 or newer | Pick the LTS version from nodejs.org; check with `node -v` | S | | Everyone |
| S2 | Join the GitHub repo and clone it | Accept Ryan's invite | S | Ryan creates the repo | Everyone |
| S3 | Get Step 13 running on your laptop | `npm install`, add `.env` with the shared database link, `npm start`, then sign up and sign in | M | S1, S2 | Everyone |
| S4 | Read the API contract | It's in the Team Plan; know the routes your screens will call | S | | Everyone |
| S5 | Optional: install MongoDB Compass | Lets you see what's saved in the database | S | | Everyone |

## Shared files: page layout, style.css, app.js

Every page depends on these, so L1 goes first. The Team Plan's Files section lists every file and what it does.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| L1 | Create the page files | Split Step 13's `dashboard.html` into `dashboard.html`, `appointments.html`, `availability.html` and `settings.html`, each with the sidebar; add an empty `reset.html` | M | S3 | |
| L2 | `app.js` shared code | Move `apiRequest`, the signed-in check, the sidebar name and email, and sign-out out of Step 13's `dashboard.js`; every app page loads it | M | L1 | Ryan |
| L3 | `style.css` matches the prototype | Inter font (Step 13 uses Arial), the prototype's blues and greys, white rounded cards on a light grey page | M | S3 | |
| L4 | Sidebar | Line icons instead of Step 13's emojis, links to the page files, current page highlighted, initials avatar with name and email, sign-out icon; the same block in all four app pages | M | L1, L3 | |
| L5 | Small screens | Sidebar collapses on a phone-width window; Step 5 has a starting point | S | L4 | |

## index.html, register.html, reset.html: Sign in, Create account, Reset password

Sign in and Create account already work in Step 13; Reset password is new but needs no backend.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| A1 | Sign in page | Match the prototype: "WELCOME BACK", "Sign in to your account", subtitle, "Forgot password?" linking to A3 | S | L3 | |
| A2 | Create account page | "CREATE YOUR WORKSPACE", "Create an account", Full name, Email, Password (6 or more characters) | S | L3 | |
| A3 | Reset password page (new) | Email field and a button; shows "Reset link sent." No email is sent, no route needed | S | L1 | |
| A4 | Form error messages | Clear messages for a wrong password, a taken email, a short password; Step 3 shows the pattern | S | A1, A2 | |

## dashboard.html: Dashboard

The numbers and today's list already work in Step 13; these tasks bring it in line with the prototype.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| D1 | Greeting | "Good morning, Alex" (morning, afternoon or evening by the clock) and "Here is your schedule for today." | S | L2 | |
| D2 | Stat cards | Icon tiles plus units: "3 appointments", "8 appointments", "4.5 this week". Agree whether "this week" means Monday–Sunday or the next 7 days (Step 13 uses the next 7) | S | L3 | |
| D3 | Today's appointments list | Date under the heading ("Tuesday, June 17"), "View all" to Appointments, coloured initials, time and "30 min" on the right | M | L3 | |
| D4 | "•••" menu on each row | At least a Cancel option | S | D3 | |
| D5 | "+ New appointment type" button | Decided: clicking it means opening the New appointment form | S | E4 | |
| D6 | Booking page link | The prototype doesn't show it, but the host needs it. Decided: keep it on the Dashboard rather than moving it to Settings | S | | |

## appointments.html: Appointments

Filters, Cancel and the form already work in Step 13; this is mostly layout.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| E1 | Filter tabs | Order Upcoming, All, Cancelled (Step 13 has Upcoming, Cancelled, All), in the prototype's segmented style | S | L1 | |
| E2 | List header | "Upcoming appointments" and "2 appointments found", changing with the tab | S | E1 | |
| E3 | Appointment rows | Date badge (day over month), name and email, time and meeting type, status pill, red Cancel | M | L1 | |
| E4 | New appointment form | Opened by "+ New appointment": Guest name, Guest email, Date, Time, Meeting type (Project discussion, Quick meeting) | M | L1 | |
| E5 | Optional: hide past meetings from Upcoming | Step 13's Upcoming also shows ones that already happened | S | E3 | |

## availability.html: Availability

This screen is new work: Step 13's version is static and saves nothing. It's step 2 of the live demo.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| V1 | Weekly hours layout | 7 rows, Monday–Sunday: checkbox, start time "to" end time; an unchecked day shows "Unavailable" | M | L1 | |
| V2 | Load saved hours | Fill the rows from `GET /api/availability` when the page opens | S | V1, route | |
| V3 | Save availability | Send all 7 days to `PUT /api/availability`; show a saved message or the error | M | V1, route | |
| V4 | Check the times | End must be after start; show the message next to that day | S | V1 | |

## settings.html: Settings

Also new work: Step 13's Settings form doesn't load or save anything.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| T1 | Profile card layout | "Profile", initials avatar with "Profile photo" text, Full name, Email address, Time zone (Eastern, Central, Pacific Time (US & Canada)), Meeting link, "Save settings" | S | L1 | |
| T2 | Load settings | Fill the fields from `GET /api/settings` | S | T1, route | |
| T3 | Save settings | Send to `PUT /api/settings`, then update the name and email in the sidebar | M | T1, route | |

## booking.html: Public booking page

The biggest frontend piece: Step 13 has a working base, but it must use the host's saved hours and match the prototype's screens.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| B1 | Three-column layout | Host panel, "Select a date" calendar, "Available times", in one white card | M | L3 | |
| B2 | Host panel | Initials avatar, host name, "Project discussion", short description, "30 minutes" and "Online meeting" with icons | S | B1 | |
| B3 | Calendar | Month arrows, SUN–SAT header; only open future days are blue and clickable; the picked day is filled blue | M | B1, route | |
| B4 | Time zone line | "Time zone · Eastern Time (US & Canada)" under the calendar, from the host's settings | S | B3, route | |
| B5 | Available times | Free times for the picked day; picking one shows a "Next" button beside it | M | B3, route | |
| B6 | Details step | "← Change date or time", a summary box ("June 18, 2025 at 10:00 AM"), Name, Email, Notes (optional, multi-line), "Confirm appointment" | M | B5 | |
| B7 | Confirmation screen | Not in the screenshots; same style, showing the date, time, host and meeting link | M | B6 | |
| B8 | Error states | A link to a host that doesn't exist; a time someone else just took | S | B6 | |
| B9 | Back link and footer | "← Back to dashboard" at the top left (show it only to a signed-in host) and the "Simple scheduling for student projects" footer | S | B1 | |

## Testing

Testing catches demo-day surprises; Q1 and Q2 are the ones that matter most.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| Q1 | Run the 6-step demo flow | Sign up, set availability, book, check Dashboard and Appointments, cancel, reload; report anything broken to the team | M | Most screens | |
| Q2 | Fresh-clone test | Clone into a new folder and follow only the README; fix the README wherever it's wrong | M | R4 | |
| Q3 | Edge cases | Wrong password, taken email, empty forms, double booking, booking outside hours, cancelling twice | M | Q1 | |
| Q4 | Zoom and small screens | Check at 150% browser zoom (for the presentation) and at phone width | S | Q1 | |

## README

The README must have exactly these 7 items, so there's one task per item.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| R1 | Title, team names, description | Item 1: project title, our names, 2–3 sentences on what the app does | S | | |
| R2 | Screenshots of every required screen | Item 2: take them once the UI is final; keep them in a folder in the repo | M | Most screens | |
| R3 | Technologies used | Item 3 | S | | |
| R4 | Install and run steps | Item 4: clone, `npm install`, create `.env`, `npm start`; write it with Ryan | S | Ryan: `.env` setup | |
| R5 | Live URL | Item 5, only if we deploy | S | Ryan: deploy | |
| R6 | Test account | Item 6: an email and password the instructor can sign in with | S | Ryan: seed script | |
| R7 | Outside resources with links | Item 7: the snippets repo, docs pages, tutorials, AI tools; collect them from all three of us | S | | |

## Presentation and demo

The talk is 8–10 minutes with a live demo, and late days can't be used for it.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| P1 | Slides | Optional but helpful: what the app does, who would use it, tech, who built what, demo, what we learned | M | | |
| P2 | Intro script | About 1 minute: what SimpleSchedule does and who would use it | S | | |
| P3 | Demo script | The 6 required steps in order: who clicks, what to say, test data ready | S | Q1 | |
| P4 | Backup plan | Screenshots or a screen recording in case the live demo breaks | S | Q1 | |
| P5 | Rehearse twice | Time it to 8–10 minutes; browser zoomed in; camera on if we present online | M | P1, P2, P3 | Everyone |

## Submission

Everything goes to the Final Project assignment on Blackboard by the due date.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| U1 | Blackboard text box | GitHub repo link, live URL if we have one, test account email and password | S | R6 | |
| U2 | Project ZIP | Named `CS219_FinalProject_TeamName.zip` with our team name; delete `node_modules` and `.env` before zipping | S | All code done | |
| U3 | Upload slides | As a PDF or PowerPoint file | S | P1 | |
| U4 | Final repo check | Commits from all three of us show in the history; the README displays correctly on GitHub | S | | |
