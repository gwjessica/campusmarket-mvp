// db.js

const defaultProducts = [
    {
        id: 1,
        name: "Silence Pro Wireless",
        price: 299,
        desc: "Carbon-neutral noise cancellation.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500",
        tag: "SUSTAINABLE TECH",
        location: "Petra Christian University"
    },
    {
        id: 2,
        name: "Vintage Canon AE-1",
        price: 185,
        desc: "Original 1970s SLR in pristine working condition.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500",
        tag: "REFURBISHED",
        location: "Petra Christian University"
    },
    {
        id: 3,
        name: "Bamboo Deck 65%",
        price: 185,
        desc: "Renewable bamboo chassis & switches.",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83bac1?auto=format&fit=crop&w=500",
        tag: "ECO-FRIENDLY",
        location: "Petra Christian University"
    }
];

// Fungsi untuk ambil data
function getProducts() {
    const data = localStorage.getItem('campus_market_db');
    if (!data) {
        // Kalau kosong, kasih data default
        localStorage.setItem('campus_market_db', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(data);
}

// Fungsi untuk nambah data
function addProduct(newProduct) {
    const products = getProducts();
    products.push({
        id: Date.now(), // ID unik pakai timestamp
        ...newProduct
    });
    localStorage.setItem('campus_market_db', JSON.stringify(products));
}