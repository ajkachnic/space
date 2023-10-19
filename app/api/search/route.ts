import { getCollection } from "@/lib/server";
import type { Embeddings, QueryResponse } from "chromadb/dist/main/types";
import { Metadata } from "next";

function transformNotes(notes: QueryResponse): {
  id: string;
  document: string | null;
  metadata: Metadata | null;
  distance: number | null;
  embedding: Embeddings | null;
}[] {
  console.log(notes);
  return notes.ids[0].map((id, i) => ({
    id: id,
    document: notes.documents[0][i],
    metadata: notes.metadatas[0][i],
    distance: notes.distances ? notes.distances[0][i] : null,
    embedding: notes.embeddings ? notes.embeddings[i] : null,
  }));
}

export async function GET(request: Request) {
  const collection = await getCollection("notes");
  const url = new URL(request.url);

  const nResults = parseInt(url.searchParams.get("nResults") || "0");
  const query = url.searchParams.get("query");

  if (query === null) {
    return new Response(JSON.stringify([]), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  console.time("query");

  const notes = await collection.query({
    queryTexts: [query],
    nResults,
  });

  console.timeEnd("query");

  return new Response(JSON.stringify(transformNotes(notes)), {
    headers: {
      "content-type": "application/json",
    },
  });
}
