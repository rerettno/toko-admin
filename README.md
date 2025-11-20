# 🛒 Simple Admin Pembelian — Node.js + Express + EJS + SQLite

Project ini adalah aplikasi admin sederhana untuk mengelola:
- Data Produk  
- Stok Produk  
- Pembelian  
- Cancel Pembelian oleh Admin  

Menggunakan:
- **Node.js + Express.js**
- **EJS (Embedded JavaScript)** untuk tampilan
- **SQLite** sebagai database SQL sederhana
- **HTML + CSS basic UI** (tanpa framework)

---

## 📂 Fitur Aplikasi

### ✅ **1. Manajemen Produk**
- Menampilkan daftar produk  
- Database otomatis membuat **10 produk awal** saat pertama kali dijalankan  

### ✅ **2. Manajemen Stok**
- Setiap produk memiliki stok tersendiri (tabel `stok`)  
- Stok berkurang otomatis saat pembelian dibuat
- Stok kembali (refund) jika pembelian di-cancel

### ✅ **3. Pembelian**
- Admin dapat memilih produk  
- Melihat stok saat ini  
- Input jumlah pembelian  
- Total harga dihitung otomatis (harga × qty)  
- Pembelian tersimpan sebagai status: **success**

### ✅ **4. Cancel Pembelian**
- Admin dapat membatalkan pembelian  
- Status berubah menjadi **cancelled**  
- Stok produk otomatis dikembalikan

---

## 🗄️ Struktur Database

### **Tabel produk**
| id | nama | harga |
|----|------|--------|

### **Tabel stok**
| id | produk_id | jumlah |

### **Tabel pembelian**
| id | produk_id | qty | total | status |

---

## 🚀 Cara Menjalankan Project

### 1️⃣ Install dependencies  
