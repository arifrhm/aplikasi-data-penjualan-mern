import express from "express";
const router = express.Router();
import Transaksi from "../models/transaksi.model.js";

router.get("/", async (req, res) => {
  const transaksi = await Transaksi.find();

  res.json({
    transaksi,
  });
});

router.post("/", async (req, res) => {
  const transaksi = new Transaksi({
    barang_id: req.body.barang_id,
    jumlah_terjual: req.body.jumlah_terjual,
    tanggal_transaksi: req.body.tanggal_transaksi,
  });

  await transaksi.save();

  res.json({
    transaksi,
    message: "Transaksi berhasil ditambahkan",
  });
});

router.put("/:id", async (req, res) => {
  const transaksi = await Transaksi.findById(req.params.id);

  if (!transaksi) {
    return res.status(404).json({
      message: "Transaksi tidak ditemukan",
    });
  }

  transaksi.barang_id = req.body.barang_id;
  transaksi.jumlah_terjual = req.body.jumlah_terjual;
  transaksi.tanggal_transaksi = req.body.tanggal_transaksi;

  await transaksi.save();

  res.json({
    transaksi,
    message: "Transaksi berhasil diubah",
  });
});

router.delete("/:id", async (req, res) => {
  const transaksi = await Transaksi.findByIdAndDelete(req.params.id);

  if (!transaksi) {
    return res.status(404).json({
      message: "Transaksi tidak ditemukan",
    });
  }

  res.json({
    message: "Transaksi berhasil dihapus",
  });
});

export default router;
