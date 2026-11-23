# Start Here: SimpleSchedule for Teammates

Updated November 23, 2026

You don't need to read all three plan docs. Follow these steps in order; each one tells you exactly which part to open, and anything not listed here is Ryan's.

## Step 1, first: pick your role and tasks

There are two frontend roles, and you each take one.

1. In the [Team Plan](team-plan.md), read only **Who does what**, and only the Teammate 1 and Teammate 2 parts.
2. Decide between you who is Teammate 1 (the existing pages) and who is Teammate 2 (the new pages and the booking page).
3. Look at your sections of the Task List (Step 3 below says which), agree with each other on who takes what, then tell Ryan so he can record it.

## Step 2, by Wednesday, November 25: get the app running

The goal is to sign in to the app on your own laptop. You don't need to understand the server to do this.

1. Install Node.js 20.6 or newer from nodejs.org (the LTS version). Check it worked by typing `node -v` in a terminal.
2. Accept Ryan's GitHub invite and clone the repo.
3. Once Ryan has pushed the server code, get the `.env` file from him and save it in the same folder as `server.js`. Never commit this file.
4. In that folder, run `npm install`, then `npm start`.
5. Open http://localhost:3000 and create an account.

If any of this fails, tell Ryan. Setup problems are his to fix, not yours.

## Step 3: your part of the Task List

In the [Task List](task-list.md), read only your sections. Each task has a number, a size and what it needs first.

| | Teammate 1 | Teammate 2 |
| --- | --- | --- |
| Your sections | Shared files; index.html, register.html, reset.html; dashboard.html; appointments.html; Presentation and demo | availability.html; settings.html; booking.html; README |
| Start with | L1: split `dashboard.html` into one file per page, and push it the same day | V1: the Availability layout, once L1 is pushed |
| Then | L3 (`style.css`), L4 (sidebar), then A1–A4 | T1 (Settings layout), then B1 (booking page layout) |

Teammate 2 waits on L1 only briefly, so Teammate 1 should do it first. If you swap pages, swap the rows too.

## Step 4, while you build: where to look

Open these only when the question comes up.

| When you're wondering… | Look here |
| --- | --- |
| What should this page look like? | The [Figma prototype](https://violet-surly-41566398.figma.site/) |
| How did the teacher build something similar? | [Snippet steps](snippet-steps.md): find your task number under "In our plan", then open that step's folder in the teacher's [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo |
| What data will my page get from the server? | [Team Plan](team-plan.md), **API contract**, "Example responses". Build with that sample data until Ryan's route is ready |
| What am I allowed to touch? | [Team Plan](team-plan.md), **Rules for the frontend** (four rules, just under the API table) |

The frontend rules in short: every request goes through `apiRequest()`, field names match the contract exactly, and you never edit `server.js`, `database.js` or `app.js`; ask Ryan instead.

## Step 5, every few days: habits and deadlines

- Pull before you start, commit small pieces with clear messages, and push the same day. Your commits are graded.
- At each check-in, say what's done and what's blocked.
- Your pages should work with real data by **Wednesday, December 2**. The whole demo should run by **Saturday, December 5**. Everything is due **Tuesday, December 8, 11:59 PM**.

## What you can skip

These parts of the Team Plan are Ryan's or background; you never need to read them: **Backend checklist**, **Setting up the shared database**, **Tech decisions**, and the route-by-route details of the **API contract** beyond the example responses and rules.
