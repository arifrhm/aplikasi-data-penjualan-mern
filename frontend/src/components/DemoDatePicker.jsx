
import React, { useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";

const DemoDatePicker = () => {
	const [value, setValue] = useState({
		startDate: null,
		endDate: null
	});
	
	const handleValueChange = (newValue) => {
		console.log("newValue:", newValue);
		setValue(newValue);
	}	

	return (
		<label class="form-control w-full max-w-xs px-2">
			<div class="label"><span class="label-text">Tanggal Transaksi</span></div>
			<Datepicker
				useRange={false}
				asSingle={true}
				value={value}
				onChange={handleValueChange}
			/>
		</label>
	);
}


export default DemoDatePicker;