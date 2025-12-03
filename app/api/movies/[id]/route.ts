import { NextResponse } from "next/server";
import { getMovieById } from "@/lib/moviesStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}

