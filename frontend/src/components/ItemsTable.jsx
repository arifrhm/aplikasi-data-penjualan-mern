import React from 'react';
import LinkEdit from './LinkEdit';
import LinkDelete from './LinkDelete';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const ItemsTable = ({ data }) => {
    const navigateTo = useNavigate();

    const handleButtonClickAddBarang = () => {
        // Navigate to the "/items" page
        navigateTo('/add-barang');
    };
    const handleButtonClickAddJenisBarang = () => {
        // Navigate to the "/items" page
        navigateTo('/add-jenis-barang');
    };
    return (
        <div className='col-start-2 col-span-4 pl-12 pt-10 place-items-stretch'>
            <p class="text-lg font-bold h-12 pl-3">Items</p>

            <div className='row-start-2 text-left pl-2 py-2'>
                <button className="btn btn-outline" onClick={handleButtonClickAddBarang}>
                    Add Item
                </button>
                <button className="btn btn-outline" label="Add Jenis Barang" onClick={handleButtonClickAddJenisBarang}>
                    Add Jenis Barang
                </button>
            </div>
            <table className="table pt-10">

                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Nama Barang</th>
                        <th>Stok</th>
                        <th>Tanggal</th>
                        <th>Jenis Barang</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item) => (
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.nama_barang}</td>
                            <td>{item.stok}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.jenis_barang}</td>
                            <td className="space-x-1.5">
                                <LinkEdit item={item} />
                                <LinkDelete item={item} />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <th>1</th>
                        <td>Kopi</td>
                        <td>100</td>
                        <td>1-05-2021</td>
                        <td>Konsumsi</td>
                        <td className='space-x-1.5'>
                            <LinkEdit></LinkEdit>
                            <LinkDelete></LinkDelete>
                        </td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>Teh</td>
                        <td>100</td>
                        <td>5-05-2021</td>
                        <td>Konsumsi</td>
                        <td className='space-x-1.5'>
                            <LinkEdit></LinkEdit>
                            <LinkDelete></LinkDelete>
                        </td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Kopi</td>
                        <td>90</td>
                        <td>10-05-2021</td>
                        <td>Konsumsi</td>
                        <td className='space-x-1.5'>
                            <LinkEdit></LinkEdit>
                            <LinkDelete></LinkDelete>
                        </td>
                    </tr>
                    <tr>
                        <th>4</th>
                        <td>Pasta Gigi</td>
                        <td>100</td>
                        <td>11-05-2021</td>
                        <td>Pembersih</td>
                        <td className='space-x-1.5'>
                            <LinkEdit></LinkEdit>
                            <LinkDelete></LinkDelete>
                        </td>
                    </tr>
                    <tr>
                        <th>5</th>
                        <td>Sabun Mandi</td>
                        <td>100</td>
                        <td>11-05-2021</td>
                        <td>Pembersih</td>
                        <td className='space-x-1.5'>
                            <LinkEdit></LinkEdit>
                            <LinkDelete></LinkDelete>
                        </td>
                    </tr>
                    <tr>
                        <th>6</th>
                        <td>Sampo</td>
                        <td>100</td>
                        <td>12-05-2021</td>
                        <td>Pembersih</td>
                        <td className='space-x-1.5'>
                            <LinkEdit></LinkEdit>
                            <LinkDelete></LinkDelete>
                        </td>
                    </tr>
                    <tr>
                        <th>7</th>
                        <td>Teh</td>
                        <td>81</td>
                        <td>12-05-2021</td>
                        <td>Konsumsi</td>
                        <td className='space-x-1.5'>
                            <LinkEdit></LinkEdit>
                            <LinkDelete></LinkDelete>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination></Pagination>
        </div>
    );
};

export default ItemsTable;