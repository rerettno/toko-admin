const db = require(`../db/init`);

// GET semua produk
function getAll(req, res) {
    const produk = db.prepare(`
        SELECT p.id, p.nama, p.harga, s.jumlah AS stok
        FROM produk p
        JOIN stok s ON p.id = s.produk_id
    `).all();

    res.render(`produk/index`, { produk });
}

// GET form tambah produk
function formTambah(req, res) {
    res.render(`produk/tambah`);
}

// POST tambah produk
function tambahProduk(req, res) {
    const { nama, harga, stok } = req.body;

    const info = db.prepare(`
        INSERT INTO produk (nama, harga) VALUES (?, ?)
    `).run(nama, harga);

    db.prepare(`
        INSERT INTO stok (produk_id, jumlah) VALUES (?, ?)
    `).run(info.lastInsertRowid, stok);

    res.redirect(`/produk`);
}

module.exports = { getAll, formTambah, tambahProduk };
