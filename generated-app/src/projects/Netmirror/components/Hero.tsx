import { useState, useEffect } from 'react';
import { useMovieStore } from '../../store/useMovieStore';
import { Play, Info } from 'lucide-react';

export const Hero = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { movies, selectMovie } = useMovieStore();

  useEffect(() => {
    if (movies.trending.length > 0) {
      const randomMovie = movies.trending[Math.floor(Math.random() * movies.trending.length)];
      setMovie(randomMovie);
    }
  }, [movies.trending]);

  const handlePlay = () => {
    if (movie) {
      window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, '_blank');
    }
  };

  const handleMoreInfo = () => {
    if (movie) {
      selectMovie(movie);
    }
  };

  if (!movie) return (
    <div className="relative h-screen w-full bg-[#141414]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      <img
        src={movie.bannerUrl}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80';
        }}
      />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">{movie.description}</p>
        <div className="flex space-x-4">
          <button
            onClick={handlePlay}
            className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition flex items-center"
          >
            <Play className="mr-2" size={20} /> Play
          </button>
          <button
            onClick={handleMoreInfo}
            className="bg-gray-500/50 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-500 transition flex items-center"
          >
            <Info className="mr-2" size={20} /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};