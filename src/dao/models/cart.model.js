import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: { type: Number, min: 1, default: 1 },
    },
  ],
},
{ timestamps: true }
);

cartSchema.prev(/^find/, (next) => {
    this.populate({
        path: "products.product",
        
    });
    next();
    }
);

export default mongoose.model(cartCollection, cartSchema);