const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", async (event) => {
    if (event.target.matches(".addProductToCart")) {
      const productId = event.target.id;
      const cartId = document.getElementById("cartId").value; // Get the cart ID from the hidden input
      console.log(`Add product with ID: ${productId} to cart`);

      try {
        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
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
          window.location.href = `/cart/${cartId}`;
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }

    if (event.target.matches("#addProductBtn")) {
      // Add product logic
    }

    if (event.target.matches("#deleteProductBtn")) {
      // Delete product logic
    }
  });

  function reloadList(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("productCard");
      card.innerHTML = `
        <div class="cardProduct__image">
          <img src=${product.thumbnail} alt=${product.title} />
        </div>
        <div class="cardProduct__info">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>${product.price}</p>
          <p>${product.stock}</p>
          <p>${product.code}</p>
          <p>${product.id}</p>
        </div>
      `;
      productList.appendChild(card);
    });
  }
});
