import './ToolbarButton.css';

import ToolbarIcons from './ToolbarIcons';


export default function ToolbarButton({ editor, method, iconType }) {
    return (
        <button onClick={() => editor.chain().focus()[method]().run()}>
            <ToolbarIcons type={iconType} />
        </button>
    );
}
