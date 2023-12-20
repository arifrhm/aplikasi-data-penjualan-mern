// CompareBarang.js Component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompareBarang = () => {
  const [jenisBarang, setJenisBarang] = useState('');
  const [terjualType, setTerjualType] = useState('');
  const [barangList, setBarangList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/compare?jenis_barang=${jenisBarang}&terjual=${terjualType}`);
      setBarangList(response.data.barang);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jenisBarang, terjualType]);

  return (
    <div className='col-start-2 col-span-4 pl-12 pt-10 place-items-stretch'>
      <p class="text-lg font-bold h-12">Compare</p>
      <label>
        Jenis Barang:
        <input type="text" value={jenisBarang} onChange={(e) => setJenisBarang(e.target.value)} />
      </label>
      <label>
        Terjual Type:
        <select value={terjualType} onChange={(e) => setTerjualType(e.target.value)}>
          <option value="terbanyak">Terbanyak</option>
          <option value="terendah">Terendah</option>
        </select>
      </label>

      <ul>
        {barangList.map((barang) => (
          <li key={barang._id}>{barang.nama_barang}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompareBarang;
