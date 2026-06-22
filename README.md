<div align="center">

# YT Multi Screen

**Watch multiple YouTube videos simultaneously in one screen**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://yt-multiscrene.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-gray?style=for-the-badge&logo=github)](https://github.com/MaulanaSandyy/youtube-multiscreen)

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Try_Now-red?style=for-the-badge)](https://yt-multiscrene.vercel.app/)

</div>

---

## Overview

YT Multi Screen is a lightweight web application that lets you watch up to **10 YouTube videos simultaneously** on a single screen. Perfect for monitoring multiple live streams, comparing content, or watching multiple creators at once.

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, instant load.

---

## Features

### Core

- **Multi-Video Grid** — Watch 2, 3, 4, 5, 6, 8, or 10 videos at once
- **Live Stream Support** — Fully compatible with YouTube live streams
- **Sync Button** — Instantly sync all videos to the same playback position
- **Instant Setup** — Just paste YouTube links and hit Play

### Audio Control

| Control | Description |
|---------|-------------|
| **Master Volume** | Control overall volume for all videos |
| **Per-Video Volume** | Individual volume slider for each video (V1, V2, V3...) |
| **Mute/Unmute** | Toggle audio per video or globally |
| **Mute All / Unmute All** | One-click bulk audio control |

### CPU Optimizations

| Optimization | Impact |
|-------------|--------|
| `quality: small` | Forces 240p — drastically reduces decode load |
| `controls: 0` | Hides YouTube player chrome — less rendering |
| `disablekb: 1` | Disables keyboard handlers — fewer events |
| Stagger load (500ms) | Players load sequentially — prevents CPU burst |
| `visibilitychange` API | Auto-pauses when tab is hidden — saves resources |
| Live sync with retry | Retry logic ensures all players sync correctly |

---

## Live Demo

**[https://yt-multiscrene.vercel.app/](https://yt-multiscrene.vercel.app/)**

### How to Use

1. Open the demo link
2. Select the number of videos (2-10)
3. Paste YouTube links into the input fields
4. Click **Play All**
5. Use the audio controls to adjust volume per video
6. Click **Sync** to align all videos to the same position

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| HTML | Semantic HTML5 |
| CSS | CSS3 with Flexbox & Grid |
| JavaScript | Vanilla ES6+ |
| Video Player | YouTube IFrame API |
| Hosting | Vercel |
| Version Control | Git / GitHub |

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection
- YouTube video URLs

### Run Locally

```bash
# Clone the repository
git clone https://github.com/MaulanaSandyy/youtube-multiscreen.git

# Navigate to project directory
cd youtube-multiscreen

# Start a local server (Python)
python -m http.server 8080

# Or with Node.js
npx serve .
```

Open `http://localhost:8080` in your browser.

---

## Supported YouTube URL Formats

```
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
https://www.youtube.com/live/VIDEO_ID
https://www.youtube.com/embed/VIDEO_ID
https://www.youtube.com/shorts/VIDEO_ID
```

---

## Project Structure

```
yt-multiscreen/
├── index.html      # Main HTML structure
├── style.css       # All styles (dark theme, responsive grid)
├── script.js       # Core logic (player management, sync, audio)
└── README.md       # This file
```

---

## Performance Tips

For the best experience with 6+ live streams:

1. **Use a wired connection** — Live streams consume significant bandwidth
2. **Close unused tabs** — Each YouTube iframe runs a full player instance
3. **Keep quality on `small`** — Already optimized by default in the code
4. **Use the Sync button** — Keeps all streams at the same live edge
5. **Mute unused videos** — Muted players still decode video but save audio processing

---

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome | Fully supported |
| Firefox | Fully supported |
| Edge | Fully supported |
| Safari | Fully supported |
| Mobile | Partially supported (responsive layout) |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [MaulanaSandyy](https://github.com/MaulanaSandyy)**

[![Deploy to Vercel](https://img.shields.io/badge/Deploy_to-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/MaulanaSandyy/youtube-multiscreen)

</div>
