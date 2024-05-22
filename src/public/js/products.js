document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch all products and render them on the page
  const fetchAndRenderProducts = async () => {
    try {
      const response = await fetch("/api/products"); // Adjust the endpoint as needed
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
    }
  };

  // Function to render products on the page
  const renderProducts = (products) => {
    const productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = ""; // Clear existing content

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Available: ${product.stock} items</p>
        <button class="addProductToCart" id="${product._id}">Add to Cart</button>
      `;
      productsContainer.appendChild(productElement);
    });
  };

  // Fetch and render products on page load
  fetchAndRenderProducts();

  // Event listener for adding a product to the cart
  document.body.addEventListener("click", async (event) => {
    if (event.target.matches(".addProductToCart")) {
      const productId = event.target.id;
      const cartIdElement = document.getElementById("cartId");

      if (!cartIdElement || !cartIdElement.value) {
        console.error("Cart ID element not found or is empty");
        alert("Cart ID element is missing or empty. Please try again.");
        return;
      }

      const cartId = cartIdElement.value;
      console.log(`Adding product ID: ${productId} to cart ID: ${cartId}`);

      try {
        const url = `/api/carts/${cartId}/product/${productId}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const result = await response.json();
        if (result.success) {
          alert("Product added to cart successfully");
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("Error adding product to cart");
      }
    }
  });
});
