import Link from "next/link";
import { getMovieById } from "@/lib/moviesStore";
import { getShowsByMovieId } from "@/lib/showsStore";
import ShowtimeCard from "@/components/ShowtimeCard";
import MoviePoster from "@/components/MoviePoster";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const movie = getMovieById(id);
  const shows = getShowsByMovieId(id);

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Movie not found</h1>
        <Link href="/" className="text-rose-400 hover:underline">
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 animate-fade-in">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
              Movies
            </Link>
          </li>
          <li className="text-zinc-600">/</li>
          <li className="text-white">{movie.title}</li>
        </ol>
      </nav>

      {/* Movie Header */}
      <div className="grid lg:grid-cols-[350px_1fr] gap-8 mb-12">
        {/* Poster */}
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 animate-fade-in">
          <MoviePoster
            src={movie.poster}
            alt={movie.title}
            fallbackLetter={movie.title.charAt(0)}
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col animate-fade-in stagger-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-sm font-medium">
              {movie.genre}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20">
              <svg
                className="w-4 h-4 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-amber-400 text-sm font-semibold">
                {movie.rating}/10
              </span>
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-zinc-400 mb-6">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {movie.releaseYear}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {movie.duration}
            </span>
          </div>

          <p className="text-zinc-300 text-lg leading-relaxed mb-8">
            {movie.description}
          </p>

          <div className="mt-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium">Now Showing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <section className="animate-fade-in stagger-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-white">
            Select Showtime
          </h2>
          <span className="text-zinc-500 text-sm">
            {shows.length} shows available today
          </span>
        </div>

        {shows.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <p className="text-zinc-400">No shows available for this movie</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shows.map((show, index) => (
              <ShowtimeCard
                key={show.showId}
                show={show}
                movieId={movie.id}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

