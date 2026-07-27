const state = {
    products: PRODUCTS,
    filtered: PRODUCTS,
    cart: JSON.parse(localStorage.getItem("cart")) || []
};

const el = {
    products: document.getElementById("products"),
    search: document.getElementById("search"),
    filter: document.getElementById("filter"),
    cartCount: document.getElementById("cart-count"),
    toast: document.getElementById("toast")
};

// =====================
// INIT
// =====================
function init() {
    renderProducts(state.products);
    updateCart();
}

// =====================
// RENDER
// =====================
function renderProducts(list) {
    el.products.innerHTML = "";

    list.forEach(p => {
        el.products.innerHTML += `
            <div class="card">
                <img src="${p.image}">
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <p class="price">R$ ${p.price}</p>
                    <button onclick="addToCart(${p.id})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
    });
}

// =====================
// SEARCH + FILTER
// =====================
function applyFilters() {
    const text = el.search.value.toLowerCase();
    const category = el.filter.value;

    state.filtered = state.products.filter(p => {
        return (
            (category === "all" || p.category === category) &&
            p.name.toLowerCase().includes(text)
        );
    });

    renderProducts(state.filtered);
}

// =====================
// CART
// =====================
function addToCart(id) {
    const product = state.products.find(p => p.id === id);
    state.cart.push(product);

    localStorage.setItem("cart", JSON.stringify(state.cart));

    updateCart();
    showToast("Produto adicionado!");
}

function updateCart() {
    el.cartCount.innerText = state.cart.length;
}

// =====================
// TOAST
// =====================
function showToast(msg) {
    el.toast.innerText = msg;
    el.toast.classList.add("show");

    setTimeout(() => {
        el.toast.classList.remove("show");
    }, 2000);
}

// =====================
// EVENTS
// =====================
el.search.addEventListener("input", applyFilters);
el.filter.addEventListener("change", applyFilters);

// =====================
init();
