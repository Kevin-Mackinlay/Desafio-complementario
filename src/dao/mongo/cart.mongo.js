import cartModel from "./models/cart.schema.js";

export default class Carts {
  constructor() {}

  get = async () => {
    return await cartModel.find();
  };

  create = async () => {
    const newCart = new cartModel(cart);
    await newCart.save();
    return newCart;
  };

  modify = async (id, cart) => {
    return await cartModel.finByIdAndUpdate(id, cart, { new: true });
  };

  delete = async (id) => {
    return await cartModel.findByIdAndDelete(id);
  };
}




















// import mongoose from "mongoose";

// const CartSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Products",
//         },
//         quantity: {
//           type: Number,
//           min: 1,
//           default: 1,
//         },
//         _id: false,
//       },
//     ],
//   },
//   { timestamps: true }
// );
// //expresion regular cualquier cosa que comience con find
// CartSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "products.product",
//   });
//   next();
// });

// export default mongoose.model("Carts", CartSchema);


// localhost:8080/api/carts/65b2fefa1d61899a70192272/products/65b2d4132440be292ec978c6