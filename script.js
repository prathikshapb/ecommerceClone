let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();
    fetchProducts();
});

// Load products from backend
const fetchProducts = async () => {
    const shopSection = document.querySelector(".shop");

    try {
        const response = await fetch("http://localhost:8080/products/all");
        const products = await response.json();

        if (products.length === 0) {
            shopSection.innerHTML = "<p>No products available.</p>";
            return;
        }

        shopSection.innerHTML = ""; // Clear existing
        products.forEach(product => {
            shopSection.innerHTML += createProductHTML(product);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        shopSection.innerHTML = "<p>Error loading products.</p>";
    }
};

// Create product card HTML with Add to Cart
function createProductHTML(product) {
    return `
    <div class="box">
        <div class="box-content">
            <h2>${product.name}</h2>
            <div class="box-img" style="background-image: url('${product.imageUrl}');"></div>
            <p>₹${product.price}</p>
            <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        </div>
    </div>
    `;
}

// Add product to cart
function addToCart(product) {
    cart.push(product);
    saveCartToStorage();
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Save cart in localStorage
function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem("cart");
    cart = storedCart ? JSON.parse(storedCart) : [];
    updateCartCount();
}

// Update cart count on UI
function updateCartCount() {
    const cartIcon = document.getElementById("cart-count");
    if (cartIcon) {
        cartIcon.innerText = cart.length;
    }
}

// Select payment method
function selectPayment() {
    if (cart.length === 0) {
        alert("Cart is empty! Add something first.");
        return;
    }

    const method = prompt("Select Payment Method:\n1. UPI\n2. Credit Card\n3. Cash on Delivery");

    switch (method) {
        case "1":
            alert("You selected UPI. Proceeding to payment...");
            break;
        case "2":
            alert("You selected Credit Card. Proceeding to payment...");
            break;
        case "3":
            alert("Cash on Delivery selected. Order will be placed.");
            break;
        default:
            alert("Invalid payment method.");
    }
}
