import './FontSizeChanger.css';

export default function FontSizeChanger({ value, handleChange }) {
    return (
        <>
            <div className='toolbar-font-size'>
                <button onClick={() => handleChange(value + 1)}>
                    +
                </button>
                <span>{value}</span>
                <button onClick={() => handleChange(value - 1)}>
                    -
                </button>
            </div>
        </>
    );
}
