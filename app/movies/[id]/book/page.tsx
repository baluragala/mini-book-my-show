"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import SeatGrid from "@/components/SeatGrid";
import { SeatMap } from "@/lib/showsStore";

interface SeatData {
  showId: string;
  time: string;
  screen: string;
  price: number;
  seats: SeatMap;
}

interface MovieData {
  id: string;
  title: string;
  poster: string;
}

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  const { id: movieId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const showId = searchParams.get("showId");

  const [seatData, setSeatData] = useState<SeatData | null>(null);
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showId) return;

    Promise.all([
      fetch(`/api/seats/${showId}`).then((res) => res.json()),
      fetch(`/api/movies/${movieId}`).then((res) => res.json()),
    ]).then(([seatRes, movieRes]) => {
      setSeatData(seatRes);
      setMovie(movieRes);
    });
  }, [showId, movieId]);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0 || !showId) return;

    setIsBooking(true);
    setError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showId, seats: selectedSeats }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to success page with booking details
        const params = new URLSearchParams({
          bookingId: data.bookingId,
          movie: data.details.movieTitle,
          showTime: data.details.showTime,
          screen: data.details.screen,
          seats: data.details.seats.join(","),
          amount: data.details.totalAmount.toString(),
        });
        router.push(`/booking/success?${params.toString()}`);
      } else {
        setError(data.message || "Booking failed");
        // Refresh seat data
        const seatRes = await fetch(`/api/seats/${showId}`).then((res) =>
          res.json()
        );
        setSeatData(seatRes);
        setSelectedSeats([]);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (!showId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          No show selected
        </h1>
        <Link href={`/movies/${movieId}`} className="text-rose-400 hover:underline">
          Go back and select a showtime
        </Link>
      </div>
    );
  }

  if (!seatData || !movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-zinc-400 mt-4">Loading seat map...</p>
      </div>
    );
  }

  const totalAmount = selectedSeats.length * seatData.price;

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
          <li>
            <Link
              href={`/movies/${movieId}`}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              {movie.title}
            </Link>
          </li>
          <li className="text-zinc-600">/</li>
          <li className="text-white">Select Seats</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        {/* Seat Selection */}
        <div className="animate-fade-in">
          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Select Your Seats
            </h1>
            <div className="flex items-center gap-4 text-zinc-400">
              <span>{movie.title}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span>{seatData.time}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span>{seatData.screen}</span>
            </div>
          </div>

          {/* Screen Indicator */}
          <div className="mb-8 text-center">
            <div className="relative inline-block w-full max-w-lg mx-auto">
              <div className="h-2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-cyan-400/20 to-transparent blur-md" />
              <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider">
                Screen
              </p>
            </div>
          </div>

          {/* Seat Grid */}
          <SeatGrid
            seatMap={seatData.seats}
            selectedSeats={selectedSeats}
            onSelect={handleSeatSelect}
          />

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-zinc-700 border border-zinc-600" />
              <span className="text-sm text-zinc-400">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-cyan-500 border border-cyan-400" />
              <span className="text-sm text-zinc-400">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-rose-900/50 border border-rose-500/30" />
              <span className="text-sm text-zinc-400">Booked</span>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:sticky lg:top-24 h-fit animate-fade-in stagger-1">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
            <h2 className="font-display text-xl font-bold text-white mb-4">
              Booking Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Movie</span>
                <span className="text-white font-medium">{movie.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Showtime</span>
                <span className="text-white">{seatData.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Screen</span>
                <span className="text-white">{seatData.screen}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Price per seat</span>
                <span className="text-white">₹{seatData.price}</span>
              </div>
              <hr className="border-zinc-800" />
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Selected Seats</span>
                <span className="text-white font-medium">
                  {selectedSeats.length > 0
                    ? selectedSeats.sort().join(", ")
                    : "None"}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                {error}
              </div>
            )}

            <div className="p-4 rounded-xl bg-zinc-800/50 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Total Amount</span>
                <span className="text-2xl font-bold text-white">
                  ₹{totalAmount}
                </span>
              </div>
              {selectedSeats.length > 0 && (
                <p className="text-xs text-zinc-500 mt-1">
                  {selectedSeats.length} seat(s) × ₹{seatData.price}
                </p>
              )}
            </div>

            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || isBooking}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isBooking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Booking
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

