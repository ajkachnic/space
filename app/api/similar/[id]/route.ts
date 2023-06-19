import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { z } from "zod";

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY || "",
});
const client = new ChromaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const collection = await client.getOrCreateCollection({
    name: "notes",
    embeddingFunction: embedder,
  });

  const nResults = url.searchParams.get("nResults");

  const notes = await collection.get({
    ids: params.id,
    // @ts-ignore
    include: ["documents", "metadatas", "embeddings"],
  });

  const note = {
    id: params.id,
    content: notes.documents[0],
    embeddings: notes.embeddings![0],
    metadata: notes.metadatas[0],
  };

  const similar = await collection.query({
    queryEmbeddings: note.embeddings,
    nResults: nResults ? parseInt(nResults) : 5,
  });

  return new Response(JSON.stringify(similar), {
    headers: {
      "content-type": "application/json",
    },
  });
}
