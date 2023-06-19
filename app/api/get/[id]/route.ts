import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { z } from "zod";

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY || "",
});
const client = new ChromaClient();

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const collection = await client.getOrCreateCollection({
    name: "notes",
    embeddingFunction: embedder,
  });

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
