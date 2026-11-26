/*
File name: MovieForm.tsx
Author: Eunice Mendez
Date: November 23, 2026

Overview: This file shows the form for adding a movie.
Inputs: It gets one prop from MovieBoard, onAdd. The user types the title, the actors (with commas) and the release year.
Processing: When Save movie is clicked, React Hook Form checks the three boxes with the schema from schemas/movie.ts. If everything is
fine, it splits the actors into a list, sends the new movie to MovieBoard with onAdd and clears the boxes.
Output: It shows a red message under any box that is wrong. If everything is fine, the boxes are cleared and the new movie is added
by MovieBoard.
*/

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, type MovieInputs } from "@/schemas/movie";

// describe the props received from MovieBoard
interface MovieFormProps {
  onAdd: (title: string, actors: string[], release_year: number) => void;
}

const MovieForm = ({ onAdd }: MovieFormProps) => {
  // the form and the schema is the rules, defaultValues is where each box starts
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieInputs>({
    resolver: zodResolver(movieSchema),
    defaultValues: { title: "", actors: "", release_year: undefined },
  });

  // only runs when every rule in the schema has passed
  const onSubmit: SubmitHandler<MovieInputs> = (data) => {
    // turns "Tom Hanks, Tim Allen" into ["Tom Hanks", "Tim Allen"]
    const actorList = data.actors
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");

    onAdd(data.title, actorList, data.release_year);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 max-w-lg rounded-2xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-lg font-bold">Add a movie</h2>

      {/* title box */}
      <label className="mb-1 block text-sm font-medium">Title</label>
      <input
        {...register("title")}
        placeholder="Inception"
        className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-red-600 focus:outline-none"
      />
      {errors.title && (
        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
      )}

      {/* actors box */}
      <label className="mb-1 mt-4 block text-sm font-medium">
        Actors (separate with commas)
      </label>
      <input
        {...register("actors")}
        placeholder="Leonardo DiCaprio, Elliot Page"
        className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-red-600 focus:outline-none"
      />
      {errors.actors && (
        <p className="mt-1 text-sm text-red-600">{errors.actors.message}</p>
      )}

      {/* release year box valueAsNumber turns the text into a number */}
      <label className="mb-1 mt-4 block text-sm font-medium">
        Release year
      </label>
      <input
        type="number"
        {...register("release_year", { valueAsNumber: true })}
        placeholder="2010"
        className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-red-600 focus:outline-none"
      />
      {errors.release_year && (
        <p className="mt-1 text-sm text-red-600">
          {errors.release_year.message}
        </p>
      )}

      {/* save button */}
      <button
        type="submit"
        className="mt-6 cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
      >
        Save movie
      </button>
    </form>
  );
};

export default MovieForm;
