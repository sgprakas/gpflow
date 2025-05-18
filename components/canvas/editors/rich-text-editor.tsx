import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder }),
            TextStyle,
            Color,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded-md border-indigo-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-indigo-200 px-3 py-2 flex items-center gap-2">
                // ... existing toolbar buttons ...
            </div>
            <EditorContent
                editor={editor}
                className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none"
            />
        </div>
    );
}