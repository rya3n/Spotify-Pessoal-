// ===== MUSICAPI.COM INTEGRATION =====
const MUSIC_API = {
    baseUrl: 'https://api.musicapi.com',
    clientId: '410c3514-50fd-40f1-9d8f-5cb8d27910bc',
    clientSecret: '21e379e7-e3a9-46a6-8dc7-1eb35a89249a',
    defaultSources: ['deezer'],
    cache: new Map(),
    pendingRequests: new Map(),
};

// Auth header
function getAuthHeader() {
    const credentials = btoa(`${MUSIC_API.clientId}:${MUSIC_API.clientSecret}`);
    return `Basic ${credentials}`;
}

// Search for a single track
async function apiSearchTrack(trackName, artistName) {
    const cacheKey = `track:${trackName}:${artistName}`.toLowerCase();

    // Return cached result
    if (MUSIC_API.cache.has(cacheKey)) {
        return MUSIC_API.cache.get(cacheKey);
    }

    // Dedupe: if same request is already pending, wait for it
    if (MUSIC_API.pendingRequests.has(cacheKey)) {
        return MUSIC_API.pendingRequests.get(cacheKey);
    }

    const promise = (async () => {
        try {
            const response = await fetch(`${MUSIC_API.baseUrl}/public/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthHeader(),
                },
                body: JSON.stringify({
                    track: trackName,
                    artist: artistName || '',
                    type: 'track',
                    sources: MUSIC_API.defaultSources,
                }),
            });

            if (!response.ok) {
                console.warn(`API error ${response.status} for "${trackName}"`);
                return null;
            }

            const data = await response.json();

            // Find first successful result
            const result = data.tracks?.find(t => t.status === 'success' && t.data);
            const trackData = result?.data || null;

            // Cache the result
            MUSIC_API.cache.set(cacheKey, trackData);
            return trackData;

        } catch (err) {
            console.warn(`API fetch error for "${trackName}":`, err);
            return null;
        } finally {
            MUSIC_API.pendingRequests.delete(cacheKey);
        }
    })();

    MUSIC_API.pendingRequests.set(cacheKey, promise);
    return promise;
}

// Search with multiple sources for better results
async function apiSearchTrackMultiSource(trackName, artistName) {
    const cacheKey = `multi:${trackName}:${artistName}`.toLowerCase();

    if (MUSIC_API.cache.has(cacheKey)) {
        return MUSIC_API.cache.get(cacheKey);
    }

    try {
        const response = await fetch(`${MUSIC_API.baseUrl}/public/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader(),
            },
            body: JSON.stringify({
                track: trackName,
                artist: artistName || '',
                type: 'track',
                sources: ['deezer', 'youtube'],
            }),
        });

        if (!response.ok) return null;

        const data = await response.json();
        const results = {};

        data.tracks?.forEach(t => {
            if (t.status === 'success' && t.data) {
                results[t.source] = t.data;
            }
        });

        // Prefer Deezer (has preview), fallback to YouTube (has image)
        const best = results.deezer || results.youtube || null;
        MUSIC_API.cache.set(cacheKey, best);
        return best;

    } catch (err) {
        console.warn(`Multi-source search error for "${trackName}":`, err);
        return null;
    }
}

// Enrich a mock song with real API data
async function enrichSongWithAPI(song) {
    if (song.enriched) return song;

    const result = await apiSearchTrack(song.title, song.artist);
    if (result) {
        song.imageUrl = result.imageUrl || null;
        song.previewUrl = result.previewUrl || null;
        song.externalUrl = result.url || null;
        song.realDuration = result.duration ? Math.floor(result.duration / 1000) : null;
        song.realAlbumName = result.albumName || null;
    }
    song.enriched = true;
    return song;
}

// Enrich multiple songs with rate limiting
async function enrichSongsWithAPI(songs, batchSize = 3, delayMs = 200) {
    const unenriched = songs.filter(s => !s.enriched);
    if (unenriched.length === 0) return;

    for (let i = 0; i < unenriched.length; i += batchSize) {
        const batch = unenriched.slice(i, i + batchSize);
        await Promise.all(batch.map(s => enrichSongWithAPI(s)));

        // Small delay between batches to avoid rate limiting
        if (i + batchSize < unenriched.length) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

// Live search via API (for search page)
async function apiLiveSearch(query) {
    if (!query || query.length < 2) return [];

    const cacheKey = `search:${query}`.toLowerCase();
    if (MUSIC_API.cache.has(cacheKey)) {
        return MUSIC_API.cache.get(cacheKey);
    }

    try {
        const response = await fetch(`${MUSIC_API.baseUrl}/public/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader(),
            },
            body: JSON.stringify({
                track: query,
                type: 'track',
                sources: ['deezer'],
            }),
        });

        if (!response.ok) return [];

        const data = await response.json();
        const result = data.tracks?.find(t => t.status === 'success' && t.data);

        if (result?.data) {
            const track = {
                id: `api-${result.data.externalId}`,
                title: result.data.name,
                artist: result.data.artistNames?.[0] || 'Unknown',
                album: result.data.albumName || '',
                duration: result.data.duration ? formatTime(Math.floor(result.data.duration / 1000)) : '0:30',
                liked: false,
                gradient: Math.floor(Math.random() * 15),
                imageUrl: result.data.imageUrl || null,
                previewUrl: result.data.previewUrl || null,
                externalUrl: result.data.url || null,
                realDuration: result.data.duration ? Math.floor(result.data.duration / 1000) : 30,
                enriched: true,
                fromAPI: true,
            };

            const results = [track];
            MUSIC_API.cache.set(cacheKey, results);
            return results;
        }

        return [];
    } catch (err) {
        console.warn('Live search error:', err);
        return [];
    }
}

// Loading indicator helpers
function showLoading(container) {
    let loader = container.querySelector('.api-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'api-loader';
        loader.innerHTML = `
      <div class="loader-spinner"></div>
      <span>Buscando músicas reais...</span>
    `;
        container.appendChild(loader);
    }
    loader.style.display = 'flex';
}

function hideLoading(container) {
    const loader = container.querySelector('.api-loader');
    if (loader) loader.style.display = 'none';
}

// Debounce utility
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ===== ARTIST IMAGE ENRICHMENT (Deezer Public API) =====
async function enrichArtistWithImage(artist) {
    if (artist.imageUrl) return artist;

    const cacheKey = `artist-img:${artist.name}`.toLowerCase();
    if (MUSIC_API.cache.has(cacheKey)) {
        artist.imageUrl = MUSIC_API.cache.get(cacheKey);
        return artist;
    }

    try {
        // Deezer public API — no auth required, CORS friendly
        const resp = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artist.name)}&limit=1&output=jsonp&callback=?`
            .replace('&output=jsonp&callback=?', ''));

        // Deezer doesn't support CORS directly, use CORS proxy or alternate method
        // Fallback: use the MusicAPI search to find an artist image from their song
        const song = DATA.songs.find(s => s.artist.toLowerCase() === artist.name.toLowerCase());
        if (song && song.imageUrl) {
            artist.imageUrl = song.imageUrl;
            MUSIC_API.cache.set(cacheKey, song.imageUrl);
            return artist;
        }

        // Try MusicAPI to search for a popular track by this artist
        const result = await apiSearchTrack(song?.title || artist.name, artist.name);
        if (result && result.imageUrl) {
            artist.imageUrl = result.imageUrl;
            MUSIC_API.cache.set(cacheKey, result.imageUrl);
        }
    } catch (err) {
        // Fallback: try to get image from enriched songs
        const song = DATA.songs.find(s => s.artist.toLowerCase() === artist.name.toLowerCase() && s.imageUrl);
        if (song) {
            artist.imageUrl = song.imageUrl;
        }
    }

    return artist;
}

// Enrich all artists with images (call after songs are enriched)
async function enrichAllArtists(delayMs = 300) {
    for (let i = 0; i < DATA.artists.length; i++) {
        const artist = DATA.artists[i];

        // First try: get image from already‑enriched songs
        const songWithImage = DATA.songs.find(
            s => s.artist.toLowerCase() === artist.name.toLowerCase() && s.imageUrl
        );

        if (songWithImage) {
            artist.imageUrl = songWithImage.imageUrl;
            console.log(`🎤 ${artist.name} → image from song cache`);
            continue;
        }

        // Second try: search via MusicAPI
        const firstSong = DATA.songs.find(
            s => s.artist.toLowerCase() === artist.name.toLowerCase()
        );

        if (firstSong) {
            try {
                const result = await apiSearchTrack(firstSong.title, firstSong.artist);
                if (result && result.imageUrl) {
                    artist.imageUrl = result.imageUrl;
                    firstSong.imageUrl = firstSong.imageUrl || result.imageUrl;
                    firstSong.previewUrl = firstSong.previewUrl || result.previewUrl || null;
                    firstSong.enriched = true;
                    console.log(`🎤 ${artist.name} → image from API`);
                }
            } catch (e) { /* skip */ }
        }

        // Rate limit
        if (i < DATA.artists.length - 1) {
            await new Promise(r => setTimeout(r, delayMs));
        }
    }
    console.log('✅ All artists enriched with images');
}

// Propagate album covers from enriched songs
function enrichAlbumsFromSongs() {
    DATA.albums.forEach(album => {
        if (album.imageUrl) return;
        const firstSongId = album.songs?.[0];
        if (firstSongId) {
            const song = DATA.songs.find(s => s.id === firstSongId);
            if (song && song.imageUrl) {
                album.imageUrl = song.imageUrl;
            }
        }
    });
}

// Build playlist covers from song artwork (Spotify-style 4-grid collage)
function enrichPlaylistCovers() {
    const allPlaylists = [
        ...(DATA.playlists || []),
        ...(DATA.spotifyPlaylists || []),
        ...(DATA.radioPlaylists || []),
    ];

    allPlaylists.forEach(pl => {
        if (pl.coverImages && pl.coverImages.length > 0) return; // already done
        if (!pl.songs || pl.songs.length === 0) return;

        // Collect unique album artwork URLs from the playlist's songs
        const images = [];
        const seen = new Set();

        for (const songId of pl.songs) {
            if (images.length >= 4) break;
            const song = DATA.songs.find(s => s.id === songId);
            if (song && song.imageUrl && !seen.has(song.imageUrl)) {
                seen.add(song.imageUrl);
                images.push(song.imageUrl);
            }
        }

        if (images.length > 0) {
            pl.coverImages = images; // Array of 1-4 URLs for collage
            // Also set imageUrl to the first one as fallback
            if (!pl.imageUrl) {
                pl.imageUrl = images[0];
            }
        }
    });

    console.log('✅ Playlist covers enriched');
}
