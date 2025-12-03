"use client";

import { SeatMap } from "@/lib/showsStore";

interface SeatGridProps {
  seatMap: SeatMap;
  selectedSeats: string[];
  onSelect: (seatId: string) => void;
}

export default function SeatGrid({
  seatMap,
  selectedSeats,
  onSelect,
}: SeatGridProps) {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cols = 12;

  const getSeatClass = (seatId: string) => {
    const status = seatMap[seatId];
    const isSelected = selectedSeats.includes(seatId);

    if (status === "booked") {
      return "bg-rose-900/50 border-rose-500/30 cursor-not-allowed text-rose-400/50";
    }

    if (isSelected) {
      return "bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30";
    }

    return "bg-zinc-700 border-zinc-600 hover:bg-zinc-600 hover:border-zinc-500 text-zinc-300 cursor-pointer";
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[600px] mx-auto">
        {rows.map((row, rowIndex) => (
          <div
            key={row}
            className="flex items-center gap-2 mb-2 justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: `${rowIndex * 0.05}s` }}
          >
            {/* Row label */}
            <span className="w-6 text-center text-sm font-medium text-zinc-500">
              {row}
            </span>

            {/* Seats */}
            <div className="flex gap-1.5">
              {[...Array(cols)].map((_, colIndex) => {
                const seatId = `${row}${colIndex + 1}`;
                const status = seatMap[seatId];

                return (
                  <button
                    key={seatId}
                    onClick={() => status === "available" && onSelect(seatId)}
                    disabled={status === "booked"}
                    className={`
                      w-8 h-8 rounded border text-xs font-medium
                      transition-all duration-200
                      ${getSeatClass(seatId)}
                      ${colIndex === 5 ? "mr-4" : ""} /* Aisle gap */
                    `}
                    title={`Seat ${seatId} - ${status === "booked" ? "Booked" : "Available"}`}
                  >
                    {colIndex + 1}
                  </button>
                );
              })}
            </div>

            {/* Row label (right side) */}
            <span className="w-6 text-center text-sm font-medium text-zinc-500">
              {row}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

