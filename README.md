# Engineering Club Dashboard Sandbox

A fake-data React playground for the Hartnell Engineering Club software team.
Students can redesign the member portal, officer dashboard, roster, navigation,
and profiles without accessing or changing the production Google Apps Script
application.

## Important safety rule

This repository must contain **fictional data only**.

Do not add real student names, Hartnell IDs, email addresses, phone numbers,
registration responses, spreadsheet IDs, Apps Script deployment URLs, API keys,
or copied production exports. The starter records reference fictional anime
characters and use `example.edu` addresses and reserved `555` phone numbers.

## Start locally

Install Node.js 20.19 or newer, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

Before submitting a design, verify the production build:

```bash
npm run check
```

## What is included

- Member portal with mock events
- Member profile
- Officer overview
- Searchable, year-filtered member roster
- Three simulated access levels
- Server-shaped mock data service
- Fictional records inspired by:
  - Ouran High School Host Club
  - Fruits Basket
  - Fullmetal Alchemist: Brotherhood
  - Attack on Titan
  - Kaiju No. 8

## Simulated permissions

| Access level | Member portal | Officer overview | Roster | Phone numbers |
| --- | --- | --- | --- | --- |
| Registered member | Yes | No | No | No |
| Officer | Yes | Yes | Yes | No |
| Executive officer | Yes | Yes | Yes | Yes |

In production, executive phone access is intended only for the President,
Vice President, and Secretary. Frontend controls are only a simulation. The
production Apps Script server must enforce every permission.

## Design challenge

Fork this repository and make the dashboard your own. You may change the layout,
navigation, colors, components, data visualizations, or full visual system. Keep
the privacy rules and access-level behaviors intact.

See [DESIGN_CHALLENGE.md](DESIGN_CHALLENGE.md) for the requirements and suggested
voting rubric. See [CONTRIBUTING.md](CONTRIBUTING.md) for the submission workflow.

## Architecture boundary

`src/services/clubApi.js` is the boundary between the interface and its data.
It currently returns mock records. Team designs should request data through this
service instead of importing the mock files directly into page components. That
makes it easier to connect the winning interface to the secured Apps Script
functions later.

This repository is not affiliated with or endorsed by the owners of the fictional
series referenced in its mock data.
