export interface Movie {
  id: number;
  title: string;
  actors: string[];
  release_year: number;
}

export const starterMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    actors: ["Leonardo DiCaprio", "Elliot Page", "Joseph Gordon-Levitt"],
    release_year: 2010,
  },
  {
    id: 2,
    title: "The Martian",
    actors: ["Matt Damon", "Jessica Chastain", "Donald Glover"],
    release_year: 2015,
  },
  {
    id: 3,
    title: "The Matrix",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    release_year: 1999,
  },
  {
    id: 4,
    title: "Interstellar",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    release_year: 2014,
  },
  {
    id: 5,
    title: "Spider-Man: Brand New Day",
    actors: ["Tom Holland", "Sadie Sink", "Zendaya",],
    release_year: 2026,
  }
];