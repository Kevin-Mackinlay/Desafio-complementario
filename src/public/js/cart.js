document.addEventListener("DOMContentLoaded", () => {
  const cartId = document.getElementById("cartId").value; // Assumes there's an input field holding the cart ID.

  document.getElementById("addProductForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const productId = document.getElementById("productId").value;
    await addProductToCart(cartId, productId);
  });

  document.getElementById("deleteProductForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const productId = document.getElementById("productId").value;
    await deleteProductFromCart(cartId, productId);
  });

  document.getElementById("purchaseCart").addEventListener("click", async () => {
    await purchaseCart(cartId);
  });

  async function addProductToCart(cartId, productId) {
    try {
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: "POST",
      });
      const result = await response.json();
      alert(result.message);
      updateCartView();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  async function deleteProductFromCart(cartId, productId) {
    try {
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      alert(result.message);
      updateCartView();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  }

  async function purchaseCart(cartId) {
    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: "POST",
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error purchasing items in cart:", error);
    }
  }

  async function updateCartView() {
    try {
      const response = await fetch(`/api/carts/${cartId}`);
      const result = await response.json();
      if (response.ok) {
        renderCartDetails(result.data);
      } else {
        console.error("Failed to fetch cart details:", result.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  function renderCartDetails(cart) {
    // Assumes there's a div with id "cartDetails" where cart details are displayed.
    const cartDetailsDiv = document.getElementById("cartDetails");
    cartDetailsDiv.innerHTML = ""; // Clear previous details
    cart.products.forEach((product) => {
      const productElem = document.createElement("div");
      productElem.innerHTML = `Product: ${product.title}, Quantity: ${product.quantity}`;
      cartDetailsDiv.appendChild(productElem);
    });
  }
});
