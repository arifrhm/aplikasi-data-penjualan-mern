import React from 'react';
import LinkEdit from './LinkEdit';
import LinkDelete from './LinkDelete';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const TransactionTable = ({ data }) => {
  const navigateTo = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the "/items" page
    navigateTo('/add-transaction');
  };

  return (
    <div className='col-start-2 col-span-4 pl-12 pt-10 place-items-stretch'>
      <p class="text-lg font-bold h-12 pl-3">Transactions</p>

      <div className='row-start-2 text-left pl-2 py-2'>
        <button className="btn btn-square btn-outline" onClick={handleButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </button>
      </div>
      <table className="table pt-20">

        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Nama Barang</th>
            <th>Jumlah Terjual</th>
            <th>Tanggal</th>
            <th>Jenis Barang</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((transaction) => (
            <tr key={transaction.id}>
              <th>{transaction.id}</th>
              <td>{transaction.nama_barang}</td>
              <td>{transaction.jumlah_terjual}</td>
              <td>{transaction.tanggal}</td>
              <td>{transaction.jenis_barang}</td>
              <td className="space-x-1.5">
                <LinkEdit transaction={transaction} />
                <LinkDelete transaction={transaction} />
              </td>
            </tr>
          ))}
          <tr>
            <th>1</th>
            <td>Kopi</td>
            <td>10</td>
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
            <td>19</td>
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
            <td>15</td>
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
            <td>20</td>
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
            <td>30</td>
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
            <td>25</td>
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
            <td>12</td>
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

export default TransactionTable;