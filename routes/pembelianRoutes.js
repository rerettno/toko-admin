const express = require(`express`);
const router = express.Router();
const pembelianController = require(`../controllers/pembelianController`);

// Halaman daftar pembelian
router.get(`/`, pembelianController.getAll);

// Form pembelian
router.get(`/tambah`, pembelianController.formTambah);

// Proses pembelian
router.post(`/tambah`, pembelianController.tambahPembelian);

// Cancel pembelian
router.get(`/cancel/:id`, pembelianController.cancelPembelian);

module.exports = router;
