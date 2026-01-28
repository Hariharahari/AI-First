import { MovieRow } from '../components/MovieRow';

export default function Movies() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 px-4">Movies</h1>
      <div className="space-y-8">
        <MovieRow title="Top Rated Movies" category="topRated" />
        <MovieRow title="Action Movies" category="action" />
        <MovieRow title="Comedy Movies" category="comedy" />
      </div>
    </div>
  );
}