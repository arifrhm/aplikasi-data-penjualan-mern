import React from 'react';
import TextInput from '../components/TextInput';
import ResponsiveButton from '../components/ResponsiveButton';
import SelectJenisBarang from '../components/SelectJenisBarang';

const AddBarang = () => {
    return (
        <div className='col-start-2 col-span-4 pl-12 pt-10 place-items-stretch'>
            <p class="text-lg font-bold h-16 pl-3"> Add Items</p>
            <form
            // onSubmit={this.handleSubmit}
            >
                    <TextInput label='Barang' value=''></TextInput>
                    <SelectJenisBarang label='Jenis Barang'></SelectJenisBarang>
                    <ResponsiveButton></ResponsiveButton>
            </form>
        </div>
    );
};

export default AddBarang;