/*
File name: EditMovieForm.tsx
Author: Eunice Mendez
Date: November 22, 2026

Overview: This file shows the form for editing or deleting one movie, and only admins see it.
Inputs: It gets four props from MovieBoard, the movie, onSave, onDelete and onCancel. The boxes start with the movie's current
title, actors and year.
Processing: Save changes checks the boxes with the schema from schemas/movie.ts, splits the actors into a list and sends the changes
to MovieBoard with onSave. The Delete movie button sends the movie's id to MovieBoard with onDelete. The Cancel button calls onCancel.
Output: It shows a red message under any box that is wrong. The saving and deleting are done by MovieBoard.
*/

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Movie } from "@/data/movies";
import { movieSchema, type MovieInputs } from "@/schemas/movie";

// describe the props received from MovieBoard
interface EditMovieFormProps {
  movie: Movie;
  onSave: (
    id: number,
    title: string,
    actors: string[],
    release_year: number,
  ) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

const EditMovieForm = ({
  movie,
  onSave,
  onDelete,
  onCancel,
}: EditMovieFormProps) => {
  // the form starts with the movie's current values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieInputs>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: movie.title,
      actors: movie.actors.join(", "),
      release_year: movie.release_year,
    },
  });

  // only runs when every rule in the schema has passed
  const onSubmit: SubmitHandler<MovieInputs> = (data) => {
    // turns "Tom Hanks, Tim Allen" into ["Tom Hanks", "Tim Allen"]
    const actorList = data.actors
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");

    onSave(movie.id, data.title, actorList, data.release_year);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 max-w-lg rounded-2xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-lg font-bold">Edit movie</h2>

      {/* title box */}
      <label className="mb-1 block text-sm font-medium">Title</label>
      <input
        {...register("title")}
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
        className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-red-600 focus:outline-none"
      />
      {errors.actors && (
        <p className="mt-1 text-sm text-red-600">{errors.actors.message}</p>
      )}

      {/* release year box, valueAsNumber turns the text into a number */}
      <label className="mb-1 mt-4 block text-sm font-medium">
        Release year
      </label>
      <input
        type="number"
        {...register("release_year", { valueAsNumber: true })}
        className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-red-600 focus:outline-none"
      />
      {errors.release_year && (
        <p className="mt-1 text-sm text-red-600">
          {errors.release_year.message}
        </p>
      )}

      {/* save, delete and cancel buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Save changes
        </button>
        <button
          type="button"
          onClick={() => onDelete(movie.id)}
          className="cursor-pointer rounded-lg border border-red-600 px-4 py-2 text-red-600 transition hover:bg-red-50"
        >
          Delete movie
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-lg border border-neutral-300 px-4 py-2 transition hover:bg-neutral-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMovieForm;
