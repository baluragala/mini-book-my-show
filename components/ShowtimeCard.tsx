"use client";

import Link from "next/link";
import { Show } from "@/lib/showsStore";

interface ShowtimeCardProps {
  show: Show;
  movieId: string;
  index: number;
}

export default function ShowtimeCard({ show, movieId, index }: ShowtimeCardProps) {
  const availableSeats = Object.values(show.seats).filter(
    (status) => status === "available"
  ).length;
  const totalSeats = Object.keys(show.seats).length;
  const fillPercentage = ((totalSeats - availableSeats) / totalSeats) * 100;

  return (
    <Link
      href={`/movies/${movieId}/book?showId=${show.showId}`}
      className={`block p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-rose-500/50 transition-all hover:shadow-lg hover:shadow-rose-500/10 opacity-0 animate-fade-in`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xl font-bold text-white">{show.time}</p>
          <p className="text-sm text-zinc-500">{show.screen}</p>
        </div>
        <span className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 font-semibold">
          ₹{show.price}
        </span>
      </div>

      {/* Availability Bar */}
      <div className="mb-2">
        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              fillPercentage > 70
                ? "bg-rose-500"
                : fillPercentage > 40
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {availableSeats} of {totalSeats} available
        </span>
        <span
          className={`text-xs font-medium ${
            availableSeats > 60
              ? "text-emerald-400"
              : availableSeats > 30
              ? "text-amber-400"
              : "text-rose-400"
          }`}
        >
          {availableSeats > 60 ? "Available" : availableSeats > 30 ? "Filling Fast" : "Almost Full"}
        </span>
      </div>
    </Link>
  );
}

