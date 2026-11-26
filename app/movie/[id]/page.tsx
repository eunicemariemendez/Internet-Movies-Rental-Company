/*
File name: page.tsx
Author: Eunice Mendez
Date: November 22, 2026

Overview: This file is the page for one movie, like /movie/3.
Inputs: It gets params as a prop from Next.js, and params is a Promise.
Processing: It uses await to get the id out of params and gives the id to MovieDetail. MovieDetail checks that the user is signed in
and gets the movie.
Output: It shows the details of the movie.
*/

import MovieDetail from "@/components/MovieDetail";

// describe the props received from Next.js
interface PageProps {
  params: Promise<{ id: string }>;
}

// wait for the id in the address, then show the movie
const MoviePage = async ({ params }: PageProps) => {
  const { id } = await params;

  return <MovieDetail id={id} />;
};

export default MoviePage;
