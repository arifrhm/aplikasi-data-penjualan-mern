import mongoose from 'mongoose';

const jenisBarangSchema = new mongoose.Schema({
  nama_jenis_barang: { type: String, required: true },
});

const JenisBarang = mongoose.model('JenisBarang', jenisBarangSchema);
export default JenisBarang;
