const express = require(`express`);
const router = express.Router();
const produkController = require(`../controllers/produkController`);

router.get(`/`, produkController.getAll);
router.get(`/tambah`, produkController.formTambah);
router.post(`/tambah`, produkController.tambahProduk);

module.exports = router;
