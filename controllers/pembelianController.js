const db = require(`../db/init`);

// GET semua pembelian
function getAll(req, res) {
const pembelian = db.prepare(`
    SELECT 
        pe.id, 
        p.nama AS nama_produk,   -- <-- [CHANGED! alias ditambahkan]
        pe.qty, 
        pe.total, 
        pe.status
    FROM pembelian pe
    JOIN produk p ON pe.produk_id = p.id
`).all();



    res.render(`pembelian/index`, { pembelian });
}

// GET form tambah pembelian
function formTambah(req, res) {
    console.log(`formTambah is running`);

    try {
        const produk = db.prepare(`
            SELECT 
                p.id,
                p.nama,
                p.harga,
                s.jumlah AS stok
            FROM produk p
            JOIN stok s ON s.produk_id = p.id
        `).all();

        console.log(`formTambah returning ${produk.length} produk`);
        res.render(`pembelian/tambah`, { produk });

    } catch (err) {
        console.log(`formTambah error ${err}`);
        res.send(`Error saat load form tambah`);
    }
}


// POST pembelian
function tambahPembelian(req, res) {
    const { produk_id, qty } = req.body;

    const produk = db.prepare(`SELECT * FROM produk WHERE id = ?`).get(produk_id);
    const stok = db.prepare(`SELECT jumlah FROM stok WHERE produk_id = ?`).get(produk_id);

    // Cek stok
    if (qty > stok.jumlah) {
        return res.send(`Stok tidak cukup!`);
    }

    const total = produk.harga * qty;

    // Insert pembelian
    db.prepare(`
        INSERT INTO pembelian (produk_id, qty, total, status)
        VALUES (?, ?, ?, 'success')
    `).run(produk_id, qty, total);

    // Kurangi stok
    db.prepare(`
        UPDATE stok SET jumlah = jumlah - ? WHERE produk_id = ?
    `).run(qty, produk_id);

    res.redirect(`/pembelian`);
}

// Cancel pembelian
function cancelPembelian(req, res) {
    const id = req.params.id;

    const pembelian = db.prepare(`SELECT * FROM pembelian WHERE id = ?`).get(id);

    if (!pembelian) return res.send(`Pembelian tidak ditemukan`);

    if (pembelian.status === 'cancelled') {
        return res.send(`Sudah dicancel sebelumnya`);
    }

    // Update status pembelian
    db.prepare(`UPDATE pembelian SET status = 'cancelled' WHERE id = ?`).run(id);

    // Kembalikan stok
    db.prepare(`
        UPDATE stok SET jumlah = jumlah + ? WHERE produk_id = ?
    `).run(pembelian.qty, pembelian.produk_id);

    res.redirect(`/pembelian`);
}

module.exports = { getAll, formTambah, tambahPembelian, cancelPembelian };
