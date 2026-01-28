import { useMovieStore } from '../store/useMovieStore';
import { Modal, ModalContent } from '@heroui/react';
import { X, Play, Plus, Check } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const InfoModal = ({ isOpen, onOpenChange }: InfoModalProps) => {
  const { selectedMovie, myList, addToMyList } = useMovieStore();

  if (!selectedMovie) return null;

  const isInMyList = myList?.some((movie) => movie?.id === selectedMovie?.id);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent className="bg-[#141414] text-white p-0 overflow-hidden">
        <div className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2"
          >
            <X size={24} />
          </button>
          <img
            src={selectedMovie?.bannerUrl}
            alt={selectedMovie?.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-3xl font-bold">{selectedMovie?.title}</h2>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-green-500 font-bold">{selectedMovie?.matchPercentage}% Match</span>
              <span className="text-gray-300">{selectedMovie?.genre?.join(', ')}</span>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex space-x-4">
            <button className="flex-1 bg-white text-black px-4 py-2 rounded flex items-center justify-center">
              <Play size={20} className="mr-2" /> Play
            </button>
            <button
              onClick={() => addToMyList(selectedMovie)}
              className="w-12 h-12 bg-gray-500/50 rounded-full flex items-center justify-center"
            >
              {isInMyList ? <Check size={24} /> : <Plus size={24} />}
            </button>
          </div>
          <p className="text-gray-300">{selectedMovie?.description}</p>
          <div>
            <span className="text-gray-400">Cast:</span>
            <span className="text-white ml-2">{selectedMovie?.genre?.join(', ')}</span>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};