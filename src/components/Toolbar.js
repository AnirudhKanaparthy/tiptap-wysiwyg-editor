import './Toolbar.css'

import React, { useCallback, useEffect } from 'react'

import Dropdown, { DropdownItem } from './Dropdown';

import ToolbarButton from './ToolbarButton';
import ToolbarStyleButton from './ToolbarStyleButton';

import ToolbarIcons from './ToolbarIcons';
import ToolbarDivider from './ToolbarDivider';
import FontSizeChanger from './FontSizeChanger';


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
    const handleFontSizeChange = useCallback((value) => {
        editor.chain().focus().setFontSize(`${value}px`).run();
    }, [editor]);

    useEffect(() => {
        if (editor && !editor.getAttributes('textStyle').fontSize) {
            handleFontSizeChange(16);
        }
    }, [editor, handleFontSizeChange]);


    if (!editor) {
        return null;
    }

    function getFontSize(defaultSize = 16) {
        let fontSize = editor.getAttributes('textStyle').fontSize ? editor.getAttributes('textStyle').fontSize : defaultSize;
        return parseInt(fontSize);
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



    function handleTextAlign(alignType) {
        console.log(`Handling ${alignType}`);
        editor.chain().focus().setTextAlign(alignType).run();
        console.log(`Text Align: ${getTextAlign()}`);
    }

    return (
        <div className='toolbar'>
            <div className="toolbar-group">
                <ToolbarButton editor={editor} method="undo" iconType="undo" />
                <ToolbarButton editor={editor} method="redo" iconType="redo" />

                <ToolbarDivider />

                <ToolbarStyleButton editor={editor} type="bold" method="toggleBold" iconType="bold" />
                <ToolbarStyleButton editor={editor} type="italic" method="toggleItalic" iconType="italic" style={{ fontStyle: 'italic' }} />
                <ToolbarStyleButton editor={editor} type="underline" method="toggleUnderline" iconType="underline" style={{ textDecoration: 'underline' }} />
                <ToolbarStyleButton editor={editor} type="strike" method="toggleStrike" iconType="strike" style={{ textDecoration: 'line-through' }} />

                <ToolbarDivider />

                <ToolbarStyleButton editor={editor} type="code" method="toggleCode" iconType="code" />
                <ToolbarStyleButton editor={editor} type="codeBlock" method="toggleCodeBlock" iconType="code-block" />

                <ToolbarDivider />

                <Dropdown width={8} direction="column" selectedOption={editor.getAttributes('textStyle').fontFamily ? fontFamilyOptions[editor.getAttributes('textStyle').fontFamily] : 'Default'}>
                    {Object.keys(fontFamilyOptions).map((item, idx) => <DropdownItem key={idx} style={{ fontFamily: item }} handleClick={() => handleFontFamilyClick(item)}>{fontFamilyOptions[item]}</DropdownItem>)}
                </Dropdown>

                <ToolbarDivider />
                <FontSizeChanger value={getFontSize()} handleChange={handleFontSizeChange} />
                <ToolbarDivider />

                <Dropdown width={8} direction="column" selectedOption={getHeading()}>
                    {fontHeadingOptions.map((item, idx) => <DropdownItem key={idx} handleClick={() => handleChangeHeading(item)}>{item === 0 ? 'Normal' : `Heading ${item}`}</DropdownItem>)}
                </Dropdown>

                <Dropdown width={2} direction="row" selectedOption={<ToolbarIcons type={getTextAlign()} />}>
                    {textAlignOptions.map((item, idx) => <DropdownItem key={idx} handleClick={() => handleTextAlign(item)}><ToolbarIcons type={item} /></DropdownItem>)}
                </Dropdown>

                <ToolbarStyleButton editor={editor} type="orderedList" method="toggleOrderedList" iconType="orderedList" />
                <ToolbarStyleButton editor={editor} type="bulletList" method="toggleBulletList" iconType="bulletList" />

                <ToolbarButton editor={editor} method="setHorizontalRule" iconType="horizontalRule" />
            </div>
        </div >
    )
}

