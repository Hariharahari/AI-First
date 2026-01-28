import { Card, Button } from '@heroui/react';
import { Heart } from 'lucide-react';
import { useRentalStore } from '../store/useRentalStore';

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    isGuestFavorite: boolean;
    imageUrl: string;
  };
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const { wishlist, toggleWishlist } = useRentalStore();
  const isWishlisted = wishlist?.has(listing.id);

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 rounded-full hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{listing.title}</h3>
          <span className="font-semibold">${listing.price} <span className="font-normal text-gray-500">night</span></span>
        </div>
        <p className="text-gray-500 text-sm">{listing.location}</p>
        <div className="flex items-center space-x-1 mt-2">
          <span className="font-medium text-sm">★ {listing.rating}</span>
          {listing.isGuestFavorite && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Guest favorite</span>
          )}
        </div>
      </div>
    </Card>
  );
};