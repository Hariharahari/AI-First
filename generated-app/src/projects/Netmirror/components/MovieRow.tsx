import { useMovieStore } from '../store/useMovieStore';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  category: 'trending' | 'originals' | 'topRated' | 'action';
}

export const MovieRow = ({ title, category }: MovieRowProps) => {
  const { movies } = useMovieStore();
  const movieList = movies[category];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold px-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 px-4">
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={{...movie, imageUrl: movie.posterUrl}} />
        ))}
      </div>
    </div>
  );
};