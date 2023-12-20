import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectJenisBarang = (props) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch data using Axios (replace the URL with your actual API endpoint)
    axios.get('/api/jenis-barang')
      .then(response => {
        // Assuming response.data is an array of options
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <label className="form-control w-full max-w-xs px-2">
      <div className="label">
        <span className="label-text">{props.label}</span>
      </div>
      <SelectJenisBarang label='Jenis Barang'></SelectJenisBarang>
      <select
        className="select select-bordered input input-bordered w-full max-w-xs"
        value={selectedOption}
        onChange={handleChange}
      >
        
        <option disabled value="">
          Pick one
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectJenisBarang;
