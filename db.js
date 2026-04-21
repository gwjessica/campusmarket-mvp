// db.js

// 1. DATA DEFAULT USERS
const defaultUsers = [
    {
        id: "user_1",
        name: "Julian Green",
        email: "julian@john.petra.ac.id",
        password: "password123", // Password default
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        univ: "Petra Christian University",
        joined: "Sept 2023",
        sales: 128,
        loyalty: "2y"
    },
    {
        id: "user_2",
        name: "Sarah Miller",
        email: "sarah@john.petra.ac.id",
        password: "password123",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        univ: "Petra Christian University",
        joined: "Jan 2024",
        sales: 45,
        loyalty: "1y"
    },
    {
        id: "user_3",
        name: "Jessica Gabriel",
        email: "c14240045@john.petra.ac.id",
        password: "password123",
        avatar: "https://ui-avatars.com/api/?name=Jessica+Gabriel&background=062C1E&color=fff",
        univ: "Petra Christian University",
        joined: "Feb 2024",
        sales: 0,
        loyalty: "New"
    }
];

// 2. DATA DEFAULT ITEMS (Hubungkan dengan seller_id)
const defaultProducts = [
    { 
        id: 1, 
        seller_id: "user_1", 
        name: "Silence Pro Wireless", 
        price: 299, 
        desc: "Carbon-neutral noise cancellation with premium sound quality.", 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", 
        tag: "SUSTAINABLE TECH", 
        location: "Petra Christian University" 
    },
    { 
        id: 2, 
        seller_id: "user_2", 
        name: "Vintage Canon AE-1", 
        price: 185, 
        desc: "Original 1970s SLR in pristine working condition. Minimal wear.", 
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", 
        tag: "REFURBISHED", 
        location: "Petra Christian University" 
    },
    { 
        id: 3, 
        seller_id: "user_1", 
        name: "Architect Brass Lamp", 
        price: 92, 
        desc: "Brushed brass finish with articulated arm. Energy-efficient LED conversion.", 
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500", 
        tag: "PRE-OWNED", 
        location: "Petra Christian University" 
    },
    { 
        id: 4, 
        seller_id: "user_2", 
        name: "Tofu65 Custom Build", 
        price: 145, 
        desc: "Lubed Gateron Yellow switches, walnut case, PBT keycaps. Exceptional tactile feel.", 
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500", 
        tag: "CUSTOM", 
        location: "Petra Christian University" 
    }
];

const defaultOrders = [
    // {
    //     id: "ord_1",
    //     user_id: "user_3", // Ceritanya ini kamu (Jessica)
    //     product_id: 1, // Silence Pro Wireless
    //     status: "ongoing", // toplay, ongoing, collected
    //     date: "Oct 24, 2023",
    //     order_no: "#382910"
    // },
    // {
    //     id: "ord_2",
    //     user_id: "user_3",
    //     product_id: 2, // Vintage Canon
    //     status: "collected",
    //     date: "Oct 12, 2023",
    //     order_no: "#382895"
    // }
];

// --- FUNGSI CORE DATABASE ---

function initDB() {
    if (!localStorage.getItem('cm_users')) {
        localStorage.setItem('cm_users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('cm_products')) {
        localStorage.setItem('cm_products', JSON.stringify(defaultProducts));
    }
    if (!localStorage.getItem('cm_orders')) {
        localStorage.setItem('cm_orders', JSON.stringify(defaultOrders));
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem('cm_users'));
}

function getProducts() {
    return JSON.parse(localStorage.getItem('cm_products'));
}

// Mencari siapa yang lagi login sekarang
function getCurrentUser() {
    const user = localStorage.getItem('cm_current_session');
    return user ? JSON.parse(user) : null;
}

// Mencari data user berdasarkan ID (Penting buat halaman detail)
function findUserById(id) {
    return getUsers().find(u => u.id === id);
}

function addProduct(newProduct) {
    const products = getProducts();
    const currentUser = getCurrentUser();
    
    products.push({
        id: Date.now(),
        seller_id: currentUser ? currentUser.id : "user_1", // Otomatis pakai ID user yang login
        ...newProduct
    });
    localStorage.setItem('cm_products', JSON.stringify(products));
}

function logout() {
    localStorage.removeItem('cm_current_session');
    window.location.href = 'login.html';
}

function updateUser(updatedData) {
    let users = getUsers();
    const currentUser = getCurrentUser();

    // 1. Update di daftar semua user
    users = users.map(u => {
        if (u.id === currentUser.id) {
            return { ...u, ...updatedData };
        }
        return u;
    });
    localStorage.setItem('cm_users', JSON.stringify(users));

    // 2. Update di session yang lagi aktif
    const newUserSession = { ...currentUser, ...updatedData };
    localStorage.setItem('cm_current_session', JSON.stringify(newUserSession));
    
    return newUserSession;
}

function getOrders() {
    return JSON.parse(localStorage.getItem('cm_orders'));
}

function addOrder(productId, status = "topay") {
    const orders = getOrders();
    const user = getCurrentUser();
    const newOrder = {
        id: "ord_" + Date.now(),
        user_id: user.id,
        product_id: parseInt(productId),
        status: status,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        order_no: "#" + Math.floor(100000 + Math.random() * 900000)
    };
    orders.push(newOrder);
    localStorage.setItem('cm_orders', JSON.stringify(orders));
    return newOrder;
}

// Fungsi buat update status (misal dari topay ke ongoing pas beres bayar)
function updateOrderStatus(orderId, newStatus) {
    let orders = getOrders();
    orders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('cm_orders', JSON.stringify(orders));
}

// Jalankan init setiap kali script dipanggil
initDB();