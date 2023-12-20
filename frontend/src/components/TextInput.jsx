import React, { useState } from 'react';

const TextInput = ({ label }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <label className="form-control w-full max-w-xs px-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export default TextInput;
