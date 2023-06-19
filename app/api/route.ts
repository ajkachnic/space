import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { z } from "zod";

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY || "",
});
const client = new ChromaClient();

const SaveBody = z.object({
  content: z.string(),
  id: z.string(),
});

export async function GET(request: Request) {
  const collection = await client.getOrCreateCollection({
    name: "notes",
    embeddingFunction: embedder,
  });

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
