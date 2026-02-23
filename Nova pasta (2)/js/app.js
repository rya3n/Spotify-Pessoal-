// ===== SPA ROUTER =====
let currentPage = 'home';
let currentSubPage = null;

function navigateTo(page, subPage = null) {
  currentPage = page;
  currentSubPage = subPage;
  renderPage();
  updateNavActive();
}

function updateNavActive() {
  // Sidebar
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === currentPage);
  });
  // Topbar
  document.querySelectorAll('.topbar-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === currentPage);
  });
}

function renderPage() {
  const main = document.getElementById('main-content');
  if (!main) return;
  main.innerHTML = '';
  main.scrollTop = 0;

  switch (currentPage) {
    case 'home': renderHomePage(main); break;
    case 'search': renderSearchPage(main); break;
    case 'library': renderLibraryPage(main); break;
    case 'liked': renderLikedPage(main); break;
    case 'playlist': renderPlaylistPage(main, currentSubPage); break;
    case 'artist': renderArtistPage(main, currentSubPage); break;
    case 'album': renderAlbumPage(main, currentSubPage); break;
    case 'song': renderSongDetailPage(main, currentSubPage); break;
    case 'discover': renderDiscoverPage(main); break;
    case 'settings': renderSettingsPage(main); break;
    case 'profile': renderProfilePage(main); break;
    default: renderHomePage(main);
  }
}

// ===== HOME PAGE =====
function renderHomePage(container) {
  container.className = 'main-content page-home';

  // Greeting
  const hour = new Date().getHours();
  let greeting = 'Boa noite';
  if (hour < 12) greeting = 'Bom dia';
  else if (hour < 18) greeting = 'Boa tarde';

  const greetEl = document.createElement('h1');
  greetEl.className = 'greeting';
  greetEl.textContent = greeting;
  container.appendChild(greetEl);

  // Filter pills
  const pills = document.createElement('div');
  pills.className = 'filter-pills';
  ['Tudo', 'Música', 'Podcasts', 'Audiolivros'].forEach((label, i) => {
    pills.appendChild(createPill(label, i === 0, () => {
      pills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pills.children[i].classList.add('active');
    }));
  });
  container.appendChild(pills);

  // Quick Tiles
  const tiles = document.createElement('div');
  tiles.className = 'quick-tiles';
  const findArtist = (id) => DATA.artists.find(a => a.id === id) || DATA.artists[0];
  const quickData = [
    { ...DATA.playlists[0], isLiked: true, onClick: () => navigateTo('liked') },
    { name: 'Queen', gradient: findArtist('queen').gradient, type: 'artist', onClick: () => navigateTo('artist', 'queen') },
    { name: 'The Weeknd', gradient: findArtist('weeknd').gradient, type: 'artist', onClick: () => navigateTo('artist', 'weeknd') },
    { ...DATA.playlists[1], onClick: () => navigateTo('playlist', 'chill') },
    { ...DATA.playlists[2], onClick: () => navigateTo('playlist', 'rock') },
    { ...DATA.playlists[3], onClick: () => navigateTo('playlist', 'vibe') },
  ];
  quickData.forEach(d => tiles.appendChild(createQuickTile(d)));
  container.appendChild(tiles);

  // Made For You Section
  const madeForYou = DATA.spotifyPlaylists.slice(0, 6).map(p => ({
    ...p, spotifyBadge: true,
    onClick: () => navigateTo('playlist', p.id)
  }));
  container.appendChild(createSection('Feito Para Você', madeForYou, { seeAll: true }));

  // Your Top Mixes
  const topMixes = [...DATA.spotifyPlaylists.slice(6), ...DATA.radioPlaylists.slice(0, 3)].map(p => ({
    ...p,
    onClick: () => navigateTo('playlist', p.id)
  }));
  container.appendChild(createSection('Suas mixes favoritas', topMixes, { seeAll: true }));

  // Favorite Artists
  const favArtists = DATA.artists.slice(0, 6).map(a => ({
    ...a, type: 'artist', subtitle: 'Artista',
    onClick: () => navigateTo('artist', a.id)
  }));
  container.appendChild(createSection('Seus artistas favoritos', favArtists, { seeAll: true }));
}

// ===== SEARCH PAGE =====
function renderSearchPage(container) {
  container.className = 'main-content page-search';

  // Search Input
  const searchWrap = document.createElement('div');
  searchWrap.className = 'search-input-wrap';
  searchWrap.innerHTML = `
    <span class="search-icon">${ICONS.search}</span>
    <input type="text" class="search-input" placeholder="O que você quer ouvir?">
  `;
  container.appendChild(searchWrap);

  // Recent Searches
  const recentSection = document.createElement('div');
  recentSection.className = 'section recent-searches-section';
  recentSection.innerHTML = `<div class="section-header"><h2>Buscas recentes</h2></div>`;
  const recentRow = document.createElement('div');
  recentRow.className = 'recent-searches-row';
  DATA.artists.slice(0, 5).forEach(a => {
    const item = document.createElement('div');
    item.className = 'recent-search';
    item.innerHTML = `
      <div class="recent-search-avatar">
        ${a.imageUrl
        ? `<img src="${a.imageUrl}" alt="${a.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
        : `<div style="width:100%;height:100%;background:${getGradient(a.gradient)};border-radius:50%"></div>`
      }
        <button class="recent-search-close">${ICONS.close}</button>
      </div>
      <span class="recent-search-name">${a.name}</span>
      <span class="recent-search-type">Artista</span>
    `;
    item.addEventListener('click', () => navigateTo('artist', a.id));
    recentRow.appendChild(item);
  });
  recentSection.appendChild(recentRow);
  container.appendChild(recentSection);

  // Browse All / Discover
  const discoverSection = document.createElement('div');
  discoverSection.className = 'section';
  discoverSection.innerHTML = `<div class="section-header"><h2>Navegar por tudo</h2></div>`;
  const discoverRow = document.createElement('div');
  discoverRow.className = 'section-row';
  DATA.discoverSections.forEach(s => {
    discoverRow.appendChild(createGenreCard(s));
  });
  discoverSection.appendChild(discoverRow);
  container.appendChild(discoverSection);

  // Genres
  const genresSection = document.createElement('div');
  genresSection.className = 'section';
  genresSection.innerHTML = `<div class="section-header"><h2>Gêneros</h2></div>`;
  const genresGrid = document.createElement('div');
  genresGrid.className = 'genres-grid';
  DATA.genres.forEach(g => {
    genresGrid.appendChild(createGenreCard(g));
  });
  genresSection.appendChild(genresGrid);
  container.appendChild(genresSection);

  // Search functionality — local + live API search
  const input = container.querySelector('.search-input');

  // Debounce utility
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const performSearch = debounce(async (query) => {
    if (query.length < 2) {
      // Clear all results
      container.querySelectorAll('.search-results, .search-artists-results, .search-albums-results').forEach(el => el.remove());
      return;
    }

    // Remove previous results
    container.querySelectorAll('.search-results, .api-search-results, .search-artists-results, .search-albums-results').forEach(el => el.remove());

    // ── ARTIST MATCHES ──
    const matchedArtists = DATA.artists.filter(a =>
      a.name.toLowerCase().includes(query)
    );

    if (matchedArtists.length > 0) {
      const artistsDiv = document.createElement('div');
      artistsDiv.className = 'section search-artists-results';
      artistsDiv.innerHTML = `<div class="section-header"><h2>Artists</h2></div>`;
      const artistRow = document.createElement('div');
      artistRow.className = 'section-row';

      matchedArtists.slice(0, 6).forEach(a => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
                  <div class="card-cover circle">
                    ${a.imageUrl
            ? `<img src="${a.imageUrl}" alt="${a.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
            : `<div style="width:100%;height:100%;background:${getGradient(a.gradient)};border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4)">
                          <svg viewBox="0 0 24 24" fill="currentColor" style="width:40px;height:40px"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        </div>`
          }
                  </div>
                  <div class="card-title">${a.name}</div>
                  <div class="card-subtitle">${a.verified ? '✓ ' : ''}Artist · ${a.followers} followers</div>
                `;
        card.addEventListener('click', () => navigateTo('artist', a.id));
        artistRow.appendChild(card);
      });
      artistsDiv.appendChild(artistRow);
      container.insertBefore(artistsDiv, container.children[1]);
    }

    // ── ALBUM MATCHES ──
    const matchedAlbums = DATA.albums.filter(a =>
      a.name.toLowerCase().includes(query) ||
      a.artist.toLowerCase().includes(query)
    );

    if (matchedAlbums.length > 0) {
      const albumsDiv = document.createElement('div');
      albumsDiv.className = 'section search-albums-results';
      albumsDiv.innerHTML = `<div class="section-header"><h2>Albums</h2></div>`;
      const albumRow = document.createElement('div');
      albumRow.className = 'section-row';

      matchedAlbums.slice(0, 6).forEach(a => {
        albumRow.appendChild(createCard({
          ...a, subtitle: `${a.year} · ${a.artist}`,
          onClick: () => navigateTo('album', a.id)
        }));
      });
      albumsDiv.appendChild(albumRow);
      // Insert after artists if present
      const afterRef = container.querySelector('.search-artists-results');
      container.insertBefore(albumsDiv, afterRef ? afterRef.nextSibling : container.children[1]);
    }

    // ── SONG MATCHES ──
    const localResults = DATA.songs.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.artist.toLowerCase().includes(query)
    );

    if (localResults.length > 0) {
      const resultsDiv = document.createElement('div');
      resultsDiv.className = 'section search-results';
      resultsDiv.innerHTML = `<div class="section-header"><h2>Músicas</h2></div>`;
      localResults.slice(0, 8).forEach((s, i) => {
        resultsDiv.appendChild(createSongRow(s, i));
      });
      // Insert after albums
      const afterRef = container.querySelector('.search-albums-results') || container.querySelector('.search-artists-results');
      container.insertBefore(resultsDiv, afterRef ? afterRef.nextSibling : container.children[1]);
    }

  }, 500);

  input.addEventListener('input', (e) => {
    performSearch(e.target.value.toLowerCase().trim());
  });
}

// ===== LIBRARY PAGE =====
function renderLibraryPage(container) {
  container.className = 'main-content page-library';

  // Title
  const title = document.createElement('h1');
  title.className = 'library-title';
  title.textContent = 'Minha Biblioteca';
  container.appendChild(title);

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'library-toolbar';
  toolbar.innerHTML = `
    <div class="library-toolbar-left">
      <button class="pill active" data-filter="all">Tudo</button>
      <button class="pill" data-filter="playlists">Playlists</button>
      <button class="pill" data-filter="artists">Artistas</button>
      <button class="pill" data-filter="albums">Álbuns</button>
      <button class="pill" data-filter="folders">Pastas</button>
    </div>
    <div class="library-toolbar-right">
      <div class="sort-dropdown">
        <span>Recentes</span>
        ${ICONS.arrowRight}
      </div>
      <button class="view-toggle-btn active" data-view="grid">${ICONS.grid}</button>
      <button class="view-toggle-btn" data-view="list">${ICONS.list}</button>
      <button class="btn-icon" id="btn-create-library">${ICONS.plus}</button>
    </div>
  `;
  container.appendChild(toolbar);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'library-grid';
  container.appendChild(grid);

  function renderLibraryGrid(filter = 'all') {
    grid.innerHTML = '';

    const items = [];

    // Liked songs
    if (filter === 'all' || filter === 'playlists') {
      items.push({ ...DATA.playlists[0], isLiked: true, type: 'playlist', pinned: true, onClick: () => navigateTo('liked') });
    }

    // Artists
    if (filter === 'all' || filter === 'artists') {
      DATA.artists.slice(0, 3).forEach(a => {
        items.push({ ...a, type: 'artist', subtitle: 'Artist', pinned: a.id === 'daft-punk' || a.id === 'david-bowie', onClick: () => navigateTo('artist', a.id) });
      });
    }

    // Playlists
    if (filter === 'all' || filter === 'playlists') {
      DATA.playlists.slice(1).forEach(p => {
        items.push({ ...p, type: 'playlist', onClick: () => navigateTo('playlist', p.id) });
      });
    }

    // Folders
    if (filter === 'all' || filter === 'folders') {
      DATA.folders.forEach(f => {
        items.push({ ...f, type: 'folder' });
      });
    }

    // Albums
    if (filter === 'all' || filter === 'albums') {
      DATA.albums.slice(0, 4).forEach(a => {
        items.push({ ...a, type: 'album', subtitle: a.artist, pinned: a.id === 'ram' || a.id === 'meteora', onClick: () => navigateTo('album', a.id) });
      });
    }

    // Spotify playlists
    if (filter === 'all' || filter === 'playlists') {
      DATA.spotifyPlaylists.slice(0, 4).forEach(p => {
        items.push({ ...p, type: 'playlist', spotifyBadge: true, onClick: () => navigateTo('playlist', p.id) });
      });
    }

    items.forEach(item => grid.appendChild(createCard(item)));
  }

  renderLibraryGrid();

  // Filter pills
  toolbar.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      toolbar.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderLibraryGrid(pill.dataset.filter);
    });
  });

  // View toggle
  toolbar.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toolbar.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (btn.dataset.view === 'list') {
        grid.className = '';
        grid.style.display = 'flex';
        grid.style.flexDirection = 'column';
        grid.style.gap = '2px';
        // Re-render as list
        // For simplicity we keep the card style for now
      } else {
        grid.className = 'library-grid';
        grid.style.display = '';
        grid.style.flexDirection = '';
        grid.style.gap = '';
      }
    });
  });

  // Library create button
  const libCreateBtn = toolbar.querySelector('#btn-create-library');
  if (libCreateBtn) {
    libCreateBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showCreateMenu(this);
    });
  }
}

// ===== LIKED SONGS PAGE =====
function renderLikedPage(container) {
  container.className = 'main-content page-liked';

  // Header
  const header = document.createElement('div');
  header.className = 'liked-header';
  header.innerHTML = `
    <div class="liked-header-icon">${ICONS.heart}</div>
    <div class="liked-header-info">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Playlist</p>
      <h1>Músicas Curtidas</h1>
      <p>User · ${DATA.playlists[0].songs.length} músicas</p>
    </div>
  `;
  container.appendChild(header);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'page-header-actions';
  actions.innerHTML = `
    <button class="btn-play-large">${ICONS.play}</button>
    <button class="btn-shuffle btn-icon">${ICONS.shuffle}</button>
    <button class="btn-icon">${ICONS.download}</button>
    <button class="btn-icon">${ICONS.more}</button>
  `;
  container.appendChild(actions);

  // Song list header
  const listHeader = document.createElement('div');
  listHeader.className = 'song-list-header';
  listHeader.innerHTML = `
    <span>#</span>
    <span>Título</span>
    <span>Álbum</span>
    <span>Duração</span>
    <span></span>
  `;
  container.appendChild(listHeader);

  // Songs
  const likedSongIds = DATA.playlists[0].songs;
  const likedSongs = likedSongIds.map(id => DATA.songs.find(s => s.id === id)).filter(Boolean);
  likedSongs.forEach((song, i) => {
    container.appendChild(createSongRow(song, i));
  });

  // Play button
  actions.querySelector('.btn-play-large').addEventListener('click', () => {
    if (likedSongs.length > 0) {
      playerState.queue = [...likedSongs];
      playerState.queueIndex = 0;
      playSong(likedSongs[0]);
    }
  });
}

// ===== PLAYLIST PAGE =====
function renderPlaylistPage(container, playlistId) {
  container.className = 'main-content page-playlist';

  const playlist = [...DATA.playlists, ...DATA.spotifyPlaylists, ...DATA.radioPlaylists].find(p => p.id === playlistId);
  if (!playlist) { renderHomePage(container); return; }

  // Gradient header
  const gradientHeader = document.createElement('div');
  gradientHeader.className = 'playlist-gradient';

  const coverContent = playlist.coverImage
    ? `<img src="${playlist.coverImage}" alt="${playlist.name}" style="width:100%;height:100%;object-fit:cover">`
    : `<div style="width:100%;height:100%;background:${playlist.gradient || getGradient(0)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">
          ${playlist.isLiked ? `<div style="color:white">${ICONS.heart}</div>` : ICONS.music}
       </div>`;

  gradientHeader.innerHTML = `
    <div class="page-header">
      <div class="page-header-cover" id="playlist-cover-edit">
        ${coverContent}
        ${!playlist.isLiked ? `
        <div class="cover-edit-overlay">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          <span>Editar foto</span>
        </div>
        <input type="file" id="playlist-cover-file" accept="image/*" style="display:none">
        ` : ''}
      </div>
      <div class="page-header-info">
        <span class="page-header-type">Playlist</span>
        <h1 class="page-header-title">${playlist.name}</h1>
        <p class="page-header-description">${playlist.description || ''}</p>
        <div class="page-header-meta">
          <strong>User</strong> · ${playlist.count || playlist.songs?.length || 0} músicas
        </div>
      </div>
    </div>
  `;
  container.appendChild(gradientHeader);

  // Cover edit handler
  if (!playlist.isLiked) {
    const coverEl = gradientHeader.querySelector('#playlist-cover-edit');
    const coverFileInput = gradientHeader.querySelector('#playlist-cover-file');
    if (coverEl && coverFileInput) {
      coverEl.addEventListener('click', () => coverFileInput.click());
      coverFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          playlist.coverImage = ev.target.result;
          saveUserPlaylists();
          coverEl.querySelector('img, div:first-child')?.remove();
          const img = document.createElement('img');
          img.src = ev.target.result;
          img.alt = playlist.name;
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0';
          coverEl.insertBefore(img, coverEl.firstChild);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Actions
  const actions = document.createElement('div');
  actions.className = 'page-header-actions';
  actions.style.padding = '0 0 24px 0';
  actions.innerHTML = `
    <button class="btn-play-large">${ICONS.play}</button>
    <button class="btn-shuffle btn-icon ${playerState.shuffle ? 'active' : ''}">${ICONS.shuffle}</button>
    <button class="btn-icon" id="btn-add-song">${ICONS.plus}</button>
    <div class="playlist-more-wrapper" style="position:relative">
      <button class="btn-icon" id="playlist-more-btn">${ICONS.more}</button>
      <div class="playlist-context-menu" id="playlist-context-menu">
        ${!playlist.isLiked ? `
        <button class="context-menu-item danger" id="btn-delete-playlist">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          <span>Apagar playlist</span>
        </button>
        ` : ''}
      </div>
    </div>
  `;
  container.appendChild(actions);

  // More button context menu
  const moreBtn = actions.querySelector('#playlist-more-btn');
  const contextMenu = actions.querySelector('#playlist-context-menu');
  moreBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    contextMenu.classList.toggle('open');
    setTimeout(() => {
      function closeCtx(ev) {
        if (!contextMenu.contains(ev.target) && !moreBtn.contains(ev.target)) {
          contextMenu.classList.remove('open');
          document.removeEventListener('click', closeCtx);
        }
      }
      document.addEventListener('click', closeCtx);
    }, 10);
  });

  // Delete playlist
  actions.querySelector('#btn-delete-playlist')?.addEventListener('click', () => {
    contextMenu.classList.remove('open');
    showConfirmModal(
      'Apagar playlist',
      `Tem certeza que deseja apagar "${playlist.name}"? Essa ação não pode ser desfeita.`,
      'Apagar',
      () => {
        const idx = DATA.playlists.findIndex(p => p.id === playlist.id);
        if (idx > 0) {
          DATA.playlists.splice(idx, 1);
          saveUserPlaylists();
          refreshSidebarPlaylists();
          navigateTo('home');
        }
      }
    );
  });

  // Add song button
  actions.querySelector('#btn-add-song')?.addEventListener('click', () => {
    openAddMusicModal(playlist.id);
  });

  // Shuffle button
  const shuffleBtn = actions.querySelector('.btn-shuffle');
  shuffleBtn?.addEventListener('click', () => {
    toggleShuffle();
    shuffleBtn.classList.toggle('active', playerState.shuffle);
  });

  // Play button - play all songs in playlist
  const playBtn = actions.querySelector('.btn-play-large');
  playBtn?.addEventListener('click', () => {
    const songs = (playlist.songs || []).map(id => DATA.songs.find(s => s.id === id)).filter(Boolean);
    if (songs.length > 0) {
      playerState.queue = songs;
      playerState.queueIndex = 0;
      if (playerState.shuffle) {
        playerState.queueIndex = Math.floor(Math.random() * songs.length);
      }
      playSong(songs[playerState.queueIndex]);
    }
  });

  // Song list header
  const listHeader = document.createElement('div');
  listHeader.className = 'song-list-header';
  listHeader.innerHTML = `
    <span>#</span>
    <span>Title</span>
    <span>Album</span>
    <span>Duration</span>
    <span></span>
  `;
  container.appendChild(listHeader);

  // Songs
  const songs = (playlist.songs || []).map(id => DATA.songs.find(s => s.id === id)).filter(Boolean);
  songs.forEach((song, i) => {
    container.appendChild(createSongRow(song, i));
  });

  // Play button
  actions.querySelector('.btn-play-large').addEventListener('click', () => {
    if (songs.length > 0) {
      playerState.queue = [...songs];
      playerState.queueIndex = 0;
      playSong(songs[0]);
    }
  });
}

// ===== ARTIST PAGE =====
function renderArtistPage(container, artistId) {
  container.className = 'main-content page-artist';

  const artist = DATA.artists.find(a => a.id === artistId);
  if (!artist) { renderHomePage(container); return; }

  // Hero
  const hero = document.createElement('div');
  hero.className = 'artist-hero';
  hero.style.background = getGradient(artist.gradient);
  hero.innerHTML = `
    <div class="artist-hero-overlay">
      ${artist.verified ? `<div class="artist-hero-verified">${ICONS.verified} <span>Artista Verificado</span></div>` : ''}
      <h1 class="artist-hero-name">${artist.name}</h1>
      <p class="artist-hero-stats">${artist.monthlyListeners} ouvintes mensais</p>
    </div>
  `;
  container.appendChild(hero);

  // Actions
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'artist-actions';
  actionsDiv.innerHTML = `
    <button class="btn-play-large">${ICONS.play}</button>
    <button class="btn-shuffle btn-icon">${ICONS.shuffle}</button>
    <button class="btn-follow">Seguir</button>
    <button class="btn-icon">${ICONS.more}</button>
  `;
  container.appendChild(actionsDiv);

  // Tabs
  const tabs = document.createElement('div');
  tabs.className = 'artist-tabs';
  const tabNames = ['Início', 'Álbuns', 'Sobre'];
  let activeTab = 'Início';

  tabNames.forEach(name => {
    const tab = document.createElement('span');
    tab.className = `artist-tab ${name === activeTab ? 'active' : ''}`;
    tab.textContent = name;
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.artist-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = name;
      renderArtistTabContent(contentArea, artist, name);
    });
    tabs.appendChild(tab);
  });
  container.appendChild(tabs);

  const contentArea = document.createElement('div');
  container.appendChild(contentArea);

  renderArtistTabContent(contentArea, artist, 'Início');

  // Play button
  actionsDiv.querySelector('.btn-play-large').addEventListener('click', () => {
    const artistSongs = DATA.songs.filter(s => s.artist === artist.name);
    if (artistSongs.length > 0) {
      playerState.queue = [...artistSongs];
      playerState.queueIndex = 0;
      playSong(artistSongs[0]);
    }
  });

  // Follow button
  const followBtn = actionsDiv.querySelector('.btn-follow');
  followBtn.addEventListener('click', () => {
    const isFollowing = followBtn.textContent === 'Seguindo';
    followBtn.textContent = isFollowing ? 'Seguir' : 'Seguindo';
    followBtn.style.borderColor = isFollowing ? '' : 'var(--accent)';
    followBtn.style.color = isFollowing ? '' : 'var(--accent)';
  });
}

function renderArtistTabContent(container, artist, tab) {
  container.innerHTML = '';

  const artistSongs = DATA.songs.filter(s => s.artist === artist.name);
  const artistAlbums = DATA.albums.filter(a => a.artistId === artist.id);

  if (tab === 'Início') {
    // Popular tracks
    const popular = document.createElement('div');
    popular.className = 'artist-popular-tracks';
    popular.innerHTML = `<h3>Populares</h3>`;
    artistSongs.slice(0, 5).forEach((song, i) => {
      popular.appendChild(createSongRow(song, i));
    });
    container.appendChild(popular);

    // Albums section
    if (artistAlbums.length > 0) {
      const albumCards = artistAlbums.map(a => ({
        ...a, subtitle: `${a.year} · Álbum`,
        onClick: () => navigateTo('album', a.id)
      }));
      container.appendChild(createSection('Discografia', albumCards, { seeAll: true }));
    }

    // Related artists
    const related = DATA.artists.filter(a => a.id !== artist.id).slice(0, 6).map(a => ({
      ...a, type: 'artist', subtitle: 'Artista',
      onClick: () => navigateTo('artist', a.id)
    }));
    container.appendChild(createSection('Fãs também gostam', related, { seeAll: true }));

  } else if (tab === 'Álbuns') {
    // Albums list
    artistAlbums.forEach(album => {
      container.appendChild(createAlbumListItem(album));
    });

  } else if (tab === 'Sobre') {
    const about = document.createElement('div');
    about.className = 'artist-about';
    about.innerHTML = `
      <div class="artist-about-img" style="background:${getGradient(artist.gradient)}"></div>
      <p class="artist-about-text">${artist.bio}</p>
      <div class="artist-about-stats">
        <div><strong>${artist.monthlyListeners}</strong> ouvintes mensais</div>
        <div><strong>${artist.followers}</strong> seguidores</div>
      </div>
    `;
    container.appendChild(about);
  }
}

// ===== ALBUM PAGE =====
function renderAlbumPage(container, albumId) {
  container.className = 'main-content page-playlist';

  const album = DATA.albums.find(a => a.id === albumId);
  if (!album) { renderHomePage(container); return; }

  // Header
  const gradientHeader = document.createElement('div');
  gradientHeader.className = 'playlist-gradient';
  gradientHeader.innerHTML = `
    <div class="page-header">
      <div class="page-header-cover">
        <div style="width:100%;height:100%;background:${getGradient(album.gradient)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>
      </div>
      <div class="page-header-info">
        <span class="page-header-type">Álbum</span>
        <h1 class="page-header-title" style="font-size:36px">${album.name}</h1>
        <div class="page-header-meta">
          <strong style="cursor:pointer" onclick="navigateTo('artist','${album.artistId}')">${album.artist}</strong> · ${album.year} · ${album.songCount} músicas · ${album.duration}
        </div>
      </div>
    </div>
  `;
  container.appendChild(gradientHeader);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'page-header-actions';
  actions.style.padding = '0 0 24px 0';
  actions.innerHTML = `
    <button class="btn-play-large">${ICONS.play}</button>
    <button class="btn-shuffle btn-icon">${ICONS.shuffle}</button>
    <button class="btn-icon">${ICONS.plus}</button>
    <button class="btn-icon">${ICONS.share}</button>
    <button class="btn-icon">${ICONS.more}</button>
  `;
  container.appendChild(actions);

  // Songs
  const songs = (album.songs || []).map(id => DATA.songs.find(s => s.id === id)).filter(Boolean);
  songs.forEach((song, i) => {
    container.appendChild(createSongRow(song, i));
  });

  // Play button
  actions.querySelector('.btn-play-large').addEventListener('click', () => {
    if (songs.length > 0) {
      playerState.queue = [...songs];
      playerState.queueIndex = 0;
      playSong(songs[0]);
    }
  });
}

// ===== SONG DETAIL PAGE =====
function renderSongDetailPage(container, songId) {
  container.className = 'main-content';

  const song = DATA.songs.find(s => s.id === parseInt(songId));
  if (!song) { renderHomePage(container); return; }

  const detail = document.createElement('div');
  detail.className = 'song-detail';
  detail.innerHTML = `
    <div class="song-detail-artwork">
      ${song.imageUrl
      ? `<img src="${song.imageUrl}" alt="${song.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`
      : `<div style="width:100%;height:100%;background:${getGradient(song.gradient)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.15)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:80px;height:80px"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </div>`
    }
    <div class="song-detail-info">
      <h1 class="song-detail-title">${song.title}</h1>
      <p class="song-detail-artist">${song.artistFeat ? `${song.artist} feat. ${song.artistFeat}` : song.artist}</p>
      <div class="song-detail-tags">
        <span class="pill">${song.album}</span>
      </div>
      <div class="page-header-actions" style="margin-bottom:24px">
        <button class="btn-play-large play-detail-btn">${ICONS.play}</button>
        <button class="btn-icon ${song.liked ? 'liked' : ''} like-detail-btn" style="color:${song.liked ? 'var(--accent)' : ''}">${song.liked ? ICONS.heart : ICONS.heartOutline}</button>
        <button class="btn-icon">${ICONS.plus}</button>
        <button class="btn-icon">${ICONS.share}</button>
        <button class="btn-icon">${ICONS.more}</button>
      </div>

      <div class="song-detail-tabs">
        <span class="song-detail-tab active" data-tab="lyrics">Letra</span>
        <span class="song-detail-tab" data-tab="credits">Créditos</span>
        <span class="song-detail-tab" data-tab="more">Semelhantes</span>
      </div>
      <div class="song-detail-tab-content"></div>
    </div>
  `;
  container.appendChild(detail);

  const tabContent = detail.querySelector('.song-detail-tab-content');

  // Render lyrics by default
  renderSongTab(tabContent, 'lyrics', song);

  // Tab switching
  detail.querySelectorAll('.song-detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      detail.querySelectorAll('.song-detail-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSongTab(tabContent, tab.dataset.tab, song);
    });
  });

  // Play
  detail.querySelector('.play-detail-btn').addEventListener('click', () => playSong(song));

  // Like
  detail.querySelector('.like-detail-btn').addEventListener('click', function () {
    song.liked = !song.liked;
    this.innerHTML = song.liked ? ICONS.heart : ICONS.heartOutline;
    this.style.color = song.liked ? 'var(--accent)' : '';
  });
}

function renderSongTab(container, tab, song) {
  container.innerHTML = '';

  if (tab === 'lyrics') {
    const lyricsPanel = document.createElement('div');
    lyricsPanel.className = 'lyrics-panel';
    lyricsPanel.innerHTML = `<div class="lyrics-header"><h3>Letra</h3></div>`;
    DATA.lyrics.forEach(line => {
      const p = document.createElement('p');
      p.className = `lyrics-line ${line.active ? 'active' : ''} ${line.past ? 'past' : ''}`;
      p.textContent = line.text || '\u00A0';
      lyricsPanel.appendChild(p);
    });
    container.appendChild(lyricsPanel);

  } else if (tab === 'credits') {
    const credits = document.createElement('div');
    credits.className = 'song-detail-credits';
    credits.innerHTML = `<h3>Créditos</h3>`;
    const artists = [
      { name: song.artist, role: 'Artista Principal' },
      ...(song.artistFeat ? song.artistFeat.split(', ').map(a => ({ name: a, role: 'Artista Convidado' })) : [])
    ];
    artists.forEach(a => {
      const credit = document.createElement('div');
      credit.className = 'credit-item';
      credit.innerHTML = `
        <div class="credit-avatar"><div style="width:100%;height:100%;background:${getGradient(Math.floor(Math.random() * 10))};border-radius:50%"></div></div>
        <div class="credit-info">
          <span class="credit-name">${a.name}</span>
          <span class="credit-role">${a.role}</span>
        </div>
      `;
      credits.appendChild(credit);
    });
    container.appendChild(credits);

  } else if (tab === 'more') {
    const moreSongs = DATA.songs.filter(s => s.artist === song.artist && s.id !== song.id).slice(0, 5);
    moreSongs.forEach((s, i) => container.appendChild(createSongRow(s, i)));
  }
}

// ===== DISCOVER PAGE =====
function renderDiscoverPage(container) {
  container.className = 'main-content page-discover';

  const title = document.createElement('h1');
  title.className = 'greeting';
  title.textContent = 'Descobrir';
  container.appendChild(title);

  // Made For You with catalogue
  const madeForYou = [...DATA.spotifyPlaylists, ...DATA.radioPlaylists].map(p => ({
    ...p, spotifyBadge: !p.isRadio,
    onClick: () => navigateTo('playlist', p.id)
  }));
  container.appendChild(createSection('Feito Para Você', madeForYou, { seeAll: true }));

  // New Releases
  const newReleases = DATA.albums.slice(0, 6).map(a => ({
    ...a, subtitle: a.artist,
    onClick: () => navigateTo('album', a.id)
  }));
  container.appendChild(createSection('Lançamentos', newReleases, { seeAll: true }));

  // Genres
  const genresSection = document.createElement('div');
  genresSection.className = 'section';
  genresSection.innerHTML = `<div class="section-header"><h2>Navegar por gênero</h2></div>`;
  const genresGrid = document.createElement('div');
  genresGrid.className = 'genres-grid';
  DATA.genres.forEach(g => genresGrid.appendChild(createGenreCard(g)));
  genresSection.appendChild(genresGrid);
  container.appendChild(genresSection);
}

// ===== FRIENDS PANEL =====
function renderFriendsPanel() {
  const panel = document.querySelector('.friends-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="friends-header">
      <h3>Atividade dos Amigos</h3>
      <div class="friends-header-actions">
        <button>${ICONS.friends}</button>
      </div>
    </div>
  `;

  DATA.friendsActivity.forEach(friend => {
    const item = document.createElement('div');
    item.className = 'friend-item';
    item.innerHTML = `
      <div class="friend-avatar">
        <div style="width:100%;height:100%;background:${getGradient(friend.gradient)};border-radius:50%"></div>
      </div>
      <div class="friend-info">
        <span class="friend-name">${friend.name}</span>
        <span class="friend-activity">
          <span class="friend-activity-icon">${ICONS.music}</span>
          ${friend.song} · ${friend.artist}
        </span>
        <span style="font-size:10px;color:var(--text-muted)">${friend.time}</span>
      </div>
    `;
    panel.appendChild(item);
  });
}

// ===== STATIC COVER BUILDERS (no API) =====
function buildPlaylistCovers() {
  const allPlaylists = [
    ...(DATA.playlists || []),
    ...(DATA.spotifyPlaylists || []),
    ...(DATA.radioPlaylists || []),
  ];

  allPlaylists.forEach(pl => {
    if (pl.coverImages && pl.coverImages.length > 0) return;
    if (!pl.songs || pl.songs.length === 0) return;

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
      pl.coverImages = images;
      if (!pl.imageUrl) pl.imageUrl = images[0];
    }
  });
}

function buildAlbumCovers() {
  DATA.albums.forEach(album => {
    if (album.imageUrl) return;
    const firstSongId = album.songs?.[0];
    if (firstSongId) {
      const song = DATA.songs.find(s => s.id === firstSongId);
      if (song && song.imageUrl) album.imageUrl = song.imageUrl;
    }
  });
}

// ===== USER PROFILE PAGE =====
function renderProfilePage(container) {
  container.className = 'main-content page-profile';

  const saved = JSON.parse(localStorage.getItem('appSettings') || '{}');
  const userName = saved.userName || DATA.currentUser.name || 'User';
  const avatarColor = saved.avatarColor || '#e61e32';
  const userAvatar = DATA.currentUser.avatar;
  const totalPlaylists = DATA.playlists.length + DATA.spotifyPlaylists.length;
  const totalSongs = DATA.playlists[0]?.songs?.length || 0;

  container.innerHTML = `
      <div class="profile-hero">
        <div class="profile-hero-bg" style="background:linear-gradient(180deg, ${avatarColor}66 0%, var(--bg-main) 100%)"></div>
        <div class="profile-hero-content">
          <div class="profile-avatar" id="profile-avatar" title="Alterar foto de perfil">
            ${userAvatar
      ? `<img src="${userAvatar}" alt="${userName}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
      : `<div style="width:100%;height:100%;background:linear-gradient(135deg, ${avatarColor}, #1e3264);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:64px;font-weight:700">${userName.charAt(0).toUpperCase()}</div>`
    }
            <div class="profile-avatar-overlay">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:36px;height:36px"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              <span>Escolher foto</span>
            </div>
            <input type="file" id="profile-avatar-file" accept="image/*" style="display:none">
          </div>
          <div class="profile-info">
            <span class="profile-type">Perfil</span>
            <h1 class="profile-name">${userName}</h1>
            <div class="profile-stats">
              <span>${totalPlaylists} playlists públicas</span>
              <span class="profile-stat-dot">·</span>
              <span>${totalSongs} músicas curtidas</span>
              <span class="profile-stat-dot">·</span>
              <span>${DATA.artists.length} seguindo</span>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <button class="btn-icon profile-edit-btn" id="profile-edit-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </button>
        <button class="btn-icon" title="Mais opções">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
      </div>
    `;

  // Avatar upload
  const avatarEl = container.querySelector('#profile-avatar');
  const avatarFile = container.querySelector('#profile-avatar-file');
  avatarEl.addEventListener('click', () => avatarFile.click());
  avatarFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      DATA.currentUser.avatar = ev.target.result;
      // Update topbar avatar too
      const topAvatar = document.querySelector('.topbar-avatar');
      if (topAvatar) {
        topAvatar.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
      }
      renderProfilePage(container);
    };
    reader.readAsDataURL(file);
  });

  // Edit button goes to settings
  container.querySelector('#profile-edit-btn')?.addEventListener('click', () => navigateTo('settings'));

  // Public playlists
  const userPlaylists = DATA.playlists.slice(1).map(p => ({
    ...p, subtitle: `${p.songs?.length || p.count || 0} músicas`, type: 'playlist',
    onClick: () => navigateTo('playlist', p.id)
  }));
  if (userPlaylists.length > 0) {
    container.appendChild(createSection('Playlists públicas', userPlaylists, { seeAll: true }));
  }

  // Top artists
  const topArtists = DATA.artists.slice(0, 6).map(a => ({
    ...a, type: 'artist', subtitle: 'Artista',
    onClick: () => navigateTo('artist', a.id)
  }));
  container.appendChild(createSection('Artistas mais ouvidos', topArtists, { seeAll: true }));

  // Recently played (simulated with albums)
  const recentlyPlayed = DATA.albums.slice(0, 6).map(a => ({
    ...a, subtitle: a.artist,
    onClick: () => navigateTo('album', a.id)
  }));
  container.appendChild(createSection('Tocados recentemente', recentlyPlayed, { seeAll: true }));
}

// ===== CREATE PLAYLIST / FOLDER =====
let createMode = 'playlist'; // 'playlist' or 'folder'
let pendingCoverImage = null; // data URL of selected cover image

function showCreateMenu(anchorEl) {
  const menu = document.getElementById('create-menu');
  const rect = anchorEl.getBoundingClientRect();
  menu.style.top = (rect.bottom + 6) + 'px';
  menu.style.left = Math.min(rect.left, window.innerWidth - 240) + 'px';
  menu.classList.add('open');

  setTimeout(() => {
    function closeMenu(e) {
      if (!menu.contains(e.target) && !anchorEl.contains(e.target)) {
        menu.classList.remove('open');
        document.removeEventListener('click', closeMenu);
      }
    }
    document.addEventListener('click', closeMenu);
  }, 10);
}

function openCreateModal(mode) {
  createMode = mode;
  const overlay = document.getElementById('create-modal-overlay');
  const title = document.getElementById('create-modal-title');
  const nameInput = document.getElementById('create-modal-name');
  const descInput = document.getElementById('create-modal-desc');
  const confirmBtn = document.getElementById('create-modal-confirm');

  title.textContent = mode === 'playlist' ? 'Criar Playlist' : 'Criar Pasta';
  nameInput.value = '';
  nameInput.placeholder = mode === 'playlist' ? 'Minha playlist' : 'Minha pasta';
  descInput.value = '';
  confirmBtn.disabled = true;

  // Reset cover image
  pendingCoverImage = null;
  const cover = document.getElementById('create-modal-cover');
  cover.classList.remove('has-image');
  cover.style.backgroundImage = '';
  const fileInput = document.getElementById('create-modal-image');
  if (fileInput) fileInput.value = '';

  overlay.classList.add('open');
  document.getElementById('create-menu').classList.remove('open');

  setTimeout(() => nameInput.focus(), 100);

  nameInput.oninput = () => {
    confirmBtn.disabled = !nameInput.value.trim();
  };
}

function closeCreateModal() {
  document.getElementById('create-modal-overlay').classList.remove('open');
}

function confirmCreate() {
  const name = document.getElementById('create-modal-name').value.trim();
  const desc = document.getElementById('create-modal-desc').value.trim();
  if (!name) return;

  const gradients = [
    'linear-gradient(135deg, #1db954, #134e2a)',
    'linear-gradient(135deg, #e61e32, #191414)',
    'linear-gradient(135deg, #1e3264, #333)',
    'linear-gradient(135deg, #e56b00, #e1a100)',
    'linear-gradient(135deg, #8d67ab, #1a1a3e)',
    'linear-gradient(135deg, #148a78, #333)',
    'linear-gradient(135deg, #5179a1, #148a78)',
    'linear-gradient(135deg, #dc148c, #8d67ab)',
  ];
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

  if (createMode === 'playlist') {
    const newPlaylist = { id, name, description: desc, count: 0, gradient, songs: [], coverImage: pendingCoverImage || null };
    DATA.playlists.push(newPlaylist);
    saveUserPlaylists();
    refreshSidebarPlaylists();
    closeCreateModal();
    navigateTo('playlist', id);
  } else {
    const newFolder = { id, name, description: desc, count: 0 };
    DATA.folders.push(newFolder);
    saveUserPlaylists();
    refreshSidebarPlaylists();
    closeCreateModal();
    navigateTo('library');
  }
}

// ===== PLAYLIST PERSISTENCE =====
function saveUserPlaylists() {
  // Save user playlists (skip liked) and folders to localStorage
  const userPlaylists = DATA.playlists.filter(p => !p.isLiked).map(p => ({
    id: p.id, name: p.name, description: p.description, count: p.count,
    gradient: p.gradient, songs: p.songs, coverImage: p.coverImage || null
  }));
  const likedSongs = DATA.playlists[0]?.songs || [];
  localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
  localStorage.setItem('userFolders', JSON.stringify(DATA.folders));
  localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
}

function loadUserPlaylists() {
  // Load user playlists from localStorage
  const savedPlaylists = JSON.parse(localStorage.getItem('userPlaylists') || '[]');
  const savedFolders = JSON.parse(localStorage.getItem('userFolders') || '[]');
  const savedLiked = JSON.parse(localStorage.getItem('likedSongs') || '[]');

  // Restore liked songs
  if (savedLiked.length > 0 && DATA.playlists[0]) {
    DATA.playlists[0].songs = savedLiked;
    DATA.playlists[0].count = savedLiked.length;
  }

  // Restore user playlists
  savedPlaylists.forEach(p => {
    if (!DATA.playlists.find(x => x.id === p.id)) {
      DATA.playlists.push(p);
    }
  });

  // Restore folders
  savedFolders.forEach(f => {
    if (!DATA.folders.find(x => x.id === f.id)) {
      DATA.folders.push(f);
    }
  });
}

function refreshSidebarPlaylists() {
  const sidebarLib = document.querySelector('.sidebar-library');
  if (!sidebarLib) return;
  sidebarLib.innerHTML = '';

  // Liked songs
  const likedItem = document.createElement('div');
  likedItem.className = 'sidebar-lib-item';
  likedItem.dataset.page = 'liked';
  likedItem.innerHTML = `
        <span class="pin-indicator"></span>
        <span class="lib-icon"><svg viewBox="0 0 24 24" fill="currentColor" style="color:var(--accent)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
        <span>Músicas curtidas</span>`;
  likedItem.addEventListener('click', () => navigateTo('liked'));
  sidebarLib.appendChild(likedItem);

  // User playlists (skip liked)
  DATA.playlists.slice(1).forEach(p => {
    const item = document.createElement('div');
    item.className = 'sidebar-lib-item';
    item.dataset.page = 'playlist';
    item.dataset.id = p.id;
    item.innerHTML = `
            <span class="lib-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></span>
            <span>${p.name}</span>`;
    item.addEventListener('click', () => navigateTo('playlist', p.id));
    sidebarLib.appendChild(item);
  });

  // Albums (if any)
  if (DATA.albums.length > 0) {
    sidebarLib.appendChild(createSidebarDivider());
    sidebarLib.appendChild(createSidebarHeader('Álbuns'));
    DATA.albums.forEach(a => {
      const item = document.createElement('div');
      item.className = 'sidebar-lib-item';
      item.dataset.page = 'album';
      item.dataset.id = a.id;
      item.innerHTML = `
            <span class="lib-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg></span>
            <span>${a.name}</span>`;
      item.addEventListener('click', () => navigateTo('album', a.id));
      sidebarLib.appendChild(item);
    });
  }

  // Artists (if any)
  if (DATA.artists.length > 0) {
    sidebarLib.appendChild(createSidebarDivider());
    sidebarLib.appendChild(createSidebarHeader('Artistas'));
    DATA.artists.forEach(a => {
      const item = document.createElement('div');
      item.className = 'sidebar-lib-item';
      item.dataset.page = 'artist';
      item.dataset.id = a.id;
      item.innerHTML = `
            <span class="lib-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></span>
            <span>${a.name}</span>`;
      item.addEventListener('click', () => navigateTo('artist', a.id));
      sidebarLib.appendChild(item);
    });
  }

  // Folders
  if (DATA.folders.length > 0) {
    sidebarLib.appendChild(createSidebarDivider());
    sidebarLib.appendChild(createSidebarHeader('Pastas'));
    DATA.folders.forEach(f => {
      const item = document.createElement('div');
      item.className = 'sidebar-lib-item';
      item.innerHTML = `
                <span class="lib-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg></span>
                <span>${f.name}</span>`;
      sidebarLib.appendChild(item);
    });
  }
}

// ===== ADD MUSIC MODAL =====
let addMusicTargetPlaylist = null;
let addMusicFileData = null;

function openAddMusicModal(playlistId) {
  addMusicTargetPlaylist = playlistId;
  addMusicFileData = null;

  const overlay = document.getElementById('add-music-overlay');
  const titleInput = document.getElementById('add-music-title');
  const artistSelect = document.getElementById('add-music-artist');
  const featArtistSelect = document.getElementById('add-music-feat-artist');
  const featToggle = document.getElementById('add-music-feat-toggle');
  const featField = document.getElementById('add-music-feat-field');
  const albumField = document.getElementById('add-music-album-field');
  const fileNameSpan = document.getElementById('add-music-file-name');
  const filePicker = document.getElementById('add-music-file-picker');
  const confirmBtn = document.getElementById('add-music-confirm');
  const genresContainer = document.getElementById('add-music-genres');

  // Reset
  titleInput.value = '';
  document.getElementById('add-music-album').value = '';
  document.getElementById('add-music-file').value = '';
  fileNameSpan.textContent = 'Selecionar arquivo MP3';
  filePicker.classList.remove('has-file');
  featToggle.checked = false;
  featField.style.display = 'none';
  albumField.style.display = 'none';
  confirmBtn.disabled = true;
  document.querySelector('input[name="add-music-type"][value="single"]').checked = true;

  // Populate artist dropdowns
  artistSelect.innerHTML = '<option value="" disabled selected>Selecionar artista</option>';
  featArtistSelect.innerHTML = '<option value="" disabled selected>Artista feat</option>';
  DATA.artists.forEach(a => {
    artistSelect.innerHTML += `<option value="${a.id}">${a.name}</option>`;
    featArtistSelect.innerHTML += `<option value="${a.id}">${a.name}</option>`;
  });

  // Populate genre tags
  genresContainer.innerHTML = '';
  DATA.genres.forEach(g => {
    const tag = document.createElement('span');
    tag.className = 'genre-tag';
    tag.textContent = g.name;
    tag.dataset.genre = g.name;
    tag.addEventListener('click', () => tag.classList.toggle('active'));
    genresContainer.appendChild(tag);
  });

  // File picker
  filePicker.onclick = () => document.getElementById('add-music-file').click();
  document.getElementById('add-music-file').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    addMusicFileData = URL.createObjectURL(file);
    fileNameSpan.textContent = file.name;
    filePicker.classList.add('has-file');
    if (!titleInput.value) {
      titleInput.value = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    }
    updateAddMusicConfirm();
  };

  // Feat toggle
  featToggle.onchange = () => {
    featField.style.display = featToggle.checked ? '' : 'none';
  };

  // Type toggle
  document.querySelectorAll('input[name="add-music-type"]').forEach(r => {
    r.onchange = () => {
      albumField.style.display = r.value === 'album' && r.checked ? '' : 'none';
    };
  });

  // Validation
  titleInput.oninput = updateAddMusicConfirm;
  artistSelect.onchange = updateAddMusicConfirm;

  overlay.classList.add('open');
  setTimeout(() => titleInput.focus(), 100);
}

function updateAddMusicConfirm() {
  const title = document.getElementById('add-music-title').value.trim();
  const artist = document.getElementById('add-music-artist').value;
  document.getElementById('add-music-confirm').disabled = !title || !artist;
}

function closeAddMusicModal() {
  document.getElementById('add-music-overlay').classList.remove('open');
  addMusicFileData = null;
}

function confirmAddMusic() {
  const title = document.getElementById('add-music-title').value.trim();
  const artistId = document.getElementById('add-music-artist').value;
  const featToggle = document.getElementById('add-music-feat-toggle').checked;
  const featArtistId = featToggle ? document.getElementById('add-music-feat-artist').value : '';
  const type = document.querySelector('input[name="add-music-type"]:checked').value;
  const albumName = type === 'album' ? document.getElementById('add-music-album').value.trim() : '';
  const selectedGenres = [...document.querySelectorAll('#add-music-genres .genre-tag.active')].map(t => t.dataset.genre);

  if (!title || !artistId) return;

  const artist = DATA.artists.find(a => a.id === artistId);
  const featArtist = featArtistId ? DATA.artists.find(a => a.id === featArtistId) : null;

  const songId = Date.now();
  const newSong = {
    id: songId, title, artist: artist.name, artistId,
    artistFeat: featArtist ? featArtist.name : '',
    album: albumName || 'Single', duration: '0:00', liked: false,
    gradient: Math.floor(Math.random() * COVER_GRADIENTS.length),
    imageUrl: '', previewUrl: addMusicFileData || '',
    genres: selectedGenres, type,
  };
  DATA.songs.push(newSong);

  // Create or find album
  if (type === 'album' && albumName) {
    const albumId = albumName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let album = DATA.albums.find(a => a.id === albumId);
    if (!album) {
      album = {
        id: albumId, name: albumName, artist: artist.name, artistId,
        year: new Date().getFullYear(), songCount: 0,
        duration: '0 min', gradient: Math.floor(Math.random() * COVER_GRADIENTS.length),
        songs: [],
      };
      DATA.albums.push(album);
    }
    album.songs.push(songId);
    album.songCount = album.songs.length;
  }

  // Add to target playlist
  if (addMusicTargetPlaylist) {
    const playlist = DATA.playlists.find(p => p.id === addMusicTargetPlaylist);
    if (playlist) {
      playlist.songs.push(songId);
      playlist.count = playlist.songs.length;
    }
  }

  saveSongs();
  saveUserPlaylists();
  refreshSidebarPlaylists();
  closeAddMusicModal();
  renderPage();
}

function saveSongs() {
  const songsToSave = DATA.songs.map(s => ({
    id: s.id, title: s.title, artist: s.artist, artistId: s.artistId,
    artistFeat: s.artistFeat, album: s.album, duration: s.duration,
    liked: s.liked, gradient: s.gradient, imageUrl: s.imageUrl,
    previewUrl: '',
    genres: s.genres || [], type: s.type || 'single',
  }));
  localStorage.setItem('userSongs', JSON.stringify(songsToSave));
  localStorage.setItem('userAlbums', JSON.stringify(DATA.albums));
}

function loadSongs() {
  const savedSongs = JSON.parse(localStorage.getItem('userSongs') || '[]');
  const savedAlbums = JSON.parse(localStorage.getItem('userAlbums') || '[]');
  savedSongs.forEach(s => {
    if (!DATA.songs.find(x => x.id === s.id)) DATA.songs.push(s);
  });
  savedAlbums.forEach(a => {
    if (!DATA.albums.find(x => x.id === a.id)) DATA.albums.push(a);
  });
}

function createSidebarDivider() {
  const d = document.createElement('div');
  d.className = 'sidebar-divider';
  d.style.margin = '8px 20px';
  return d;
}

function createSidebarHeader(title) {
  const h = document.createElement('div');
  h.className = 'sidebar-library-header';
  h.innerHTML = `<h3>${title}</h3>`;
  return h;
}

// ===== SETTINGS PAGE =====
function renderSettingsPage(container) {
  container.className = 'main-content page-settings';

  // Load saved settings
  const saved = JSON.parse(localStorage.getItem('appSettings') || '{}');
  const settings = {
    userName: saved.userName || 'User',
    avatarColor: saved.avatarColor || '#e61e32',
    volume: saved.volume ?? 80,
    crossfade: saved.crossfade ?? 0,
    audioQuality: saved.audioQuality || 'high',
    equalizer: saved.equalizer || 'off',
    accentColor: saved.accentColor || '#1db954',
    fontSize: saved.fontSize || 'medium',
    layoutDensity: saved.layoutDensity || 'normal',
    showLyrics: saved.showLyrics ?? true,
    autoplay: saved.autoplay ?? true,
    animations: saved.animations ?? true,
    language: saved.language || 'pt-BR',
  };

  function saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }

  container.innerHTML = `
      <div class="settings-header">
        <h1>Configurações</h1>
        <p class="settings-subtitle">Personalize sua experiência</p>
      </div>

      <!-- ACCOUNT -->
      <div class="settings-section">
        <div class="settings-section-header">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:22px;height:22px"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <h2>Conta</h2>
        </div>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <label>Nome de exibição</label>
              <span class="setting-desc">Como seu nome aparece no app</span>
            </div>
            <input type="text" class="setting-input" id="setting-name" value="${settings.userName}" placeholder="Seu nome">
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Cor do avatar</label>
              <span class="setting-desc">Escolha uma cor para seu perfil</span>
            </div>
            <div class="setting-color-row">
              <input type="color" class="setting-color" id="setting-avatar-color" value="${settings.avatarColor}">
              <div class="avatar-preview" id="avatar-preview" style="background:${settings.avatarColor}">${settings.userName.charAt(0).toUpperCase()}</div>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Idioma</label>
              <span class="setting-desc">Idioma de exibição do app</span>
            </div>
            <select class="setting-select" id="setting-language">
              <option value="pt-BR" ${settings.language === 'pt-BR' ? 'selected' : ''}>Português (BR)</option>
              <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
              <option value="es" ${settings.language === 'es' ? 'selected' : ''}>Español</option>
            </select>
          </div>
        </div>
      </div>

      <!-- AUDIO -->
      <div class="settings-section">
        <div class="settings-section-header">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:22px;height:22px"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          <h2>Áudio</h2>
        </div>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <label>Volume padrão</label>
              <span class="setting-desc">Defina o volume padrão de reprodução</span>
            </div>
            <div class="setting-slider-row">
              <input type="range" class="setting-slider" id="setting-volume" min="0" max="100" value="${settings.volume}">
              <span class="setting-slider-value" id="volume-value">${settings.volume}%</span>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Crossfade</label>
              <span class="setting-desc">Transição suave entre faixas</span>
            </div>
            <div class="setting-slider-row">
              <input type="range" class="setting-slider" id="setting-crossfade" min="0" max="12" value="${settings.crossfade}">
              <span class="setting-slider-value" id="crossfade-value">${settings.crossfade}s</span>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Qualidade de áudio</label>
              <span class="setting-desc">Maior qualidade usa mais banda</span>
            </div>
            <select class="setting-select" id="setting-quality">
              <option value="low" ${settings.audioQuality === 'low' ? 'selected' : ''}>Baixa (96 kbps)</option>
              <option value="normal" ${settings.audioQuality === 'normal' ? 'selected' : ''}>Normal (160 kbps)</option>
              <option value="high" ${settings.audioQuality === 'high' ? 'selected' : ''}>Alta (320 kbps)</option>
              <option value="lossless" ${settings.audioQuality === 'lossless' ? 'selected' : ''}>Sem perda (FLAC)</option>
            </select>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Equalizador</label>
              <span class="setting-desc">Preset de equalização de áudio</span>
            </div>
            <select class="setting-select" id="setting-equalizer">
              <option value="off" ${settings.equalizer === 'off' ? 'selected' : ''}>Desligado</option>
              <option value="bass" ${settings.equalizer === 'bass' ? 'selected' : ''}>Reforço de Graves</option>
              <option value="vocal" ${settings.equalizer === 'vocal' ? 'selected' : ''}>Vocal</option>
              <option value="rock" ${settings.equalizer === 'rock' ? 'selected' : ''}>Rock</option>
              <option value="electronic" ${settings.equalizer === 'electronic' ? 'selected' : ''}>Eletrônica</option>
              <option value="jazz" ${settings.equalizer === 'jazz' ? 'selected' : ''}>Jazz</option>
            </select>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Reprodução automática</label>
              <span class="setting-desc">Continuar tocando faixas semelhantes quando sua música acabar</span>
            </div>
            <label class="setting-toggle">
              <input type="checkbox" id="setting-autoplay" ${settings.autoplay ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- APPEARANCE -->
      <div class="settings-section">
        <div class="settings-section-header">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:22px;height:22px"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
          <h2>Aparência</h2>
        </div>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <label>Cor de destaque</label>
              <span class="setting-desc">Cor do tema usada no app</span>
            </div>
            <div class="accent-colors" id="accent-colors">
              <button class="accent-dot ${settings.accentColor === '#1db954' ? 'active' : ''}" data-color="#1db954" style="background:#1db954" title="Verde"></button>
              <button class="accent-dot ${settings.accentColor === '#e61e32' ? 'active' : ''}" data-color="#e61e32" style="background:#e61e32" title="Vermelho"></button>
              <button class="accent-dot ${settings.accentColor === '#1e90ff' ? 'active' : ''}" data-color="#1e90ff" style="background:#1e90ff" title="Azul"></button>
              <button class="accent-dot ${settings.accentColor === '#e056fd' ? 'active' : ''}" data-color="#e056fd" style="background:#e056fd" title="Roxo"></button>
              <button class="accent-dot ${settings.accentColor === '#f0932b' ? 'active' : ''}" data-color="#f0932b" style="background:#f0932b" title="Laranja"></button>
              <button class="accent-dot ${settings.accentColor === '#ff6b81' ? 'active' : ''}" data-color="#ff6b81" style="background:#ff6b81" title="Rosa"></button>
              <button class="accent-dot ${settings.accentColor === '#00d2d3' ? 'active' : ''}" data-color="#00d2d3" style="background:#00d2d3" title="Ciano"></button>
              <button class="accent-dot ${settings.accentColor === '#ffd700' ? 'active' : ''}" data-color="#ffd700" style="background:#ffd700" title="Dourado"></button>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Tamanho da fonte</label>
              <span class="setting-desc">Ajuste o tamanho do texto</span>
            </div>
            <select class="setting-select" id="setting-fontsize">
              <option value="small" ${settings.fontSize === 'small' ? 'selected' : ''}>Pequeno</option>
              <option value="medium" ${settings.fontSize === 'medium' ? 'selected' : ''}>Médio</option>
              <option value="large" ${settings.fontSize === 'large' ? 'selected' : ''}>Grande</option>
            </select>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Densidade do layout</label>
              <span class="setting-desc">Quão compacta a interface parece</span>
            </div>
            <select class="setting-select" id="setting-density">
              <option value="compact" ${settings.layoutDensity === 'compact' ? 'selected' : ''}>Compacto</option>
              <option value="normal" ${settings.layoutDensity === 'normal' ? 'selected' : ''}>Normal</option>
              <option value="comfortable" ${settings.layoutDensity === 'comfortable' ? 'selected' : ''}>Confortável</option>
            </select>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Mostrar letras</label>
              <span class="setting-desc">Exibir letras nas páginas de detalhes</span>
            </div>
            <label class="setting-toggle">
              <input type="checkbox" id="setting-lyrics" ${settings.showLyrics ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Animações</label>
              <span class="setting-desc">Ativar transições suaves e micro-animações</span>
            </div>
            <label class="setting-toggle">
              <input type="checkbox" id="setting-animations" ${settings.animations ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- DATA MANAGEMENT -->
      <div class="settings-section">
        <div class="settings-section-header">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:22px;height:22px"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
          <h2>Gerenciamento de Dados</h2>
        </div>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <label>Exportar dados</label>
              <span class="setting-desc">Baixar seus dados musicais como JSON</span>
            </div>
            <button class="setting-btn" id="btn-export">Exportar JSON</button>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Importar dados</label>
              <span class="setting-desc">Carregar dados de um arquivo JSON</span>
            </div>
            <label class="setting-btn" id="btn-import">
              Importar JSON
              <input type="file" accept=".json" id="import-file" style="display:none">
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Resetar configurações</label>
              <span class="setting-desc">Restaurar padrões (não pode ser desfeito)</span>
            </div>
            <button class="setting-btn danger" id="btn-reset">Resetar</button>
          </div>
        </div>
      </div>

      <!-- Music Management -->
      <div class="settings-section">
        <h3 class="settings-section-title">Músicas</h3>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <label>Adicionar música</label>
              <span class="setting-desc">Adicione arquivos MP3 ao seu app, escolha artista, gênero e tipo</span>
            </div>
            <button class="setting-btn accent" id="btn-settings-add-music">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;margin-right:4px"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              Adicionar
            </button>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <label>Total de músicas</label>
              <span class="setting-desc">${DATA.songs.length} músicas cadastradas</span>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-info">
        <p>Spotify Redesign — v2.0</p>
        <p>${DATA.songs.length} músicas · ${DATA.artists.length} artistas · ${DATA.playlists.length} playlists</p>
      </div>
    `;

  // ═══ EVENT LISTENERS ═══
  container.querySelector('#setting-name').addEventListener('input', (e) => {
    settings.userName = e.target.value; saveSettings();
    const preview = container.querySelector('#avatar-preview');
    if (preview) preview.textContent = (e.target.value || 'U').charAt(0).toUpperCase();
    const topAvatar = document.querySelector('.topbar-avatar div');
    if (topAvatar) topAvatar.textContent = (e.target.value || 'U').charAt(0).toUpperCase();
  });
  container.querySelector('#setting-avatar-color').addEventListener('input', (e) => {
    settings.avatarColor = e.target.value; saveSettings();
    const preview = container.querySelector('#avatar-preview');
    if (preview) preview.style.background = e.target.value;
    const topAvatar = document.querySelector('.topbar-avatar div');
    if (topAvatar) topAvatar.style.background = e.target.value;
  });
  container.querySelector('#setting-language').addEventListener('change', (e) => { settings.language = e.target.value; saveSettings(); });
  container.querySelector('#setting-volume').addEventListener('input', (e) => {
    settings.volume = parseInt(e.target.value); saveSettings();
    container.querySelector('#volume-value').textContent = settings.volume + '%';
    const audio = document.getElementById('audio-player');
    if (audio) audio.volume = settings.volume / 100;
  });
  container.querySelector('#setting-crossfade').addEventListener('input', (e) => {
    settings.crossfade = parseInt(e.target.value); saveSettings();
    container.querySelector('#crossfade-value').textContent = settings.crossfade + 's';
  });
  container.querySelector('#setting-quality').addEventListener('change', (e) => { settings.audioQuality = e.target.value; saveSettings(); });
  container.querySelector('#setting-equalizer').addEventListener('change', (e) => { settings.equalizer = e.target.value; saveSettings(); });
  container.querySelector('#setting-autoplay').addEventListener('change', (e) => { settings.autoplay = e.target.checked; saveSettings(); });
  container.querySelectorAll('.accent-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      settings.accentColor = dot.dataset.color; saveSettings();
      document.documentElement.style.setProperty('--accent', dot.dataset.color);
      container.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
  container.querySelector('#setting-fontsize').addEventListener('change', (e) => {
    settings.fontSize = e.target.value; saveSettings();
    const scale = { small: '13px', medium: '14px', large: '16px' };
    document.documentElement.style.setProperty('--font-size-base', scale[e.target.value]);
  });
  container.querySelector('#setting-density').addEventListener('change', (e) => {
    settings.layoutDensity = e.target.value; saveSettings();
    const spacing = { compact: '12px', normal: '16px', comfortable: '22px' };
    document.documentElement.style.setProperty('--space-md', spacing[e.target.value]);
  });
  container.querySelector('#setting-lyrics').addEventListener('change', (e) => { settings.showLyrics = e.target.checked; saveSettings(); });
  container.querySelector('#setting-animations').addEventListener('change', (e) => {
    settings.animations = e.target.checked; saveSettings();
    document.body.classList.toggle('no-animations', !e.target.checked);
  });
  container.querySelector('#btn-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'spotify-redesign-data.json'; a.click();
  });
  container.querySelector('#import-file').addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (d.songs) DATA.songs = d.songs; if (d.artists) DATA.artists = d.artists;
        if (d.playlists) DATA.playlists = d.playlists; if (d.albums) DATA.albums = d.albums;
        alert('Dados importados! Recarregando...'); location.reload();
      } catch (err) { alert('Erro: ' + err.message); }
    };
    reader.readAsText(file);
  });
  container.querySelector('#btn-reset').addEventListener('click', () => {
    if (confirm('Resetar todas as configurações?')) {
      localStorage.removeItem('appSettings');
      document.documentElement.style.setProperty('--accent', '#1db954');
      document.documentElement.style.removeProperty('--font-size-base');
      document.documentElement.style.removeProperty('--space-md');
      navigateTo('settings');
    }
  });

  // Add music from settings
  container.querySelector('#btn-settings-add-music')?.addEventListener('click', () => {
    openAddMusicModal(null);
  });
}

// Apply saved settings on load
function applySavedSettings() {
  const saved = JSON.parse(localStorage.getItem('appSettings') || '{}');
  if (saved.accentColor) document.documentElement.style.setProperty('--accent', saved.accentColor);
  if (saved.fontSize) {
    const scale = { small: '13px', medium: '14px', large: '16px' };
    if (scale[saved.fontSize]) document.documentElement.style.setProperty('--font-size-base', scale[saved.fontSize]);
  }
  if (saved.layoutDensity) {
    const spacing = { compact: '12px', normal: '16px', comfortable: '22px' };
    if (spacing[saved.layoutDensity]) document.documentElement.style.setProperty('--space-md', spacing[saved.layoutDensity]);
  }
  if (saved.animations === false) document.body.classList.add('no-animations');
  if (saved.userName) {
    const topAvatar = document.querySelector('.topbar-avatar div');
    if (topAvatar) topAvatar.textContent = saved.userName.charAt(0).toUpperCase();
  }
  if (saved.avatarColor) {
    const topAvatar = document.querySelector('.topbar-avatar div');
    if (topAvatar) topAvatar.style.background = saved.avatarColor;
  }
}

// ===== CUSTOM CONFIRM MODAL =====
function showConfirmModal(title, message, confirmText, onConfirm) {
  const overlay = document.getElementById('confirm-modal-overlay');
  document.getElementById('confirm-modal-title').textContent = title;
  document.getElementById('confirm-modal-message').textContent = message;
  const okBtn = document.getElementById('confirm-modal-ok');
  okBtn.textContent = confirmText;
  overlay.classList.add('open');

  // Fresh handlers (remove old ones)
  const cancelBtn = document.getElementById('confirm-modal-cancel');
  const newOk = okBtn.cloneNode(true);
  const newCancel = cancelBtn.cloneNode(true);
  okBtn.replaceWith(newOk);
  cancelBtn.replaceWith(newCancel);

  function close() { overlay.classList.remove('open'); }

  newCancel.addEventListener('click', close);
  newOk.addEventListener('click', () => { close(); onConfirm(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); }, { once: true });
}

// ===== INITIALIZATION =====
function initApp() {
  // Navigation
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });

  document.querySelectorAll('.topbar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });

  // Sidebar library items
  document.querySelectorAll('.sidebar-lib-item').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      const id = item.dataset.id;
      if (page) navigateTo(page, id);
    });
  });

  // Friends toggle
  document.querySelector('.friends-toggle')?.addEventListener('click', () => {
    document.querySelector('.app-shell')?.classList.toggle('friends-open');
    renderFriendsPanel();
  });

  // Settings gear button
  document.querySelectorAll('.topbar-action-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });

  // Profile avatar click
  document.getElementById('topbar-avatar')?.addEventListener('click', () => navigateTo('profile'));

  // Create menu: sidebar + button
  document.getElementById('btn-create-sidebar')?.addEventListener('click', function (e) {
    e.stopPropagation();
    showCreateMenu(this);
  });

  // Create menu items
  document.getElementById('create-playlist-btn')?.addEventListener('click', () => openCreateModal('playlist'));
  document.getElementById('create-folder-btn')?.addEventListener('click', () => openCreateModal('folder'));

  // Create modal buttons
  document.getElementById('create-modal-close')?.addEventListener('click', closeCreateModal);
  document.getElementById('create-modal-cancel')?.addEventListener('click', closeCreateModal);
  document.getElementById('create-modal-confirm')?.addEventListener('click', confirmCreate);
  document.getElementById('create-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'create-modal-overlay') closeCreateModal();
  });
  document.getElementById('create-modal-name')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !document.getElementById('create-modal-confirm').disabled) confirmCreate();
  });

  // Cover image upload in create modal
  document.getElementById('create-modal-cover')?.addEventListener('click', () => {
    document.getElementById('create-modal-image')?.click();
  });
  document.getElementById('create-modal-image')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      pendingCoverImage = ev.target.result;
      const cover = document.getElementById('create-modal-cover');
      cover.style.backgroundImage = `url(${pendingCoverImage})`;
      cover.classList.add('has-image');
    };
    reader.readAsDataURL(file);
  });

  // Add Music modal
  document.getElementById('add-music-close')?.addEventListener('click', closeAddMusicModal);
  document.getElementById('add-music-cancel')?.addEventListener('click', closeAddMusicModal);
  document.getElementById('add-music-confirm')?.addEventListener('click', confirmAddMusic);
  document.getElementById('add-music-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'add-music-overlay') closeAddMusicModal();
  });

  // Initialize
  loadUserPlaylists();
  loadSongs();
  applySavedSettings();
  refreshSidebarPlaylists();
  renderPage();
  initPlayer();
  renderFriendsPanel();

  // Build playlist covers from song images on startup
  buildPlaylistCovers();
  buildAlbumCovers();
}

document.addEventListener('DOMContentLoaded', initApp);
