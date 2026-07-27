const state = {
    page: "home",
    products: PRODUCTS,
    cart: JSON.parse(localStorage.getItem("cart")) || []
};

const app = document.getElementById("app");
const cartCount = document.getElementById("cart-count");
const toast = document.getElementById("toast");

// ================= NAV =================
function navigate(page) {
    state.page = page;
    render();
}

// ================= RENDER =================
function render() {
    updateCart();

    if(state.page === "home"){
        app.innerHTML = `<h2 style="padding:20px;">Bem-vindo ao PetShop MAX 🐾</h2>`;
    }

    if(state.page === "products"){
        app.innerHTML = `
            <input id="search" placeholder="Buscar...">
            <select id="filter">
                <option value="all">Todos</option>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
                <option value="other">Outros</option>
            </select>

            <div id="grid" class="grid"></div>
        `;

        document.getElementById("search").addEventListener("input", applyFilters);
        document.getElementById("filter").addEventListener("change", applyFilters);

        renderProducts(state.products);
    }

    if(state.page === "cart"){
        if(state.cart.length === 0){
            app.innerHTML = `<h2 style="padding:20px;">Carrinho vazio</h2>`;
            return;
        }

        app.innerHTML = `<div id="cartList"></div>`;
        const list = document.getElementById("cartList");

        state.cart.forEach((item,i)=>{
            list.innerHTML += `
                <div style="padding:10px;">
                    ${item.name} - R$ ${item.price}
                    <button onclick="removeItem(${i})">Remover</button>
                </div>
            `;
        });
    }
}

// ================= PRODUCTS =================
function renderProducts(list){
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    list.forEach(p=>{
        grid.innerHTML += `
            <div class="card">
                <img src="${p.image}">
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <p>R$ ${p.price}</p>
                    <button onclick="addToCart(${p.id})">Adicionar</button>
                </div>
            </div>
        `;
    });
}

// ================= FILTER =================
function applyFilters(){
    const text = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("filter").value;

    const filtered = state.products.filter(p=>{
        return (
            (category === "all" || p.category === category) &&
            p.name.toLowerCase().includes(text)
        );
    });

    renderProducts(filtered);
}

// ================= CART =================
function addToCart(id){
    const product = state.products.find(p=>p.id===id);
    state.cart.push(product);
    localStorage.setItem("cart", JSON.stringify(state.cart));
    updateCart();
    showToast("Adicionado!");
}

function removeItem(i){
    state.cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(state.cart));
    render();
}

function updateCart(){
    cartCount.innerText = state.cart.length;
}

// ================= TOAST =================
function showToast(msg){
    toast.innerText = msg;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);
}

// ================= INIT =================
render();
