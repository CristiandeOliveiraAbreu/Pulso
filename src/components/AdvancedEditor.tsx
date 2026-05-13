import React from 'react';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Youtube } from '@tiptap/extension-youtube';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Image as ImageIcon,
  Video,
  ChevronDown,
  Type,
  Baseline
} from 'lucide-react';

// Custom Extension for Line Height
const LineHeight = Extension.create({
  name: 'lineHeight',
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: '1.6',
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: element => element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) return {};
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight: (lineHeight: string) => ({ commands }: any) => {
        return this.options.types.every((type: string) => commands.updateAttributes(type, { lineHeight }));
      },
    };
  },
});

interface AdvancedEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('URL da Imagem:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addVideo = () => {
    const url = window.prompt('URL do Vídeo (YouTube):');
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  const btnClass = (active: boolean) => `
    p-2 rounded-xl transition-all duration-300 flex items-center justify-center
    ${active ? 'bg-white text-slate-900 shadow-md scale-110' : 'text-slate-400 hover:text-slate-600'}
  `;

  return (
    <div className="flex items-center gap-1 p-1.5 bg-slate-50/50 backdrop-blur-md border border-slate-100 rounded-[2rem] shadow-premium mb-8 max-w-full md:max-w-fit mx-auto sticky top-4 z-50 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex items-center flex-nowrap min-w-max">
      
      {/* Font Selector */}
      <div className="flex items-center px-3 gap-2 border-r border-slate-200">
        <Type size={16} className="text-slate-400" />
        <select 
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-slate-600"
          value={editor.getAttributes('textStyle')?.fontFamily || 'Inter'}
        >
          <option value="Inter">Inter (Padrão)</option>
          <option value="Bodoni Moda">Bodoni Moda</option>
          <option value="Space Grotesk">Space Grotesk</option>
        </select>
        <ChevronDown size={12} className="text-slate-400" />
      </div>

      {/* Media */}
      <div className="flex items-center px-2 gap-1 border-r border-slate-200">
        <button type="button" onClick={addImage} className="p-2 text-slate-400 hover:text-slate-900 transition-all"><ImageIcon size={18} /></button>
        <button type="button" onClick={addVideo} className="p-2 text-slate-400 hover:text-slate-900 transition-all"><Video size={18} /></button>
      </div>

      {/* Basic Marks */}
      <div className="flex items-center px-2 gap-1 border-r border-slate-200">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}><Bold size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}><Italic size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}><List size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))}><ListOrdered size={18} /></button>
      </div>

      {/* Alignment */}
      <div className="flex items-center px-2 gap-1 border-r border-slate-200">
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))}><AlignLeft size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))}><AlignCenter size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))}><AlignRight size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={btnClass(editor.isActive({ textAlign: 'justify' }))}><AlignJustify size={18} /></button>
      </div>

      {/* Color & Line Height */}
      <div className="flex items-center px-3 gap-3">
        <button type="button" onClick={() => {
          const color = window.prompt('Cor (Hex):', '#000000');
          if (color) editor.chain().focus().setColor(color).run();
        }} className="text-slate-400 hover:text-slate-900"><Baseline size={18} /></button>
        
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-slate-600">1.6</span>
           <select 
            onChange={(e) => editor.commands.setLineHeight(e.target.value)}
            className="bg-transparent outline-none cursor-pointer text-slate-400"
          >
            <option value="1.2">1.2</option>
            <option value="1.4">1.4</option>
            <option value="1.6">1.6</option>
            <option value="1.8">1.8</option>
            <option value="2.0">2.0</option>
          </select>
          <ChevronDown size={12} className="text-slate-400" />
        </div>
      </div>
    </div>
  </div>
  );
};

export const AdvancedEditor = ({ content, onChange, placeholder = 'Comece a escrever...' }: AdvancedEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-slate-900 underline font-bold cursor-pointer',
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-3xl shadow-soft-xl max-w-full my-8 border border-slate-100',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      FontFamily,
      Color,
      Youtube.configure({
        width: 800,
        height: 450,
        HTMLAttributes: {
          class: 'rounded-3xl overflow-hidden shadow-soft-2xl my-8 mx-auto border border-slate-100',
        },
      }),
      LineHeight,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate prose-lg max-w-none focus:outline-none min-h-[500px] font-serif leading-relaxed text-slate-700',
      },
    },
  });

  return (
    <div className="relative">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
