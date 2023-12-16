import React from 'react';

const TextInput = (form) => {
  return (
    <label className="form-control w-full max-w-xs px-2">
      <div className="label">
        <span className="label-text">{form.label}</span>
      </div>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={form.value}/>
    </label>
  );
};

export default TextInput;
