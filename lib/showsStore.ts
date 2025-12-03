export type SeatStatus = "available" | "booked";

export interface SeatMap {
  [seatId: string]: SeatStatus;
}

export interface Show {
  showId: string;
  time: string;
  screen: string;
  price: number;
  seats: SeatMap;
}

export interface ShowsMap {
  [movieId: string]: Show[];
}

// Generate seat map for 8 rows × 12 columns
function generateSeatMap(): SeatMap {
  const seats: SeatMap = {};
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cols = 12;

  for (const row of rows) {
    for (let col = 1; col <= cols; col++) {
      seats[`${row}${col}`] = "available";
    }
  }

  return seats;
}

// Pre-book some seats for demo purposes
function generateSeatMapWithBookings(): SeatMap {
  const seats = generateSeatMap();
  // Pre-book some random seats for demo
  const preBooked = ["C5", "C6", "D7", "D8", "E5", "E6", "F3", "F4"];
  for (const seat of preBooked) {
    if (seats[seat]) {
      seats[seat] = "booked";
    }
  }
  return seats;
}

export const shows: ShowsMap = {
  "1": [
    {
      showId: "S1",
      time: "10:30 AM",
      screen: "Screen 1",
      price: 150,
      seats: generateSeatMapWithBookings(),
    },
    {
      showId: "S2",
      time: "2:00 PM",
      screen: "Screen 2",
      price: 200,
      seats: generateSeatMap(),
    },
    {
      showId: "S3",
      time: "6:30 PM",
      screen: "Screen 1",
      price: 250,
      seats: generateSeatMapWithBookings(),
    },
    {
      showId: "S4",
      time: "10:00 PM",
      screen: "Screen 3",
      price: 200,
      seats: generateSeatMap(),
    },
  ],
  "2": [
    {
      showId: "S5",
      time: "11:00 AM",
      screen: "Screen 2",
      price: 150,
      seats: generateSeatMap(),
    },
    {
      showId: "S6",
      time: "3:30 PM",
      screen: "Screen 1",
      price: 200,
      seats: generateSeatMapWithBookings(),
    },
    {
      showId: "S7",
      time: "7:00 PM",
      screen: "Screen 3",
      price: 250,
      seats: generateSeatMap(),
    },
  ],
  "3": [
    {
      showId: "S8",
      time: "12:00 PM",
      screen: "Screen 1",
      price: 200,
      seats: generateSeatMapWithBookings(),
    },
    {
      showId: "S9",
      time: "4:00 PM",
      screen: "Screen 2",
      price: 200,
      seats: generateSeatMap(),
    },
    {
      showId: "S10",
      time: "8:00 PM",
      screen: "Screen 1",
      price: 300,
      seats: generateSeatMapWithBookings(),
    },
  ],
  "4": [
    {
      showId: "S11",
      time: "1:00 PM",
      screen: "Screen 3",
      price: 150,
      seats: generateSeatMap(),
    },
    {
      showId: "S12",
      time: "5:00 PM",
      screen: "Screen 2",
      price: 200,
      seats: generateSeatMapWithBookings(),
    },
  ],
  "5": [
    {
      showId: "S13",
      time: "10:00 AM",
      screen: "Screen 1",
      price: 150,
      seats: generateSeatMap(),
    },
    {
      showId: "S14",
      time: "2:30 PM",
      screen: "Screen 3",
      price: 200,
      seats: generateSeatMapWithBookings(),
    },
    {
      showId: "S15",
      time: "6:00 PM",
      screen: "Screen 2",
      price: 250,
      seats: generateSeatMap(),
    },
  ],
  "6": [
    {
      showId: "S16",
      time: "11:30 AM",
      screen: "Screen 2",
      price: 150,
      seats: generateSeatMapWithBookings(),
    },
    {
      showId: "S17",
      time: "3:00 PM",
      screen: "Screen 1",
      price: 200,
      seats: generateSeatMap(),
    },
    {
      showId: "S18",
      time: "7:30 PM",
      screen: "Screen 3",
      price: 250,
      seats: generateSeatMapWithBookings(),
    },
  ],
};

export function getShowsByMovieId(movieId: string): Show[] {
  return shows[movieId] || [];
}

export function getShowById(showId: string): Show | undefined {
  for (const movieShows of Object.values(shows)) {
    const show = movieShows.find((s) => s.showId === showId);
    if (show) return show;
  }
  return undefined;
}

export function getMovieIdByShowId(showId: string): string | undefined {
  for (const [movieId, movieShows] of Object.entries(shows)) {
    const show = movieShows.find((s) => s.showId === showId);
    if (show) return movieId;
  }
  return undefined;
}

export function getSeatsByShowId(showId: string): SeatMap | undefined {
  const show = getShowById(showId);
  return show?.seats;
}

export function bookSeats(
  showId: string,
  seatIds: string[]
): { success: boolean; message: string } {
  const show = getShowById(showId);

  if (!show) {
    return { success: false, message: "Show not found" };
  }

  // Check if all seats are available
  for (const seatId of seatIds) {
    if (!show.seats[seatId]) {
      return { success: false, message: `Invalid seat: ${seatId}` };
    }
    if (show.seats[seatId] === "booked") {
      return {
        success: false,
        message: `Seat ${seatId} is already booked`,
      };
    }
  }

  // Book all seats
  for (const seatId of seatIds) {
    show.seats[seatId] = "booked";
  }

  return { success: true, message: "Seats booked successfully" };
}

export function generateBookingId(): string {
  return `BKG${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

