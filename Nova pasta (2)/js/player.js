// ===== PLAYER STATE & CONTROLS =====
const playerState = {
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 70,
    shuffle: false,
    repeat: 'off', // off, all, one
    queue: [],
    queueIndex: 0,
    showQueue: false,
    hasRealAudio: false,
};

// Global audio element
let audioElement = null;

function initPlayer() {
    // Create or get audio element
    audioElement = document.getElementById('audio-player');
    if (!audioElement) {
        audioElement = document.createElement('audio');
        audioElement.id = 'audio-player';
        audioElement.preload = 'auto';
        document.body.appendChild(audioElement);
    }

    // Audio events
    audioElement.addEventListener('timeupdate', () => {
        if (playerState.hasRealAudio) {
            playerState.currentTime = audioElement.currentTime;
            playerState.duration = audioElement.duration || 0;
            updateProgressUI();
        }
    });

    audioElement.addEventListener('loadedmetadata', () => {
        if (playerState.hasRealAudio) {
            playerState.duration = audioElement.duration;
            updateProgressUI();
        }
    });

    audioElement.addEventListener('ended', () => {
        if (playerState.repeat === 'one') {
            audioElement.currentTime = 0;
            audioElement.play();
        } else {
            nextTrack();
        }
    });

    audioElement.addEventListener('error', (e) => {
        console.warn('Audio playback error:', e);
        playerState.hasRealAudio = false;
        // Fall back to simulated timer
    });

    // Set initial volume
    audioElement.volume = playerState.volume / 100;

    // Set default song
    if (DATA.songs.length > 0) {
        playerState.currentSong = DATA.songs[0];
        playerState.queue = [...DATA.songs.slice(0, 10)];
        playerState.duration = parseDuration(playerState.currentSong.duration);
        playerState.currentTime = 0;
        updatePlayerUI();
    }

    // Controls
    document.querySelector('.player-btn-play')?.addEventListener('click', togglePlay);
    document.querySelector('.player-btn-next')?.addEventListener('click', nextTrack);
    document.querySelector('.player-btn-prev')?.addEventListener('click', prevTrack);
    document.querySelector('.player-btn-shuffle')?.addEventListener('click', toggleShuffle);
    document.querySelector('.player-btn-repeat')?.addEventListener('click', toggleRepeat);

    // Progress bar seek
    const progressBar = document.querySelector('.player-progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            const seekTime = pct * playerState.duration;

            if (playerState.hasRealAudio && audioElement) {
                audioElement.currentTime = seekTime;
            }
            playerState.currentTime = seekTime;
            updateProgressUI();
        });
    }

    // Volume bar
    const volumeBar = document.querySelector('.player-volume-bar');
    if (volumeBar) {
        volumeBar.addEventListener('click', (e) => {
            const rect = volumeBar.getBoundingClientRect();
            playerState.volume = Math.max(0, Math.min(100, Math.floor(((e.clientX - rect.left) / rect.width) * 100)));
            if (audioElement) audioElement.volume = playerState.volume / 100;
            updateVolumeUI();
        });
    }

    // Like button
    document.querySelector('.player-like-btn')?.addEventListener('click', () => {
        if (playerState.currentSong) {
            playerState.currentSong.liked = !playerState.currentSong.liked;
            updatePlayerLikeUI();
        }
    });

    // Queue button
    document.querySelector('.player-queue-btn')?.addEventListener('click', toggleQueue);

    // Fallback timer for simulated playback (when no real audio)
    setInterval(() => {
        if (playerState.isPlaying && !playerState.hasRealAudio && playerState.duration > 0) {
            playerState.currentTime++;
            if (playerState.currentTime >= playerState.duration) {
                nextTrack();
            }
            updateProgressUI();
        }
    }, 1000);
}

async function playSong(song) {
    playerState.currentSong = song;
    playerState.isPlaying = true;
    playerState.currentTime = 0;
    playerState.hasRealAudio = false;

    // Try to enrich song with API data if not already done
    if (!song.enriched && typeof enrichSongWithAPI === 'function') {
        await enrichSongWithAPI(song);
    }

    // Set duration
    if (song.realDuration) {
        playerState.duration = song.realDuration;
    } else {
        playerState.duration = parseDuration(song.duration);
    }

    // Try playing real audio
    if (song.previewUrl && audioElement) {
        try {
            audioElement.src = song.previewUrl;
            audioElement.load();
            await audioElement.play();
            playerState.hasRealAudio = true;
        } catch (err) {
            console.warn('Could not play audio preview:', err);
            playerState.hasRealAudio = false;
        }
    } else {
        // Stop any current audio
        if (audioElement) {
            audioElement.pause();
            audioElement.src = '';
        }
    }

    updatePlayerUI();
    updatePlayBtnUI();

    // Update all playing song rows
    document.querySelectorAll('.song-row').forEach(row => row.classList.remove('playing'));

    // Show audio indicator
    updateAudioIndicator();
}

function togglePlay() {
    playerState.isPlaying = !playerState.isPlaying;

    if (playerState.hasRealAudio && audioElement) {
        if (playerState.isPlaying) {
            audioElement.play().catch(() => { });
        } else {
            audioElement.pause();
        }
    }

    updatePlayBtnUI();
}

function nextTrack() {
    if (playerState.queue.length === 0) return;

    if (playerState.shuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * playerState.queue.length);
        } while (newIndex === playerState.queueIndex && playerState.queue.length > 1);
        playerState.queueIndex = newIndex;
    } else {
        playerState.queueIndex = (playerState.queueIndex + 1) % playerState.queue.length;
    }

    playSong(playerState.queue[playerState.queueIndex]);
}

function prevTrack() {
    if (playerState.currentTime > 3) {
        playerState.currentTime = 0;
        if (playerState.hasRealAudio && audioElement) {
            audioElement.currentTime = 0;
        }
        updateProgressUI();
        return;
    }
    if (playerState.queue.length === 0) return;
    playerState.queueIndex = (playerState.queueIndex - 1 + playerState.queue.length) % playerState.queue.length;
    playSong(playerState.queue[playerState.queueIndex]);
}

function toggleShuffle() {
    playerState.shuffle = !playerState.shuffle;
    const btn = document.querySelector('.player-btn-shuffle');
    if (btn) btn.classList.toggle('active', playerState.shuffle);
}

function toggleRepeat() {
    const states = ['off', 'all', 'one'];
    const idx = states.indexOf(playerState.repeat);
    playerState.repeat = states[(idx + 1) % states.length];
    const btn = document.querySelector('.player-btn-repeat');
    if (btn) btn.classList.toggle('active', playerState.repeat !== 'off');

    if (audioElement) {
        audioElement.loop = playerState.repeat === 'one';
    }
}

function toggleQueue() {
    playerState.showQueue = !playerState.showQueue;
    const panel = document.querySelector('.queue-panel');
    if (panel) {
        panel.classList.toggle('show', playerState.showQueue);
        if (playerState.showQueue) renderQueuePanel();
    }
}

function updatePlayerUI() {
    const song = playerState.currentSong;
    if (!song) return;

    const nameEl = document.querySelector('.player-track-name');
    const artistEl = document.querySelector('.player-track-artist');
    const albumEl = document.querySelector('.player-track-album');
    const coverEl = document.querySelector('.player-cover');

    if (nameEl) nameEl.textContent = song.title;
    if (artistEl) artistEl.textContent = song.artistFeat ? `${song.artist}, ${song.artistFeat}` : song.artist;
    if (albumEl) albumEl.textContent = song.realAlbumName || song.album;

    if (coverEl) {
        if (song.imageUrl) {
            coverEl.innerHTML = `<img src="${song.imageUrl}" alt="${song.title}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:${getGradient(song.gradient)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)\\'>${ICONS.music}</div>'">`;
        } else {
            coverEl.innerHTML = `<div style="width:100%;height:100%;background:${getGradient(song.gradient)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>`;
        }
    }

    updatePlayerLikeUI();
    updateProgressUI();
    updateVolumeUI();
}

function updatePlayBtnUI() {
    const btn = document.querySelector('.player-btn-play');
    if (btn) {
        btn.innerHTML = playerState.isPlaying ? ICONS.pause : ICONS.play;
    }
}

function updatePlayerLikeUI() {
    const btn = document.querySelector('.player-like-btn');
    if (btn && playerState.currentSong) {
        btn.classList.toggle('liked', playerState.currentSong.liked);
        btn.innerHTML = playerState.currentSong.liked ? ICONS.heart : ICONS.heartOutline;
    }
}

function updateProgressUI() {
    const fill = document.querySelector('.player-progress-fill');
    const timeStart = document.querySelector('.player-time-start');
    const timeEnd = document.querySelector('.player-time-end');

    if (fill && playerState.duration > 0) {
        fill.style.width = `${(playerState.currentTime / playerState.duration) * 100}%`;
    }
    if (timeStart) timeStart.textContent = formatTime(playerState.currentTime);
    if (timeEnd) timeEnd.textContent = formatTime(playerState.duration);
}

function updateVolumeUI() {
    const fill = document.querySelector('.player-volume-fill');
    if (fill) {
        fill.style.width = `${playerState.volume}%`;
    }
}

function updateAudioIndicator() {
    const indicator = document.querySelector('.player-audio-indicator');
    if (indicator) {
        if (playerState.hasRealAudio) {
            indicator.className = 'player-audio-indicator live';
            indicator.title = '♫ Tocando áudio real (preview 30s)';
        } else {
            indicator.className = 'player-audio-indicator simulated';
            indicator.title = 'Modo simulado (sem preview disponível)';
        }
    }
}

function getCoverHTML(song, size) {
    if (song.imageUrl) {
        return `<img src="${song.imageUrl}" alt="${song.title}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div style="display:none;width:100%;height:100%;background:${getGradient(song.gradient)};align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>`;
    }
    return `<div style="width:100%;height:100%;background:${getGradient(song.gradient)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>`;
}

function renderQueuePanel() {
    const panel = document.querySelector('.queue-panel');
    if (!panel) return;

    const song = playerState.currentSong;
    let queueHTML = `
    <div class="queue-tabs">
      <span class="queue-tab active">Queue</span>
      <span class="queue-tab">Recent</span>
    </div>
  `;

    if (song) {
        const coverBg = song.imageUrl
            ? `<img src="${song.imageUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px">`
            : `<div style="width:100%;height:100%;background:${getGradient(song.gradient)};border-radius:4px"></div>`;

        queueHTML += `
      <div style="margin-bottom:16px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Now playing ${playerState.hasRealAudio ? '<span style="color:var(--accent);font-weight:600">♫ LIVE</span>' : ''}</div>
        <div class="queue-item" style="background:var(--bg-elevated);padding:8px;border-radius:6px">
          <div class="queue-item-cover">${coverBg}</div>
          <div class="queue-item-info">
            <div class="queue-item-title" style="color:var(--accent)">${song.title}</div>
            <div class="queue-item-artist">${song.artist}</div>
          </div>
        </div>
      </div>
    `;
    }

    queueHTML += `<div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;font-weight:600">Next up:</div>`;
    playerState.queue.slice(playerState.queueIndex + 1, playerState.queueIndex + 8).forEach(s => {
        const sCover = s.imageUrl
            ? `<img src="${s.imageUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px">`
            : `<div style="width:100%;height:100%;background:${getGradient(s.gradient)};border-radius:4px"></div>`;

        queueHTML += `
      <div class="queue-item">
        <div class="queue-item-cover">${sCover}</div>
        <div class="queue-item-info">
          <div class="queue-item-title">${s.title}</div>
          <div class="queue-item-artist">${s.artist}</div>
        </div>
        <div class="queue-item-actions">
          <button>${ICONS.more}</button>
          <button>${ICONS.close}</button>
        </div>
      </div>
    `;
    });

    queueHTML += `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding-top:12px;border-top:1px solid var(--border-subtle)">
      <span style="font-size:12px;color:var(--text-secondary)">Auto-Play Similar Tracks</span>
      <div style="width:40px;height:22px;background:var(--accent);border-radius:11px;cursor:pointer;position:relative">
        <div style="width:18px;height:18px;background:white;border-radius:50%;position:absolute;top:2px;right:2px"></div>
      </div>
    </div>
  `;

    panel.innerHTML = queueHTML;
}

// Helpers
function parseDuration(str) {
    if (!str || typeof str !== 'string') return 30;
    const parts = str.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}
