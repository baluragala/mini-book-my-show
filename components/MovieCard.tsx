"use client";

import { useState } from "react";
import { Movie } from "@/lib/moviesStore";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`card group cursor-pointer opacity-0 animate-fade-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageError && (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-amber-900 flex items-center justify-center -z-10">
          <span className="font-display text-4xl font-bold text-white/20">
            {movie.title.charAt(0)}
          </span>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-amber-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold text-white">
            {movie.rating}
          </span>
        </div>

        {/* Genre Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-rose-500/80 backdrop-blur-sm">
          <span className="text-xs font-semibold text-white">{movie.genre}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-rose-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <span>{movie.releaseYear}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span>{movie.duration}</span>
        </div>
      </div>
    </div>
  );
}

