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
