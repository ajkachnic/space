"use client";

import { useEditor, EditorContent, FloatingMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { twMerge } from "tailwind-merge";

function FloatingButton({
  level,
  editor,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  editor: Editor;
}) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      className={twMerge(
        "bg-gray-800 text-white px-3 py-1 rounded text-xs transition-colors",
        editor.isActive("heading", { level }) ? "bg-gray-700" : ""
      )}
    >
      h{level}
    </button>
  );
}

const Tiptap = ({
  className,
  editor,
}: {
  className?: string;
  editor: Editor | null;
}) => {
  return (
    <>
      {editor && (
        <FloatingMenu
          editor={editor}
          className="flex gap-2"
          tippyOptions={{ duration: 100 }}
        >
          <FloatingButton level={1} editor={editor} />
          <FloatingButton level={2} editor={editor} />
          <FloatingButton level={3} editor={editor} />
        </FloatingMenu>
      )}
      <EditorContent editor={editor} className={className} />
    </>
  );
};

export default Tiptap;
