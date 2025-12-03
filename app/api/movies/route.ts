import { NextResponse } from "next/server";
import { getAllMovies } from "@/lib/moviesStore";

export async function GET() {
  const movies = getAllMovies();
  return NextResponse.json(movies);
}

