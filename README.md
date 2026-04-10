# 🌿 What Color Are You in My Garden?

A personality quiz web app that matches users to a color and a Texas native plant based on their answers. Built with Node.js, Express, and the Gemini AI API.

---

## What it does

Users answer 10 personality questions and receive a color result — from Green to Yellow — each paired with a Texas native plant. The Gemini API analyzes the full pattern of answers like a recommendation algorithm to find the best match, rather than simply tallying up scores.

The seven colors and their plant matches:

| Color | Plant Personality | Texas Native Plant |
|---|---|---|
| Green | The quiet backbone | Cedar Elm |
| Indigo | The calm constant | Blue Lobelia |
| Lavender | The unexpected burst | Mealy Blue Sage |
| White | The inspiring presence | Western Yarrow |
| Baby Pink | The universal fit | Prairie Phlox |
| Coral | The magnetic force | Whirling Butterflies |
| Yellow | The awaited bloom | Engelmann's Daisy |

---

## Features

- 10-question personality quiz with smooth progress tracking
- AI-powered color matching via Google Gemini 1.5 Flash
- Personalized one-sentence result explanation for each user
- Password-protected admin dashboard to view all submissions
- Rate limiting to protect against API abuse
- Fully responsive — works on mobile and desktop

---

## Tech stack

- **Backend:** Node.js, Express
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **AI:** Google Gemini 1.5 Flash API
- **Database:** Replit Database (key-value storage)
- **Hosting:** Replit
- **Version control:** GitHub

---

## Project structure

```
garden-quiz/
├── index.js          # Express server, API routes, Gemini integration
├── package.json      # Dependencies
└── public/
    └── index.html    # Full frontend quiz app
```

---

## Environment variables

Set these in Replit's Secrets panel before running:

| Key | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key from aistudio.google.com |
| `ADMIN_PASSWORD` | Password to access the admin submissions dashboard |

---

## Running locally

```bash
# Install dependencies
npm install

# Start the server
node index.js
```

Then open `http://localhost:3000` in your browser.

---

## Admin dashboard

The admin dashboard is accessible at the bottom of the landing page via the small "Admin access" link. It is password-protected and shows:

- Each person's name
- Their color result and plant match
- The date and time they took the quiz
- All 10 of their individual answers (expandable)

---

## Security

- The Gemini API key is stored server-side only and never exposed to the browser
- The admin password is stored as an environment secret
- Rate limiting is applied to both the quiz endpoint and admin login to prevent abuse
- All user input is sanitized before processing or storage

---

## Future improvements

- Persistent storage fix for deployed environment
- Shareable result cards
- Result statistics view in admin dashboard
