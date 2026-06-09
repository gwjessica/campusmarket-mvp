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

// 2. DATA DEFAULT USERS 
const defaultUsers = [
    {
        id: "user_1",
        name: "Julian Green",
        email: "julian@john.petra.ac.id",
        password: "password123",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        univ_id: "univ_1", 
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

// 3. DATA DEFAULT ITEMS (Diperbanyak dan Dikategorikan)
const defaultProducts = [
    // Electronics
    { id: 1, seller_id: "user_1", name: "Silence Pro Wireless", category: "Electronics", price: 850000, desc: "Carbon-neutral noise cancellation. 95% battery health.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", tag: "SUSTAINABLE TECH" },
    { id: 2, seller_id: "user_2", name: "Vintage Canon AE-1", category: "Electronics", price: 1200000, desc: "Original 1970s SLR in pristine working condition. Minimal wear.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", tag: "REFURBISHED" },
    { id: 4, seller_id: "user_2", name: "Tofu65 Custom Build", category: "Electronics", price: 975000, desc: "Lubed Gateron Yellow switches, walnut case. No keycaps included.", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500", tag: "CUSTOM" },
    { id: 5, seller_id: "user_1", name: "iPad Pro 11' M1 (2021)", category: "Electronics", price: 10500000, desc: "Used for note-taking. Perfect condition, includes Apple Pencil gen 2.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", tag: "EXCELLENT" },
    
    // Books
    { id: 6, seller_id: "user_1", name: "Calculus Early Transcendentals 8th Ed", category: "Books", price: 150000, desc: "A few highlighted pages, but mostly clean. Essential for engineering students.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500", tag: "TEXTBOOK" },
    { id: 7, seller_id: "user_2", name: "Clean Code by Robert C. Martin", category: "Books", price: 120000, desc: "Must read for IT/CS students. Great condition.", image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500", tag: "IT" },
    
    // Furniture
    { id: 3, seller_id: "user_1", name: "Architect Brass Lamp", category: "Furniture", price: 450000, desc: "Brushed brass finish. Energy-efficient LED conversion.", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500", tag: "PRE-OWNED" },
    { id: 8, seller_id: "user_2", name: "IKEA LINNMON Desk (White)", category: "Furniture", price: 300000, desc: "100x60cm. Slight scratches on the edge, but sturdy.", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500", tag: "PICKUP ONLY" },
    
    // Apparel
    { id: 9, seller_id: "user_1", name: "Vintage Denim Jacket", category: "Apparel", price: 250000, desc: "Thrifted oversized Levi's jacket. Fits L-XL. Washed and clean.", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500", tag: "THRIFT" },
    { id: 10, seller_id: "user_2", name: "PCU Official Hoodie (Size M)", category: "Apparel", price: 150000, desc: "Bought last year, rarely worn. Very comfy for cold AC classes.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", tag: "MERCH" },
    
    // Stationery
    { id: 11, seller_id: "user_1", name: "Muji Pegboard Organizer Set", category: "Stationery", price: 180000, desc: "Includes hooks and small containers. Perfect for dorm desk setup.", image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500", tag: "AESTHETIC" },
    { id: 12, seller_id: "user_2", name: "Rotring Gel Pen Bundle", category: "Stationery", price: 85000, desc: "Set of 5 unused gel pens (Black/Blue).", image: "https://images.unsplash.com/photo-1583485088034-697b5a69f001?w=500", tag: "BUNDLE" }
];

const defaultOrders = [];

// 4. DATA DEFAULT REVIEWS (Tabel Rating Penjual)
const defaultReviews = [
    {
        id: "rev_1",
        order_id: "ord_dummy_1",
        seller_id: "user_1",
        buyer_id: "user_2",
        rating: 5,
        comment: "Fast response and the item was exactly as described. Recommended seller!",
        date: "Oct 15, 2023"
    },
    {
        id: "rev_2",
        order_id: "ord_dummy_2",
        seller_id: "user_1",
        buyer_id: "user_3",
        rating: 4,
        comment: "Item is good, but meetup was slightly delayed. Overall nice.",
        date: "Nov 02, 2023"
    }
];

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
    if (!localStorage.getItem('cm_reviews')) {
        localStorage.setItem('cm_reviews', JSON.stringify(defaultReviews));
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

// --- FUNGSI REVIEW (RATING) ---
function getReviews() {
    return JSON.parse(localStorage.getItem('cm_reviews'));
}

function addReview(orderId, sellerId, rating, comment) {
    const reviews = getReviews();
    const user = getCurrentUser();
    
    // Cek apakah order ini sudah di-review sebelumnya
    const existingReviewIndex = reviews.findIndex(r => r.order_id === orderId);
    
    const newReview = {
        id: "rev_" + Date.now(),
        order_id: orderId,
        seller_id: sellerId,
        buyer_id: user.id,
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (existingReviewIndex > -1) {
        // Update review lama jika sudah ada
        reviews[existingReviewIndex] = newReview;
    } else {
        // Tambah review baru
        reviews.push(newReview);
    }
    
    localStorage.setItem('cm_reviews', JSON.stringify(reviews));
    return newReview;
}

// Fungsi pembantu untuk mengambil rata-rata rating seorang seller
function getSellerRating(sellerId) {
    const reviews = getReviews().filter(r => r.seller_id === sellerId);
    if (reviews.length === 0) return { average: 0, count: 0 };
    
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return {
        average: (sum / reviews.length).toFixed(1),
        count: reviews.length
    };
}

function formatRupiah(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

// Initialize
initDB();