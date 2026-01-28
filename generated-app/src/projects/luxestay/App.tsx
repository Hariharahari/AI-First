import React from 'react';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { ListingCard } from './components/ListingCard';
import { useRentalStore } from './store/useRentalStore';

const App = () => {
  const { listings } = useRentalStore();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CategoryBar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;