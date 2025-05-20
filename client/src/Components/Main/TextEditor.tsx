import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { mergeAttributes } from '@tiptap/core';
import ImageUploader from '../ImageUploader';
import type { DOMOutputSpec } from 'prosemirror-model';

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => ({ width: attributes.width }),
      },
      href: {
        default: null,
        parseHTML: element => element.closest('a')?.getAttribute('href'),
        renderHTML: () => ({}),
      },
    };
  },

  renderHTML({ HTMLAttributes }): DOMOutputSpec {
    const { href, ...imgAttrs } = HTMLAttributes;

    const img: DOMOutputSpec = ['img', mergeAttributes(imgAttrs)];

    if (href) {
      return ['a', { href, target: '_blank', rel: 'noopener noreferrer' }, img] as DOMOutputSpec;
    }

    return img;
  }
});

type MenuButtonProps = {
  editor: Editor;
  command: () => void;
  icon: React.ReactNode;
  active?: boolean;
};

const MenuButton: React.FC<MenuButtonProps> = ({ command, icon, active }) => (
  <button
    onClick={command}
    aria-pressed={active}
    className={`
      p-2 rounded-md font-semibold text-lg transition
      focus:outline-none focus:ring-2 focus:ring-offset-1
      ${active
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
    `}
  >
    {icon}
  </button>
);

type MenuBarProps = {
  editor: Editor | null;
};

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-700 pb-2">
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleBold().run()} icon="B" active={editor.isActive('bold')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleItalic().run()} icon="I" active={editor.isActive('italic')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleUnderline().run()} icon="U" active={editor.isActive('underline')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleStrike().run()} icon="S" active={editor.isActive('strike')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleBulletList().run()} icon="• List" active={editor.isActive('bulletList')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleOrderedList().run()} icon="1. List" active={editor.isActive('orderedList')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon="H1" active={editor.isActive('heading', { level: 1 })} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon="H2" active={editor.isActive('heading', { level: 2 })} />
      <MenuButton editor={editor} command={() => editor.chain().focus().toggleCodeBlock().run()} icon="{}" active={editor.isActive('codeBlock')} />
      <MenuButton editor={editor} command={() => editor.chain().focus().setTextAlign('left').run()} icon="↤" active={editor.isActive({ textAlign: 'left' })} />
      <MenuButton editor={editor} command={() => editor.chain().focus().setTextAlign('center').run()} icon="↔" active={editor.isActive({ textAlign: 'center' })} />
      <MenuButton editor={editor} command={() => editor.chain().focus().setTextAlign('right').run()} icon="↦" active={editor.isActive({ textAlign: 'right' })} />
      <MenuButton editor={editor} command={() => editor.chain().focus().unsetAllMarks().run()} icon="⨉" />
      <MenuButton editor={editor} command={() => editor.chain().focus().undo().run()} icon="↺" />
      <MenuButton editor={editor} command={() => editor.chain().focus().redo().run()} icon="↻" />
    </div>
  );
};

type TiptapEditorProps = {
  content: string;
  setContent: (content: string) => void;
  images: string[];
};

const TipTapEditor: React.FC<TiptapEditorProps> = ({ content, setContent, images }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2] } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ResizableImage,
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && images.length) {
      editor.chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: {
            src: images[images.length - 1],
            width: '300px',
            height: 'auto',
            href: images[images.length - 1],
          },
        })
        .run();
    }
  }, [images, editor]);

  return (
    <div className="w-full h-[40vh] lg:h-[70vh] rounded-md border border-gray-700 bg-gray-900 text-white flex flex-col transition hover:bg-gray-800 items-center justify-center">
      <MenuBar editor={editor} />
      <div className="h-[250px] overflow-auto p-4 prose prose-invert w-full">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
};

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ content, setContent }) => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <ImageUploader setImages={setImages} />
      <TipTapEditor images={images} content={content} setContent={setContent} />
    </div>
  );
};

export default EditorComponent;