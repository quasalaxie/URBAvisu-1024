import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import KidsHero from '../components/KidsHero';
import ContentRow from '../components/ContentRow';
import FilterBar from '../components/FilterBar';

const Kids = () => {
  const [filters, setFilters] = useState({
    genres: [],
    year: [1900, 2024],
    rating: 0
  });

  const kidsMovies = [
    {
      id: 1,
      title: "Moana",
      description: "A brave young woman sets sail on a daring mission to save her people, encountering incredible adventures along the way.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUkFrAsNqha8jJvlQ5Uq8XCGeFxK8jzQysQ&s",
      year: 2016,
      rating: 4.8,
      genre: ["Animation", "Adventure", "Family"],
      maturityRating: "PG"
    },
    {
      id: 2,
      title: "Frozen",
      description: "The story of two royal sisters, where one struggles with magical ice powers that threaten their kingdom.",
      image: "https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg",
      year: 2013,
      rating: 4.7,
      genre: ["Animation", "Musical", "Fantasy"],
      maturityRating: "PG"
    },
    {
      id: 3,
      title: "The Lion King",
      description: "A young lion prince overcomes tragedy to become the leader of his pride and homeland.",
      image: "https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_.jpg",
      year: 1994,
      rating: 4.9,
      genre: ["Animation", "Drama", "Adventure"],
      maturityRating: "G"
    },
    {
      id: 4,
      title: "Finding Nemo",
      description: "A clownfish searches the ocean for his lost son, making friends and facing challenges along the way.",
      image: "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",
      year: 2003,
      rating: 4.8,
      genre: ["Animation", "Adventure", "Comedy"],
      maturityRating: "G"
    },
    {
      id: 5,
      title: "Zootopia",
      description: "In a city of anthropomorphic animals, a rookie bunny cop must solve a mysterious case with the help of a cunning fox.",
      image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11993845_p_v8_aq.jpg",
      year: 2016,
      rating: 4.7,
      genre: ["Animation", "Adventure", "Comedy"],
      maturityRating: "PG"
    },
    {
      id: 6,
      title: "Toy Story",
      description: "A cowboy doll is threatened by the arrival of a new spaceman figure as his owner's favorite toy.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Toy_Story.jpg/220px-Toy_Story.jpg",
      year: 1995,
      rating: 4.9,
      genre: ["Animation", "Adventure", "Comedy"],
      maturityRating: "G"
    },
    {
      id: 7,
      title: "Inside Out",
      description: "The emotions inside a young girl's head help her cope with moving to a new city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsOChzbAVxomR8C_1Lwz_wrlssxRFd_lVWtA&s",
      year: 2015,
      rating: 4.8,
      genre: ["Animation", "Adventure", "Comedy"],
      maturityRating: "PG"
    },
    {
      id: 8,
      title: "Coco",
      description: "A young musician enters the Land of the Dead to find his great-great-grandfather.",
      image: "https://m.media-amazon.com/images/M/MV5BMDIyM2E2NTAtMzlhNy00ZGUxLWI1NjgtZDY5MzhiMDc5NGU3XkEyXkFqcGc@._V1_.jpg",
      year: 2017,
      rating: 4.8,
      genre: ["Animation", "Adventure", "Family"],
      maturityRating: "PG"
    },
    {
      id: 9,
      title: "Despicable Me",
      description: "A supervillain adopts three orphans as part of his grand scheme, but ends up being changed by them.",
      image: "https://upload.wikimedia.org/wikipedia/en/c/c0/Despicable_Me_%282010_animated_feature_film%29.jpg",
      year: 2010,
      rating: 4.7,
      genre: ["Animation", "Comedy", "Family"],
      maturityRating: "PG"
    },
    {
      id: 10,
      title: "The Secret Life of Pets",
      description: "The quiet life of a terrier named Max is upended when his owner takes in Duke, a stray whom Max instantly dislikes.",
      image: "https://m.media-amazon.com/images/M/MV5BMjIzMzA1OTkzNV5BMl5BanBnXkFtZTgwODE3MjM4NzE@._V1_FMjpg_UX1000_.jpg",
      year: 2016,
      rating: 4.6,
      genre: ["Animation", "Adventure", "Comedy"],
      maturityRating: "PG"
    }
  ];

  const categories = [
    {
      title: "Popular Kids Movies",
      items: kidsMovies
    },
    {
      title: "Adventure Time",
      items: kidsMovies.filter(movie => movie.genre.includes('Adventure'))
    },
    {
      title: "Laugh Out Loud",
      items: kidsMovies.filter(movie => movie.genre.includes('Comedy'))
    },
    {
      title: "Fantasy & Magic",
      items: kidsMovies.filter(movie => movie.genre.includes('Fantasy'))
    }
  ];

  return (
    <main className="min-h-screen bg-dark text-white">
      <KidsHero />
      <FilterBar onFilterChange={setFilters} />
      <div className="max-w-[1800px] mx-auto space-y-12 pb-12">
        {categories.map((category, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">{category.title}</h2>
            <ContentRow items={category.items} type="movies" />
          </motion.section>
        ))}
      </div>
    </main>
  );
};

export default Kids;