import React, { useState, useEffect } from 'react'
import './Toolbar.css'
import Dropdown, { DropdownItem } from './Dropdown';

import { EditorToolbarIcons, TextAlignIcons } from './ToolbarIcons';

function isEmpty(obj) {
    for (let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return true;
}

const fontFamilyOptions = {
    Inter: 'Inter',
    monospace: 'Monospace',
    Arial: 'Arial',
    verdana: 'Verdana',
    serif: 'Serif',
}
const fontHeadingOptions = [0, 1, 2, 3]
const textAlignOptions = ['left', 'center', 'right']


export default function Toolbar({ editor }) {
    let initialSize;
    if (editor && editor.getAttributes('textStyle').fontSize) {
        initialSize = editor.getAttributes('textStyle').fontSize;
    } else {
        initialSize = 16;
    }
    const [fontSize, setFontSize] = useState(initialSize);

    if (!editor) {
        return null;
    }

    useEffect(() => {
        if(editor) {
            setFontSize(editor.getAttributes('textStyle').fontSize);
        }
    }, [editor])

    function handleFontSizeChange(value) {
        setFontSize(value);
        editor.chain().focus().setFontSize(`${value}px`).run();
    }

    function handleFontFamilyClick(option) {
        editor.chain().focus().setFontFamily(option).run();
    }

    function getHeading() {
        if (isEmpty(editor.getAttributes('heading'))) {
            return 'Normal';
        }
        return `Heading ${editor.getAttributes('heading').level}`;
    }

    function handleChangeHeading(val) {
        editor.chain().focus().toggleHeading({ level: val }).run()
    }

    function getTextAlign() {
        for (let item in textAlignOptions) {
            if (editor.isActive({ textAlign: textAlignOptions[item] })) {
                return textAlignOptions[item];
            }
        }
        return 'left';
    }

    function getFontSize() {
        let fontSize = editor.getAttributes('textStyle').fontSize ? editor.getAttributes('textStyle').fontSize : 16;
        return parseInt(fontSize);
    }

    function handleTextAlign(alignType) {
        console.log(`Handling ${alignType}`);
        editor.chain().focus().setTextAlign(alignType).run();
        console.log(`Text Align: ${getTextAlign()}`);
    }

    return (
        <div className='toolbar'>
            <div className="toolbar-group">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <EditorToolbarIcons type="undo" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <EditorToolbarIcons type="redo" />
                </button>
                <div className='toolbar-divider'></div>
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
                    <EditorToolbarIcons type='bold' />
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
                    <EditorToolbarIcons type='italic' />
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
                    <EditorToolbarIcons type='underline' />
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
                    <EditorToolbarIcons type='strike' />
                </button>
                <div className='toolbar-divider'></div>
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
                    <EditorToolbarIcons type='code' />
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
                    <EditorToolbarIcons type='code-block' />
                </button>
                <div className='toolbar-divider'></div>
                <Dropdown width={8} direction="column" selectedOption={editor.getAttributes('textStyle').fontFamily ? fontFamilyOptions[editor.getAttributes('textStyle').fontFamily] : 'Default'}>
                    {Object.keys(fontFamilyOptions).map((item, idx) => <DropdownItem style={{ fontFamily: item }} label={fontFamilyOptions[item]} handleClick={handleFontFamilyClick} key={idx} item={item} />)}
                </Dropdown>

                <FontSizeChanger value={getFontSize()} handleChange={handleFontSizeChange} />

                <Dropdown direction="column" selectedOption={getHeading()}>
                    {fontHeadingOptions.map((item, idx) => <DropdownItem label={item === 0 ? 'Normal' : `Heading ${item}`} handleClick={handleChangeHeading} key={idx} item={item} />)}
                </Dropdown>

                <Dropdown direction="row" selectedOption={<TextAlignIcons type={getTextAlign()} />}>
                    {textAlignOptions.map((item, idx) => <DropdownItem handleClick={handleTextAlign} key={idx} item={item} ><TextAlignIcons type={item} /></DropdownItem>)}
                </Dropdown>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    O
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    hr
                </button>
            </div>
        </div>
    )
}


function FontSizeChanger({ value, handleChange }) {
    return (
        <div className='toolbar-font-size'>
            <button onClick={() => handleChange(value + 1)}>
                +
            </button>
            <span>{value}</span>
            <button onClick={() => handleChange(value - 1)}>
                -
            </button>
        </div>
    );
}


function ToolbarButton({ editor, method, iconType }) {
    return (
        <button onClick={() => editor.chain().focus()[method]().run()}>
            <EditorToolbarIcons type={iconType} />
        </button>
    );
}

function ToolbarStyleButton({ editor, method, iconType, style }) {
    return (
        <button
            onClick={() => editor.chain().focus()[method]().run()}
            style={style}
            disabled={!editor.can().chain().focus()[method]().run()}
            className={editor.isActive(method) ? 'is-active' : ''}
        >
            <EditorToolbarIcons type={iconType} />
        </button>
    );
}