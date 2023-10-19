import { getCollection } from "@/lib/server";
import { z } from "zod";

const SaveBody = z.object({
  content: z.string(),
  id: z.string(),
});

export async function POST(request: Request) {
  const collection = await getCollection("notes");

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
