import { Hero } from '../components/Hero';
import MovieRow from '../components/MovieRow';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="space-y-8 py-8">
        <MovieRow title="Trending Now" category="trending" />
        <MovieRow title="StreamFlix Originals" category="originals" />
        <MovieRow title="Top Rated" category="topRated" />
        <MovieRow title="Action Movies" category="action" />
      </div>
    </div>
  );
}