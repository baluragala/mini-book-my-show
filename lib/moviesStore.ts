export interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: number;
  poster: string;
  description: string;
  duration: string;
  releaseYear: number;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
    poster: "/posters/inception.jpg",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    duration: "2h 28min",
    releaseYear: 2010,
  },
  {
    id: "2",
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: 8.6,
    poster: "/posters/interstellar.jpg",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: "2h 49min",
    releaseYear: 2014,
  },
  {
    id: "3",
    title: "The Dark Knight",
    genre: "Action",
    rating: 9.0,
    poster: "/posters/dark-knight.jpg",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: "2h 32min",
    releaseYear: 2008,
  },
  {
    id: "4",
    title: "Pulp Fiction",
    genre: "Crime",
    rating: 8.9,
    poster: "/posters/pulp-fiction.jpg",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    duration: "2h 34min",
    releaseYear: 1994,
  },
  {
    id: "5",
    title: "The Matrix",
    genre: "Sci-Fi",
    rating: 8.7,
    poster: "/posters/matrix.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    duration: "2h 16min",
    releaseYear: 1999,
  },
  {
    id: "6",
    title: "Fight Club",
    genre: "Drama",
    rating: 8.8,
    poster: "/posters/fight-club.jpg",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    duration: "2h 19min",
    releaseYear: 1999,
  },
];

export function getMovieById(id: string): Movie | undefined {
  return movies.find((movie) => movie.id === id);
}

export function getAllMovies(): Movie[] {
  return movies;
}

