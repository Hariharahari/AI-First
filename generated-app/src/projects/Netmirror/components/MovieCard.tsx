import { useMovieStore } from '../store/useMovieStore';
import { Card } from '@heroui/react';
import { Play, Plus } from 'lucide-react';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    imageUrl: string;
  };
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { addToMyList, selectMovie } = useMovieStore();

  return (
    <div className="relative group cursor-pointer hover:scale-110 transition-transform duration-300">
      <Card className="w-48 h-72 overflow-hidden bg-transparent border-none">
        <img
          src={movie?.imageUrl}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold">{movie?.title}</h3>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => selectMovie(movie)}
              className="flex-1 bg-white text-black px-3 py-1 rounded flex items-center justify-center"
            >
              <Play size={16} className="mr-1" /> Play
            </button>
            <button
              onClick={() => addToMyList(movie)}
              className="w-8 h-8 bg-gray-500/50 rounded-full flex items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};