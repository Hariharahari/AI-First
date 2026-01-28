import { MovieRow } from '../components/MovieRow';

export default function TVShows() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 px-4">TV Shows</h1>
      <div className="space-y-8">
        <MovieRow title="Trending TV Shows" category="trending" />
        <MovieRow title="StreamFlix Originals" category="originals" />
      </div>
    </div>
  );
}