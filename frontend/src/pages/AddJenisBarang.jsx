import React from 'react';
import TextInput from '../components/TextInput';
import ResponsiveButton from '../components/ResponsiveButton';

const AddJenisBarang = () => {
    return (
        <div className='col-start-2 col-span-4 pl-12 pt-10 place-items-stretch'>
            <p class="text-lg font-bold h-16 pl-3">Add Jenis Barang</p>
            <form
            // onSubmit={this.handleSubmit}
            >
                    <TextInput label='Jenis Barang' value=''></TextInput>
                    <ResponsiveButton></ResponsiveButton>
            </form>
        </div>
    );
};

export default AddJenisBarang;