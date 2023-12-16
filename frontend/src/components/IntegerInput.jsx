import React, { useState } from 'react';

function IntegerInput(props) {
    const [userInput, setUserInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserInput(value);

        const parsedInput = parseInt(value, 10);
        if (value.trim() === '') {
            setErrorMessage('Please enter a value!');
        } else if (isNaN(parsedInput) || !Number.isInteger(parsedInput)) {
            setErrorMessage('Please enter a valid number!');
        } else {
            setErrorMessage('');
        }
    };

    return (
        <label className='form-control w-full max-w-xs px-2'>
            <div className='label'>
                <span className="label-text">{props.label}</span>
            </div>
            <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={userInput}
                onChange={handleInputChange}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </label>
    );
}

export default IntegerInput;
