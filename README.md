# EventiGO Client

Frontend for a tech event management platform with live Q&A.

## Tech Stack

Next.js, React, TypeScript, Tailwind CSS, Socket.IO, next-themes

## Setup

```bash
git clone https://github.com/WeCode-WeNeverSleep/eventigo-client.git
cd eventigo-client
npm install
```

Create a `.env` file:

```env
API_URL=<backend_api_url>
DASHBOARD_URL=<admin_dashboard_url>
SOCKET_URL=<websocket_url>
```

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Pages

| Path                                                | Description                  |
| --------------------------------------------------- | ---------------------------- |
| `/`                                                 | Homepage with event cards    |
| `/events`                                           | All events listing           |
| `/events/:eventId/sessions`                         | Event sessions               |
| `/events/:eventId/sessions/:sessionId`              | Session detail + Q&A         |
| `/events/:eventId/schedule`                         | Day-by-day schedule          |
| `/events/:eventId/speakers`                         | Event speakers               |
| `/about`                                            | About page                   |

## Structure

```
app/          — Next.js pages
components/   — React components
hooks/        — useCountdown
lib/          — API client + Socket.IO
types/        — TypeScript interfaces
utils/        — Utility functions
```

## Contributors

### Rindra — [`rindraniaina`](https://github.com/rindraniaina)
*Project setup, Next.js configuration, Tailwind CSS, metadata*
- Project initialization (initial commit, create-next-app)
- Tailwind v3 → v4 migration
- Theme provider (dark/light mode)
- Sidebar component
- SessionCard component
- Session pages and layout
- Speaker component + API fetch
- QuestionForm and Q&A refactoring
- EventHeroCard
- MainCard functional buttons
- Sidebar action buttons
- Live page
- Not Found page (404)
- Speakers page per event
- Various fixes (client/server components, dark/light mode, ProfilePictureUrl, sidebar hover/active, card size)

### Jessy — [`jessyrand`](https://github.com/jessyrand)
*UI components, live Q&A, design system*
- Footer component
- EventCard component
- MainCard component
- Style adjustments and harmonization
- SpeakerCard component + SpeakerCardProps types
- Session page structure refactoring
- Live questions and upvotes
- Question form (session ID integration)
- Session details in hero card
- Speaker rendering from session data
- Animated live indicator (pulsing)
- Global loading UI (PageLoader)
- HeroCard background fix
- API environment variable renaming
- Utilities (Event interface, EventUtils, EventCard style)

### Manda — [`Manda Tiavina`](https://github.com/MandaTiavina)
*Navigation, static pages, API integration, documentation*
- Navbar components (landing + session)
- MainCard (session page)
- API interface extraction (types)
- Landing page
- Landing page layout polish
- Events API + type alignment
- Events page
- About page
- Project README

### Mayah — [`mayahNeko`](https://github.com/mayahNeko)
*Q&A, speakers, interactive schedule*
- QuestionForm, QuestionTypeBar
- Question deletion
- Speaker component (speaker section)
- Dynamic question form
- User name and createdAt display
- react-icons installation
- Event page with QuestionForm/SpeakerComponent
- **Schedule**: DayTabs, SessionRow, FeaturedSession, ScheduleView, EmptyState
- Date utilities (session grouping, formatting)
- Component sizing fixes
