import { getCollection } from "@/lib/server";

export async function GET(request: Request) {
  const collection = await getCollection("notes");

  const notes = await collection.get({
    // @ts-ignore
    include: ["documents", "metadatas", "embeddings"],
  });

  return new Response(JSON.stringify(notes), {
    headers: {
      "content-type": "application/json",
    },
  });
}
