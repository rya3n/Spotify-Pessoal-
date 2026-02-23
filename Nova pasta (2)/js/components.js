// ===== SVG ICONS =====
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 3.248a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.731V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"/></svg>',
  library: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0114 3v18a1 1 0 001.5.866l9-5.196a1 1 0 000-1.732l-9-5.196A1 1 0 0014 10.608V3a1 1 0 011.5-.866zM16 12.608L22 16l-6 3.464V12.608zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z"/></svg>',
  discover: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-3.5-4.5l2-5 5-2-2 5-5 2z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.7 3a.7.7 0 00-.7.7v6.805L5.05 3.606A.7.7 0 004 4.212v15.576a.7.7 0 001.05.606L17 13.495V20.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-1.6z"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.3 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7v-6.805l11.95 6.899A.7.7 0 0021.6 19.788V4.212a.7.7 0 00-1.05-.606L8.6 10.505V3.7a.7.7 0 00-.7-.7H6.3z"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 6.8a.8.8 0 01-.8-.8V4.5a.8.8 0 01.8-.8h3.522a2 2 0 011.487.662l2.644 2.94-1.487 1.338L8.022 5.7H5.3v.3a.8.8 0 01-.8.8zm14.2 11.5h-2.722a2 2 0 01-1.487-.662l-2.644-2.94 1.487-1.338L15.978 16.3h2.722v-.3a.8.8 0 01.8-.8h1.5a.8.8 0 01.8.8v1.5a.8.8 0 01-.8.8H19.5a.8.8 0 01-.8-.8v.8zm0-14h-2.722a2 2 0 00-1.487.662L7.134 13.24A2 2 0 015.647 13.9H3v2h2.647a2 2 0 001.487-.662L14.49 6.962A2 2 0 0115.978 6.3h2.722v.3a.8.8 0 00.8.8h1.5a.8.8 0 00.8-.8V5.1a.8.8 0 00-.8-.8H19.5a.8.8 0 00-.8.8v-.8z"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.5 5h13a3 3 0 013 3v3h-2V8a1 1 0 00-1-1h-13l2.146 2.146-1.414 1.414L2.672 7l3.56-3.56L7.646 4.854 5.5 7V5zm13 14h-13a3 3 0 01-3-3v-3h2v3a1 1 0 001 1h13l-2.146-2.146 1.414-1.414L21.328 17l-3.56 3.56-1.414-1.414L18.5 17v2z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  heartOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  volume: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 3.248a1 1 0 011.5.866v15.772a1 1 0 01-1.5.866L6.828 17H3a1 1 0 01-1-1V8a1 1 0 011-1h3.828l5.672-3.752zM12 5.693L7.672 8.534a1 1 0 01-.544.16H4v6.612h3.128a1 1 0 01.544.16L12 18.307V5.694zM18.5 12a4.5 4.5 0 00-1.5-3.354v6.708A4.48 4.48 0 0018.5 12zM17 3.544a8.5 8.5 0 010 16.912V18.4a6.5 6.5 0 000-12.8V3.544z"/></svg>',
  volumeMute: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 3.248a1 1 0 011.5.866v15.772a1 1 0 01-1.5.866L6.828 17H3a1 1 0 01-1-1V8a1 1 0 011-1h3.828l5.672-3.752zm7.06 5.192a1 1 0 011.414 0L23 10.466l2.026-2.026a1 1 0 111.414 1.414L24.414 11.88l2.026 2.026a1 1 0 01-1.414 1.414L23 13.294l-2.026 2.026a1 1 0 01-1.414-1.414l2.026-2.026-2.026-2.026a1 1 0 010-1.414z"/></svg>',
  queue: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 15H3v-2h12v2zm0-8H3V5h12v2zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM21 7v-4h-2v4h-4v2h4v4h2V9h4V7h-4z"/></svg>',
  friends: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
  notification: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  pin: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.961-4.96L.939 16.173l-.707-.707 5.288-5.288L.559 5.217l4.988-1.337L8.822.797z"/></svg>',
  spotify: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',
  verified: '<svg viewBox="0 0 24 24" fill="#3d91f4"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>',
  addQueue: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8h-2V6h-4l5-5 5 5h-4zm-2 12h2v-4h4v-2h-4V8h-2v4h-4v2h4v4z"/></svg>',
  radio: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12a2 2 0 002 2h16a2 2 0 002-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34-.37-.91L3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4v-2h16v2z"/></svg>',
  miniplayer: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v5h-9z"/></svg>',
  fullscreen: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
  devices: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg>',
};

// ===== COMPONENT GENERATORS =====
function createCoverDiv(gradient, size = '100%') {
  const div = document.createElement('div');
  div.style.width = size;
  div.style.height = size;
  div.style.background = typeof gradient === 'number' ? getGradient(gradient) : gradient;
  div.style.borderRadius = 'inherit';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';
  return div;
}

function createCard(data) {
  const card = document.createElement('div');
  card.className = 'card';
  const isArtist = data.type === 'artist';
  const isFolder = data.type === 'folder';
  const isLiked = data.isLiked;

  let coverContent = '';
  if (isLiked) {
    coverContent = `<div style="width:100%;height:100%;background:linear-gradient(135deg,#4b17e6,#1db954);display:flex;align-items:center;justify-content:center">${ICONS.heart}</div>`;
  } else if (isFolder) {
    coverContent = `<div style="width:100%;height:100%;background:#333;display:flex;align-items:center;justify-content:center;color:#888">${ICONS.folder}</div>`;
  } else if (data.coverImages && data.coverImages.length >= 2) {
    // Spotify-style 2x2 collage grid
    const imgs = data.coverImages.slice(0, 4);
    // Pad to 4 if only 2-3 images
    while (imgs.length < 4) imgs.push(imgs[imgs.length - 1]);
    coverContent = `<div style="width:100%;height:100%;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:2px;border-radius:inherit;overflow:hidden">
      ${imgs.map(url => `<img src="${url}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.background='#333'">`).join('')}
    </div>`;
  } else if (data.imageUrl) {
    coverContent = `<img src="${data.imageUrl}" alt="${data.name || data.title}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div style="display:none;width:100%;height:100%;background:${typeof data.gradient === 'number' ? getGradient(data.gradient) : (data.gradient || getGradient(0))};align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>`;
  } else {
    coverContent = `<div style="width:100%;height:100%;background:${typeof data.gradient === 'number' ? getGradient(data.gradient) : (data.gradient || getGradient(0))};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${data.isRadio ? '<span style="font-size:10px;color:rgba(255,255,255,0.7);position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.5);padding:2px 6px;border-radius:4px">RADIO</span>' : ''}${ICONS.music}</div>`;
  }

  card.innerHTML = `
    <div class="card-cover ${isArtist ? 'circle' : ''}" style="position:relative">
      ${coverContent}
      <div class="card-play-btn">${ICONS.play}</div>
      ${data.pinned ? `<div class="card-pin">${ICONS.pin}</div>` : ''}
      ${data.spotifyBadge ? `<div class="spotify-badge">${ICONS.spotify}</div>` : ''}
    </div>
    <div class="card-title">${data.name || data.title}</div>
    <div class="card-subtitle">${data.subtitle || data.description || data.artist || ''}</div>
    ${data.count !== undefined ? `<div class="card-meta"><span class="card-count">${data.count}</span></div>` : ''}
  `;

  if (data.onClick) {
    card.addEventListener('click', data.onClick);
  }

  return card;
}

function createSection(title, items, options = {}) {
  const section = document.createElement('div');
  section.className = 'section';

  const headerExtra = options.seeAll ? `<span class="section-see-all">Mostrar tudo</span>` : '';
  const navBtns = options.navBtns !== false ? `
    <button class="section-nav-btn nav-prev">${ICONS.arrowLeft}</button>
    <button class="section-nav-btn nav-next">${ICONS.arrowRight}</button>
  ` : '';

  section.innerHTML = `
    <div class="section-header">
      <h2>${title}</h2>
      <div class="section-header-right">
        ${headerExtra}
        ${navBtns}
        ${options.moreBtn ? `<button class="section-more-btn">${ICONS.more}</button>` : ''}
      </div>
    </div>
    <div class="section-row"></div>
  `;

  const row = section.querySelector('.section-row');
  items.forEach(item => {
    if (item instanceof HTMLElement) {
      row.appendChild(item);
    } else {
      row.appendChild(createCard(item));
    }
  });

  // Scroll functionality
  const prevBtn = section.querySelector('.nav-prev');
  const nextBtn = section.querySelector('.nav-next');
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      row.scrollBy({ left: -400, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      row.scrollBy({ left: 400, behavior: 'smooth' });
    });
  }

  return section;
}

function createPill(label, active = false, onClick = null) {
  const pill = document.createElement('button');
  pill.className = `pill ${active ? 'active' : ''}`;
  pill.textContent = label;
  if (onClick) pill.addEventListener('click', onClick);
  return pill;
}

function createGenreCard(genre) {
  const card = document.createElement('div');
  card.className = 'genre-card';
  card.style.background = genre.color;
  card.innerHTML = `<span class="genre-card-title">${genre.name}</span>`;
  return card;
}

function createSongRow(song, index, options = {}) {
  const row = document.createElement('div');
  row.className = `song-row ${song.id === playerState.currentSong?.id ? 'playing' : ''}`;
  const displayArtist = song.artistFeat ? `${song.artist}, ${song.artistFeat}` : song.artist;

  row.innerHTML = `
    <div class="song-num-wrap">
      <span class="song-num">${index + 1}</span>
      <span class="song-play-icon">${ICONS.play}</span>
    </div>
    <div class="song-info">
      <div class="song-info-cover">
        ${song.imageUrl
      ? `<img src="${song.imageUrl}" alt="${song.title}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div style="display:none;width:100%;height:100%;background:${getGradient(song.gradient)};align-items:center;justify-content:center;color:rgba(255,255,255,0.3)"><svg viewBox='0 0 24 24' fill='currentColor' style='width:16px;height:16px'><path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/></svg></div>`
      : `<div style="width:100%;height:100%;background:${getGradient(song.gradient)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)"><svg viewBox='0 0 24 24' fill='currentColor' style='width:16px;height:16px'><path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/></svg></div>`
    }
      </div>
      <div class="song-info-text">
        <span class="song-info-title">${song.title}</span>
        <span class="song-info-artist">${displayArtist}</span>
      </div>
    </div>
    <span class="song-album">${song.realAlbumName || song.album}</span>
    <span class="song-duration">${song.realDuration ? formatTime(song.realDuration) : song.duration}</span>
    ${song.previewUrl ? '<span class="song-preview-badge" title="Preview disponível">♫</span>' : ''}
    <button class="song-like ${song.liked ? 'liked' : ''}">${song.liked ? ICONS.heart : ICONS.heartOutline}</button>
  `;

  row.addEventListener('click', (e) => {
    if (e.target.closest('.song-like')) {
      song.liked = !song.liked;
      const btn = row.querySelector('.song-like');
      btn.classList.toggle('liked');
      btn.innerHTML = song.liked ? ICONS.heart : ICONS.heartOutline;
      return;
    }
    playSong(song);
  });

  return row;
}

function createQuickTile(data) {
  const tile = document.createElement('div');
  tile.className = 'quick-tile';

  const coverBg = data.isLiked
    ? 'linear-gradient(135deg, #4b17e6, #1db954)'
    : (typeof data.gradient === 'number' ? getGradient(data.gradient) : (data.gradient || getGradient(0)));

  let tileImageContent;
  if (data.isLiked) {
    tileImageContent = `<div style="width:100%;height:100%;background:${coverBg};display:flex;align-items:center;justify-content:center;color:#fff">${ICONS.heart}</div>`;
  } else if (data.coverImages && data.coverImages.length >= 2) {
    const imgs = data.coverImages.slice(0, 4);
    while (imgs.length < 4) imgs.push(imgs[imgs.length - 1]);
    tileImageContent = `<div style="width:100%;height:100%;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:1px;overflow:hidden">
      ${imgs.map(url => `<img src="${url}" style="width:100%;height:100%;object-fit:cover">`).join('')}
    </div>`;
  } else if (data.imageUrl) {
    tileImageContent = `<img src="${data.imageUrl}" alt="${data.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div style="display:none;width:100%;height:100%;background:${coverBg};align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>`;
  } else {
    tileImageContent = `<div style="width:100%;height:100%;background:${coverBg};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>`;
  }

  tile.innerHTML = `
    <div class="quick-tile-cover">
      ${tileImageContent}
    </div>
    <span class="quick-tile-name">${data.name}</span>
    <div class="quick-tile-play">${ICONS.play}</div>
  `;

  if (data.onClick) {
    tile.addEventListener('click', data.onClick);
  }

  return tile;
}

function createAlbumListItem(album) {
  const item = document.createElement('div');
  item.className = 'album-list-item';
  item.innerHTML = `
    <div class="album-list-cover">
      <div style="width:100%;height:100%;background:${getGradient(album.gradient)};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3)">${ICONS.music}</div>
    </div>
    <div class="album-list-info">
      <span class="album-list-title">${album.name}</span>
      <span class="album-list-meta">${album.year} · ${album.songCount} songs · ${album.duration}</span>
    </div>
    <div class="album-list-actions">
      <button>${ICONS.play}</button>
      <button>${ICONS.shuffle}</button>
      <button>${ICONS.plus}</button>
      <button>${ICONS.addQueue}</button>
      <button>${ICONS.share}</button>
      <button>${ICONS.more}</button>
    </div>
  `;

  item.addEventListener('click', () => {
    navigateTo('album', album.id);
  });

  return item;
}
