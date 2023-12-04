import mongoose from 'mongoose';

const transaksiSchema = new mongoose.Schema({
    barang_id: { type: mongoose.Types.ObjectId, ref: "Barang" },
    jumlah_terjual: { type: Number, required: true },
    tanggal_transaksi: { type: Date, required: true },
});

const Transaksi = mongoose.model("Transaksi", transaksiSchema);
export default Transaksi;
