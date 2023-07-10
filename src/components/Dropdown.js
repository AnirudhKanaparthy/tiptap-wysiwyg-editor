import React, { useEffect, useState } from 'react'
import './Dropdown.css'

function DownIcon() {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
}

export function DropdownItem({ children, style, item, label, handleClick }) {
    return (
        <div onClick={() => handleClick(item)} className='dropdown-item'>
            {children}
            <div style={style}>{label}</div>
        </div>
    );
}


export default function Dropdown({ width, direction, inputStyle, selectedOption, children }) {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener('click', handler);
        return () => {
            window.removeEventListener('click', handler);
        };
    });

    function handleInputClick(event) {
        event.stopPropagation();
        setShowMenu((prev) => !prev);
    }

    return (
        <div className='dropdown-container'>
            <div className='dropdown-input' onClick={handleInputClick}>
                <div style={{ width: `${width}ch` }} className='dropdown-selected-option'>{selectedOption}</div>
                <div className='dropdown-icon'><DownIcon /></div>
            </div>
            {showMenu && <div style={{ flexDirection: direction }} className='dropdown-menu'>
                {children}
            </div>}
        </div>
    )
}
