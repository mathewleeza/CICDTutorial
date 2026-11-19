# CICDTutorial

A tip calculator with a full CI/CD pipeline on GitHub: unit tests, browser tests, and automatic deployment to GitHub Pages.

## What's in the repo

| Path | What it is |
|---|---|
| `app/index.html` | The tip calculator page |
| `app/tip.js` | The tip math, kept separate so it can be unit tested |
| `tests/unit/` | Unit tests for `tip.js` (Node's built-in test runner) |
| `tests/e2e/` | Browser tests that click through the real page (Playwright) |
| `.github/workflows/ci.yml` | The pipeline |
| `.github/pull_request_template.md` | Checklist shown on every new pull request |

## How the pipeline works

1. Create a branch, make changes, and open a pull request into `main`.
2. **CI:** GitHub Actions runs the unit tests and browser tests on the pull request.
3. **Merge:** once the tests pass, merge the pull request.
4. **CD:** after the merge, the tests run again on `main`, and if they pass the app is deployed to GitHub Pages.

## Running the tests on your computer

Install [Node.js](https://nodejs.org) 20 or newer, then:

```
npm test                          # unit tests
npm install                       # once, for the browser tests
npx playwright install chromium   # once, downloads the test browser
npm run test:e2e                  # browser tests
```
