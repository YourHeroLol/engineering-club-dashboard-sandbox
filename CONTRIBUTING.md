# Contributing to the dashboard challenge

## Recommended workflow

1. Fork this repository to your own GitHub account.
2. Clone your fork in VS Code.
3. Create a branch named `design/your-name`.
4. Run `npm install` and `npm run dev`.
5. Build and test your dashboard using only the supplied fictional data.
6. Run `npm run check` before submitting.
7. Submit your fork URL and a short design explanation to the software team.

## Required boundaries

- Never add real student data.
- Never connect a fork to the production spreadsheet or Apps Script project.
- Never commit credentials, cookies, authentication tokens, `.env` files, or
  private URLs.
- Keep registered-member, officer, and executive-officer access visibly distinct.
- Standard officers must not receive phone numbers from the mock service.
- Preserve keyboard navigation and readable color contrast.
- Do not commit `node_modules` or the generated `dist` directory.

## Suggested commit messages

Use brief descriptions of the actual change:

```text
Add mobile roster filters
Redesign officer overview cards
Improve keyboard focus states
Add empty state for events
```

## Submission notes

Include the following in your fork's README or submission message:

- What problem your design solves
- Your intended audience
- The pages you changed
- Accessibility or mobile considerations
- Anything you would change before production
