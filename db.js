// db.js

// 1. DATA KAMPUS SURABAYA
const defaultUniversities = [
    {
        id: "univ_1",
        name: "Petra Christian University",
        address: "Jl. Siwalankerto No.121-131, Surabaya",
        lat: -7.3385,
        lng: 112.7380
    },
    {
        id: "univ_2",
        name: "Airlangga University",
        address: "Jl. Airlangga No. 4 - 6, Surabaya",
        lat: -7.2691,
        lng: 112.7562
    },
    {
        id: "univ_3",
        name: "Institut Teknologi Sepuluh Nopember",
        address: "Kampus ITS Sukolilo, Surabaya",
        lat: -7.2823,
        lng: 112.7949
    },
    {
        id: "univ_4",
        name: "University of Surabaya (UBAYA)",
        address: "Jl. Raya Kalirungkut, Surabaya",
        lat: -7.3204,
        lng: 112.7663
    }
];

// 2. DATA DEFAULT USERS (Update data univ agar matching dgn list di atas)
const defaultUsers = [
    {
        id: "user_1",
        name: "Julian Green",
        email: "julian@john.petra.ac.id",
        password: "password123",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        univ_id: "univ_1", // Reference ke univ_1
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
        univ_id: "univ_1",
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
        univ_id: "univ_1",
        joined: "Feb 2024",
        sales: 0,
        loyalty: "New"
    }
];

// 3. DATA DEFAULT ITEMS
const defaultProducts = [
    { id: 1, seller_id: "user_1", name: "Silence Pro Wireless", price: 850000, desc: "Carbon-neutral noise cancellation with premium sound quality.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", tag: "SUSTAINABLE TECH" },
    { id: 2, seller_id: "user_2", name: "Vintage Canon AE-1", price: 1200000, desc: "Original 1970s SLR in pristine working condition. Minimal wear.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", tag: "REFURBISHED" },
    { id: 3, seller_id: "user_1", name: "Architect Brass Lamp", price: 450000, desc: "Brushed brass finish with articulated arm. Energy-efficient LED conversion.", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500", tag: "PRE-OWNED" },
    { id: 4, seller_id: "user_2", name: "Tofu65 Custom Build", price: 975000, desc: "Lubed Gateron Yellow switches, walnut case, PBT keycaps. Exceptional tactile feel.", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500", tag: "CUSTOM" }
];

const defaultOrders = [];

// --- FUNGSI CORE DATABASE ---

function initDB() {
    if (!localStorage.getItem('cm_univs')) {
        localStorage.setItem('cm_univs', JSON.stringify(defaultUniversities));
    }
    if (!localStorage.getItem('cm_users')) {
        localStorage.setItem('cm_users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('cm_products')) {
        localStorage.setItem('cm_products', JSON.stringify(defaultProducts));
    }
    if (!localStorage.getItem('cm_orders')) {
        localStorage.setItem('cm_orders', JSON.stringify(defaultOrders));
    }
    if (!localStorage.getItem('cm_likes')) {
        localStorage.setItem('cm_likes', JSON.stringify([]));
    }
}

function getUniversities() { return JSON.parse(localStorage.getItem('cm_univs')); }
function getUsers() { return JSON.parse(localStorage.getItem('cm_users')); }
function getProducts() { return JSON.parse(localStorage.getItem('cm_products')); }
function getCurrentUser() {
    const user = localStorage.getItem('cm_current_session');
    return user ? JSON.parse(user) : null;
}
function findUserById(id) { return getUsers().find(u => u.id === id); }
// Fungsi baru untuk memanggil detail univ dari ID
function getUnivDetails(univId) { return getUniversities().find(u => u.id === univId); }

function addProduct(newProduct) {
    const products = getProducts();
    const currentUser = getCurrentUser();
    products.push({ id: Date.now(), seller_id: currentUser ? currentUser.id : "user_1", ...newProduct });
    localStorage.setItem('cm_products', JSON.stringify(products));
}

function logout() {
    localStorage.removeItem('cm_current_session');
    window.location.href = 'login.html';
}

function updateUser(updatedData) {
    let users = getUsers();
    const currentUser = getCurrentUser();
    users = users.map(u => u.id === currentUser.id ? { ...u, ...updatedData } : u);
    localStorage.setItem('cm_users', JSON.stringify(users));
    const newUserSession = { ...currentUser, ...updatedData };
    localStorage.setItem('cm_current_session', JSON.stringify(newUserSession));
    return newUserSession;
}

function getOrders() { return JSON.parse(localStorage.getItem('cm_orders')); }

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

function updateOrderStatus(orderId, newStatus) {
    let orders = getOrders();
    orders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('cm_orders', JSON.stringify(orders));
}

function formatRupiah(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

initDB();