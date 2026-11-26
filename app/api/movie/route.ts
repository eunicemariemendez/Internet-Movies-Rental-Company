import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Movie } from "@/data/movies";

export const dynamic = "force-dynamic";

const MOVIE_COLUMNS = "id, title, actors, release_year";

// GET return all movies from Supabase
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("movies")
      .select(MOVIE_COLUMNS)
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch movies from Supabase.", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json((data ?? []) as Movie[], { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch movies from Supabase.", details: message },
      { status: 500 },
    );
  }
}

// POST add a new movie to Supabase
export async function POST(request: Request) {
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

  if (typeof title !== "string" || title.trim() === "") {
    return NextResponse.json(
      { error: "Title must be a non-empty string." },
      { status: 400 },
    );
  }

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

  try {
    const { data, error } = await supabase
      .from("movies")
      .insert({
        title: title.trim(),
        actors: cleanActors,
        release_year,
      })
      .select(MOVIE_COLUMNS)
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          error: "Failed to add movie in Supabase.",
          details: error?.message ?? "No movie returned from Supabase.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(data as Movie, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to add movie in Supabase.", details: message },
      { status: 500 },
    );
  }
}