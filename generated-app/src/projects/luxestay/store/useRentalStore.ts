import { create } from 'zustand';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  isGuestFavorite: boolean;
  imageUrl: string;
}

interface RentalState {
  listings: Listing[];
  wishlist: Set<string>;
  toggleWishlist: (id: string) => void;
}

const initialListings: Listing[] = [
  {
    id: '1',
    title: 'Beachfront Paradise',
    location: 'Malibu, California',
    price: 1200,
    rating: 4.9,
    isGuestFavorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Modern Downtown Loft',
    location: 'New York, New York',
    price: 850,
    rating: 4.7,
    isGuestFavorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1502000206303-1e0485d0da44?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Mountain Retreat Cabin',
    location: 'Aspen, Colorado',
    price: 950,
    rating: 4.8,
    isGuestFavorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Luxury Penthouse',
    location: 'Miami, Florida',
    price: 1500,
    rating: 5.0,
    isGuestFavorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Cozy Cottage',
    location: 'Portland, Oregon',
    price: 650,
    rating: 4.6,
    isGuestFavorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1502000206303-1e0485d0da44?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Lakefront Villa',
    location: 'Austin, Texas',
    price: 1100,
    rating: 4.9,
    isGuestFavorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80',
  },
];

export const useRentalStore = create<RentalState>((set) => ({
  listings: initialListings || [],
  wishlist: new Set<string>(),
  toggleWishlist: (id) => set((state) => {
    const newWishlist = new Set(state.wishlist);
    if (newWishlist.has(id)) {
      newWishlist.delete(id);
    } else {
      newWishlist.add(id);
    }
    return { wishlist: newWishlist };
  }),
}));