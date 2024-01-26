import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

CartSchema.pre("find", function (next) {
  this.populate({
    path: "products.product",
  });
  next();
});

export default mongoose.model("Carts", CartSchema);


// localhost:8080/api/carts/65b2fefa1d61899a70192272/products/65b2d4132440be292ec978c6