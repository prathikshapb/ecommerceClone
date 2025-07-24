const cartIcon = document.querySelector('.nav-cart');
const cartSection = document.getElementById('cart-section');

cartIcon.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent link jump if any
  // Toggle cart section visibility
  if (cartSection.style.display === 'none') {
    cartSection.style.display = 'block';
  } else {
    cartSection.style.display = 'none';
  }
});

function closeCart() {
  cartSection.style.display = 'none';
}
const userId = 1; // replace with logged-in user ID dynamically if available

document.querySelector('.nav-cart').addEventListener('click', (e) => {
  e.preventDefault();
  const cartSection = document.getElementById('cart-section');
  cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';

  // Fetch and display cart items
  fetch(`http://localhost:8080/cart/${userId}`)
    .then(res => res.json())
    .then(items => {
      const cartItemsDiv = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');
      cartItemsDiv.innerHTML = ''; // clear previous content

      let total = 0;

      items.forEach(item => {
        total += item.price;
        cartItemsDiv.innerHTML += `
          <div class="cart-item">
            <p>${item.name} - ₹${item.price}</p>
          </div>
        `;
      });

      cartTotal.innerText = `Total: ₹${total}`;
    });
});

function closeCart() {
  document.getElementById('cart-section').style.display = 'none';
}
