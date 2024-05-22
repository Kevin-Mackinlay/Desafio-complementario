document.addEventListener("DOMContentLoaded", () => {
  // This will capture clicks on any element within the body
  document.body.addEventListener("click", async (event) => {
    // Check if the clicked element has the class 'addProductToCart'
    if (event.target.matches(".addProductToCart")) {
      const productId = event.target.id; // Get product ID from button's id attribute
      const cartIdElement = document.getElementById("cartId");

      // Check if the cartIdElement exists and has a value
      if (!cartIdElement || !cartIdElement.value) {
        console.error("Cart ID element not found or is empty");
        alert("Cart ID element is missing or empty. Please try again.");
        return;
      }

      const cartId = cartIdElement.value; // Get the cart ID from the hidden input
      console.log(`Adding product ID: ${productId} to cart ID: ${cartId}`);

      // API request to add the product to the cart
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
