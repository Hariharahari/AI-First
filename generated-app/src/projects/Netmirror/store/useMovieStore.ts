import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  releaseYear: number;
  matchPercentage: number;
  genre: string[];
  category: 'trending' | 'originals' | 'topRated' | 'action' | 'comedy';
}

interface MovieStore {
  movies: {
    trending: Movie[];
    originals: Movie[];
    topRated: Movie[];
    action: Movie[];
    comedy: Movie[];
  };
  myList: Movie[];
  selectedMovie: Movie | null;
  addToMyList: (movie: Movie) => void;
  removeFromMyList: (movieId: number) => void;
  selectMovie: (movie: Movie) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: {
    trending: [
      {
        id: 1,
        title: 'Dune',
        description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.',
        posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2021,
        matchPercentage: 92,
        genre: ['Sci-Fi', 'Adventure', 'Drama'],
        category: 'trending',
      },
      {
        id: 2,
        title: 'Oppenheimer',
        description: 'The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.',
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2023,
        matchPercentage: 95,
        genre: ['Drama', 'History', 'Thriller'],
        category: 'trending',
      },
      {
        id: 3,
        title: 'The Batman',
        description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2022,
        matchPercentage: 90,
        genre: ['Action', 'Crime', 'Drama'],
        category: 'trending',
      },
    ],
    originals: [
      {
        id: 4,
        title: 'Stranger Things',
        description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2016,
        matchPercentage: 88,
        genre: ['Drama', 'Fantasy', 'Horror'],
        category: 'originals',
      },
      {
        id: 5,
        title: 'The Witcher',
        description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2019,
        matchPercentage: 85,
        genre: ['Action', 'Adventure', 'Drama'],
        category: 'originals',
      },
      {
        id: 6,
        title: 'The Crown',
        description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2016,
        matchPercentage: 87,
        genre: ['Drama', 'History'],
        category: 'originals',
      },
    ],
    topRated: [
      {
        id: 7,
        title: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 1994,
        matchPercentage: 98,
        genre: ['Drama'],
        category: 'topRated',
      },
      {
        id: 8,
        title: 'The Godfather',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 1972,
        matchPercentage: 97,
        genre: ['Crime', 'Drama'],
        category: 'topRated',
      },
      {
        id: 9,
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 1994,
        matchPercentage: 95,
        genre: ['Crime', 'Drama'],
        category: 'topRated',
      },
    ],
    action: [
      {
        id: 10,
        title: 'John Wick',
        description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2014,
        matchPercentage: 88,
        genre: ['Action', 'Crime', 'Thriller'],
        category: 'action',
      },
      {
        id: 11,
        title: 'Mad Max: Fury Road',
        description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2015,
        matchPercentage: 90,
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        category: 'action',
      },
      {
        id: 12,
        title: 'Gladiator',
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2000,
        matchPercentage: 91,
        genre: ['Action', 'Adventure', 'Drama'],
        category: 'action',
      },
    ],
    comedy: [
      {
        id: 13,
        title: 'The Hangover',
        description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
        posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2009,
        matchPercentage: 85,
        genre: ['Comedy'],
        category: 'comedy',
      },
      {
        id: 14,
        title: 'Superbad',
        description: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-71053642eca1?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2007,
        matchPercentage: 83,
        genre: ['Comedy'],
        category: 'comedy',
      },
      {
        id: 15,
        title: 'Deadpool',
        description: 'A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers, adopting the alter ego Deadpool.',
        posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        releaseYear: 2016,
        matchPercentage: 87,
        genre: ['Action', 'Comedy'],
        category: 'comedy',
      },
    ],
  },
  myList: [],
  selectedMovie: null,
  addToMyList: (movie) => set((state) => {
    if (!state.myList.some(m => m.id === movie.id)) {
      return { myList: [...state.myList, movie] };
    }
    return state;
  }),
  removeFromMyList: (movieId) => set((state) => ({ myList: state.myList.filter((movie) => movie.id !== movieId) })),
  selectMovie: (movie) => set({ selectedMovie: movie }),
}));