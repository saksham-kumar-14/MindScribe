import React, { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import lowlight from 'lowlight';
import ImageUploader from '../ImageUploader';

const MenuButton = ({ editor, command, icon, active }) => (
  <button
    onClick={command}
    className={`p-2 rounded-md font-medium text-xl
                hover:bg-gray-200 hover:text-black transition 
                ${active ? 'bg-blue-100 text-blue-600' : ''}`}
  >
    {icon}
  </button>
);

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 mb-3 border-b pb-2 text-white">
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleBold().run()} icon="B" active={editor.isActive('bold')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleItalic().run()} icon="I" active={editor.isActive('italic')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleUnderline().run()} icon="U" active={editor.isActive('underline')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleStrike().run()} icon="S" active={editor.isActive('strike')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleBulletList().run()} icon="• List" active={editor.isActive('bulletList')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleOrderedList().run()} icon="1. List" active={editor.isActive('orderedList')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon="H1" active={editor.isActive('heading', { level: 1 })} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon="H2" active={editor.isActive('heading', { level: 2 })} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleCodeBlock().run()} icon="{}" active={editor.isActive('codeBlock')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().setTextAlign('left').run()} icon="↤" />
      <MenuButton editor={editor} command={() => editor.chain().focus().setTextAlign('center').run()} icon="↔" />
      <MenuButton editor={editor} command={() => editor.chain().focus().setTextAlign('right').run()} icon="↦" />
      <MenuButton editor={editor} command={() => editor.chain().focus().unsetAllMarks().run()} icon="⨉" />
      <MenuButton editor={editor} command={() => editor.chain().focus().undo().run()} icon="↺" />
      <MenuButton editor={editor} command={() => editor.chain().focus().redo().run()} icon="↻" />
    </div>
  );
};

type TiptapEditorProps = {
  content: string;
  setContent: Function;
};

const TipTapEditor = ({ content, setContent }: TiptapEditorProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2] } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  return (
    <div className="w-[80vw] h-[70vh] overflow-y-scroll overflow-x-scroll min-h-[250px] px-4 py-3 rounded-md bg-transparent border border-gray-300 text-white transition-all duration-200 hover:bg-white/10 scrollbar-hide">
      <MenuBar editor={editor} />
      <div className=".pose-mirror min-h-[250px] px-4 py-3 bg-transparent border-black-2px rounded-md prose prose-sm prose-invert max-w-none ">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

interface Editorprops{
  content: string,
  setContent: Function
}

const Editor: React.FC<Editorprops> = ({ content, setContent }) => {
  const editorRef = useRef<any>(null);

  const handleUpload = (urls: string[]) => {
    const editor = editorRef.current;
    if (!editor) return;

    urls.forEach((url) => {
      editor.chain().focus().setImage({ src: url }).run();
    });
  };

  return (
    <div className="space-y-4">
      <ImageUploader onUpload={handleUpload} />
      <TipTapEditor content={content} setContent={setContent} />
    </div>
  );
}

export default Editor;
