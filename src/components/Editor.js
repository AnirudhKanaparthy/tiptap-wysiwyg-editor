import './Editor.css';

import React, { useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import Underline from '@tiptap/extension-underline';
import StarterKit from "@tiptap/starter-kit";

import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from 'tiptap-extension-font-size';
import TextAlign from '@tiptap/extension-text-align'

import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'

import Toolbar from './Toolbar';


export default function Editor() {
    const [editorContent, setEditorContent] = useState({});

    const defaultFont = {
        fontFamily: 'Inter',
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            FontFamily,
            FontSize,
            TextStyle,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            BulletList, 
            ListItem,
            OrderedList,
        ],
        onUpdate: ({ editor }) => {
            setEditorContent(editor.getJSON());
            console.log(editor.getHTML());
        },
        autofocus: true,
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