// ===== DADOS DO APP DE MÚSICA =====
//
// Artistas são fixos — o usuário adiciona músicas pelo modal.
// Tudo é salvo no localStorage automaticamente.
//
const COVER_GRADIENTS = [
  'linear-gradient(135deg, #1db954, #191414)',
  'linear-gradient(135deg, #e61e32, #1e3264)',
  'linear-gradient(135deg, #8d67ab, #1e3264)',
  'linear-gradient(135deg, #e1a100, #dc148c)',
  'linear-gradient(135deg, #148a78, #27856a)',
  'linear-gradient(135deg, #5179a1, #1a1a3e)',
  'linear-gradient(135deg, #a56752, #1e3264)',
  'linear-gradient(135deg, #dc148c, #e61e32)',
  'linear-gradient(135deg, #1e3264, #5179a1)',
  'linear-gradient(135deg, #27856a, #1db954)',
  'linear-gradient(135deg, #ff6b6b, #4834d4)',
  'linear-gradient(135deg, #f0932b, #6ab04c)',
  'linear-gradient(135deg, #7b68ee, #00ced1)',
  'linear-gradient(135deg, #e056fd, #686de0)',
  'linear-gradient(135deg, #ff7979, #f6e58d)',
];

function getGradient(index) {
  return COVER_GRADIENTS[index % COVER_GRADIENTS.length];
}

const DATA = {
  currentUser: {
    name: 'User',
    avatar: null,
  },

  // Músicas — populado pelo usuário via modal
  songs: [],

  // Playlists do usuário
  playlists: [
    {
      id: 'liked', name: 'Músicas curtidas', count: 0,
      description: '',
      isLiked: true, gradient: 'linear-gradient(135deg, #1db954, #134e2a)',
      songs: []
    },
  ],

  // Mixes automáticos (gerados por gênero)
  spotifyPlaylists: [],

  // Rádios (gerados automaticamente)
  radioPlaylists: [],

  // Artistas — fixos, definidos pelo usuário
  // O usuário vai mandando os artistas para adicionar aqui
  artists: [
    {
      id: 'matue',
      name: 'Matuê',
      image: '',
      gradient: 'linear-gradient(135deg, #e61e32, #1a1a3e)',
      genres: ['Rap', 'Trap', 'Hip Hop'],
      monthlyListeners: '25.4M',
      bio: 'Rapper brasileiro de Fortaleza, Ceará. Um dos maiores nomes do rap nacional.',
    },
  ],

  // Álbuns — criados quando o usuário adiciona músicas
  albums: [],

  // Pastas
  folders: [],

  // Gêneros disponíveis para classificar músicas
  genres: [
    { name: 'Rap', color: '#e61e32' },
    { name: 'Emo Rap', color: '#8d67ab' },
    { name: 'Hip Hop', color: '#dc148c' },
    { name: 'Trap', color: '#1a1a3e' },
    { name: 'R&B', color: '#27856a' },
    { name: 'Pop', color: '#e056fd' },
    { name: 'Rock', color: '#e61e32' },
    { name: 'Indie', color: '#148a78' },
    { name: 'Lo-fi', color: '#5179a1' },
    { name: 'Funk', color: '#e1a100' },
    { name: 'Drill', color: '#333' },
    { name: 'Reggaeton', color: '#e8115b' },
    { name: 'Eletrônica', color: '#7b68ee' },
    { name: 'Pagode', color: '#f0932b' },
    { name: 'Sertanejo', color: '#a56752' },
    { name: 'MPB', color: '#1e3264' },
    { name: 'Gospel', color: '#27856a' },
    { name: 'Phonk', color: '#ff6b6b' },
    { name: 'Metal', color: '#1a1a3e' },
    { name: 'Jazz', color: '#1e3264' },
  ],

  discoverSections: [
    { name: 'Feito Para Você', color: '#1e3264' },
    { name: 'Lançamentos', color: '#e8115b' },
    { name: 'Em Alta', color: '#e1a100' },
    { name: 'Descobrir', color: '#1db954' },
  ],

  friendsActivity: [],

  lyrics: [],
};
