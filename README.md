<div align="center">

# Multi Screen

**Watch multiple videos simultaneously from YouTube, Twitch, TikTok, Instagram, and more — all in one screen.**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://youtube-multiscreen.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-gray?style=for-the-badge&logo=github)](https://github.com/MaulanaSandyy/youtube-multiscreen)

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Try_Now-red?style=for-the-badge)](https://youtube-multiscreen.vercel.app/)

</div>

---

## Overview

Multi Screen is a lightweight web application that lets you watch up to **10 videos simultaneously** from multiple platforms on a single screen. Perfect for monitoring multiple live streams, comparing content, or watching multiple creators at once — regardless of platform.

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, instant load.

---

## Supported Platforms

| Platform | Embed | Volume Control | Sync | Notes |
|----------|:-----:|:--------------:|:----:|-------|
| **YouTube** | ✅ | ✅ | ✅ | Full API support |
| **Twitch** | ✅ | ✅ | ⚠️ | Video & channel embeds |
| **TikTok** | ✅ | ❌ | ❌ | Video embeds |
| **Instagram** | ✅ | ❌ | ❌ | Posts & Reels |
| **Facebook** | ✅ | ❌ | ❌ | Facebook Watch videos |
| **Dailymotion** | ✅ | ✅ | ⚠️ | DM.Player API |
| **Vimeo** | ✅ | ✅ | ✅ | Vimeo.Player API |
| **Twitter/X** | ✅ | ❌ | ❌ | Tweet video embeds |
| **Kick** | ✅ | ❌ | ❌ | Video embeds |
| **Rumble** | ✅ | ❌ | ❌ | Video embeds |
| **Bilibili** | ✅ | ❌ | ❌ | BV video embeds |

**Legend:** ✅ Full support | ⚠️ Partial/Limited | ❌ Not supported

---

## Features

### Core

- **Multi-Platform** — Auto-detects YouTube, Twitch, TikTok, Instagram, Facebook, Dailymotion, Vimeo, Twitter/X, Kick, Rumble, and Bilibili
- **Multi-Video Grid** — Watch 2, 3, 4, 5, 6, 8, or 10 videos at once
- **Live Stream Support** — Fully compatible with YouTube & Twitch live streams
- **Sync Button** — Instantly sync all YouTube videos to the same playback position
- **Instant Setup** — Just paste links from any supported platform and hit Play

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
| `quality: small` | Forces 240p on YouTube — drastically reduces decode load |
| `controls: 0` | Hides YouTube player chrome — less rendering |
| `disablekb: 1` | Disables keyboard handlers — fewer events |
| Stagger load (500ms) | Players load sequentially — prevents CPU burst |
| `visibilitychange` API | Auto-pauses when tab is hidden — saves resources |
| Live sync with retry | Retry logic ensures all players sync correctly |

---

## Supported URL Formats

### YouTube
```
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
https://www.youtube.com/live/VIDEO_ID
https://www.youtube.com/embed/VIDEO_ID
https://www.youtube.com/shorts/VIDEO_ID
```

### Twitch
```
https://www.twitch.tv/videos/VIDEO_ID
https://www.twitch.tv/CHANNEL_NAME
```

### TikTok
```
https://www.tiktok.com/@user/video/VIDEO_ID
```

### Instagram
```
https://www.instagram.com/p/CODE/
https://www.instagram.com/reel/CODE/
```

### Facebook
```
https://www.facebook.com/watch?v=VIDEO_ID
https://www.facebook.com/user/videos/VIDEO_ID
https://fb.watch/VIDEO_ID
```

### Dailymotion
```
https://www.dailymotion.com/video/VIDEO_ID
https://dai.ly/VIDEO_ID
```

### Vimeo
```
https://vimeo.com/VIDEO_ID
```

### Twitter/X
```
https://twitter.com/user/status/TWEET_ID
https://x.com/user/status/TWEET_ID
```

### Kick
```
https://kick.com/video/VIDEO_ID
```

### Rumble
```
https://rumble.com/vVIDEO_ID
```

### Bilibili
```
https://www.bilibili.com/video/BV_ID
```

---

## Live Demo

**[https://youtube-multiscreen.vercel.app/](https://youtube-multiscreen.vercel.app/)**

### How to Use

1. Open the demo link
2. Select the number of videos (2-10)
3. Paste video links from any supported platform
4. Click **Play All**
5. Use the audio controls to adjust volume per video
6. Click **Sync** to align all YouTube videos to the same position

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| HTML | Semantic HTML5 |
| CSS | CSS3 with Flexbox & Grid |
| JavaScript | Vanilla ES6+ |
| Video Player | YouTube IFrame API, Twitch Embedded Player, Vimeo Player API, Dailymotion Player |
| Hosting | Vercel |
| Version Control | Git / GitHub |

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection
- Video URLs from supported platforms

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

## Project Structure

```
yt-multiscreen/
├── index.html      # Main HTML structure
├── style.css       # All styles (dark theme, responsive grid, platform badges)
├── script.js       # Core logic (platform detection, player management, sync, audio)
└── README.md       # This file
```

---

## Performance Tips

For the best experience with 6+ live streams:

1. **Use a wired connection** — Live streams consume significant bandwidth
2. **Close unused tabs** — Each iframe runs a full player instance
3. **Keep quality on `small`** — Already optimized by default for YouTube
4. **Use the Sync button** — Keeps all YouTube streams at the same live edge
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
