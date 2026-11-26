/*
File name: page.tsx
Author: Eunice Mendez
Date: November 21, 2026

Overview: This file is the home page of the portal, which is the movie list page.
Inputs: It doesn't take any props.
Processing: It imports the MovieBoard component from Person 3 and shows it. MovieBoard loads the movies and puts MovieList, MovieForm
and EditMovieForm on the page. The NavBar and Footer come from layout.tsx, so they aren't added here.
Output: It shows the movie catalogue with the title, actors and release year of each movie.
*/

import MovieBoard from "@/components/MovieBoard";

// display the movie board on the home page
const HomePage = () => {
  return <MovieBoard />;
};

export default HomePage;
