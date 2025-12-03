"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId");
  const movie = searchParams.get("movie");
  const showTime = searchParams.get("showTime");
  const screen = searchParams.get("screen");
  const seats = searchParams.get("seats");
  const amount = searchParams.get("amount");

  if (!bookingId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          No booking information found
        </h1>
        <Link href="/" className="text-rose-400 hover:underline">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Success Animation */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mb-6 animate-pulse-glow">
          <svg
            className="w-10 h-10 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-zinc-400">
          Your tickets have been successfully booked
        </p>
      </div>

      {/* Ticket Card */}
      <div className="relative animate-fade-in stagger-1">
        {/* Decorative ticket notches */}
        <div className="absolute left-0 top-1/2 w-4 h-8 bg-[var(--background)] rounded-r-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute right-0 top-1/2 w-4 h-8 bg-[var(--background)] rounded-l-full -translate-y-1/2 translate-x-1/2" />

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500/20 to-amber-500/20 px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <span className="font-display text-lg font-bold text-white">
                  Mini BookMyShow
                </span>
              </div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">
                E-Ticket
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Booking ID */}
            <div className="text-center pb-4 border-b border-dashed border-zinc-700">
              <p className="text-sm text-zinc-500 mb-1">Booking ID</p>
              <p className="font-mono text-2xl font-bold text-amber-400 tracking-wider">
                {bookingId}
              </p>
            </div>

            {/* Movie Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Movie</p>
                <p className="text-lg font-semibold text-white">{movie}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500 mb-1">Screen</p>
                <p className="text-lg font-semibold text-white">{screen}</p>
              </div>
            </div>

            {/* Show Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Date</p>
                <p className="text-white font-medium">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500 mb-1">Show Time</p>
                <p className="text-white font-medium">{showTime}</p>
              </div>
            </div>

            {/* Seats */}
            <div className="p-4 rounded-xl bg-zinc-800/50">
              <p className="text-sm text-zinc-500 mb-2">Seats</p>
              <div className="flex flex-wrap gap-2">
                {seats?.split(",").map((seat) => (
                  <span
                    key={seat}
                    className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-semibold"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <span className="text-zinc-400">Total Amount Paid</span>
              <span className="text-2xl font-bold text-emerald-400">
                ₹{amount}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-zinc-800/30 px-6 py-4 text-center">
            <p className="text-xs text-zinc-500">
              Please show this e-ticket at the counter to collect your tickets
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in stagger-2">
        <Link
          href="/"
          className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium text-center hover:bg-zinc-700 transition-colors"
        >
          Browse More Movies
        </Link>
        <button
          onClick={() => window.print()}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Ticket
        </button>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400 mt-4">Loading booking details...</p>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}

