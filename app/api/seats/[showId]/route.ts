import { NextResponse } from "next/server";
import { getSeatsByShowId, getShowById } from "@/lib/showsStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ showId: string }> }
) {
  const { showId } = await params;
  const seats = getSeatsByShowId(showId);

  if (!seats) {
    return NextResponse.json({ error: "Show not found" }, { status: 404 });
  }

  const show = getShowById(showId);

  return NextResponse.json({
    showId,
    time: show?.time,
    screen: show?.screen,
    price: show?.price,
    seats,
  });
}

