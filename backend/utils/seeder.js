import JenisBarang from '../models/jenisBarang.model.js';
import Barang from '../models/barang.model.js';
import Transaksi from '../models/transaksi.model.js';

const jenisBarangSeeder = async () => {
    try {
        await JenisBarang.deleteMany();

        const jenisBarangData = [
            {
                nama_jenis_barang: 'Konsumsi',
            },
            {
                nama_jenis_barang: 'Pembersih',
            },
        ];

        console.log('Creating new jenis barang data...');


        await JenisBarang.create(jenisBarangData);

        console.log('Jenis barang data seeded successfully!');
    } catch (error) {
        console.error('Error seeding jenis barang data:', error);
    }
};

const barangSeeder = async () => {
    try {
        await Barang.deleteMany();

        const jenisKonsumsiId = (await JenisBarang.findOne({ nama_jenis_barang: 'Konsumsi' }).lean())._id;
        const jenisPembersihId = (await JenisBarang.findOne({ nama_jenis_barang: 'Pembersih' }).lean())._id;
        
        const barangData = [
            {
                nama_barang: 'Kopi',
                stok: 100,
                jenis_barang_id: jenisKonsumsiId,
            },
            {
                nama_barang: 'Teh',
                stok: 100,
                jenis_barang_id: jenisKonsumsiId,
            },
            {
                nama_barang: 'Pasta Gigi',
                stok: 100,
                jenis_barang_id: jenisPembersihId,
            },
            {
                nama_barang: 'Sabun Mandi',
                stok: 100,
                jenis_barang_id: jenisPembersihId,
            },
            {
                nama_barang: 'Sampo',
                stok: 100,
                jenis_barang_id: jenisPembersihId,
            },

        ];
        console.log('Creating new barang data...');

        await Barang.create(barangData);

        console.log('Barang data seeded successfully!');
    } catch (error) {
        console.error('Error seeding barang data:', error);
    }
};

const transaksiSeeder = async () => {
    try {
        await Transaksi.deleteMany();
        
        const transaksiData = [
            {
                barang_id: (await Barang.findOne({ nama_barang: 'Kopi' }).lean())._id,
                jumlah_terjual: 10,
                tanggal_transaksi: new Date('2021-05-01'),
            },
            {
                barang_id: (await Barang.findOne({ nama_barang: 'Teh' }).lean())._id,
                jumlah_terjual: 19,
                tanggal_transaksi: new Date('2021-05-05'),
            },
            {
                barang_id: (await Barang.findOne({ nama_barang: 'Kopi' }).lean())._id,
                jumlah_terjual: 15,
                tanggal_transaksi: new Date('2021-05-10'),
            },
            {
                barang_id: (await Barang.findOne({ nama_barang: 'Pasta Gigi' }).lean())._id,
                jumlah_terjual: 20,
                tanggal_transaksi: new Date('2021-05-11'),
            },
            {
                barang_id: (await Barang.findOne({ nama_barang: 'Sabun Mandi' }).lean())._id,
                jumlah_terjual: 30,
                tanggal_transaksi: new Date('2021-05-11'),
            },
            {
                barang_id: (await Barang.findOne({ nama_barang: 'Sampo' }).lean())._id,
                jumlah_terjual: 25,
                tanggal_transaksi: new Date('2021-05-12'),
            },
            {
                barang_id: (await Barang.findOne({ nama_barang: 'Teh' }).lean())._id,
                jumlah_terjual: 5,
                tanggal_transaksi: new Date('2021-05-12'),
            },
        ];
        console.log('Creating new transaksi data...');

        await Transaksi.create(transaksiData);

        console.log('Transaksi data seeded successfully!');
    } catch (error) {
        console.error('Error seeding transaksi data:', error);
    }
};


export { jenisBarangSeeder, barangSeeder, transaksiSeeder };
