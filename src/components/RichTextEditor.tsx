import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { Placeholder } from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, AlignLeft, AlignCenter, 
  AlignRight, AlignJustify, Type, Image as ImageIcon, 
  Video, ChevronDown, Highlighter
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  primaryColor: string;
}

const RichTextEditor = ({ content, onChange, primaryColor }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Comece a escrever o seu editorial aqui...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full space-y-4">
      {/* Complete Toolbar matching user screenshot style */}
      <div className="sticky top-24 z-40 flex flex-wrap items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-100 shadow-soft-xl w-fit mx-auto">
        
        {/* Font Family Dropdown */}
        <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-all border-r border-slate-50">
          <Type size={16} className="text-slate-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Inter (Padrão)</span>
          <ChevronDown size={12} className="text-slate-400" />
        </div>

        {/* Media Icons */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-50">
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
            <ImageIcon size={16} />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
            <Video size={16} />
          </button>
        </div>

        {/* Formatting */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-50">
          <button 
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Bold size={16} />
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Italic size={16} />
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive('underline') ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <UnderlineIcon size={16} />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-50">
          <button 
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <List size={16} />
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <ListOrdered size={16} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-50 bg-slate-50/50 rounded-xl p-0.5">
          <button 
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:bg-white/50'}`}
          >
            <AlignLeft size={16} />
          </button>
          <button 
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:bg-white/50'}`}
          >
            <AlignCenter size={16} />
          </button>
          <button 
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:bg-white/50'}`}
          >
            <AlignRight size={16} />
          </button>
          <button 
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'justify' }) ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:bg-white/50'}`}
          >
            <AlignJustify size={16} />
          </button>
        </div>

        {/* Color & Advanced Picker */}
        <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-all">
          <div className="w-5 h-5 rounded-md border border-slate-100 shadow-inner flex items-center justify-center bg-white">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: primaryColor }} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">1.6 (Padrão)</span>
          <ChevronDown size={12} className="text-slate-400" />
        </div>
      </div>

      <EditorContent 
        editor={editor} 
        className="prose prose-slate max-w-none min-h-[500px] outline-none"
      />

      <style>{`
        .ProseMirror {
          outline: none !important;
          min-height: 500px;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
