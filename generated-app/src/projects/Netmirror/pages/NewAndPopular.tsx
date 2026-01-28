import { MovieRow } from '../components/MovieRow';

export default function NewAndPopular() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 px-4">New & Popular</h1>
      <div className="space-y-8">
        <MovieRow title="Trending Now" category="trending" />
        <MovieRow title="Top Rated" category="topRated" />
      </div>
    </div>
  );
}