let videoCount = 6;
let players = {};
let playerReadyCount = 0;
let masterVolume = 100;
let videoVolumes = {};
let videoMuted = {};
let allMuted = false;
let loading = false;
let liveFlags = {};

const countButtons = document.getElementById('countButtons');
const inputRow = document.getElementById('inputRow');
const videoGrid = document.getElementById('videoGrid');
const btnPlayAll = document.getElementById('btnPlayAll');
const btnPauseAll = document.getElementById('btnPauseAll');
const btnSyncAll = document.getElementById('btnSyncAll');
const btnClearAll = document.getElementById('btnClearAll');
const btnMuteAll = document.getElementById('btnMuteAll');
const masterVolumeSlider = document.getElementById('masterVolume');
const masterVal = document.getElementById('masterVal');
const perVideoVol = document.getElementById('perVideoVol');

// Platform colors for badges
const platformColors = {
    youtube: '#ff0000',
    twitch: '#9146ff',
    tiktok: '#000000',
    instagram: '#E4405F',
    facebook: '#1877F2',
    dailymotion: '#0066DC',
    vimeo: '#1AB7EA',
    twitter: '#1DA1F2',
    kick: '#53FC18',
    rumble: '#85C742',
    bilibili: '#00A1D6',
};

// Platform detection from URL
function detectPlatform(url) {
    if (!url) return null;
    url = url.trim().toLowerCase();
    if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
    if (/twitch\.tv/.test(url)) return 'twitch';
    if (/tiktok\.com/.test(url)) return 'tiktok';
    if (/instagram\.com/.test(url)) return 'instagram';
    if (/facebook\.com|fb\.watch/.test(url)) return 'facebook';
    if (/dailymotion\.com|dai\.ly/.test(url)) return 'dailymotion';
    if (/vimeo\.com/.test(url)) return 'vimeo';
    if (/twitter\.com|x\.com/.test(url)) return 'twitter';
    if (/kick\.com/.test(url)) return 'kick';
    if (/rumble\.com/.test(url)) return 'rumble';
    if (/bilibili\.com/.test(url)) return 'bilibili';
    return null;
}

// Extract video/channel ID from URL based on platform
function extractVideoInfo(url, platform) {
    if (!url) return null;
    url = url.trim();

    switch (platform) {
        case 'youtube': {
            const patterns = [
                /youtube\.com\/live\/([a-zA-Z0-9_-]+)/,
                /youtu\.be\/([a-zA-Z0-9_-]+)/,
                /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/,
                /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
                /youtube\.com\/v\/([a-zA-Z0-9_-]+)/,
                /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
            ];
            for (const p of patterns) {
                const m = url.match(p);
                if (m && m[1]) return { id: m[1], type: 'video' };
            }
            return null;
        }
        case 'twitch': {
            let m = url.match(/twitch\.tv\/videos\/(\d+)/);
            if (m) return { id: m[1], type: 'video' };
            m = url.match(/twitch\.tv\/([a-zA-Z0-9_]+)\/?$/);
            if (m && !['directory', 'settings', 'subscriptions', 'inventory', 'wallet', 'downloads', 'friends', 'prime', 'turbo', 'partners'].includes(m[1])) {
                return { id: m[1], type: 'channel' };
            }
            return null;
        }
        case 'tiktok': {
            const m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
            if (m) return { id: m[1], type: 'video' };
            return null;
        }
        case 'instagram': {
            let m = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
            if (m) return { id: m[1], type: 'post' };
            m = url.match(/instagram\.com\/tv\/([a-zA-Z0-9_-]+)/);
            if (m) return { id: m[1], type: 'post' };
            return null;
        }
        case 'facebook': {
            let m = url.match(/[?&]v=(\d+)/);
            if (m) return { id: m[1], type: 'video' };
            m = url.match(/facebook\.com\/.*?\/videos\/(\d+)/);
            if (m) return { id: m[1], type: 'video' };
            m = url.match(/fb\.watch\/([a-zA-Z0-9_-]+)/);
            if (m) return { id: m[1], type: 'video' };
            return { id: url, type: 'video', useUrl: true };
        }
        case 'dailymotion': {
            let m = url.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
            if (m) return { id: m[1], type: 'video' };
            m = url.match(/dai\.ly\/([a-zA-Z0-9]+)/);
            if (m) return { id: m[1], type: 'video' };
            return null;
        }
        case 'vimeo': {
            const m = url.match(/vimeo\.com\/(\d+)/);
            if (m) return { id: m[1], type: 'video' };
            return null;
        }
        case 'twitter': {
            const m = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
            if (m) return { id: m[1], type: 'tweet' };
            return null;
        }
        case 'kick': {
            const m = url.match(/kick\.com\/video\/([a-zA-Z0-9_-]+)/);
            if (m) return { id: m[1], type: 'video' };
            return null;
        }
        case 'rumble': {
            const m = url.match(/rumble\.com\/v([a-zA-Z0-9_-]+)/);
            if (m) return { id: m[1], type: 'video' };
            return null;
        }
        case 'bilibili': {
            const m = url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/);
            if (m) return { id: m[1], type: 'video' };
            return null;
        }
        default:
            return null;
    }
}

function generateInputs() {
    inputRow.innerHTML = '';
    for (let i = 0; i < videoCount; i++) {
        const g = document.createElement('div');
        g.className = 'input-group';
        g.innerHTML = '<input type="text" id="input-' + i + '" placeholder="YouTube, Twitch, TikTok, IG... Link #' + (i + 1) + '" /><button class="btn-x" data-i="' + i + '">&times;</button>';
        inputRow.appendChild(g);
    }
    inputRow.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') playAll(); });
    });
    inputRow.querySelectorAll('.btn-x').forEach(btn => {
        btn.addEventListener('click', e => {
            document.getElementById('input-' + e.target.dataset.i).value = '';
        });
    });
}

function generateGrid() {
    videoGrid.innerHTML = '';
    videoGrid.className = 'video-grid count-' + videoCount;
    for (let i = 0; i < videoCount; i++) {
        const s = document.createElement('div');
        s.className = 'video-slot empty';
        s.id = 'slot-' + i;
        s.innerHTML = '<div class="video-label">Video ' + (i + 1) + '</div><span>Video ' + (i + 1) + '</span>';
        videoGrid.appendChild(s);
    }
}

function generatePerVideoVol() {
    perVideoVol.innerHTML = '';
    for (let i = 0; i < videoCount; i++) {
        videoVolumes[i] = 100;
        videoMuted[i] = false;
        const d = document.createElement('div');
        d.className = 'pv-item';
        d.innerHTML = '<span class="pv-label">V' + (i + 1) + '</span><button class="btn-mute" data-i="' + i + '">🔊</button><input type="range" min="0" max="100" value="100" data-i="' + i + '" /><span class="vol-text">100%</span>';
        perVideoVol.appendChild(d);
    }
    perVideoVol.querySelectorAll('input[type="range"]').forEach(s => {
        s.addEventListener('input', e => {
            const idx = +e.target.dataset.i;
            videoVolumes[idx] = +e.target.value;
            e.target.parentElement.querySelector('.vol-text').textContent = e.target.value + '%';
            applyVolume(idx);
        });
    });
    perVideoVol.querySelectorAll('.btn-mute').forEach(b => {
        b.addEventListener('click', e => {
            const idx = +e.target.dataset.i;
            videoMuted[idx] = !videoMuted[idx];
            e.target.textContent = videoMuted[idx] ? '🔇' : '🔊';
            e.target.classList.toggle('muted', videoMuted[idx]);
            applyVolume(idx);
        });
    });
}

function applyVolume(idx) {
    const p = players[idx];
    if (!p) return;

    const muted = videoMuted[idx] || allMuted;
    const vol = Math.round((videoVolumes[idx] / 100) * masterVolume);

    if (p._platform === 'youtube') {
        if (muted) { p.mute(); } else { p.unMute(); p.setVolume(vol); }
    } else if (p._platform === 'twitch') {
        if (p.setMuted) p.setMuted(muted);
        if (!muted && p.setVolume) p.setVolume(vol / 100);
    } else if (p._platform === 'vimeo') {
        if (muted) { p.setMuted(true); } else { p.setMuted(false); p.setVolume(vol / 100); }
    } else if (p._platform === 'dailymotion') {
        if (p.setMuted) p.setMuted(muted);
        if (!muted && p.setVolume) p.setVolume(vol / 100);
    }
}

function applyAllVolumes() {
    for (const idx in players) applyVolume(+idx);
}

// Player creation functions per platform
function createYouTubePlayer(slot, videoId, index, isLive) {
    players[index] = null;

    function buildPlayer() {
        try {
            players[index] = new YT.Player('player-' + index, {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    rel: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    playsinline: 1,
                    disablekb: 1,
                    fs: 0,
                    cc_load_policy: 0,
                    origin: window.location.origin,
                    quality: 'small',
                },
                events: {
                    onReady: function () {
                        playerReadyCount++;
                        players[index]._platform = 'youtube';
                        applyVolume(index);
                    },
                    onError: function (e) {
                        console.warn('YouTube Player ' + index + ' error:', e.data);
                    },
                },
            });
            players[index]._platform = 'youtube';
        } catch (err) {
            console.warn('Failed to create YouTube player ' + index, err);
        }
    }

    // If YouTube API is fully loaded, create player directly
    if (window.YT && window.YT.Player) {
        buildPlayer();
    } else if (window._ytPlayerCallbacksDone) {
        // API was loaded before but queue was already processed
        // This shouldn't happen, but handle it gracefully
        buildPlayer();
    } else {
        // Queue the callback for when YouTube API is ready
        window._ytPlayerQueue = window._ytPlayerQueue || [];
        window._ytPlayerQueue.push(buildPlayer);
    }
}

function createTwitchPlayer(slot, id, index, type) {
    const domain = window.location.hostname;
    const src = type === 'channel'
        ? `https://player.twitch.tv/?channel=${id}&parent=${domain}&muted=false&autoplay=false`
        : `https://player.twitch.tv/?video=v${id}&parent=${domain}&muted=false&autoplay=false`;

    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = {
        _platform: 'twitch',
        _iframe: iframe,
        _muted: false,
        _volume: 1,
        setVolume: function (v) { this._volume = v; },
        setMuted: function (m) { this._muted = m; },
        getVolume: function (cb) { cb(this._volume); },
        isMuted: function (cb) { cb(this._muted); },
    };
    playerReadyCount++;
}

function createTikTokPlayer(slot, videoId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.tiktok.com/embed/v2/${videoId}`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = { _platform: 'tiktok', _iframe: iframe };
    playerReadyCount++;
}

function createInstagramPlayer(slot, shortcode, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.instagram.com/p/${shortcode}/embed/`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = { _platform: 'instagram', _iframe: iframe };
    playerReadyCount++;
}

function createFacebookPlayer(slot, videoId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video/video.php?v=${videoId}&width=&show_text=false&height=`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = { _platform: 'facebook', _iframe: iframe };
    playerReadyCount++;
}

function createDailymotionPlayer(slot, videoId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=0`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = {
        _platform: 'dailymotion',
        _iframe: iframe,
        _muted: false,
        _volume: 1,
        setVolume: function (v) { this._volume = v; },
        setMuted: function (m) { this._muted = m; },
    };
    playerReadyCount++;
}

function createVimeoPlayer(slot, videoId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = {
        _platform: 'vimeo',
        _iframe: iframe,
        _muted: false,
        _volume: 1,
        setVolume: function (v) { this._volume = v; },
        setMuted: function (m) { this._muted = m; },
    };
    playerReadyCount++;
}

function createTwitterPlayer(slot, tweetId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&autoplay=false`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = { _platform: 'twitter', _iframe: iframe };
    playerReadyCount++;
}

function createKickPlayer(slot, videoId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://kick.com/embed/${videoId}`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = { _platform: 'kick', _iframe: iframe };
    playerReadyCount++;
}

function createRumblePlayer(slot, videoId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://rumble.com/embed/v${videoId}/`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = { _platform: 'rumble', _iframe: iframe };
    playerReadyCount++;
}

function createBilibiliPlayer(slot, videoId, index) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.bilibili.com/player.html?bvid=${videoId}&autoplay=0&high_quality=1`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    slot.appendChild(iframe);

    players[index] = { _platform: 'bilibili', _iframe: iframe };
    playerReadyCount++;
}

function loadVideos() {
    if (loading) return;
    loading = true;
    players = {};
    playerReadyCount = 0;
    allMuted = false;
    btnMuteAll.textContent = '🔊';

    const validVideos = [];
    let hasYouTube = false;

    for (let i = 0; i < videoCount; i++) {
        const inp = document.getElementById('input-' + i);
        const url = inp ? inp.value : '';
        const platform = detectPlatform(url);
        if (platform) {
            const info = extractVideoInfo(url, platform);
            if (info) {
                const isLive = url.includes('/live') || url.includes('live=1');
                validVideos.push({ index: i, platform, info, isLive });
                liveFlags[i] = isLive;
                if (platform === 'youtube') hasYouTube = true;
            }
        }
    }

    // Load YouTube IFrame API only if needed and not already loaded
    if (hasYouTube && (!window.YT || !window.YT.Player)) {
        window._ytPlayerQueue = [];
        window._ytPlayerCallbacksDone = false;
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);

        window.onYouTubeIframeAPIReady = function () {
            window._ytPlayerCallbacksDone = true;
            const queue = window._ytPlayerQueue || [];
            window._ytPlayerQueue = [];
            queue.forEach(function (fn) { fn(); });
        };
    }

    // Stagger load players
    validVideos.forEach((v, delay) => {
        setTimeout(() => {
            const slot = document.getElementById('slot-' + v.index);
            if (!slot) return;
            slot.className = 'video-slot active';

            const label = document.createElement('div');
            label.className = 'video-label';
            label.textContent = 'Video ' + (v.index + 1);

            const badge = document.createElement('div');
            badge.className = 'platform-badge ' + v.platform;
            badge.textContent = v.platform.charAt(0).toUpperCase() + v.platform.slice(1);

            const playerContainer = document.createElement('div');
            playerContainer.id = 'player-' + v.index;
            playerContainer.style.width = '100%';
            playerContainer.style.height = '100%';

            slot.innerHTML = '';
            slot.appendChild(label);
            slot.appendChild(badge);
            slot.appendChild(playerContainer);

            switch (v.platform) {
                case 'youtube':
                    createYouTubePlayer(slot, v.info.id, v.index, v.isLive);
                    break;
                case 'twitch':
                    createTwitchPlayer(playerContainer, v.info.id, v.index, v.info.type);
                    break;
                case 'tiktok':
                    createTikTokPlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'instagram':
                    createInstagramPlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'facebook':
                    createFacebookPlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'dailymotion':
                    createDailymotionPlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'vimeo':
                    createVimeoPlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'twitter':
                    createTwitterPlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'kick':
                    createKickPlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'rumble':
                    createRumblePlayer(playerContainer, v.info.id, v.index);
                    break;
                case 'bilibili':
                    createBilibiliPlayer(playerContainer, v.info.id, v.index);
                    break;
            }
        }, delay * 500);
    });

    setTimeout(() => { loading = false; }, validVideos.length * 500 + 1000);
}

function playAll() {
    if (Object.keys(players).length === 0) {
        loadVideos();
    } else {
        for (const idx in players) {
            const p = players[idx];
            if (!p) continue;
            if (p._platform === 'youtube' && p.playVideo) p.playVideo();
            // Other platforms: iframes auto-play on user interaction
        }
    }
}

function pauseAll() {
    for (const idx in players) {
        const p = players[idx];
        if (!p) continue;
        if (p._platform === 'youtube' && p.pauseVideo) p.pauseVideo();
    }
}

function syncAll() {
    const targets = {};

    for (const idx in players) {
        const p = players[idx];
        if (!p || p._platform !== 'youtube') continue;
        if (!p.getDuration || !p.getCurrentTime) continue;
        const dur = p.getDuration();
        const cur = p.getCurrentTime();

        if (liveFlags[idx]) {
            if (dur > 0) targets[idx] = dur - 2;
        } else {
            targets[idx] = cur;
        }
    }

    let latest = 0;
    for (const idx in targets) {
        if (liveFlags[idx]) continue;
        if (targets[idx] > latest) latest = targets[idx];
    }

    function doSeek() {
        for (const idx in players) {
            const p = players[idx];
            if (!p || p._platform !== 'youtube' || !p.seekTo) continue;
            const target = liveFlags[idx] ? targets[idx] : latest;
            if (target === undefined || target <= 0) continue;
            try { p.seekTo(target, true); } catch (e) { }
        }
    }

    doSeek();
    setTimeout(doSeek, 500);
}

function clearAll() {
    for (const idx in players) {
        const p = players[idx];
        if (p && p.destroy) p.destroy();
    }
    players = {};
    videoVolumes = {};
    videoMuted = {};
    liveFlags = {};
    allMuted = false;
    loading = false;
    btnMuteAll.textContent = '🔊';
    generateInputs();
    generateGrid();
    generatePerVideoVol();
}

// Event Listeners
countButtons.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        countButtons.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        videoCount = +e.target.dataset.count;
        generateInputs();
        generateGrid();
        generatePerVideoVol();
    }
});

btnPlayAll.addEventListener('click', playAll);
btnPauseAll.addEventListener('click', pauseAll);
btnSyncAll.addEventListener('click', syncAll);
btnClearAll.addEventListener('click', clearAll);

masterVolumeSlider.addEventListener('input', e => {
    masterVolume = +e.target.value;
    masterVal.textContent = masterVolume + '%';
    applyAllVolumes();
});

btnMuteAll.addEventListener('click', () => {
    allMuted = !allMuted;
    btnMuteAll.textContent = allMuted ? '🔇' : '🔊';
    applyAllVolumes();
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAll();
});

// Init
generateInputs();
generateGrid();
generatePerVideoVol();
