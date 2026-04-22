const products = [
  {
    id: 1,
    name: "Kadın Pantolon",
    price: 1200,
    image: "freepik_2843862912.png",
    category: "kadin",
    type: "pantalon"
  },
  {
    id: 2,
    name: "Erkek Pantolon",
    price: 300,
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
    category: "erkek",
    type: "pantalon"
  },
  {
    id: 3,
    name: "Cocuk Pantolon",
    price: 800,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "cocuk",
    type: "pantalon"
  },
  {
    id: 4,
    name: "Kadın Tişört",
    price: 950,
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
    category: "kadin",
    type: "tisort"
  },
  {
    id: 5,
    name: "Erkek Tişört",
    price: 800,
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
    category: "erkek",
    type: "tisort"
  },
  {
    id: 6,
    name: "Cocuk Tişört",
    price: 300,
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
    category: "cocuk",
    type: "tisort"
  },
  {
    id: 7,
    name: "Kadın Şapka",
    price: 150,
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
    category: "kadin",
    type: "sapka"
  },
  {
    id: 8,
    name: "Erkek Şapka",
    price: 1500,
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
    category: "erkek",
    type: "sapka"
  },
    {
    id: 9,
    name: "Cocuk Şapka",
    price: 1500,
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
    category: "cocuk",
    type: "sapka"
  },
];

function renderTopProducts(list) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  list.slice(0, 4).forEach(p => {
    container.innerHTML += productCard(p);
  });
}

function renderBottomProducts(list) {
  const container = document.getElementById("products-bottom");
  if (!container) return;

  container.innerHTML = "";

  list.slice(5).forEach(p => {
    container.innerHTML += productCard(p);
  });
}
function productCard(p) {
  return `
    <div class="product" onclick="goToProduct(${p.id})" style="cursor:pointer">
      
      <img src="${p.image}">

      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.price} TL</p>

        <!-- FAVORİ -->
        <div class="save-icon" data-id="${p.id}" onclick="toggleFavorite(event, ${p.id})">
          ☆
        </div>

        <button onclick="event.stopPropagation(); goToProduct(${p.id})">
          Sepete Ekle
        </button>

      </div>
    </div>
  `;
}
renderTopProducts(products);
renderBottomProducts(products);

setTimeout(updateSaveIcons, 100);

function toggleFavorite(e, id) {
  e.stopPropagation(); // 🔥 EN KRİTİK SATIR

  let saved = JSON.parse(localStorage.getItem("saved")) || [];

  if (saved.includes(id)) {
    saved = saved.filter(s => s !== id);
  } else {
    saved.push(id);
  }

  localStorage.setItem("saved", JSON.stringify(saved));

  updateSaveIcons();
}

// CATEGORY PAGE
if (document.getElementById("category-title")) {

  const params = window.location.search.substring(1).split("&");

  const main = params[0];
  const sub = params[1];

  const filtered = products.filter(p =>
    p.category === main && p.type === sub
  );

  document.getElementById("category-title").innerText =
    main.toUpperCase() + " / " + sub.toUpperCase();

  renderProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("productDetail");

  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = Number(urlParams.get("id"));

  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = "<h2>Ürün bulunamadı</h2>";
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}">
    </div>

    <div class="product-info">
      <h1>${product.name}</h1>
      <p>${product.price} TL</p>

      <button onclick="goToProduct(${p.id})">Sepete Ekle</button>
    </div>
  `;
});


function animateBanner() {
  const banner = document.querySelector(".mero");
  if (!banner) return;

  const position = banner.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight - 100) {
    banner.classList.add("show");
  }
}

window.addEventListener("scroll", animateBanner);
window.addEventListener("load", animateBanner);
 

function goToProduct(id) {
  window.location.href = `product.html?id=${id}`;
}


// Ürünleri ana sayfaya bas
if (document.getElementById("products")) {
  const container = document.getElementById("products");

  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.price} TL</p>
          <button onclick="addToCart(${p.id})">Sepete Ekle</button>
        </div>
      </div>
    `;
  });
}
function loadCategoryPage() {
  if (document.getElementById("category-title")) {

  const params = new URLSearchParams(window.location.search);

  const main = params.get("category");
  const sub = params.get("type");

  const filtered = products.filter(p =>
    p.category === main && p.type === sub
  );

  document.getElementById("category-title").innerText =
    main.toUpperCase() + " / " + sub.toUpperCase();

  renderProducts(filtered);
}
}

loadCategoryPage();


function loadProductPage() {
  const el = document.getElementById("product-detail");
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const product = products.find(p => p.id === id);
  if (!product) return;

  el.innerHTML = `
    <img src="${product.image}">
    <h2>${product.name}</h2>
    <p>${product.price} TL</p>
  `;
}

loadProductPage();

function loadWishlist() {
  const el = document.getElementById("wishlist-container");
  if (!el) return;

  let favs = JSON.parse(localStorage.getItem("favorites")) || [];

  el.innerHTML = "";

  favs.forEach(id => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    el.innerHTML += `
      <div class="product">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}">
          <h3>${product.name}</h3>
          <p>${product.price} TL</p>
        </a>
      </div>
    `;
  });
}

loadWishlist();

// SEPET VERİSİ
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SEPETE EKLE
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const size = selectedSize || "Standart";
  const color = selectedColor || "Belirtilmedi";

  // 🔥 AYNI ÜRÜN + RENK + BEDEN VAR MI?
  const existingItem = cart.find(item =>
    item.id === id &&
    item.size === size &&
    item.color === color
  );

  if (existingItem) {
    // 👉 varsa sadece adet artır
    existingItem.quantity += 1;
  } else {
    // 👉 yoksa yeni ürün ekle
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      color: color,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
// SAYAC
function updateCartCount() {
  const el = document.getElementById("cart-count");

  if (el) {
    let total = cart.reduce((sum, i) => {
      return sum + (i.quantity || 0);
    }, 0);

    el.innerText = total;
  }
}

updateCartCount();

// CART SAYFASI
if (document.getElementById("cart-items")) {
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <a href="product.html?id=${item.id}">
     <img src="${item.image}" class="product-img">
          </a>

        <div>
          <h4>
        <a href="product.html?id=${item.id}" class="product-link">
            ${item.name}
        </a>
            </h4>
        </div>

        <!-- 🔥 BEDEN -->
      <p>Beden: <strong>${item.size}</strong></p>

      <!-- 🔥 RENK -->
      <p>Renk: <strong>${item.color}</strong></p>

        <div class="cart-price">${item.price} TL</div>

        <div class="quantity">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>

        <div class="remove" onclick="removeItem(${item.id})">❌</div>
      </div>
    `;
  });
    updateTotal();
  document.getElementById("total").innerText = total;
}


document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("productDetail");
  if (!container) return;

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = "<h2>Ürün bulunamadı</h2>";
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}">
    </div>

    <div class="product-info">

      <h1>${product.name}</h1>
      <p class="price">${product.price} TL</p>

      <!-- 🧾 AÇIKLAMA -->
      <p class="desc">
        Bu ürün modern tasarım, yüksek kalite kumaş ile üretilmiştir.
        Günlük kullanım için uygundur ve rahat kesime sahiptir.
      </p>

      <!-- 📏 BEDEN -->
      <label>Beden</label>
      <div class="sizes">
        <button onclick="selectSize(this)">S</button>
        <button onclick="selectSize(this)">M</button>
        <button onclick="selectSize(this)">L</button>
        <button onclick="selectSize(this)">XL</button>
      </div>

      <!-- 🎨 RENK -->
      <div class="colors">
        <div class="color black" onclick="selectColor('Siyah', this)"></div>
        <div class="color white" onclick="selectColor('Beyaz', this)"></div>
        <div class="color blue" onclick="selectColor('Mavi', this)"></div>
        </div>

      <!-- 🛒 -->
      <button onclick="addToCart(${product.id})">
        SEPETE EKLE
      </button>

    </div>
  `;
});

let selectedSize = "";
let selectedColor = "";

function selectSize(btn) {
  document.querySelectorAll(".sizes button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedSize = btn.innerText;
}

function selectColor(color, el) {
  selectedColor = color;

  // tüm renklerden active kaldır
  document.querySelectorAll(".color").forEach(c => c.classList.remove("active"));

  // seçilene active ekle
  el.classList.add("active");
}


// MİKTAR DEĞİŞTİR
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// SİL
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  renderCart();

  // 🔥 ANA SAYFAYI GÜNCELLE
  localStorage.setItem("cartUpdated", Date.now());
}
window.addEventListener("storage", function (event) {
  if (event.key === "cartUpdated") {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
  }
});
setInterval(() => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
}, 500);

function renderProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="product">

        <!-- RESİM = ÜRÜN SAYFASI -->
        <img src="${p.image}" onclick="goToProduct(${p.id})" style="cursor:pointer">

        <div class="product-info">

          <!-- İSİM = ÜRÜN SAYFASI -->
          <h3 onclick="goToProduct(${p.id})" style="cursor:pointer">
            ${p.name}
          </h3>

          <div class="save-icon" data-id="${p.id}">
             ☆
          </div>

          <p>${p.price} TL</p>

          <!-- 🔥 SEPETE EKLE YOK! -->
          <button onclick="goToProduct(${p.id})">
            SEPETE EKLE
          </button>

        </div>
      </div>
    `;
  });
}



// FAVORİLER
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let saved = JSON.parse(localStorage.getItem("saved")) || [];

// TIKLAMA
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("save-icon")) {
    const id = Number(e.target.dataset.id);

    if (saved.includes(id)) {
      saved = saved.filter(s => s !== id);
    } else {
      saved.push(id);
    }

    localStorage.setItem("saved", JSON.stringify(saved));
    updateSaveIcons();
  }
});

// ICON GÜNCELLE
function updateSaveIcons() {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];

  document.querySelectorAll(".save-icon").forEach(icon => {
    const id = Number(icon.dataset.id);

    if (saved.includes(id)) {
      icon.innerText = "★";
    } else {
      icon.innerText = "☆";
    }
  });
}

// SAYFA YÜKLENİNCE
setTimeout(updateSaveIcons, 100);

// FAVORİ SAYFASI
if (document.getElementById("favorites-list")) {
  renderFavoritesPage();
}

function renderFavoritesPage() {
  const container = document.getElementById("favorites-list");
  container.innerHTML = "";

  let saved = JSON.parse(localStorage.getItem("saved")) || [];

  saved = saved.map(Number);

  if (saved.length === 0) {
    container.innerHTML = "<p>Kaydedilen ürün yok</p>";
    return;
  }

  saved.forEach(id => {
    const product = products.find(p => p.id === Number(id));
    if (!product) return;

    container.innerHTML += `
      <div class="product">

        <div class="remove-btn" onclick="removeSaved(${product.id})">
          ✕
        </div>

         <img onclick="goToProduct(${product.id})" src="${product.image} ">


        <div class="product-info">
         <h3 onclick="goToProduct(${product.id})" style="cursor:pointer">
            ${product.name}
          </h3>
          <p>${product.price} TL</p>
        </div>
     
       <!-- 🛒 -->
      <button onclick="addToCart(${product.id})">
        SEPETE EKLE
      </button>

      </div>
    `;
  });
}

function filterCategory(main, sub) {
  const filtered = products.filter(p => 
    p.category === main && p.type === sub
  );

  renderProducts(filtered);
}


function removeSaved(id) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];

  // 🔥 HEPSİNİ NUMBER YAP
  saved = saved.map(Number);

  // 🔥 SİL
  saved = saved.filter(item => item !== Number(id));

  localStorage.setItem("saved", JSON.stringify(saved));

  renderFavoritesPage();
}

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

if (document.getElementById("productDetail")) {

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));

  const product = products.find(p => p.id === id);

  const container = document.getElementById("productDetail");

  container.innerHTML = `
    <img src="${product.image}">

    <div>
      <h2>${product.name}</h2>
      <p>${product.price} TL</p>

      <button onclick="addToCart(${product.id})">
        Sepete Ekle
      </button>
    </div>
  `;
}

function updateTotal() {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  document.getElementById("total").innerText = total;
}

// ÖDEME
function checkout() {
  alert("Ödeme sistemi demo (gerçek ödeme yok)");
}
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

function applyFilters() {
  let filtered = [...products];

  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value;

  // 🔍 ARAMA
  if (searchValue) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchValue)
    );
  }

  // 🎯 FİLTRE
  if (filterValue === "cheapest") {
  filtered = filtered.sort((a, b) => a.price - b.price);
}

  if (filterValue === "expensive") {
  filtered = filtered.sort((a, b) => b.price - a.price);
}

 if (filterValue === "pants") {
  filtered = filtered.filter(p => p.category === "pants");
}

  renderProducts(filtered);
}

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

renderProducts(products);
// WHATSAPP'A GÖNDER
function sendWhatsApp() {

  let phone = "905550066123"; // 👉 kendi numaranı yaz

  let message = "🛒 Sipariş Detayı:%0A%0A";

  cart.forEach(item => {
    message += `Ürün: ${item.name}%0A`;
    message += `Beden: ${item.size}%0A`;
    message += `Renk: ${item.color}%0A`;
    message += `Adet: ${item.quantity}%0A`;
    message += `Fiyat: ${item.price * item.quantity} TL%0A%0A`;
  });

  let total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  message += `💰 TOPLAM: ${total} TL`;

  let url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
}