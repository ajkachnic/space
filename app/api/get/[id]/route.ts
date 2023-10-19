import { getCollection } from "@/lib/server";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const collection = await getCollection("notes");

  const notes = await collection.get({
    ids: id,
    // @ts-ignore
    include: ["documents", "metadatas", "embeddings"],
  });

  const note = {
    id,
    content: notes.documents[0],
    embeddings: notes.embeddings![0],
    metadata: notes.metadatas[0],
  };

  return new Response(JSON.stringify(note), {
    headers: {
      "content-type": "application/json",
    },
  });
}
