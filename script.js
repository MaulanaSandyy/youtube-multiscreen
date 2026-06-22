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

function extractVideoId(url) {
    if (!url) return null;
    url = url.trim();
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
        if (m && m[1]) return m[1];
    }
    return null;
}

function generateInputs() {
    inputRow.innerHTML = '';
    for (let i = 0; i < videoCount; i++) {
        const g = document.createElement('div');
        g.className = 'input-group';
        g.innerHTML = '<input type="text" id="input-' + i + '" placeholder="Link #' + (i + 1) + '" /><button class="btn-x" data-i="' + i + '">&times;</button>';
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
    if (!p || !p.setVolume) return;
    if (videoMuted[idx] || allMuted) {
        p.mute();
    } else {
        const vol = Math.round((videoVolumes[idx] / 100) * masterVolume);
        p.unMute();
        p.setVolume(vol);
    }
}

function applyAllVolumes() {
    for (const idx in players) applyVolume(+idx);
}

function loadVideos() {
    if (loading) return;
    loading = true;
    players = {};
    playerReadyCount = 0;
    allMuted = false;
    btnMuteAll.textContent = '🔊';

    const old = document.getElementById('yt-iframe-api');
    if (old) old.remove();

    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    const validVideos = [];
    for (let i = 0; i < videoCount; i++) {
        const inp = document.getElementById('input-' + i);
        const url = inp ? inp.value : '';
        const id = extractVideoId(url);
        if (id) {
            const isLive = url.includes('/live') || url.includes('live=1');
            validVideos.push({ index: i, videoId: id, isLive: isLive });
            liveFlags[i] = isLive;
        }
    }

    window.onYouTubeIframeAPIReady = function () {
        validVideos.forEach((v, delay) => {
            setTimeout(() => {
                const slot = document.getElementById('slot-' + v.index);
                if (!slot) return;
                slot.className = 'video-slot active';
                slot.innerHTML = '<div class="video-label">Video ' + (v.index + 1) + '</div><div id="player-' + v.index + '"></div>';

                try {
                    players[v.index] = new YT.Player('player-' + v.index, {
                        height: '100%',
                        width: '100%',
                        videoId: v.videoId,
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
                                applyVolume(v.index);
                            },
                            onError: function (e) {
                                console.warn('Player ' + v.index + ' error:', e.data);
                            },
                        },
                    });
                } catch (err) {
                    console.warn('Failed to create player ' + v.index, err);
                }
            }, delay * 500);
        });

        setTimeout(() => { loading = false; }, validVideos.length * 500 + 1000);
    };
}

function playAll() {
    if (Object.keys(players).length === 0) {
        loadVideos();
    } else {
        for (const idx in players) {
            const p = players[idx];
            if (p && p.playVideo) p.playVideo();
        }
    }
}

function pauseAll() {
    for (const idx in players) {
        const p = players[idx];
        if (p && p.pauseVideo) p.pauseVideo();
    }
}

function syncAll() {
    const targets = {};

    // Determine target time for each player
    for (const idx in players) {
        const p = players[idx];
        if (!p || !p.getDuration || !p.getCurrentTime) continue;
        const dur = p.getDuration();
        const cur = p.getCurrentTime();

        if (liveFlags[idx]) {
            // Live: target = live edge (duration - small buffer)
            if (dur > 0) targets[idx] = dur - 2;
        } else {
            targets[idx] = cur;
        }
    }

    // For non-live: find the latest position
    let latest = 0;
    for (const idx in targets) {
        if (liveFlags[idx]) continue;
        if (targets[idx] > latest) latest = targets[idx];
    }

    // Apply: non-live videos sync to latest, live streams go to live edge
    function doSeek() {
        for (const idx in players) {
            const p = players[idx];
            if (!p || !p.seekTo) continue;
            const target = liveFlags[idx] ? targets[idx] : latest;
            if (target === undefined || target <= 0) continue;
            try {
                p.seekTo(target, true);
            } catch (e) {}
        }
    }

    doSeek();

    // Retry once after 500ms for players that might have been buffering
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
