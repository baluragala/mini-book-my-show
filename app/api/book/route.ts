import { NextResponse } from "next/server";
import {
  bookSeats,
  generateBookingId,
  getShowById,
  getMovieIdByShowId,
} from "@/lib/showsStore";
import { getMovieById } from "@/lib/moviesStore";

interface BookingRequest {
  showId: string;
  seats: string[];
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();

    const { showId, seats } = body;

    if (!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid request: showId and seats are required" },
        { status: 400 }
      );
    }

    const show = getShowById(showId);
    if (!show) {
      return NextResponse.json(
        { success: false, message: "Show not found" },
        { status: 404 }
      );
    }

    const result = bookSeats(showId, seats);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    const bookingId = generateBookingId();
    const movieId = getMovieIdByShowId(showId);
    const movie = movieId ? getMovieById(movieId) : null;

    return NextResponse.json({
      success: true,
      message: "Booking confirmed",
      bookingId,
      details: {
        movieTitle: movie?.title || "Unknown",
        showTime: show.time,
        screen: show.screen,
        seats: seats,
        totalAmount: show.price * seats.length,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }
}

