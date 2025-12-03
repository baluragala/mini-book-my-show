import Link from "next/link";
import { Movie } from "@/lib/moviesStore";
import MovieCard from "@/components/MovieCard";

async function getMovies(): Promise<Movie[]> {
  // In development, use localhost; in production, use the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/movies`, { cache: "no-store" });
  return res.json();
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12 animate-fade-in">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-900/30 to-amber-900/20 border border-rose-500/20 p-8 md:p-12">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="relative z-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Book Your
              </span>{" "}
              <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                Movie Experience
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mb-6">
              Discover the latest blockbusters, choose your perfect seats, and
              enjoy the magic of cinema. Book now for an unforgettable experience.
            </p>
            <div className="flex gap-4 items-center">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 border-2 border-zinc-900"
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">
                <span className="text-white font-semibold">2,500+</span> tickets
                booked today
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Now Showing
            </h2>
            <p className="text-zinc-500">Select a movie to view showtimes</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-medium border border-rose-500/20">
              All
            </button>
            <button className="px-4 py-2 rounded-lg text-zinc-400 text-sm font-medium hover:bg-zinc-800 transition-colors">
              Sci-Fi
            </button>
            <button className="px-4 py-2 rounded-lg text-zinc-400 text-sm font-medium hover:bg-zinc-800 transition-colors">
              Action
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <MovieCard movie={movie} index={index} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

