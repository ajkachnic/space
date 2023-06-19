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

export async function POST(request: Request) {
  const collection = await client.getOrCreateCollection({
    name: "notes",
    embeddingFunction: embedder,
  });

  const body = SaveBody.parse(await request.json());

  const note = await collection.add({
    ids: body.id,
    metadatas: {
      date: new Date().toString(),
    },
    documents: body.content,
  });

  console.log(await collection.get());

  return new Response(JSON.stringify(note), {
    headers: {
      "content-type": "application/json",
    },
  });
}
