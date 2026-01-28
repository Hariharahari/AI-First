import { useMovieStore } from '../store/useMovieStore';
import { MovieCard } from '../components/MovieCard';

export default function MyList() {
  const { myList } = useMovieStore();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 px-4">My List</h1>
      {myList?.length ? (
        <div className="flex flex-wrap gap-4 px-4">
          {myList.map((movie) => (
            <MovieCard key={movie.id} movie={{...movie, imageUrl: movie.posterUrl}} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Your list is empty</p>
      )}
    </div>
  );
}