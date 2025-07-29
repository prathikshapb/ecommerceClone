const products = [
  {
    name: "Laptop",
    price: "₹40,000",
    image: "images/laptop.jpg"
  },
  {
    name: "Smartphone",
    price: "₹25,000",
    image: "images/phone.jpg"
  },
  {
    name: "Headphones",
    price: "₹2,500",
    image: "images/headphones.jpg"
  }
];

const container = document.getElementById("product-list");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
  `;
  container.appendChild(card);
});
