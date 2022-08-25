import React, { useState, useEffect } from 'react'
import useDebounce from "../../utils/debounce.js";

const Input = ({ className, placeholder, onChange }) => {
    const [text, setText] = useState('');
    const debouncedText = useDebounce(text, 250);
    const onChangeHandler = (e) => {
        e.preventDefault();
        const { value } = e.target;
        if (value !== "") {
            setText(value);
            onChange(debouncedText)
        }
    }

    return (
        <input type="text" className={className} placeholder={placeholder} onChange={onChangeHandler} value={text} />
    )
}

export default Input;