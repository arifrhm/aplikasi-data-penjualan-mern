import mongoose from 'mongoose';

const barangSchema = new mongoose.Schema({
  nama_barang: { type: String, required: true },
  stok: { type: Number, required: true },
  jenis_barang_id: { type: mongoose.Types.ObjectId, ref: "JenisBarang" },
});

const Barang =  mongoose.model("Barang", barangSchema);
export default Barang;
