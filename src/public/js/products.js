document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  document.body.addEventListener("click", async (event) => {
    if (event.target.matches(".addProductToCart")) {
      const productId = event.target.id;
      console.log(`Add product with ID: ${productId} to cart`);

      // Implement add to cart functionality here
      // For example, you could send a request to your backend to add the product to the cart
    }

    if (event.target.matches("#addProductBtn")) {
      const title = document.getElementById("title");
      const description = document.getElementById("description");
      const price = document.getElementById("price");
      const thumbnail = document.getElementById("thumbnail");
      const code = document.getElementById("code");
      const stock = document.getElementById("stock");

      const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
      };

      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({ product }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            reloadList(data.products);
            alert("Producto agregado con éxito");
          }
        })
        .catch((data) => {
          alert(data.message);
        });

      document.getElementById("addForm").reset();
    }

    if (event.target.matches("#deleteProductBtn")) {
      const id = document.getElementById("productId");

      await fetch(`/api/products/${id.value}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            reloadList(data.products);
            alert(`Producto ${id.value} eliminado con éxito`);
          }
        })
        .catch((data) => {
          alert(data.message);
        });

      document.getElementById("deleteForm").reset();
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
