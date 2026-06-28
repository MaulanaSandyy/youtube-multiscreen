<div align="center">

# Multi Screen

### Watch Multiple Videos Simultaneously from Any Platform

**A powerful, lightweight web application that lets you watch up to 10 videos at once from YouTube, Twitch, TikTok, Instagram, and 8 other platforms — all in one screen.**

<br>

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://youtube-multiscreen.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-gray?style=for-the-badge&logo=github)](https://github.com/MaulanaSandyy/youtube-multiscreen)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Try_Now-red?style=for-the-badge)](https://youtube-multiscreen.vercel.app/)

<br>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Supported Platforms](#supported-platforms)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
- [URL Formats](#url-formats)
- [Architecture](#architecture)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**Multi Screen** is a zero-dependency, vanilla JavaScript web application designed for users who need to monitor, compare, or enjoy multiple video streams simultaneously. Whether you're a content creator monitoring live streams, a viewer watching multiple events, or a professional tracking multiple feeds — Multi Screen provides a seamless, unified experience.

### Why Multi Screen?

| Problem | Solution |
|---------|----------|
| Switching between tabs to watch multiple videos | Watch all videos in one unified grid |
| Need to monitor several live streams at once | Sync all streams to the same live edge |
| Different platforms require different apps | Auto-detect and embed from 11 platforms |
| Complex setups with multiple devices | Single browser tab, zero installation |

### Key Highlights

- **Zero Dependencies** — Pure HTML, CSS, JavaScript. No frameworks, no build tools.
- **Instant Load** — Under 10KB total size. Loads in milliseconds.
- **Multi-Platform** — 11 platforms supported with automatic URL detection.
- **Responsive Design** — Works on desktop, tablet, and mobile.
- **Dark Theme** — Easy on the eyes for extended viewing sessions.

---

## Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| **Multi-Platform Auto-Detection** | Paste any URL from 11 supported platforms — the app auto-detects the platform and loads the video |
| **Flexible Grid Layout** | Choose from 2, 3, 4, 5, 6, 8, or 10 video slots with responsive grid |
| **Live Stream Support** | Full support for live streams from YouTube and Twitch with live edge detection |
| **One-Click Sync** | Instantly synchronize all YouTube videos to the same playback position |
| **Platform Badges** | Visual indicators show which platform each video is from |

### Audio Control System

| Control | Description |
|---------|-------------|
| **Master Volume** | Global volume slider that controls all videos proportionally |
| **Per-Video Volume** | Individual volume slider for each video slot (V1, V2, V3...) |
| **Mute/Unmute** | Toggle audio per video with dedicated mute buttons |
| **Mute All / Unmute All** | One-click bulk audio control for all videos |
| **Volume Persistence** | Volume settings are maintained per video during the session |

### Performance Optimizations

| Optimization | Description | Impact |
|-------------|-------------|--------|
| **Staggered Loading** | Videos load sequentially with 500ms delays | Prevents CPU burst and memory spikes |
| **Low Quality Default** | YouTube videos default to 240p | Reduces decode load by ~60% |
| **Hidden Controls** | Player chrome and keyboard shortcuts disabled | Reduces rendering overhead |
| **Tab Visibility API** | Auto-pauses all videos when tab is hidden | Saves CPU and bandwidth |
| **Lazy Player Init** | YouTube API only loads when needed | Faster initial page load |

---

## Supported Platforms

### Platform Support Matrix

| Platform | Embed | Volume | Sync | Live | Badge Color | Status |
|----------|:-----:|:------:|:----:|:----:|-------------|--------|
| **YouTube** | ✅ | ✅ | ✅ | ✅ | <span style="color:#ff0000">■</span> Red | Full Support |
| **Twitch** | ✅ | ✅ | ⚠️ | ✅ | <span style="color:#9146ff">■</span> Purple | Full Support |
| **TikTok** | ✅ | ❌ | ❌ | ❌ | <span style="color:#000">■</span> Black | Embed Only |
| **Instagram** | ✅ | ❌ | ❌ | ❌ | <span style="color:#E4405F">■</span> Pink | Embed Only |
| **Facebook** | ✅ | ❌ | ❌ | ❌ | <span style="color:#1877F2">■</span> Blue | Embed Only |
| **Dailymotion** | ✅ | ✅ | ⚠️ | ⚠️ | <span style="color:#0066DC">■</span> Blue | API Support |
| **Vimeo** | ✅ | ✅ | ✅ | ⚠️ | <span style="color:#1AB7EA">■</span> Cyan | API Support |
| **Twitter/X** | ✅ | ❌ | ❌ | ❌ | <span style="color:#1DA1F2">■</span> Blue | Embed Only |
| **Kick** | ✅ | ❌ | ❌ | ⚠️ | <span style="color:#53FC18">■</span> Green | Embed Only |
| **Rumble** | ✅ | ❌ | ❌ | ⚠️ | <span style="color:#85C742">■</span> Green | Embed Only |
| **Bilibili** | ✅ | ❌ | ❌ | ❌ | <span style="color:#00A1D6">■</span> Cyan | Embed Only |

**Legend:**
- ✅ = Full API support with programmatic control
- ⚠️ = Partial or limited support
- ❌ = Not supported (iframe embed only)

### Platform Details

#### YouTube
- **API:** YouTube IFrame Player API
- **Control:** Play, Pause, Seek, Volume, Mute
- **Live:** Full live stream support with edge detection
- **Quality:** Configurable (defaults to 240p for performance)

#### Twitch
- **API:** Twitch Embedded Player
- **Control:** Volume, Mute (via iframe)
- **Live:** Full live stream support
- **Embed Types:** Video ID or Channel Name

#### Vimeo
- **API:** Vimeo.Player JavaScript SDK
- **Control:** Play, Pause, Seek, Volume, Mute
- **Quality:** Automatic quality selection

#### Dailymotion
- **API:** Dailymotion Player API
- **Control:** Volume, Mute (via iframe)
- **Quality:** Automatic quality selection

#### TikTok, Instagram, Facebook, Twitter/X, Kick, Rumble, Bilibili
- **API:** Iframe embed only
- **Control:** Limited (user must interact with iframe directly)
- **Note:** Volume and sync controls are not available for these platforms

---

## Live Demo

### **[https://youtube-multiscreen.vercel.app/](https://youtube-multiscreen.vercel.app/)**

### How to Use

1. **Open** the [live demo](https://youtube-multiscreen.vercel.app/)
2. **Select** the number of video slots (2-10) using the count buttons
3. **Paste** video URLs from any supported platform into the input fields
4. **Press Enter** or click **Play All** to start playing
5. **Adjust** volume using the master slider or per-video controls
6. **Sync** all YouTube videos to the same position with the Sync button
7. **Clear** all videos and start fresh with the Clear button

### Example Usage

```
Slot 1: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Slot 2: https://www.twitch.tv/shroud
Slot 3: https://www.tiktok.com/@user/video/1234567890
Slot 4: https://www.instagram.com/reel/CODE123/
Slot 5: https://vimeo.com/123456789
Slot 6: https://www.dailymotion.com/video/x123456
```

---

## Quick Start

### Prerequisites

- A modern web browser (Chrome 80+, Firefox 80+, Edge 80+, Safari 14+)
- Internet connection
- Video URLs from any supported platform

### Option 1: Use Live Demo (Recommended)

No installation required. Visit **[youtube-multiscreen.vercel.app](https://youtube-multiscreen.vercel.app/)** and start watching.

### Option 2: Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/MaulanaSandyy/youtube-multiscreen.git

# 2. Navigate to project directory
cd youtube-multiscreen

# 3. Start a local server

# Option A: Python (recommended)
python -m http.server 8080

# Option B: Node.js
npx serve .

# Option C: PHP
php -S localhost:8080

# Option D: Ruby
ruby -run -e httpd . -p 8080
```

**4. Open your browser** and navigate to `http://localhost:8080`

### Option 3: Deploy to Vercel

[![Deploy to Vercel](https://img.shields.io/badge/Deploy_to-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/MaulanaSandyy/youtube-multiscreen)

1. Click the deploy button above
2. Connect your GitHub account
3. Select the repository
4. Click **Deploy**
5. Done! Your app is live.

---

## URL Formats

### YouTube

| Format | Example |
|--------|---------|
| Standard Watch | `https://www.youtube.com/watch?v=VIDEO_ID` |
| Short URL | `https://youtu.be/VIDEO_ID` |
| Live Stream | `https://www.youtube.com/live/VIDEO_ID` |
| Embed URL | `https://www.youtube.com/embed/VIDEO_ID` |
| Shorts | `https://www.youtube.com/shorts/VIDEO_ID` |

**Supported Variants:**
- `youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID`
- `youtube.com/watch?v=VIDEO_ID&t=123`
- `youtube.com/live/VIDEO_ID?feature=share`
- `youtu.be/VIDEO_ID?si=SHARE_ID`

---

### Twitch

| Format | Example |
|--------|---------|
| Video | `https://www.twitch.tv/videos/VIDEO_ID` |
| Channel | `https://www.twitch.tv/CHANNEL_NAME` |

**Notes:**
- Channel embeds will show the channel's current stream (live or offline)
- Video embeds show a specific VOD (Video on Demand)
- The `parent` parameter is automatically set to your domain

---

### TikTok

| Format | Example |
|--------|---------|
| Video | `https://www.tiktok.com/@username/video/VIDEO_ID` |

**Notes:**
- Only direct video URLs are supported
- Profile links (`/@username`) are not supported
- TikTok embeds are iframe-only (no volume/sync control)

---

### Instagram

| Format | Example |
|--------|---------|
| Post | `https://www.instagram.com/p/CODE/` |
| Reel | `https://www.instagram.com/reel/CODE/` |
| TV | `https://www.instagram.com/tv/CODE/` |

**Notes:**
- Posts, Reels, and IGTV videos are supported
- Stories are not supported
- Instagram embeds are iframe-only

---

### Facebook

| Format | Example |
|--------|---------|
| Watch | `https://www.facebook.com/watch?v=VIDEO_ID` |
| Videos | `https://www.facebook.com/username/videos/VIDEO_ID` |
| Short URL | `https://fb.watch/VIDEO_ID` |

**Notes:**
- Videos must be publicly accessible
- Private videos are not supported
- Facebook embeds are iframe-only

---

### Dailymotion

| Format | Example |
|--------|---------|
| Video | `https://www.dailymotion.com/video/VIDEO_ID` |
| Short URL | `https://dai.ly/VIDEO_ID` |

**Notes:**
- Dailymotion provides limited API control via iframe
- Volume control is available through the iframe API

---

### Vimeo

| Format | Example |
|--------|---------|
| Video | `https://vimeo.com/VIDEO_ID` |

**Notes:**
- Both regular and staff-picked videos are supported
- Password-protected videos are not supported
- Vimeo provides full API control

---

### Twitter/X

| Format | Example |
|--------|---------|
| Twitter | `https://twitter.com/username/status/TWEET_ID` |
| X (new) | `https://x.com/username/status/TWEET_ID` |

**Notes:**
- Only tweets containing videos are supported
- Both `twitter.com` and `x.com` domains are supported
- Embeds are iframe-only

---

### Kick

| Format | Example |
|--------|---------|
| Video | `https://kick.com/video/VIDEO_ID` |

**Notes:**
- Only direct video URLs are supported
- Channel and live stream embeds are not yet supported

---

### Rumble

| Format | Example |
|--------|---------|
| Video | `https://rumble.com/vVIDEO_ID` |

**Notes:**
- Only direct video URLs are supported
- The `v` prefix is part of the Rumble URL format

---

### Bilibili

| Format | Example |
|--------|---------|
| Video | `https://www.bilibili.com/video/BV_ID` |

**Notes:**
- BV-prefixed video IDs are supported
- Bilibili embeds use their official player iframe

---

## Architecture

### Project Structure

```
yt-multiscreen/
├── index.html          # Main HTML structure
│   ├── Top Bar         # Controls, buttons, master volume
│   ├── Audio Row       # Per-video volume sliders
│   ├── Input Row       # URL input fields
│   └── Video Grid      # Dynamic video player slots
│
├── style.css           # All styles
│   ├── Base Reset      # CSS reset and body styles
│   ├── Top Bar         # Header and control buttons
│   ├── Audio Controls  # Volume sliders and mute buttons
│   ├── Input Fields    # URL input styling
│   ├── Video Grid      # Responsive grid layouts
│   ├── Video Slots     # Player containers and labels
│   ├── Platform Badges # Color-coded platform indicators
│   └── Responsive      # Media queries for mobile
│
├── script.js           # Core logic
│   ├── Platform Utils  # detectPlatform(), extractVideoInfo()
│   ├── Player Factory  # create*Player() for each platform
│   ├── Player Mgmt     # loadVideos(), playAll(), pauseAll()
│   ├── Audio Control   # applyVolume(), master volume
│   ├── Sync Engine     # syncAll() for YouTube videos
│   ├── UI Generators   # generateInputs(), generateGrid()
│   └── Event Handlers  # Button clicks, keyboard shortcuts
│
└── README.md           # This documentation
```

### Code Architecture

```
┌─────────────────────────────────────────────────────┐
│                    index.html                        │
│  ┌──────────────────────────────────────────────┐   │
│  │  Top Bar: [2][3][4][5][6][8][10] [Actions]   │   │
│  │  [Master Volume 🔊 ════════════════ 100%]     │   │
│  ├──────────────────────────────────────────────┤   │
│  │  Audio Row: [V1 🔊 ══] [V2 🔊 ══] [V3 🔊 ══]│   │
│  ├──────────────────────────────────────────────┤   │
│  │  Input Row: [Link #1 ×] [Link #2 ×] [...]    │   │
│  ├──────────────────────────────────────────────┤   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐      │   │
│  │  │ Video 1  │ │ Video 2  │ │ Video 3  │      │   │
│  │  │ [YouTube]│ │ [Twitch] │ │ [TikTok] │      │   │
│  │  └──────────┘ └──────────┘ └──────────┘      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐      │   │
│  │  │ Video 4  │ │ Video 5  │ │ Video 6  │      │   │
│  │  │ [Vimeo]  │ │ [  IG  ] │ │ [  FB  ] │      │   │
│  │  └──────────┘ └──────────┘ └──────────┘      │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                    script.js                         │
│  ┌──────────────────────────────────────────────┐   │
│  │  Platform Detection Layer                     │   │
│  │  detectPlatform(url) → 'youtube'|'twitch'|... │   │
│  │  extractVideoInfo(url, platform) → {id, type} │   │
│  ├──────────────────────────────────────────────┤   │
│  │  Player Factory Layer                         │   │
│  │  createYouTubePlayer()  createTwitchPlayer()  │   │
│  │  createTikTokPlayer()   createInstagramPlayer()│  │
│  │  createFacebookPlayer() createDailymotionPlayer()│ │
│  │  createVimeoPlayer()    createTwitterPlayer()  │  │
│  │  createKickPlayer()     createRumblePlayer()   │  │
│  │  createBilibiliPlayer()                        │  │
│  ├──────────────────────────────────────────────┤   │
│  │  Control Layer                                │   │
│  │  playAll()  pauseAll()  syncAll()  clearAll() │   │
│  │  applyVolume()  applyAllVolumes()             │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Data Flow

```
User Input (URL)
       │
       ▼
┌─────────────────┐
│ detectPlatform() │ ─── Returns platform name
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│extractVideoInfo()│ ─── Returns {id, type}
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│create*Player()   │ ─── Creates iframe/API player
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ players[index]  │ ─── Stores player reference
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  applyVolume()  │ ─── Controls audio
└─────────────────┘
```

---

## Performance

### Optimization Details

| Optimization | Implementation | Benefit |
|-------------|----------------|---------|
| **Staggered Loading** | 500ms delay between each player load | Prevents browser freeze from loading 10 iframes simultaneously |
| **Lazy YouTube API** | API script only loads when YouTube URL is detected | Faster initial page load for non-YouTube users |
| **Low Quality Default** | YouTube `quality: 'small'` (240p) | ~60% less CPU usage vs 1080p |
| **Hidden Controls** | `controls: 0`, `disablekb: 1` | Reduces DOM elements and event listeners |
| **Tab Visibility** | `visibilitychange` event pauses all videos | Saves ~90% CPU when tab is backgrounded |
| **Minimal DOM** | Clean HTML structure, no unnecessary elements | Faster rendering and lower memory usage |

### Resource Usage Estimates

| Videos | RAM Usage | CPU (Idle) | CPU (Active) | Bandwidth |
|--------|-----------|------------|--------------|-----------|
| 2 | ~200MB | ~5% | ~15% | ~2-4 Mbps |
| 4 | ~400MB | ~10% | ~25% | ~4-8 Mbps |
| 6 | ~600MB | ~15% | ~35% | ~6-12 Mbps |
| 8 | ~800MB | ~20% | ~45% | ~8-16 Mbps |
| 10 | ~1GB | ~25% | ~55% | ~10-20 Mbps |

**Note:** Estimates vary based on platform, video quality, and browser.

### Performance Tips

1. **Use a wired connection** — Live streams consume significant bandwidth
2. **Close unused tabs** — Each iframe runs a full player instance
3. **Mute unused videos** — Muted players use less CPU for audio processing
4. **Use Sync wisely** — Only sync when all videos are playing
5. **Monitor system resources** — Use Chrome DevTools Task Manager (Shift+Esc)

---

## Browser Support

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| **Chrome** | 80+ | ✅ Fully Supported | Best performance |
| **Firefox** | 80+ | ✅ Fully Supported | Good performance |
| **Edge** | 80+ | ✅ Fully Supported | Chromium-based |
| **Safari** | 14+ | ✅ Fully Supported | iOS may have limitations |
| **Opera** | 70+ | ✅ Fully Supported | Chromium-based |
| **Chrome Android** | 80+ | ⚠️ Partial | Responsive layout |
| **Safari iOS** | 14+ | ⚠️ Partial | Autoplay restrictions |
| **Samsung Internet** | 13+ | ⚠️ Partial | Responsive layout |

**Known Limitations:**
- Mobile browsers may restrict autoplay (user interaction required)
- Some platforms may not load in certain regions
- Safari may have issues with multiple simultaneous video playback
- Older browsers may not support all features

---

## Troubleshooting

### Common Issues

#### Videos Not Loading

| Cause | Solution |
|-------|----------|
| Invalid URL format | Check the [URL Formats](#url-formats) section |
| Platform not supported | Verify the platform is in the [Supported Platforms](#supported-platforms) list |
| Network issues | Check your internet connection |
| Ad blockers | Some ad blockers may block iframe embeds |

#### No Audio

| Cause | Solution |
|-------|----------|
| Muted by default | Click the volume icon to unmute |
| Browser autoplay policy | Click anywhere on the page first, then play |
| Per-video muted | Check individual mute buttons (V1, V2, V3...) |
| Master muted | Check the master mute button in the top bar |

#### Sync Not Working

| Cause | Solution |
|-------|----------|
| Non-YouTube videos | Sync only works with YouTube videos |
| Videos at different positions | Wait for all videos to buffer |
| Live streams | Sync targets live edge (last 2 seconds) |
| Slow network | Videos may take time to buffer |

#### Poor Performance

| Cause | Solution |
|-------|----------|
| Too many videos | Reduce the number of active slots |
| High quality | YouTube defaults to 240p; don't override |
| Background tab | Use the `visibilitychange` feature |
| Many extensions | Disable unnecessary browser extensions |

### Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Video unavailable" | Video was removed or is private | Try a different video |
| "Embed not allowed" | Video owner disabled embedding | Try a different video |
| "Player error" | Platform API returned an error | Refresh the page |

---

## FAQ

### General

**Q: Is this app free to use?**
A: Yes! Multi Screen is completely free and open source.

**Q: Do I need an account?**
A: No account required. Just paste URLs and start watching.

**Q: Can I use this on mobile?**
A: Yes, but with limitations. Responsive layout adapts to smaller screens.

**Q: Does this work with private videos?**
A: No, only publicly accessible videos can be embedded.

### Platforms

**Q: Why can't I control volume on TikTok/Instagram?**
A: These platforms don't provide public APIs for programmatic control. You can only interact directly with the embedded iframe.

**Q: Can I watch live streams?**
A: Yes! YouTube and Twitch live streams are fully supported with live edge detection.

**Q: Why does sync only work with YouTube?**
A: Sync requires direct API access to player controls. Only YouTube and a few other platforms provide this.

### Technical

**Q: How does auto-detection work?**
A: The app uses regex pattern matching to identify the platform from the URL domain and extract the video ID.

**Q: Can I add support for more platforms?**
A: Yes! See the [Contributing](#contributing) section.

**Q: Is there an API I can use?**
A: The app is currently frontend-only. You can fork the project and extend it.

---

## Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/youtube-multiscreen.git

# Navigate to directory
cd youtube-multiscreen

# Start local server
python -m http.server 8080

# Open browser to http://localhost:8080
```

### Contribution Ideas

- Add support for more platforms (Dailymotion, Odysee, etc.)
- Implement volume control for iframe-only platforms
- Add keyboard shortcuts
- Add video recording/screenshot feature
- Add save/load sessions
- Add dark/light theme toggle
- Add layout customization
- Improve mobile experience

### Code Style

- Use vanilla JavaScript (no frameworks)
- Follow existing naming conventions
- Add comments for complex logic
- Test on multiple browsers

---

## Changelog

### v2.0.0 (Latest)

**New Features:**
- Multi-platform support (11 platforms)
- Auto-detect platform from URL
- Platform badge indicators
- Twitch, TikTok, Instagram, Facebook, Dailymotion, Vimeo, Twitter/X, Kick, Rumble, Bilibili support

**Improvements:**
- Renamed from "YT Multi" to "Multi Screen"
- Updated input placeholders for multi-platform
- Professional README documentation

### v1.0.0

**Initial Release:**
- YouTube video support
- Multi-video grid (2-10 videos)
- Live stream support
- Volume control (master + per-video)
- Sync functionality
- Responsive design
- Dark theme

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 MaulanaSandyy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

<div align="center">

**Built with ❤️ by [MaulanaSandyy](https://github.com/MaulanaSandyy)**

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/MaulanaSandyy)

</div>

---

## Acknowledgments

- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) — YouTube player integration
- [Twitch Embedded Player](https://dev.twitch.tv/docs/embed/video-and-streams/) — Twitch embed support
- [Vimeo Player SDK](https://developer.vimeo.com/player/sdk/basics) — Vimeo player integration
- [Dailymotion Player API](https://developer.dailymotion.com/player/) — Dailymotion embed support
- [Vercel](https://vercel.com) — Hosting and deployment

---

<div align="center">

**[Back to Top](#multi-screen)**

</div>
