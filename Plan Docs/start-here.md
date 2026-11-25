# Start Here: SimpleSchedule for Teammates

Updated November 25, 2026

You don't need to read every plan doc. Follow these steps in order; each one tells you exactly which part to open, and anything not listed here is Ryan's.

## Step 1, as soon as Ryan sends the `.env`: get the app running

The goal is to sign in to the app on your own laptop. You don't need to understand the server to do this. Until the `.env` arrives, start on the "no `.env` needed" tasks at the top of your checklist.

1. `git pull` so you have the server code.
2. Save the `.env` file from Ryan in the same folder as `server.js`. It isn't in the repo, so pulling doesn't give it to you. Never commit this file. Finder and File Explorer hide files starting with a dot; VS Code shows it.
3. In that folder, run `npm install`, then `npm start`.
4. Open http://localhost:3000 and create an account.

If any of this fails, tell Ryan. Setup problems are his to fix, not yours.

## Step 2: follow your checklist

Your whole job is one checklist, in order, with every detail written in: the [Ben Checklist](ben.md) or the [Abou Checklist](abou.md). Tick each box as you finish. Here's what each one covers:

| | Ben | Abou |
| --- | --- | --- |
| Your sections | Shared files; index.html, register.html, reset.html; dashboard.html; appointments.html; Presentation and demo | availability.html; settings.html; booking.html; README |
| Start now (no `.env` needed) | A3 (reset page), A1, A2, L3 (`style.css`) | V1 (`availability.html`), T1 (`settings.html`), README R1, R3, R7 |
| Friday, after Ryan's `app.js` | L1 (split `dashboard.html`), L4 (sidebar) | Load `app.js` in your pages, V4, B1, B2 |

Neither of you waits on the other: Abou creates the Availability and Settings pages as new files, and Ben splits `dashboard.html` on Friday. Each checklist has a day for every task. If you swap tasks, tell Ryan so he can update the Owner column of the [Task List](task-list.md).

## Step 3, while you build: where to look

Open these only when the question comes up.

| When you're wondering… | Look here |
| --- | --- |
| What should this page look like? | The [Figma prototype](https://violet-surly-41566398.figma.site/) |
| How did the teacher build something similar? | [Snippet steps](snippet-steps.md): find your task number under "In our plan", then open that step's folder in the teacher's [SimpleSchedule-Snippets](https://github.com/ShahinurEdu/SimpleSchedule-Snippets) repo |
| What data will my page get from the server? | [Team Plan](team-plan.md), **API contract**, "Example responses". Build with that sample data until Ryan's route is ready |
| What am I allowed to touch? | [Team Plan](team-plan.md), **Rules for the frontend** (four rules, just under the API table) |

The frontend rules in short: on the signed-in pages every request goes through `apiRequest()`, field names match the contract exactly, and you never edit `server.js`, `database.js` or `app.js`; ask Ryan instead.

## Step 4, every few days: habits and deadlines

- Pull before you start, commit small pieces with clear messages, and push the same day. Your commits are graded.
- At each check-in, say what's done and what's blocked.
- Everything is due **Wednesday, December 2**. Your pages should work with real data by **Sunday, November 29**, the whole demo should run on the live URL by **Monday, November 30**, and **Tuesday, December 1** is for fixing bugs, screenshots and the first rehearsal.

## What you can skip

These parts of the Team Plan are Ryan's or background; you never need to read them: **Backend checklist**, **Setting up the shared database**, **Tech decisions**, and the route-by-route details of the **API contract** beyond the example responses and rules.
