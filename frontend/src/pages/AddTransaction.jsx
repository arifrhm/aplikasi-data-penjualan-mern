import React from 'react';
import TextInput from '../components/TextInput';
import ResponsiveButton from '../components/ResponsiveButton';
import SelectOptions from '../components/SelectOptions';
import IntegerInput from '../components/IntegerInput';
const AddTransaction = () => {
    return (
        <div className='col-start-2 col-span-4 pl-12 pt-10 place-items-stretch'>
            <p class="text-lg font-bold h-16 pl-3">Add Transaction</p>
            <form
            // onSubmit={this.handleSubmit}
            >
                    <TextInput label='Nama Barang' value=''></TextInput>
                    <SelectOptions></SelectOptions>
                    <IntegerInput label='Jumlah' value=''></IntegerInput>
                    <ResponsiveButton></ResponsiveButton>
            </form>
        </div>
    );
};

export default AddTransaction;