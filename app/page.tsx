"use client";

import Tiptap from "@/components/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
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

export default function BlankPage() {
  const router = useRouter();

  useEffect(() => {
    return tinykeys(window, {
      Space: () => router.push("/write"),
      "/": () => router.push("/search"),
      c: () => router.push("/notes"),
      r: () => router.push("/random"),
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-y-4">
        <Shortcut>space</Shortcut>
        <p className="text-gray-400 font-sans select-none">Create a note </p>

        <Shortcut>/</Shortcut>
        <p className="text-gray-400 font-sans select-none">Search </p>

        <Shortcut>c</Shortcut>
        <p className="text-gray-400 font-sans select-none">
          View all notes (chronological)
        </p>

        <Shortcut>r</Shortcut>
        <p className="text-gray-400 font-sans select-none">Random note</p>
      </div>
    </div>
  );
}
