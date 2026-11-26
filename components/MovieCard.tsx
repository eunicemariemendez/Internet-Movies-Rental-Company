/*
File name: MovieCard.tsx
Author: Eunice Mendez
Date: November 22, 2026

Overview: This file shows one movie as a card on the movie list.
Inputs: It gets three props from MovieList, the movie, signedIn and onEdit. The onEdit prop is only given when the user is an admin.
Processing: It joins the actors into one line. It only shows the View details link if the user is signed in, and it only shows the
Edit button if onEdit was given.
Output: It shows the title, the release year in a red badge, the actors, and the link and button that the user is allowed to see.
*/

import Link from "next/link";
import type { Movie } from "@/data/movies";

// describe the props received from MovieList
interface MovieCardProps {
  movie: Movie;
  signedIn: boolean;
  onEdit?: (movie: Movie) => void;
}

const MovieCard = ({ movie, signedIn, onEdit }: MovieCardProps) => {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-md">
      {/* movie title */}
      <h3 className="mb-2 text-lg font-bold">{movie.title}</h3>

      {/* release year badge */}
      <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-xs text-white">
        {movie.release_year}
      </span>

      {/* the actors on one line */}
      <p className="mb-4 text-sm text-neutral-500">{movie.actors.join(", ")}</p>

      {/* link and button, only for the users who are allowed to see them */}
      <div className="flex items-center gap-4">
        {signedIn && (
          <Link
            href={"/movie/" + movie.id}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View details
          </Link>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(movie)}
            className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
          >
            Edit
          </button>
        )}
      </div>
    </article>
  );
};

export default MovieCard;
