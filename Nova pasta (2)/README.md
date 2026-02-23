# 🎵 Spotify Redesign — Réplica Funcional

Réplica completa de uma aplicação de streaming de música inspirada no Spotify, construída **100% com HTML, CSS e JavaScript puro** (sem frameworks).

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Como Executar](#-como-executar)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [O Que Já Foi Feito ✅](#-o-que-já-foi-feito-)
5. [O Que Ainda Falta Fazer 🔲](#-o-que-ainda-falta-fazer-)
6. [Detalhamento Técnico](#-detalhamento-técnico)
7. [Dados Mock](#-dados-mock)
8. [Funcionalidades Interativas](#-funcionalidades-interativas)

---

## 🎯 Visão Geral

Este projeto é uma réplica funcional do **Spotify Desktop**, criada a partir de screenshots de design do Figma. A aplicação é uma **SPA (Single Page Application)** — ou seja, toda a navegação acontece dentro de uma única página HTML, sem recarregamentos.

### Tecnologias Utilizadas
| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura semântica da aplicação |
| **CSS3** | Design system completo com variáveis CSS, grid layout, animações |
| **JavaScript Vanilla** | Lógica da aplicação, roteamento, player, componentes dinâmicos |
| **Google Fonts (Inter)** | Tipografia moderna e limpa |

### Princípios de Design
- 🌙 **Modo escuro** com background `#121212` (igual ao Spotify real)
- 💚 **Cor de destaque** verde Spotify `#1DB954`
- 🎨 **Gradientes** para capas de álbuns/playlists (já que não temos imagens reais)
- ✨ **Micro-animações** em hover, transições suaves, efeitos de reveal

---

## 🚀 Como Executar

### Opção 1: Abrir direto no navegador
Basta **dar duplo clique** no arquivo `index.html` — funciona diretamente no navegador.

### Opção 2: Usar um servidor local (recomendado)
```bash
# Na pasta do projeto, execute:
npx -y http-server . -p 8080 --cors

# Depois acesse:
# http://127.0.0.1:8080
```

> **Por que servidor local?** Alguns navegadores podem bloquear recursos ao abrir arquivos locais diretamente. O servidor local garante que tudo funcione perfeitamente.

---

## 📁 Estrutura do Projeto

```
Nova pasta (2)/
│
├── 📄 index.html                 ← Ponto de entrada da aplicação
├── 📄 README.md                  ← Este arquivo (documentação)
│
├── 📂 css/                       ← Todos os estilos organizados
│   ├── variables.css             ← Tokens de design (cores, fontes, espaçamentos)
│   ├── reset.css                 ← Reset CSS + estilos base
│   ├── layout.css                ← Layout do shell (sidebar, topbar, player)
│   ├── components.css            ← Componentes reutilizáveis (cards, pills, listas)
│   └── pages.css                 ← Estilos específicos de cada página
│
└── 📂 js/                        ← Toda a lógica JavaScript
    ├── data.js                   ← Dados mock (músicas, artistas, playlists)
    ├── components.js             ← Ícones SVG + geradores de componentes
    ├── player.js                 ← Controle do player de música
    └── app.js                    ← Roteador SPA + renderizadores de páginas
```

---

## ✅ O Que Já Foi Feito

### 1. Design System CSS (100% completo)

| Arquivo | O que contém | Status |
|---------|-------------|--------|
| `variables.css` | 60+ variáveis CSS: cores primárias/secundárias, verde Spotify, tipografia (tamanhos, pesos), 9 tamanhos de espaçamento, border-radius, transições, sombras, z-index, scrollbar customizado | ✅ Feito |
| `reset.css` | Reset universal com `box-sizing: border-box`, scrollbar estilizado, importação da fonte Inter do Google Fonts, estilos base para body/links/botões/inputs | ✅ Feito |
| `layout.css` | Layout principal usando CSS Grid com 3 colunas (sidebar + conteúdo + amigos) e 3 linhas (topbar + conteúdo + player). Inclui sidebar fixa de 240px, topbar de 60px, player bar de 86px, painel de amigos de 320px | ✅ Feito |
| `components.css` | 30+ componentes: Cards com cover/título/subtítulo, seções horizontais com scroll, filter pills, cards de gênero, input de busca, tabela de músicas (song rows), quick tiles, grids de biblioteca, headers de página, hero de artista, painel de lyrics, cards de episódio, menu de contexto, tooltips, painel de fila | ✅ Feito |
| `pages.css` | Estilos específicos para: Home (greeting), Search (genres grid), Library (toolbar), Liked Songs (gradient header), Playlist (gradient), Artist (tabs, follow button, about), Song Detail (tabs), Discover (background gradient) | ✅ Feito |

### 2. Estrutura HTML (100% completo)

O `index.html` contém toda a estrutura persistente da aplicação:

- **Sidebar esquerda** com:
  - Logo do Spotify (SVG inline)
  - 4 itens de navegação: Home, Search, My Library, Discover
  - Seção "Pinned" com playlists fixadas
  - Seção de Albums com álbuns favoritos
  - Seção de Artists com artistas seguidos
  - Seções de Podcasts e Audiobooks

- **Top Bar** com:
  - Tabs de navegação: Home, Discover, Search
  - Botões de ação: notificações, amigos, configurações
  - Avatar do usuário

- **Área de conteúdo principal** (renderizada dinamicamente pelo JavaScript)

- **Player Bar** na parte inferior com:
  - Info da música atual (capa gradiente, nome, artista, álbum)
  - Botão de curtir
  - Controles centrais (shuffle, prev, play/pause, next, repeat)
  - Barra de progresso com tempos
  - Controles da direita (mini-player, fila, dispositivos, volume, tela cheia)

- **Painel de fila** (Queue Panel, toggle via botão)

### 3. JavaScript — Dados Mock (100% completo)

O arquivo `data.js` contém todos os dados simulados:

| Entidade | Quantidade | Detalhes |
|----------|-----------|---------|
| Músicas | 40 | Título, artista, artistas feat., álbum, duração, estado de like, gradiente |
| Playlists do Usuário | 6 | Nome, contagem, descrição, lista de IDs de músicas |
| Playlists do Spotify | 10 | Daily Mix 1-6, Rock Mix, Chill Mix, Pop Mix, Discover Weekly |
| Playlists de Rádio | 5 | Nirvana Radio, Fall Out Boy Radio, Adele Radio, etc. |
| Artistas | 8 | Daft Punk, David Bowie, Guns N' Roses, Linkin Park, Nirvana, Muse, The Beatles, Fall Out Boy |
| Álbuns | 11 | RAM, Meteora, Abbey Road, Nevermind, TRON: Legacy, Alive 2007, etc. |
| Gêneros | 16 | Pop, Country, Hip-Hop, Rock, Indie, Punk, Metal, etc. |
| Atividade de Amigos | 7 | Nome, música ouvindo, artista, tempo atrás |
| Letras | 14 linhas | Letra de "Get Lucky" com estados (ativa/passada) |

### 4. JavaScript — Componentes (100% completo)

O arquivo `components.js` contém:

- **30+ ícones SVG** inline (home, search, play, pause, shuffle, repeat, heart, volume, etc.)
- **Geradores de componentes** reutilizáveis:
  - `createCard()` — card com cover gradiente, título, subtítulo, botão play que aparece no hover
  - `createSection()` — seção horizontal com título, botões de scroll (< >), e link "Show All"
  - `createPill()` — pill/filtro com estado ativo
  - `createGenreCard()` — card colorido de gênero musical
  - `createSongRow()` — linha da tabela de músicas (número, capa, título, artista, álbum, duração, like)
  - `createQuickTile()` — tile retangular da home (capa + nome + play)
  - `createAlbumListItem()` — item de lista de álbum na página do artista

### 5. JavaScript — Player (100% completo)

O arquivo `player.js` gerencia todo o estado do player:

- **Estado do player**: música atual, tocando/pausado, tempo atual, duração, volume, shuffle, repeat, fila
- **Controles**:
  - ▶️ Play/Pause — alterna ícone e estado
  - ⏭️ Next — avança na fila
  - ⏮️ Prev — volta ou reinicia se > 3 segundos
  - 🔀 Shuffle — ativa/desativa
  - 🔁 Repeat — cicla entre off/all/one
- **Barra de progresso** — clique para seek
- **Controle de volume** — clique para ajustar
- **Painel de fila** — mostra "Now Playing" + "Next Up"
- **Simulação de playback** — timer de 1 segundo que avança o progresso
- **Auto-advance** — quando a música "termina", avança para próxima

### 6. JavaScript — Roteador SPA + Páginas (100% completo)

O arquivo `app.js` contém o roteador e todos os renderizadores de página:

#### 🏠 Página Home (`renderHomePage`)
- Saudação dinâmica baseada na hora (Bom dia/Boa tarde/Boa noite)
- Filter pills: All, Music, Podcasts, Audiobooks
- Quick Tiles: 6 tiles de acesso rápido (Liked Songs, artistas, playlists)
- Seção "Made For You": 6 playlists do Spotify com badge
- Seção "Your Top Mixes": mixes + rádios
- Seção "Your Favorite Artists": cards circulares de artistas

#### 🔍 Página Search (`renderSearchPage`)
- Input de busca com ícone
- **Busca em tempo real** — filtra músicas por título e artista
- Buscas recentes: avatares circulares de artistas com botão de fechar
- Browse All: cards de categorias do Spotify
- Genres Grid: 16 cards coloridos de gêneros

#### 📚 Página Library (`renderLibraryPage`)
- Toolbar com filter pills: All, Playlists, Artists, Albums, Folders
- **Filtro dinâmico** — muda o conteúdo da grid conforme o filtro selecionado
- Toggle de visualização: Grid / List
- Grid com cards de playlists, artistas, álbuns, pastas
- Ícones de pin para itens fixados

#### 💚 Página Liked Songs (`renderLikedPage`)
- Header com gradiente verde/roxo e ícone de coração grande
- Informações: "Playlist · Liked Songs · User · X songs"
- Botões de ação: Play, Shuffle, Download, More
- Tabela completa de músicas com:
  - Número da faixa (vira ícone de play no hover)
  - Capa miniatura gradiente
  - Título + artista
  - Álbum
  - Duração
  - Botão de curtir/descurtir

#### 🎵 Página Playlist (`renderPlaylistPage`)
- Header com gradiente e capa grande
- Tipo "Playlist", título, descrição, meta (dono + contagem)
- Mesmos botões de ação e tabela de músicas que Liked Songs
- Suporta todas as playlists: do usuário, Spotify, e rádios

#### 🎤 Página Artist (`renderArtistPage`)
- **Hero banner** com gradiente de fundo, badge "Verified Artist", nome grande, listeners
- Botões: Play, Shuffle, Follow/Following, More
- **3 tabs navegáveis**:
  - **Home**: Popular tracks (top 5) + Discography (cards de álbuns) + "Fans Also Like" (artistas)
  - **Albums**: Lista detalhada de todos os álbuns com capa, nome, ano, duração, botões
  - **About**: Imagem gradiente, biografia, estatísticas (listeners + followers)
- **Botão Follow** — alterna entre "Follow" e "Following" com mudança de cor

#### 💿 Página Album (`renderAlbumPage`)
- Header com gradiente, capa, tipo "Album", nome, artista clicável, ano, contagem, duração
- Tabela de músicas do álbum

#### 🎶 Página Song Detail (`renderSongDetailPage`)
- Layout em 2 colunas: artwork grande (esquerda) + info (direita)
- Título, artista, tag do álbum
- Botões: Play, Like, Add, Share, More
- **3 tabs**:
  - **Lyrics**: Painel estilizado com linhas da letra (ativas, passadas, futuras)
  - **Credits**: Lista de créditos com avatar, nome e papel (Primary Artist, Featured)
  - **More like this**: Músicas do mesmo artista

#### 🧭 Página Discover (`renderDiscoverPage`)
- Título "Discover"
- Seção Made For You (todas as playlists Spotify + rádios)
- New Releases (álbuns recentes)
- Browse by Genre (grid de gêneros)

#### 👥 Painel Friends Activity (`renderFriendsPanel`)
- Painel lateral direito (toggle via botão na topbar)
- Lista de 7 amigos com: avatar gradiente, nome, música/artista que está ouvindo, tempo atrás

### 7. Navegação e Interatividade (100% completo)

- **Clique em card** → navega para a página correspondente (playlist, artista, álbum)
- **Clique em música** → começa a tocar no player
- **Sidebar items** → navegação entre páginas
- **Topbar tabs** → navegação alternativa
- **Botão de amigos** → abre/fecha painel lateral
- **Scroll horizontal** → botões ◀ ▶ em cada seção
- **Hover em card** → botão de play aparece com animação
- **Hover em song row** → número vira ícone de play
- **Hover em quick tile** → botão de play aparece
- **Like toggle** → coração muda de outline para preenchido (verde)

---

## 🔲 O Que Ainda Falta Fazer

### Prioridade Alta
- [ ] **Verificação visual completa** — Abrir no navegador e comparar com os designs do Figma, ajustar qualquer detalhe visual
- [ ] **Responsividade mobile** — Adaptar o layout para telas menores (colapsar sidebar, reorganizar player)
- [ ] **Imagens reais** — Substituir gradientes por imagens de capas de álbuns e fotos de artistas reais

### Prioridade Média
- [ ] **Animações de transição de página** — Fade in/out suave ao navegar entre páginas
- [ ] **Context menu (clique direito)** — Menu de contexto ao clicar com botão direito em músicas/playlists
- [ ] **Drag and drop na fila** — Reorganizar músicas na queue arrastando
- [ ] **Persistência de estado** — Salvar likes, fila, última página no localStorage
- [ ] **Criar/editar playlists** — Interface para criar novas playlists e adicionar músicas
- [ ] **Notificações** — Painel de notificações funcional

### Prioridade Baixa
- [ ] **Áudio real** — Integrar com Web Audio API ou arquivos de áudio reais
- [ ] **Perfil do usuário** — Página de perfil com configurações
- [ ] **Podcasts e Audiobooks** — Páginas dedicadas para estas seções
- [ ] **Modo mobile/tablet** — Layout responsivo completo para todas as resoluções
- [ ] **Acessibilidade** — Navegação por teclado, screen reader, ARIA labels
- [ ] **Testes automatizados** — Testes de navegação e funcionalidade
- [ ] **PWA** — Transformar em Progressive Web App com service worker

---

## 🔧 Detalhamento Técnico

### Como Funciona o Roteamento SPA

```
Usuário clica em "Search"
        ↓
navigateTo('search')  ← função no app.js
        ↓
currentPage = 'search'  ← atualiza estado global
        ↓
renderPage()  ← limpa o conteúdo e chama renderSearchPage()
        ↓
updateNavActive()  ← destaca o item ativo na sidebar/topbar
```

Não usamos `hashchange` ou `history.pushState` — a navegação é 100% via JavaScript com estado em memória.

### Como Funciona o Player

```
Usuário clica em uma música (song row ou botão play)
        ↓
playSong(song)  ← função no player.js
        ↓
playerState.currentSong = song  ← atualiza estado
playerState.isPlaying = true
playerState.currentTime = 0
        ↓
updatePlayerUI()  ← atualiza visual do player bar
        ↓
Timer de 1 segundo incrementa currentTime
        ↓
Quando currentTime >= duration → nextTrack()
```

### Como Funcionam os Componentes

Cada componente é gerado dinamicamente via JavaScript:

```javascript
// Exemplo: criar um card
const card = createCard({
  name: 'Get Lucky',
  subtitle: 'Daft Punk',
  gradient: 0,
  onClick: () => navigateTo('song', 1)
});

// O card é um elemento DOM real, adicionado ao container
container.appendChild(card);
```

### Sistema de Cores (Gradientes como Capas)

Como não temos imagens reais de capas de álbuns, usamos **15 gradientes CSS** diferentes como placeholder. Cada música, artista e playlist tem um índice de gradiente que determina sua cor:

```javascript
const COVER_GRADIENTS = [
  'linear-gradient(135deg, #1db954, #191414)',  // Verde Spotify
  'linear-gradient(135deg, #e61e32, #1e3264)',  // Vermelho-Azul
  'linear-gradient(135deg, #8d67ab, #1e3264)',  // Roxo
  // ... 12 mais
];
```

---

## 📊 Dados Mock

### Artistas Disponíveis
| Nome | Seguidores | Ouvintes Mensais |
|------|-----------|-----------------|
| Daft Punk | 23.4M | 35.2M |
| David Bowie | 15.8M | 28.1M |
| Guns N' Roses | 18.2M | 31.5M |
| Linkin Park | 20.1M | 33.7M |
| Nirvana | 12.5M | 25.8M |
| Muse | 10.3M | 22.4M |
| The Beatles | 24.6M | 32.8M |
| Fall Out Boy | 8.7M | 18.3M |

### Playlists do Usuário
| Nome | Músicas |
|------|---------|
| Liked Songs | 12 |
| Chill Stuff | 5 |
| Rock n Roll | 7 |
| Vibe | 2 |
| Selected Linkin Park | 6 |
| The Jux Box | 4 |

---

## 🎮 Funcionalidades Interativas

| Funcionalidade | Como Usar |
|---------------|----------|
| **Navegar entre páginas** | Clique nos itens da sidebar ou topbar |
| **Tocar uma música** | Clique em qualquer linha de música em qualquer página |
| **Play/Pause** | Clique no botão ▶/⏸ no player bar |
| **Próxima/Anterior** | Botões ⏭/⏮ no player bar |
| **Seek** | Clique na barra de progresso |
| **Volume** | Clique na barra de volume |
| **Curtir música** | Clique no ícone ♡ em qualquer lugar |
| **Shuffle** | Botão 🔀 no player bar |
| **Repeat** | Botão 🔁 (cicla: off → all → one) |
| **Ver fila** | Botão de fila no player bar |
| **Ver amigos** | Botão de amigos na topbar |
| **Buscar** | Digite na página Search |
| **Filtrar biblioteca** | Pills na página Library |
| **Seguir artista** | Botão "Follow" na página Artist |
| **Mudar visualização** | Botões grid/list na Library |

---

> **Nota**: Este projeto foi criado como uma réplica visual e funcional para fins de estudo e demonstração. Não possui integração com a API real do Spotify.
