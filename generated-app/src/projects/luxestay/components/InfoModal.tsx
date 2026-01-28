import { Modal } from '@heroui/react';
import { useMovieStore } from '../store/useMovieStore';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
}

export const InfoModal = ({ isOpen, onClose, movieId }: InfoModalProps) => {
  const { movies } = useMovieStore();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="bg-gray-900 text-white p-6">
        <div className="relative">
          {movie.trailer ? (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${movie.trailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} trailer`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition"
              >
                <button className="bg-white text-black px-6 py-2 rounded font-bold">
                  Watch Trailer
                </button>
              </a>
            </div>
          )}
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p className="text-gray-400">{movie.genre}</p>
        </div>
      </div>
    </Modal>
  );
};