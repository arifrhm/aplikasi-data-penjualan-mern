import express from 'express';
const router = express.Router();
import Barang from "../models/barang.model.js";
import JenisBarang from '../models/jenisBarang.model.js';
import Transaksi from '../models/transaksi.model.js';

router.get('/seeded-data', async (req, res) => {
    try {
      const jenisBarangData = await JenisBarang.find();
      const barangData = await Barang.find().populate('jenis_barang_id');
      const transaksiData = await Transaksi.find().populate('barang_id');
      console.log(transaksiData);
      res.json({
        jenisBarang: jenisBarangData,
        barang: barangData,
        transaksi: transaksiData,
      });
    } catch (error) {
      console.error('Error fetching seeded data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  export default router;
