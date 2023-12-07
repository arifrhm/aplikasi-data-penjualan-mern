import express from 'express';
const router = express.Router();
import Barang from "../models/barang.model.js";
import JenisBarang from '../models/jenisBarang.model.js';

// Perbandingan terjual terbanyak dan terendah
router.get("/compare", async (req, res) => {
  const jenis_barang = req.query.jenis_barang;
  const terjual = req.query.terjual;

  const barang = await Barang.find({ jenis_barang: jenis_barang })
    .populate("jenis_barang");

  if (terjual === "terbanyak") {
    barang = barang.sort((a, b) => b.transaksi.length - a.transaksi.length);
  } else if (terjual === "terendah") {
    barang = barang.sort((a, b) => a.transaksi.length - b.transaksi.length);
  }

  res.json({
    barang,
  });
});

router.get("/", async (req, res) => {
    const barang = await Barang.find();

    // Filter barang berdasarkan tanggal transaksi dengan start date dan end date
    if (req.query.start_date && req.query.end_date) {
        const start_date = new Date(req.query.start_date);
        const end_date = new Date(req.query.end_date);

        barang = barang.populate({
            path: "transaksi",
            match: { tanggal_transaksi: { $gte: start_date, $lte: end_date } },
        });
    }

    // Cari barang berdasarkan nama barang
    if (req.query.nama_barang) {
        barang = barang.filter((item) => item.nama_barang.toLowerCase().includes(req.query.nama_barang.toLowerCase()));
    }

    // Urutkan barang berdasarkan nama barang (A-Z)
    if (req.query.sort === "nama_barang") {
        barang = barang.sort((a, b) => a.nama_barang.localeCompare(b.nama_barang));
    }

    // Urutkan barang berdasarkan tanggal transaksi terbaru
    if (req.query.sort === "tanggal_transaksi") {
        barang = barang.sort((a, b) => a.tanggal_transaksi - b.tanggal_transaksi);
    }

    res.json({
        barang,
    });
});


router.post("/", async (req, res) => {
    const barang = new Barang({
        nama_barang: req.body.nama_barang,
        stok: req.body.stok,
        jenis_barang_id: req.body.jenis_barang_id,
    });

    await barang.save();

    res.json({
        barang,
        message: "Barang berhasil ditambahkan",
    });
});

router.put("/:id", async (req, res) => {
    const barang = await Barang.findById(req.params.id);

    if (!barang) {
        return res.status(404).json({
            message: "Barang tidak ditemukan",
        });
    }

    barang.nama_barang = req.body.nama_barang;
    barang.stok = req.body.stok;
    barang.jenis_barang_id = req.body.jenis_barang_id;

    await barang.save();

    res.json({
        barang,
        message: "Barang berhasil diubah",
    });
});

router.delete("/:id", async (req, res) => {
    const barang = await Barang.findByIdAndDelete(req.params.id);

    if (!barang) {
        return res.status(404).json({
            message: "Barang tidak ditemukan",
        });
    }

    res.json({
        message: "Barang berhasil dihapus",
    });
});

export default router;
