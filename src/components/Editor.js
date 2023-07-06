import './Editor.css';

import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import Underline from '@tiptap/extension-underline';
import StarterKit from "@tiptap/starter-kit";

import Toolbar from './Toolbar';


export default function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit, Underline,
        ],
        content: '<p>Hello World!</p>'
    })

    return (
        <div className="editor">
            <Toolbar editor={editor} />
            <div className='text-content'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}