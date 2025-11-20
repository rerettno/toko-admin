const Database = require(`better-sqlite3`);
const db = new Database(`./db/database.sqlite`);

// --- Buat tabel produk ---
db.prepare(`
CREATE TABLE IF NOT EXISTS produk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    harga INTEGER NOT NULL
);
`).run();

// --- Buat tabel stok ---
db.prepare(`
CREATE TABLE IF NOT EXISTS stok (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produk_id INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    FOREIGN KEY (produk_id) REFERENCES produk(id)
);
`).run();

// --- Buat tabel pembelian ---
db.prepare(`
CREATE TABLE IF NOT EXISTS pembelian (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produk_id INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    total INTEGER NOT NULL,
    status TEXT DEFAULT 'success',
    FOREIGN KEY (produk_id) REFERENCES produk(id)
);
`).run();

// --- Insert 10 produk jika kosong ---
const count = db.prepare(`SELECT COUNT(*) AS total FROM produk`).get().total;

if (count === 0) {
    const insertProduk = db.prepare(`INSERT INTO produk (nama, harga) VALUES (?, ?)`);
    const insertStok = db.prepare(`INSERT INTO stok (produk_id, jumlah) VALUES (?, ?)`);

    for (let i = 1; i <= 10; i++) {
        const info = insertProduk.run(`Produk ${i}`, 10000 * i);
        insertStok.run(info.lastInsertRowid, 20);
    }

    console.log(`10 produk telah dimasukkan ke database.`);
} else {
    console.log(`Data produk sudah ada, skip.`);
}

module.exports = db;
