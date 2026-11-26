import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Movie } from "@/data/movies";

export const dynamic = "force-dynamic";

const MOVIE_COLUMNS = "id, title, actors, release_year";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function parseMovieId(rawId: string): number | null {
  if (!/^\d+$/.test(rawId)) {
    return null;
  }
  const parsed = Number(rawId);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

// GET return movie from Supabase
export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const movieId = parseMovieId(id);

  if (movieId === null) {
    return NextResponse.json({ error: "Invalid movie ID." }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("movies")
      .select(MOVIE_COLUMNS)
      .eq("id", movieId)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch movie from Supabase.", details: error.message },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Movie not found." }, { status: 404 });
    }

    return NextResponse.json(data as Movie, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch movie from Supabase.", details: message },
      { status: 500 },
    );
  }
}

// PATCH edit existing movie in Supabase
export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const movieId = parseMovieId(id);

  if (movieId === null) {
    return NextResponse.json({ error: "Invalid movie ID." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const { title, actors, release_year } = body as Record<string, unknown>;
  const updates: Partial<Omit<Movie, "id">> = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Title must be a non-empty string." },
        { status: 400 },
      );
    }
    updates.title = title.trim();
  }

  if (actors !== undefined) {
    if (
      !Array.isArray(actors) ||
      !actors.every((actor) => typeof actor === "string")
    ) {
      return NextResponse.json(
        { error: "Actors must be an array of strings." },
        { status: 400 },
      );
    }

    const cleanActors = actors
      .map((name) => name.trim())
      .filter((name) => name !== "");

    if (cleanActors.length === 0) {
      return NextResponse.json(
        { error: "At least one actor is required." },
        { status: 400 },
      );
    }
    updates.actors = cleanActors;
  }

  if (release_year !== undefined) {
    const currentYear = new Date().getFullYear();
    if (
      typeof release_year !== "number" ||
      !Number.isInteger(release_year) ||
      release_year < 1888 ||
      release_year > currentYear + 5
    ) {
      return NextResponse.json(
        {
          error: `Release year must be a whole number between 1888 and ${currentYear + 5}.`,
        },
        { status: 400 },
      );
    }
    updates.release_year = release_year;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      {
        error:
          "Provide at least one field to update (title, actors, or release_year).",
      },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from("movies")
      .update(updates)
      .eq("id", movieId)
      .select(MOVIE_COLUMNS)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        {
          error: "Failed to update movie in Supabase.",
          details: error.message,
        },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Movie not found." }, { status: 404 });
    }

    return NextResponse.json(data as Movie, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update movie in Supabase.", details: message },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const movieId = parseMovieId(id);

  if (movieId === null) {
    return NextResponse.json({ error: "Invalid movie ID." }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("movies")
      .delete()
      .eq("id", movieId)
      .select(MOVIE_COLUMNS)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        {
          error: "Failed to delete movie from Supabase.",
          details: error.message,
        },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Movie not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Movie deleted successfully.", movie: data as Movie },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to delete movie from Supabase.", details: message },
      { status: 500 },
    );
  }
}