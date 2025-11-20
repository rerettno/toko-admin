const express = require(`express`);
const path = require(`path`);
const app = express();


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine
app.set(`view engine`, `ejs`);
app.set(`views`, path.join(__dirname, `views`));

// Routes
const produkRoutes = require(`./routes/produkRoutes`);
const pembelianRoutes = require(`./routes/pembelianRoutes`);

app.use(`/produk`, produkRoutes);
app.use(`/pembelian`, pembelianRoutes);

// Home redirect
app.get(`/`, (req, res) => {
    res.redirect(`/produk`);
});

// Start server
app.listen(3000, () => {
    console.log(`Server berjalan di http://localhost:3000`);
});
