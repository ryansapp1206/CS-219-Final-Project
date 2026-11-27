# SimpleSchedule – Task List

Updated November 25, 2026

## Status, November 27

Everything is due **Wednesday, December 2**. Step 13's complete app is in the repo, and every task below starts from it. Done so far: Ryan's database setup, the `.env`, the start script, real availability and settings saving, and both booking routes (`booking-info` and `book`) using saved hours (Ryan's Backend checklist in the [Team Plan](team-plan.md)), `app.js` (L2), and Abou's Availability and Settings pages (V1–V5, T1–T3) and README start (R1, R3, R7). A2 and A4 needed no work because Step 13 already matches the prototype there. Ben's tasks are not started yet.

The day each task is planned for is in the Schedule in the [Team Plan](team-plan.md) and in each checklist; the checklists ([Ben](ben.md), [Abou](abou.md)) also have step-by-step instructions and a "Done when" for every task. If we fall behind, cut E5, L5, D4, D5 and B9 first. If you swap tasks, tell Ryan so he can update the Owner column. Mark a task done by adding "(done)" after its owner.

## How to read this list

- **Starts from** says what Step 13 already has, so nobody rebuilds something that exists.
- **Size** is a rough guess: S = under an hour, M = a few hours, L = a day or more.
- **Needs** names what must be done first. "Route" means a backend route from Ryan; the last ones the booking tasks waited on, the `booking-info` and `book` changes, went in on November 27. You can build and style a screen before its route exists, then hook it up later.
- **The look to match** is the [Figma prototype](https://violet-surly-41566398.figma.site/) for every screen.
- Ryan's backend work is in the Backend checklist in the [Team Plan](team-plan.md) and isn't repeated here, except L2.

## Setup (everyone)

Ryan sent everyone the `.env` on November 25, so these can be done now.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| S3 | Get Step 13 running on your laptop | `git pull`, save the `.env` from Ryan next to `server.js`, `npm install`, `npm start`, then sign up and sign in. The `.env` isn't in the repo, so pulling doesn't give it to you | M | | Everyone |
| S4 | Read the API contract | It's in the Team Plan; know the routes your screens will call | S | | Everyone |
| S5 | Optional: install MongoDB Compass | Lets you see what's saved in the database | S | | Everyone |

## Shared files: page files, style.css, app.js

Step 13 puts all four app screens (Dashboard, Appointments, Availability, Settings) in one file, `dashboard.html`, and switches between them with the sidebar buttons. We split it so each screen has its own file.

| # | Task | Starts from | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | One file per app screen | All four screens are sections of `dashboard.html` | Abou (Wednesday): `availability.html` and `settings.html` (V1, T1). Ben (Friday): `appointments.html`, `dashboard.html` trimmed to the Dashboard, `renderDashboard()` moved from `appointments.js` into `dashboard.js`, the tab-switching code deleted, and sidebar buttons turned into links in all four pages. Ben's checklist has the 16 steps | M | | Ben, Abou |
| L2 | `app.js` shared code | The shared code is inside `dashboard.js` | Move the signed-in check, `apiRequest()`, `getInitials()`, the sidebar name, email and initials, and Sign out into `public/js/app.js`. It only uses `user-name`, `user-email`, `user-avatar` and `.signout-button`, so it works on any page with the sidebar. `dashboard.html` loads it and still works exactly as before | M | | Ryan (done) |
| L3 | `style.css` matches the prototype | Colours and cards are close; font is Arial | Inter font, the prototype's blues and greys, card corners and spacing | M | | Ben |
| L4 | Sidebar look | Emoji menu, name and email, "Sign out" text button | Line icons, prototype's avatar and account block, sign-out icon; same `<aside>` in all four app pages, keeping the ids `app.js` uses | M | L1 | Ben |
| L5 | Optional: phone menu | L1 removes Step 13's phone dropdown | A small menu with links to the four pages on phone-width windows; Step 5 has a starting point | S | L4 | Ben |

## Sign in, Create account, Reset password

| # | Task | Starts from | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Sign in page | Text and fields already match the prototype | Change "Forgot password?" from `#` to `reset.html` | S | | Ben |
| A2 | Create account page | Already matches the prototype | Nothing to do; it picks up L3's font | | | Ben (done) |
| A3 | Reset password page | Doesn't exist | New `reset.html` and `reset.js`: email field, "Send reset link"; shows "Reset link sent." No email is sent, no route needed | S | | Ben |
| A4 | Form error messages | Step 13 already shows them (invalid email, short password, wrong password, taken email) | Nothing to do | | | Ben (done) |

## Dashboard (`dashboard.html`)

| # | Task | Starts from | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| D1 | Greeting | Heading says "Dashboard" | "Good morning, Alex" (morning, afternoon or evening; first name from `/api/me`) and "Here is your schedule for today." | S | L1 | Ben |
| D2 | Stat cards | Three cards with real numbers, no units or icons | Icon tiles; "Hours booked" label; units "3 appointments", "8 appointments", "4.5 this week". "This week" stays today plus the next 6 days | S | L1 | Ben |
| D3 | Today's appointments list | Rows with initials, name, type and time | Today's date under the heading, "View all" link to `appointments.html`, coloured initials, "30 min" under the time | M | L1 | Ben |
| D4 | Optional: "•••" menu on each row | Not there | At least a Cancel option | S | D3 | Ben |
| D5 | Optional: "+ New appointment type" button | L1 makes the top bar button a link to `appointments.html#new` | Change its text to "+ New appointment type" | S | L1 | Ben |
| D6 | Booking link card | Works | Restyle to match the other cards; it stays on the Dashboard | S | L3 | Ben |

## Appointments (`appointments.html`)

| # | Task | Starts from | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| E1 | Filter tabs | Upcoming, Cancelled, All | Order Upcoming, All, Cancelled, in the prototype's grey segmented style | S | L1 | Ben |
| E2 | List header | "3 appointments" | "Upcoming appointments" (following the tab) and "2 appointments found" | S | E1 | Ben |
| E3 | Appointment rows | Date badge, name, one line of time · type · email, Cancel | Email under the name, time and type in their own column, status pill on every row, red Cancel | M | L1 | Ben |
| E4 | New appointment form | Works, with an extra "Check-in" type | Remove "Check-in"; restyle to the prototype | S | L1 | Ben |
| E5 | Optional: hide past meetings from Upcoming | Upcoming also shows ones that already happened | | S | E3 | Ben |

## Availability (`availability.html`)

Step 13's Availability is a static section of `dashboard.html`: Monday–Friday only, no Save button, nothing saves. It's step 2 of the live demo.

| # | Task | Starts from | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| V1 | Availability page file | Section in `dashboard.html` | New `availability.html`: 7 rows Monday–Sunday with ids like `monday-start`; Mon–Thu 9–5, Fri 9–3, Sat and Sun "Unavailable"; "Save availability" button | M | | Abou (done) |
| V5 | Load `app.js` | | Create `availability.js` and `settings.js`; load `app.js` then each page's script; sidebar shows the real user | S | V1, T1 | Abou (done) |
| V4 | Row behaviour | | Unchecking shows "Unavailable"; end must be after start, with the message next to that day | S | V5 | Abou (done) |
| V2 | Load saved hours | | Fill the rows from `GET /api/availability` | S | V5 | Abou (done) |
| V3 | Save availability | | Send all 7 days to `PUT /api/availability`; show "Saved." or the error | M | V4 | Abou (done) |

## Settings (`settings.html`)

Step 13's Settings is a static section of `dashboard.html`: nothing loads or saves, and its time zones (ET, CT, MT, PT) don't match the prototype's three.

| # | Task | Starts from | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Settings page file | Section in `dashboard.html` | New `settings.html`: Eastern, Central and Pacific Time (US & Canada); initials avatar with "Profile photo" | S | | Abou (done) |
| T2 | Load settings | | Fill the four fields from `GET /api/settings` | S | V5 | Abou (done) |
| T3 | Save settings | Save button does nothing | Send to `PUT /api/settings`; show the error, or reload the page on success so the sidebar updates | M | T2 | Abou (done) |

## Public booking page (`booking.html`)

Step 13's booking page already works end to end: three-column card, calendar, times, details form, booking, a "You're booked" message, and a message for a bad link. What's wrong is that it offers six fixed hourly times and never weekends, and a few steps don't match the prototype.

| # | Task | Starts from | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| B1 | Three-column layout | Already there | Nothing to do; it picks up L3's look | | | Abou (done) |
| B2 | Host panel | Avatar, name, "30 Minute Meeting", emoji facts | Heading "Project discussion"; line icons instead of emojis | S | | Abou |
| B3 | Calendar | Blocks Saturday and Sunday for everyone | Only days in `openDays` that are today or later are clickable | M | route | Abou |
| B4 | Time zone line | Not there | "Time zone · Eastern Time (US & Canada)" under the calendar, from `timezone` | S | route | Abou |
| B5 | Available times | Six fixed times minus `takenTimes`; form opens on click | Buttons from `freeTimes`; picking one shows "Next"; form opens on "Next" | M | route | Abou |
| B6 | Details step | Form appears under the card | "Next" swaps the card for the form; "← Change date or time"; grey summary box; Notes as a textarea | M | B5 | Abou |
| B7 | Confirmation screen | "You're booked" with date and time | Add the host name and the meeting link | S | route | Abou |
| B8 | "Just booked" error | Bad host link already handled | On "that time was just booked", show it and reload that date's free times | S | B5 | Abou |
| B9 | Optional: back link and footer | Not there | "← Back to dashboard" for a signed-in host, and the "Simple scheduling for student projects" footer | S | | Abou |

## Testing

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| Q1 | Run the 6-step demo flow | Sign up, set availability, book, check Dashboard and Appointments, cancel, reload; report anything broken to the team | M | Most screens | Everyone |
| Q2 | Fresh-clone test | Clone into a new folder and follow only the README; fix the README wherever it's wrong | M | R4 | Abou |
| Q3 | Edge cases | Wrong password, taken email, empty forms, double booking, booking outside hours, cancelling twice | M | Q1 | Everyone |
| Q4 | Zoom | Check every page at 150% browser zoom (for the presentation) | S | Q1 | Everyone |

## README

`README.md` holds only the line `# CS-219---Final-Project`. It must have exactly these 7 items.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| R1 | Title, team names, description | Item 1: "SimpleSchedule", our three names, 2–3 sentences on what the app does | S | | Abou (done) |
| R2 | Screenshots of every required screen | Item 2: in a `screenshots` folder, shown in the README, once the UI is final | M | Most screens | Abou |
| R3 | Technologies used | Item 3: HTML, CSS, JavaScript, Node.js, MongoDB (Atlas), Git and GitHub | S | | Abou (done) |
| R4 | Install and run steps | Item 4: clone, `npm install`, create `.env`, `npm start`; write it with Ryan | S | | Abou |
| R5 | Live URL | Item 5: the Render URL | S | Ryan: deploy | Abou |
| R6 | Test account | Item 6: an email and password the instructor can sign in with | S | Ryan: seed script | Abou |
| R7 | Outside resources with links | Item 7: the teacher's snippets repo first, then docs pages, tutorials, AI tools; collect them from all three of us | S | | Abou (done) |

## Presentation and demo

The talk is 8–10 minutes with a live demo, and late days can't be used for it.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| P1 | Slides | What the app does, who would use it, tech, who built what, demo, what we learned | M | | Ben |
| P2 | Intro script | About 1 minute: what SimpleSchedule does and who would use it | S | | Ben |
| P3 | Demo script | The 6 required steps in order: who clicks, what to say, test data ready | S | Q1 | Ben |
| P4 | Backup plan | Screenshots or a screen recording in case the live demo breaks | S | Q1 | Ben |
| P5 | Rehearse twice | Time it to 8–10 minutes; browser zoomed in; camera on if we present online | M | P1, P2, P3 | Everyone |

## Submission

Everything goes to the Final Project assignment on Blackboard by the due date.

| # | Task | Details | Size | Needs | Owner |
| --- | --- | --- | --- | --- | --- |
| U1 | Blackboard text box | GitHub repo link, live URL, test account email and password | S | R6 | Ryan |
| U2 | Project ZIP | Named `CS219_FinalProject_TeamName.zip` with our team name; delete `node_modules` and `.env` before zipping | S | All code done | Ryan |
| U3 | Upload slides | As a PDF or PowerPoint file | S | P1 | Ben |
| U4 | Final repo check | Commits from all three of us show in the history; the README displays correctly on GitHub | S | | Abou |
