export const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller'
];

export const MOVIES = [
  {
    id: 1,
    title: "The Irishman",
    image: "https://image.tmdb.org/t/p/w500/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg",
    banner: "https://image.tmdb.org/t/p/original/iLLDiO4dbUfFEnRug8DuvFEl1NB.jpg",
    genre: ["Crime", "Drama"],
    year: 2019,
    rating: 7.8,
    duration: "3h 29min",
    description: "An epic saga of organized crime in post-war America told through the eyes of World War II veteran Frank Sheeran, a hustler and hitman who worked alongside some of the most notorious figures of the 20th century.",
    director: "Martin Scorsese",
    maturityRating: "R",
    cast: ["Robert De Niro", "Al Pacino", "Joe Pesci"]
  },
  {
    id: 2,
    title: "Marriage Story",
    image: "https://m.media-amazon.com/images/M/MV5BNmE0OWJlM2MtNzhmMi00YmQyLTlmY2EtZmUzNzBiNGRlN2JkXkEyXkFqcGc@._V1_.jpg",
    banner: "https://image.tmdb.org/t/p/original/9HfQD1bPXh1ptzWaWWWFqrr6uwb.jpg",
    genre: ["Drama", "Romance"],
    year: 2019,
    rating: 7.9,
    duration: "2h 17min",
    description: "A stage director and his actor wife struggle through a grueling, coast-to-coast divorce that pushes them to their personal and creative extremes.",
    director: "Noah Baumbach",
    maturityRating: "R",
    cast: ["Adam Driver", "Scarlett Johansson"]
  },
  {
    id: 3,
    title: "Bird Box",
    image: "https://image.tmdb.org/t/p/w500/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg",
    banner: "https://image.tmdb.org/t/p/original/z6m7s4w4Erxnr5k2jc1TZR1AMfn.jpg",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    year: 2018,
    rating: 6.6,
    duration: "2h 4min",
    description: "Five years after an ominous unseen presence drives most of society to suicide, a survivor and her two children make a desperate bid to reach safety.",
    director: "Susanne Bier",
    maturityRating: "R",
    cast: ["Sandra Bullock", "Trevante Rhodes"]
  },
  {
    id: 4,
    title: "Extraction",
    image: "https://m.media-amazon.com/images/M/MV5BNDBhMmI3OWYtZTA2Ny00Y2RjLTliMWQtYWY5MGIwN2RlZGFjXkEyXkFqcGc@._V1_.jpg",
    banner: "https://image.tmdb.org/t/p/original/1R6cvRtZgsYCkh8UFuWFN33xBP4.jpg",
    genre: ["Action", "Thriller"],
    year: 2020,
    rating: 6.7,
    duration: "1h 56min",
    description: "A hardened mercenary's mission becomes a soul-searching race to survive when he's sent into Bangladesh to rescue a drug lord's kidnapped son.",
    director: "Sam Hargrave",
    maturityRating: "R",
    cast: ["Chris Hemsworth", "Rudhraksh Jaiswal"]
  },
  {
    id: 5,
    title: "Roma",
    image: "https://upload.wikimedia.org/wikipedia/en/8/85/Roma_theatrical_poster.png",
    banner: "https://image.tmdb.org/t/p/original/hHm1jB9nj3UmVoEzGHPxQQViHLr.jpg",
    genre: ["Drama"],
    year: 2018,
    rating: 7.7,
    duration: "2h 15min",
    description: "A story that chronicles a year in the life of a middle-class family's maid in Mexico City in the early 1970s.",
    director: "Alfonso Cuarón",
    maturityRating: "R",
    cast: ["Yalitza Aparicio", "Marina de Tavira"]
  }
];

export const TV_SHOWS = [
  {
    id: 1,
    title: "Stranger Things",
    image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    banner: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    genre: ["Drama", "Fantasy", "Horror"],
    year: 2016,
    rating: 8.7,
    seasons: 4,
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    creator: "The Duffer Brothers",
    maturityRating: "TV-14",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"]
  },
  {
    id: 2,
    title: "The Crown",
    image: "https://upload.wikimedia.org/wikipedia/en/b/ba/The_Crown_season_2.jpeg",
    banner: "https://image.tmdb.org/t/p/original/9PqD3wfwnMYRhGEgqe7G4bITFa2.jpg",
    genre: ["Drama", "History"],
    year: 2016,
    rating: 8.6,
    seasons: 5,
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    creator: "Peter Morgan",
    maturityRating: "TV-MA",
    cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"]
  },
  {
    id: 3,
    title: "Money Heist",
    image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    banner: "https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg",
    genre: ["Action", "Crime", "Drama"],
    year: 2017,
    rating: 8.2,
    seasons: 5,
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    creator: "Álex Pina",
    maturityRating: "TV-MA",
    cast: ["Úrsula Corberó", "Álvaro Morte"]
  },
  {
    id: 4,
    title: "Squid Game",
    image: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    banner: "https://image.tmdb.org/t/p/original/qw3J9cNeLioOLoR68WX7z79aCdK.jpg",
    genre: ["Action", "Drama", "Mystery"],
    year: 2021,
    rating: 8.0,
    seasons: 1,
    description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    creator: "Hwang Dong-hyuk",
    maturityRating: "TV-MA",
    cast: ["Lee Jung-jae", "Park Hae-soo"]
  },
  {
    id: 5,
    title: "Wednesday",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    banner: "https://image.tmdb.org/t/p/original/9vG6jgxn8NKqpHj9qkEXZgW6jLT.jpg",
    genre: ["Comedy", "Fantasy", "Mystery"],
    year: 2022,
    rating: 8.2,
    seasons: 1,
    description: "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, solve a murder mystery connected to her family's past, and navigate new relationships.",
    creator: "Alfred Gough, Miles Millar",
    maturityRating: "TV-14",
    cast: ["Jenna Ortega", "Gwendoline Christie"]
  }
];