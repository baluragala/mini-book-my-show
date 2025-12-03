import { NextResponse } from "next/server";
import { getShowsByMovieId } from "@/lib/showsStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  const { movieId } = await params;
  const shows = getShowsByMovieId(movieId);

  return NextResponse.json(shows);
}

