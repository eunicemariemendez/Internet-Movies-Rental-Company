/*
File name: MovieList.tsx
Author: Eunice Mendez
Date: November 23, 2026

Overview: This file shows the list of movies on the home page.
Inputs: It gets four props from MovieBoard, the movies, loading, signedIn and onEdit.
Processing: It checks if the movies are still loading or if the list is empty, and if not it goes through the movies with map and
makes a MovieCard for each one. It passes signedIn and onEdit down to each card.
Output: It shows a loading message, a message that there are no movies yet, or a grid of movie cards. The grid is 1 column on a phone
and 3 columns on a large screen.
*/

import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/data/movies";

// describe the props received from MovieBoard
interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  signedIn: boolean;
  onEdit?: (movie: Movie) => void;
}

const MovieList = ({ movies, loading, signedIn, onEdit }: MovieListProps) => {
  // loading message
  if (loading) {
    return <p className="text-neutral-500">Loading movies…</p>;
  }

  // empty message
  if (movies.length === 0) {
    return <p className="text-neutral-500">No movies yet.</p>;
  }

  // the grid of movie cards
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          signedIn={signedIn}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default MovieList;
