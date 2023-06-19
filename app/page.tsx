"use client";

import Tiptap from "@/components/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { nanoid } from "nanoid";
import { ReactNode, useEffect, useState } from "react";
import { tinykeys } from "tinykeys";

type Mode = "blank" | "write" | "search" | "note";

function Shortcut({ children }: { children: ReactNode }) {
  return (
    <div className="text-gray-200 bg-gray-800 py-0.5 px-2 block font-bold font-mono w-fit rounded-md">
      {children}
    </div>
  );
}

function BlankSpace({ setMode }: { setMode: (m: Mode) => void }) {
  useEffect(() => {
    return tinykeys(window, {
      Space: () => setMode("write"),
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-y-4">
        <Shortcut>space</Shortcut>
        <p className="text-gray-400 font-sans select-none">Create a note </p>

        <Shortcut>/</Shortcut>
        <p className="text-gray-400 font-sans select-none">Search </p>

        <Shortcut>r</Shortcut>
        <p className="text-gray-400 font-sans select-none">Random note</p>
      </div>
    </div>
  );
}

function Note({
  initialContent,
  setMode,
}: {
  initialContent: string;

  setMode: (m: Mode) => void;
}) {
  useEffect(() => {
    return tinykeys(window, {
      Escape: () => setMode("blank"),
    });
  }, []);

  const [id, setId] = useState<string>(nanoid(4));

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
  });
  const padded = id.toString().padStart(4, "0");

  return (
    <form
      className="w-[28rem] font-mono"
      onSubmit={(ev) => {
        ev.preventDefault();

        fetch("/api/save", {
          method: "POST",
          body: JSON.stringify({ content: editor?.getHTML() || "", id }),
        }).then((res) => {
          setMode("blank");
        });
      }}
    >
      <div className="text-gray-600 text-xl mb-2 select-none">#{padded}</div>
      <Tiptap editor={editor} />
      <button className="my-4 px-8 py-2 bg-gray-800 font-medium text-gray-500 transition-colors rounded-md hover:text-gray-300 select-none">
        add note
      </button>
    </form>
  );
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("blank");

  if (mode == "blank") {
    return <BlankSpace setMode={setMode} />;
  }

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <Note initialContent="<p>type your note here</p>" setMode={setMode} />
    </div>
  );
}
