const socket = io();

const addProductBtn = document.getElementById("addProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");

addProductBtn.addEventListener("click", async () => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");
  const code = document.getElementById("code");
  const stock = document.getElementById("stock");

  const product = {
    title: title.value,
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
});

deleteProductBtn.addEventListener("click", async () => {
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
});

// socket.on("updateProducts", (data) => {
// 	if (data.success) {
// 		reloadList(data);
// 		return;
// 	} else {
// 		alert(data.message);
// 	}
// });

document.addEventListener("DOMContentLoaded", function () {
  // Find all "Agregar al carrito" buttons
  const botonesAgregarAlCarrito = document.querySelectorAll(".agregar-al-carrito");

  // Attach event listener to each button
  botonesAgregarAlCarrito.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Get the product ID from the button's data-product-id attribute
      const productoId = this.getAttribute("data-product-id");

      // Data to send to the server
      const datos = {
        productoId: productoId,
        cantidad: 1, // Quantity of the product to add to the cart
      };

      // POST request configuration
      const opcionesFetch = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You can add more headers if necessary
        },
        body: JSON.stringify(datos), // Convert data to JSON format
      };

      // URL of the endpoint to add products to the cart
      const urlAgregarAlCarrito = "/carts/routes";

      // Perform the POST request using fetch()
      fetch(urlAgregarAlCarrito, opcionesFetch)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar el producto al carrito");
          }
          // Perform additional actions if the request is successful
          console.log("Producto agregado al carrito exitosamente");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle the error according to your needs
        });
    });
  });
});



function reloadList(products) {
  const productList = document.getElementById("productList");
  // Se vacía lista existente en front
  productList.innerHTML = "";
  // Por cada producto se crea un elemento "div" de clase "productCard" y se anexa dentro del div "productList"
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
