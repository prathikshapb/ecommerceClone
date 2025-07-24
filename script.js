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
