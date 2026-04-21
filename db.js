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
    { id: 1, seller_id: "user_1", name: "Silence Pro Wireless", price: 299, desc: "Carbon-neutral noise cancellation.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", tag: "SUSTAINABLE TECH", location: "Petra Christian University" },
    { id: 2, seller_id: "user_2", name: "Vintage Canon AE-1", price: 185, desc: "Original 1970s SLR in pristine working condition.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", tag: "REFURBISHED", location: "Petra Christian University" }
];

// --- FUNGSI CORE DATABASE ---

function initDB() {
    if (!localStorage.getItem('cm_users')) {
        localStorage.setItem('cm_users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('cm_products')) {
        localStorage.setItem('cm_products', JSON.stringify(defaultProducts));
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

// Jalankan init setiap kali script dipanggil
initDB();