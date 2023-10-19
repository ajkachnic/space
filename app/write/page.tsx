"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { nanoid } from "nanoid";
import { tinykeys } from "tinykeys";

import Tiptap from "@/components/tiptap";

export default function Write() {
  const router = useRouter();

  useEffect(() => {
    return tinykeys(window, {
      Escape: () => router.push("/"),
    });
  }, []);

  const [id, setId] = useState<string>("____");

  useEffect(() => {
    setId(nanoid(4));
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>write your note here</p>",
  });
  const padded = id.toString().padStart(4, "0");

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <form
        className="w-[28rem] font-mono"
        onSubmit={(ev) => {
          ev.preventDefault();

          fetch("/api/save", {
            method: "POST",
            body: JSON.stringify({ content: editor?.getHTML() || "", id }),
          }).then((res) => {
            router.push("/");
          });
        }}
      >
        <div className="text-gray-600 text-xl mb-2 select-none">#{padded}</div>
        <Tiptap editor={editor} />
        <button className="my-4 px-8 py-2 bg-gray-800 font-medium text-gray-500 transition-colors rounded-md hover:text-gray-300 select-none">
          add note
        </button>
      </form>
    </div>
  );
}
