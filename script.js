/* =========================================================
   TECHWORLD - COMPLETE JAVASCRIPT
   ========================================================= */

let cart = JSON.parse(localStorage.getItem("techworldCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("techworldWishlist")) || [];
let orders = JSON.parse(localStorage.getItem("techworldOrders")) || [];

let currentProducts = [];
let discount = 0;

/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [
    {
        id: 1,
        name: "iPhone 16",
        brand: "Apple",
        category: "Smartphones",
        price: 69999,
        rating: 4.8,
        icon: "fa-mobile-screen-button"
    },
    {
        id: 2,
        name: "Samsung Galaxy S25",
        brand: "Samsung",
        category: "Smartphones",
        price: 74999,
        rating: 4.7,
        icon: "fa-mobile-screen-button"
    },
    {
        id: 3,
        name: "Google Pixel 9",
        brand: "Google",
        category: "Smartphones",
        price: 59999,
        rating: 4.6,
        icon: "fa-mobile-screen-button"
    },
    {
        id: 4,
        name: "OnePlus 13",
        brand: "OnePlus",
        category: "Smartphones",
        price: 64999,
        rating: 4.5,
        icon: "fa-mobile-screen-button"
    },
    {
        id: 5,
        name: "Dell Inspiron 15",
        brand: "Dell",
        category: "Laptops",
        price: 58999,
        rating: 4.4,
        icon: "fa-laptop"
    },
    {
        id: 6,
        name: "HP Pavilion 14",
        brand: "HP",
        category: "Laptops",
        price: 62999,
        rating: 4.5,
        icon: "fa-laptop"
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Audio",
        price: 29999,
        rating: 4.8,
        icon: "fa-headphones"
    },
    {
        id: 8,
        name: "boAt Airdopes 141",
        brand: "boAt",
        category: "Audio",
        price: 1299,
        rating: 4.2,
        icon: "fa-headphones"
    },
    {
        id: 9,
        name: "Noise ColorFit Pro",
        brand: "Noise",
        category: "Wearables",
        price: 2999,
        rating: 4.1,
        icon: "fa-clock"
    },
    {
        id: 10,
        name: "Apple Watch Series 10",
        brand: "Apple",
        category: "Wearables",
        price: 46999,
        rating: 4.7,
        icon: "fa-clock"
    },
    {
        id: 11,
        name: "Apple AirTag",
        brand: "Apple",
        category: "Accessories",
        price: 3490,
        rating: 4.4,
        icon: "fa-location-dot"
    },
    {
        id: 12,
        name: "USB-C Fast Charger",
        brand: "Samsung",
        category: "Accessories",
        price: 1999,
        rating: 4.3,
        icon: "fa-plug"
    }
];

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    const page = document.getElementById(pageName + "Page");

    if (page) {
        page.classList.add("active-page");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageName === "home") {
        renderFeaturedProducts();
    }

    if (pageName === "products") {
        applyFilters();
    }

    if (pageName === "cart") {
        renderCart();
    }

    if (pageName === "checkout") {
        renderCheckout();
    }

    if (pageName === "account") {
        renderAccount();
    }

    if (pageName === "wishlist") {
        renderWishlist();
    }

    if (pageName === "deals") {
        renderDeals();
    }

    /* IMPORTANT */
    if (pageName === "tracking") {
        prepareTrackingPage();
    }
}

/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}

/* =========================================================
   SAVE DATA
   ========================================================= */

function saveData() {

    localStorage.setItem(
        "techworldCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "techworldWishlist",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "techworldOrders",
        JSON.stringify(orders)
    );
}

/* =========================================================
   PRODUCT CARD
   ========================================================= */

function productCard(product) {

    const isWishlisted = wishlist.includes(product.id);

    return `
        <div class="product-card">

            <div class="product-image">
                <i class="fa-solid ${product.icon}"></i>
            </div>

            <div class="product-info">

                <small>${product.brand}</small>

                <h3>${product.name}</h3>

                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    ${product.rating}
                </div>

                <div class="product-bottom">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    <button
                        class="wishlist-btn"
                        onclick="toggleWishlist(${product.id})">

                        <i class="${
                            isWishlisted
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }"></i>

                    </button>

                </div>

                <button
                    class="btn btn-primary full-btn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

                <button
                    class="btn btn-outline full-btn"
                    onclick="viewProduct(${product.id})">

                    View Details

                </button>

            </div>

        </div>
    `;
}

/* =========================================================
   FEATURED PRODUCTS
   ========================================================= */

function renderFeaturedProducts() {

    const container =
        document.getElementById("featuredProducts");

    if (!container) return;

    const featured = products.slice(0, 6);

    container.innerHTML =
        featured.map(productCard).join("");
}

/* =========================================================
   PRODUCTS
   ========================================================= */

function renderProducts(list) {

    const grid =
        document.getElementById("productGrid");

    if (!grid) return;

    currentProducts = list;

    if (list.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">
                <h2>No products found</h2>
                <p>Try changing your filters.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML =
        list.map(productCard).join("");

    const count =
        document.getElementById("productResultCount");

    if (count) {
        count.textContent =
            `Showing ${list.length} product${list.length !== 1 ? "s" : ""}`;
    }
}

/* =========================================================
   FILTERS
   ========================================================= */

function applyFilters() {

    let filtered = [...products];

    const categoryElement =
        document.querySelector(
            'input[name="category"]:checked'
        );

    const category =
        categoryElement
        ? categoryElement.value
        : "All";

    const brand =
        document.getElementById("brandFilter")?.value || "All";

    const price =
        document.getElementById("priceFilter")?.value || "All";

    const rating =
        document.getElementById("ratingFilter")?.value || "All";

    const sort =
        document.getElementById("sortFilter")?.value || "default";

    if (category !== "All") {
        filtered = filtered.filter(
            product => product.category === category
        );
    }

    if (brand !== "All") {
        filtered = filtered.filter(
            product => product.brand === brand
        );
    }

    if (price !== "All") {

        if (price === "0-10000") {
            filtered = filtered.filter(
                product => product.price < 10000
            );
        }

        if (price === "10000-30000") {
            filtered = filtered.filter(
                product =>
                    product.price >= 10000 &&
                    product.price <= 30000
            );
        }

        if (price === "30000-60000") {
            filtered = filtered.filter(
                product =>
                    product.price >= 30000 &&
                    product.price <= 60000
            );
        }

        if (price === "60000-100000") {
            filtered = filtered.filter(
                product =>
                    product.price >= 60000 &&
                    product.price <= 100000
            );
        }

        if (price === "100000+") {
            filtered = filtered.filter(
                product => product.price > 100000
            );
        }
    }

    if (rating !== "All") {

        filtered = filtered.filter(
            product => product.rating >= Number(rating)
        );
    }

    if (sort === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );
    }

    if (sort === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );
    }

    if (sort === "rating") {

        filtered.sort(
            (a, b) => b.rating - a.rating
        );
    }

    renderProducts(filtered);
}

/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function filterCategory(category) {

    showPage("products");

    const radio =
        document.querySelector(
            `input[name="category"][value="${category}"]`
        );

    if (radio) {
        radio.checked = true;
    }

    applyFilters();
}

/* =========================================================
   CLEAR FILTERS
   ========================================================= */

function clearFilters() {

    const allRadio =
        document.querySelector(
            'input[name="category"][value="All"]'
        );

    if (allRadio) {
        allRadio.checked = true;
    }

    const brand =
        document.getElementById("brandFilter");

    const price =
        document.getElementById("priceFilter");

    const rating =
        document.getElementById("ratingFilter");

    const sort =
        document.getElementById("sortFilter");

    if (brand) brand.value = "All";
    if (price) price.value = "All";
    if (rating) rating.value = "All";
    if (sort) sort.value = "default";

    applyFilters();
}

/* =========================================================
   SEARCH
   ========================================================= */

function searchProducts() {

    const input =
        document.getElementById("searchInput");

    const query =
        input.value.trim().toLowerCase();

    if (!query) {
        showPage("products");
        applyFilters();
        return;
    }

    showPage("products");

    const results =
        products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

    renderProducts(results);
}

/* =========================================================
   VIEW PRODUCT
   ========================================================= */

function viewProduct(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    const detail =
        document.getElementById("productDetail");

    if (!detail) return;

    detail.innerHTML = `

        <div class="product-detail-card">

            <div class="product-detail-image">
                <i class="fa-solid ${product.icon}"></i>
            </div>

            <div class="product-detail-info">

                <p class="section-label">
                    ${product.category}
                </p>

                <h2>${product.name}</h2>

                <p>
                    Brand: <strong>${product.brand}</strong>
                </p>

                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    ${product.rating}
                </div>

                <h2>
                    ${formatPrice(product.price)}
                </h2>

                <p>
                    Premium ${product.category.toLowerCase()}
                    product from ${product.brand}.
                    Perfect for everyday technology needs.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

                <button
                    class="btn btn-outline"
                    onclick="showPage('products')">

                    Back to Products

                </button>

            </div>

        </div>
    `;

    showPage("productDetail");
}

/* =========================================================
   CART
   ========================================================= */

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    const existing =
        cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveData();
    updateCounts();

    showToast(`${product.name} added to cart`);
}

/* =========================================================
   UPDATE CART COUNT
   ========================================================= */

function updateCounts() {

    const cartCount =
        document.getElementById("cartCount");

    const wishlistCount =
        document.getElementById("wishlistCount");

    if (cartCount) {

        const total =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );

        cartCount.textContent = total;
    }

    if (wishlistCount) {
        wishlistCount.textContent =
            wishlist.length;
    }
}

/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>Your cart is empty</h2>

                <p>Add some products to continue.</p>

                <button
                    class="btn btn-primary"
                    onclick="showPage('products')">

                    Shop Products

                </button>

            </div>
        `;

        updateCartSummary(0);
        return;
    }

    let subtotal = 0;

    container.innerHTML = cart.map(item => {

        const product =
            products.find(p => p.id === item.id);

        if (!product) return "";

        const itemTotal =
            product.price * item.quantity;

        subtotal += itemTotal;

        return `
            <div class="cart-item">

                <div class="cart-item-image">
                    <i class="fa-solid ${product.icon}"></i>
                </div>

                <div class="cart-item-info">

                    <h3>${product.name}</h3>

                    <p>${product.brand}</p>

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${product.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${product.id}, 1)">
                        +
                    </button>

                </div>

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${product.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

    }).join("");

    updateCartSummary(subtotal);
}

/* =========================================================
   CART QUANTITY
   ========================================================= */

function changeQuantity(id, change) {

    const item =
        cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);
    }

    saveData();
    updateCounts();
    renderCart();
}

/* =========================================================
   REMOVE CART ITEM
   ========================================================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveData();
    updateCounts();
    renderCart();

    showToast("Product removed from cart");
}

/* =========================================================
   CART SUMMARY
   ========================================================= */

function updateCartSummary(subtotal) {

    const discountAmount =
        Math.round(subtotal * discount);

    const total =
        subtotal - discountAmount;

    const subtotalElement =
        document.getElementById("cartSubtotal");

    const discountElement =
        document.getElementById("cartDiscount");

    const totalElement =
        document.getElementById("cartTotal");

    if (subtotalElement)
        subtotalElement.textContent =
            formatPrice(subtotal);

    if (discountElement)
        discountElement.textContent =
            formatPrice(discountAmount);

    if (totalElement)
        totalElement.textContent =
            formatPrice(total);
}

/* =========================================================
   CHECKOUT
   ========================================================= */

function renderCheckout() {

    const container =
        document.getElementById("checkoutItems");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <p>Your cart is empty.</p>

            <button
                class="btn btn-primary"
                onclick="showPage('products')">

                Shop Products

            </button>
        `;

        return;
    }

    let subtotal = 0;

    container.innerHTML = cart.map(item => {

        const product =
            products.find(p => p.id === item.id);

        if (!product) return "";

        const total =
            product.price * item.quantity;

        subtotal += total;

        return `
            <div class="checkout-item">

                <span>
                    ${product.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${formatPrice(total)}
                </strong>

            </div>
        `;

    }).join("");

    const subtotalElement =
        document.getElementById("checkoutSubtotal");

    const totalElement =
        document.getElementById("checkoutTotal");

    const total =
        subtotal - Math.round(subtotal * discount);

    if (subtotalElement)
        subtotalElement.textContent =
            formatPrice(subtotal);

    if (totalElement)
        totalElement.textContent =
            formatPrice(total);
}

/* =========================================================
   GENERATE ORDER ID
   ========================================================= */

function generateOrderId() {

    const randomNumber =
        Math.floor(
            10000000 +
            Math.random() * 90000000
        );

    return "TW" + randomNumber;
}

/* =========================================================
   PLACE ORDER
   ========================================================= */

function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {

        showToast("Your cart is empty");
        showPage("cart");

        return;
    }

    const name =
        document.getElementById("checkoutName").value.trim();

    const phone =
        document.getElementById("checkoutPhone").value.trim();

    const address =
        document.getElementById("checkoutAddress").value.trim();

    const city =
        document.getElementById("checkoutCity").value.trim();

    const pin =
        document.getElementById("checkoutPin").value.trim();

    const paymentElement =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const payment =
        paymentElement
        ? paymentElement.value
        : "UPI";

    if (!name || !phone || !address || !city || !pin) {

        showToast("Please fill all shipping details");
        return;
    }

    if (!/^\d{6}$/.test(pin)) {

        showToast("Please enter a valid 6-digit PIN code");
        return;
    }

    const orderId =
        generateOrderId();

    let subtotal = 0;

    const orderItems =
        cart.map(item => {

            const product =
                products.find(p => p.id === item.id);

            const itemTotal =
                product.price * item.quantity;

            subtotal += itemTotal;

            return {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            };
        });

    const total =
        subtotal - Math.round(subtotal * discount);

    const order = {

        orderId: orderId,

        name: name,

        phone: phone,

        address: address,

        city: city,

        pin: pin,

        payment: payment,

        items: orderItems,

        subtotal: subtotal,

        total: total,

        status: "Order Placed",

        date: new Date().toLocaleString("en-IN")

    };

    orders.unshift(order);

    cart = [];

    discount = 0;

    saveData();
    updateCounts();

    /* Show success page */

    const checkoutPage =
        document.getElementById("checkoutPage");

    const trackingResult =
        document.getElementById("trackingResult");

    if (checkoutPage) {

        checkoutPage.innerHTML = `

            <div class="order-success">

                <i class="fa-solid fa-circle-check"></i>

                <h1>Order Placed Successfully!</h1>

                <p>Thank you, ${name}.</p>

                <div class="order-id-box">

                    <span>Your Order ID</span>

                    <strong>${orderId}</strong>

                </div>

                <p>
                    Keep this Order ID to track your order.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="openTracking('${orderId}')">

                    <i class="fa-solid fa-truck"></i>
                    Track My Order

                </button>

                <button
                    class="btn btn-outline"
                    onclick="showPage('home')">

                    Continue Shopping

                </button>

            </div>
        `;
    }

    if (trackingResult) {
        trackingResult.innerHTML = "";
    }

    showToast("Order placed successfully!");
}

/* =========================================================
   OPEN TRACKING
   ========================================================= */

function openTracking(orderId) {

    showPage("tracking");

    setTimeout(() => {

        const input =
            document.getElementById("trackingOrderId");

        if (input) {
            input.value = orderId;
        }

        trackOrder();

    }, 100);
}

/* =========================================================
   PREPARE TRACKING PAGE
   ========================================================= */

function prepareTrackingPage() {

    const input =
        document.getElementById("trackingOrderId");

    const result =
        document.getElementById("trackingResult");

    if (!input || !result) return;

    /* Do not erase an existing ID */

    if (!input.value.trim()) {

        result.innerHTML = `
            <div class="tracking-help">
                <i class="fa-solid fa-truck"></i>
                <p>
                    Enter your Order ID above to see
                    the current delivery status.
                </p>
            </div>
        `;
    }
}

/* =========================================================
   TRACK ORDER - IMPORTANT
   ========================================================= */

function trackOrder() {

    const input =
        document.getElementById("trackingOrderId");

    const result =
        document.getElementById("trackingResult");

    if (!input || !result) return;

    const orderId =
        input.value.trim().toUpperCase();

    if (!orderId) {

        result.innerHTML = `
            <div class="tracking-error">

                <i class="fa-solid fa-circle-exclamation"></i>

                <h3>Please enter an Order ID</h3>

                <p>
                    Example: TW12345678
                </p>

            </div>
        `;

        return;
    }

    const order =
        orders.find(
            item =>
                item.orderId.toUpperCase() === orderId
        );

    if (!order) {

        result.innerHTML = `
            <div class="tracking-error">

                <i class="fa-solid fa-circle-exclamation"></i>

                <h3>Order Not Found</h3>

                <p>
                    We could not find an order with ID
                    <strong>${orderId}</strong>.
                </p>

                <p>
                    Please check your Order ID and try again.
                </p>

            </div>
        `;

        return;
    }

    result.innerHTML = `

        <div class="tracking-result-card">

            <div class="tracking-header">

                <div>

                    <small>ORDER ID</small>

                    <h2>${order.orderId}</h2>

                </div>

                <span class="status-badge">
                    ${order.status}
                </span>

            </div>

            <hr>

            <div class="tracking-info">

                <div>
                    <small>Customer</small>
                    <strong>${order.name}</strong>
                </div>

                <div>
                    <small>Order Date</small>
                    <strong>${order.date}</strong>
                </div>

                <div>
                    <small>Payment</small>
                    <strong>${order.payment}</strong>
                </div>

                <div>
                    <small>Total Amount</small>
                    <strong>${formatPrice(order.total)}</strong>
                </div>

            </div>

            <h3>Delivery Status</h3>

            <div class="tracking-timeline">

                <div class="tracking-step completed">

                    <div class="step-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <div>
                        <strong>Order Placed</strong>
                        <p>Your order has been received.</p>
                    </div>

                </div>

                <div class="tracking-step active">

                    <div class="step-icon">
                        <i class="fa-solid fa-box"></i>
                    </div>

                    <div>
                        <strong>Processing</strong>
                        <p>Your order is being prepared.</p>
                    </div>

                </div>

                <div class="tracking-step">

                    <div class="step-icon">
                        <i class="fa-solid fa-truck"></i>
                    </div>

                    <div>
                        <strong>Shipped</strong>
                        <p>Your order will be shipped soon.</p>
                    </div>

                </div>

                <div class="tracking-step">

                    <div class="step-icon">
                        <i class="fa-solid fa-house"></i>
                    </div>

                    <div>
                        <strong>Delivered</strong>
                        <p>Your order will be delivered.</p>
                    </div>

                </div>

            </div>

            <h3>Ordered Products</h3>

            <div class="tracked-products">

                ${order.items.map(item => `

                    <div class="tracked-product">

                        <span>
                            ${item.name}
                            × ${item.quantity}
                        </span>

                        <strong>
                            ${formatPrice(
                                item.price * item.quantity
                            )}
                        </strong>

                    </div>

                `).join("")}

            </div>

        </div>
    `;
}

/* =========================================================
   ACCOUNT
   ========================================================= */

function renderAccount() {

    const container =
        document.getElementById("accountContent");

    if (!container) return;

    if (orders.length === 0) {

        container.innerHTML = `

            <div class="content-card">

                <h2>Welcome to TechWorld</h2>

                <p>
                    You have not placed any orders yet.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="showPage('products')">

                    Start Shopping

                </button>

            </div>
        `;

        return;
    }

    container.innerHTML = `

        <div class="content-card">

            <h2>My Orders</h2>

            ${orders.map(order => `

                <div class="account-order">

                    <div>

                        <strong>
                            ${order.orderId}
                        </strong>

                        <p>
                            ${order.date}
                        </p>

                    </div>

                    <div>

                        <strong>
                            ${formatPrice(order.total)}
                        </strong>

                        <p>
                            ${order.status}
                        </p>

                    </div>

                    <button
                        class="btn btn-primary"
                        onclick="openTracking('${order.orderId}')">

                        Track Order

                    </button>

                </div>

            `).join("")}

        </div>
    `;
}

/* =========================================================
   WISHLIST
   ========================================================= */

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(item => item !== id);

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist");
    }

    saveData();
    updateCounts();

    renderFeaturedProducts();
    applyFilters();

    if (
        document
            .getElementById("wishlistPage")
            ?.classList.contains("active-page")
    ) {
        renderWishlist();
    }
}

/* =========================================================
   RENDER WISHLIST
   ========================================================= */

function renderWishlist() {

    const container =
        document.getElementById("wishlistProducts");

    if (!container) return;

    const items =
        products.filter(
            product => wishlist.includes(product.id)
        );

    if (items.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-heart"></i>

                <h2>Your wishlist is empty</h2>

                <p>
                    Save products you like here.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="showPage('products')">

                    Browse Products

                </button>

            </div>
        `;

        return;
    }

    container.innerHTML =
        items.map(productCard).join("");
}

/* =========================================================
   DEALS
   ========================================================= */

function renderDeals() {

    const container =
        document.getElementById("dealProducts");

    if (!container) return;

    const deals =
        products.filter(
            product =>
                product.price < 30000
        );

    container.innerHTML =
        deals.map(productCard).join("");
}

/* =========================================================
   CONTACT
   ========================================================= */

function submitContactForm(event) {

    event.preventDefault();

    showToast("Message sent successfully!");

    event.target.reset();
}

/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    const navbar =
        document.getElementById("navbar");

    if (navbar) {
        navbar.classList.toggle("mobile-open");
    }
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}

/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateCounts();

    renderFeaturedProducts();

    applyFilters();

    /* Search with Enter key */

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    searchProducts();
                }

            }
        );
    }
});