import './ToolbarButton.css';
import ToolbarIcons from './ToolbarIcons';

export default function ToolbarStyleButton({ editor, type, method, iconType, style }) {
    return (
        <button
            onClick={() => editor.chain().focus()[method]().run()}
            style={style}
            disabled={!editor.can().chain().focus()[method]().run()}
            className={editor.isActive(type) ? 'is-active' : ''}
        >
            <ToolbarIcons type={iconType} />
        </button>
    );
}