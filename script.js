document.addEventListener("DOMContentLoaded", () => {
    const shopSection = document.querySelector(".shop");

    // Function to fetch all products
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/products/all");
            const products = await response.json();

            if (products.length === 0) {
                shopSection.innerHTML = "<p>No products available.</p>";
                return;
            }

            shopSection.innerHTML = ""; // Clear existing

            products.forEach(product => {
                const box = document.createElement("div");
                box.classList.add("box");

                box.innerHTML = `
                    <div class="box-content">
                        <h2>${product.name}</h2>
                        <div class="box-img" style="background-image: url('${product.imageUrl}');"></div>
                        <p>₹${product.price}</p>
                    </div>
                `;

                shopSection.appendChild(box);
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            shopSection.innerHTML = "<p>Error loading products.</p>";
        }
    };

    fetchProducts();
});
let cart = [];

function addToCart(product) {
  cart.push(product);
  alert(`${product.title} added to cart!`);
  updateCartCount();
}

function updateCartCount() {
  const cartIcon = document.getElementById("cart-count");
  if (cartIcon) {
    cartIcon.innerText = cart.length;
  }
}

// Update your product HTML rendering to include an Add to Cart button
function createProductHTML(product) {
  return `
    <div class="box">
      <div class="box-content">
        <h2>${product.title}</h2>
        <div class="box-img" style="background-image: url('${product.image}');"></div>
        <p>Price: ₹${product.price}</p>
        <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
      </div>
    </div>
  `;
}
function selectPayment() {
  if (cart.length === 0) {
    alert("Cart is empty! Add something first.");
    return;
  }

  const method = prompt("Select Payment Method:\n1. UPI\n2. Credit Card\n3. Cash on Delivery");
  
  switch(method) {
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

