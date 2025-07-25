// Event listener for the cart icon click
document.querySelector('.nav-cart').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default action
    const cartSection = document.getElementById('cart-section');
    // Toggle cart visibility
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
    if (cartSection.style.display === 'block') {
        openCart(); // Fetch and display items if cart is opened
    }
});

// Function to fetch and display cart items
function openCart() {
    const userId = 1; // Change this based on actual logged-in user if needed

    fetch(`http://localhost:8080/cart/${userId}`) // Fetch cart items for the user
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(items => {
            const cartItemsDiv = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            cartItemsDiv.innerHTML = ''; // Clear previous items

            let total = 0; // Initialize total price

            // Loop through items and display them
            items.forEach(item => {
                total += item.product.price * item.quantity; // Calculate total
                cartItemsDiv.innerHTML += `
                    <div class="cart-item">
                        <p>${item.product.name} - ₹${item.product.price} x ${item.quantity}</p>
                        <button onclick="removeFromCart(${item.product.id})">Remove</button>
                    </div>
                `;
            });

            cartTotal.innerText = `Total: ₹${total}`; // Display total price
        })
        .catch(err => {
            console.error("Cart fetch error:", err);
            alert("Failed to load cart. Make sure the backend is running.");
        });
}

// Function to close the cart
function closeCart() {
    document.getElementById('cart-section').style.display = 'none';
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    fetch(`http://localhost:8080/cart/remove/${productId}`, {
        method: 'DELETE',
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(updatedCart => {
        openCart(); // Refresh cart items after removal
    })
    .catch(err => {
        console.error("Remove item error:", err);
        alert("Failed to remove item from cart.");
    });
}
