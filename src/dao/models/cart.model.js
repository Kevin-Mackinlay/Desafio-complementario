import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  products: {
    type: [
      // Cada objeto en el array "products" tiene dos campos: "_id" y "quantity".
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products", //referenciamos con que lo vamos a popular.
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [], // Si no se proporciona ningún valor para "products", se establece como un array vacío por defecto.
  },
});

CartSchema.pre("find", function () {
  this.populate("products.productID");
});

const CartModel = mongoose.model("Carts", CartSchema);

export default CartModel;
