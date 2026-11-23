/*
File name: MovieDetail.tsx
Author: Eunice Mendez
Date: November 22, 2026

Overview: This file shows the page for one movie, only for signed in users.
Inputs: It gets one prop, id, from the page address.
Processing: It asks Supabase who is logged in, and if nobody is, it sends the person to the login page. If someone is signed in, it
asks the API at /api/movies/id for that movie and handles the loading, error and not found cases.
Output: It shows the title, release year and actors of the movie, or a message that it is loading, that it failed or that the movie
wasn't found.
*/

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Movie } from "@/data/movies";

// describe the props received from the page
interface MovieDetailProps {
  id: string;
}

const MovieDetail = ({ id }: MovieDetailProps) => {
  const router = useRouter();

  // this is the state, the movie and what is happening
  const [movie, setMovie] = useState<Movie | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState("");

  // the guard, nobody logged in means go to the login page
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
      } else {
        setSignedIn(true);
      }
    });
  }, [router]);

  // once we know someone is signed in, ask the API for this movie
  useEffect(() => {
    if (!signedIn) return;

    const loadMovie = async () => {
      const response = await fetch("/api/movies/" + id);

      if (response.status === 404) {
        setNotFound(true);
      } else if (!response.ok) {
        setLoadError("The server refused it (" + response.status + ").");
      } else {
        const data: Movie = await response.json();
        setMovie(data);
      }
      setLoading(false);
    };

    loadMovie();
  }, [signedIn, id]);

  // waiting, error and not-found messages
  if (!signedIn || loading) {
    return <p className="text-neutral-500">Loading movie…</p>;
  }
  if (loadError) {
    return <p className="text-red-600">{loadError}</p>;
  }
  if (notFound || !movie) {
    return (
      <div>
        <p className="mb-4">That movie was not found.</p>
        <Link href="/" className="text-emerald-600 hover:text-emerald-700">
          Back to the list
        </Link>
      </div>
    );
  }

  // the movie's details
  return (
    <section>
      <Link
        href="/"
        className="text-sm text-emerald-600 hover:text-emerald-700"
      >
        &larr; Back to the list
      </Link>

      <h1 className="mb-4 mt-4 text-2xl font-bold">{movie.title}</h1>

      <p className="text-sm text-neutral-500">Release year</p>
      <p className="mb-4">{movie.release_year}</p>

      <p className="text-sm text-neutral-500">Actors</p>
      <p>{movie.actors.join(", ")}</p>
    </section>
  );
};

export default MovieDetail;
