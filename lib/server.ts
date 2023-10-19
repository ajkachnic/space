import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY || "",
});
const client = new ChromaClient();

export function getCollection(name: string) {
  return client.getOrCreateCollection({
    name,
    embeddingFunction: embedder,
  });
}
