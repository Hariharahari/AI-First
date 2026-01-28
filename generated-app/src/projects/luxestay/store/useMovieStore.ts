import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  genre: string;
  poster: string;
  trailer?: string;
}

interface MovieStore {
  movies: Movie[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  fetchMovies: async () => {
    // Mock data - replace with actual API call
    const mockMovies = [
      { id: 1, title: 'Inception', genre: 'Sci-Fi', poster: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', trailer: 'd1YBvBZ17ao' },
      { id: 2, title: 'The Dark Knight', genre: 'Action', poster: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', trailer: 'EXeTwQWrcwY' },
      { id: 3, title: 'Interstellar', genre: 'Sci-Fi', poster: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', trailer: 'zSWdZVtXT7E' },
      { id: 4, title: 'Pulp Fiction', genre: 'Crime', poster: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80' },
      { id: 5, title: 'The Shawshank Redemption', genre: 'Drama', poster: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80' },
    ];
    set({ movies: mockMovies });
  },
}));