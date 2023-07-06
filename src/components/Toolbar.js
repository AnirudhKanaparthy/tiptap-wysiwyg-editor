import React from 'react'
import './Toolbar.css'


export default function Toolbar({ editor }) {
    if (!editor) {
        return null;
    }

    return (
        <div className='toolbar'>
            <div className="toolbar-group">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={{ fontStyle: 'italic' }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    style={{ textDecoration: 'underline' }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                    U
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    style={{ textDecoration: 'line-through' }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    S
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    code
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCodeBlock()
                            .run()
                    }
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    code block
                </button>
            </div>
        </div>
    )
}
