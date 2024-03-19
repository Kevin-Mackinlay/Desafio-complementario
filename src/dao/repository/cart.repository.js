import cartModel from "../mongo/models/cart.schema.js";

export default class Carts {
  constructor() {}

  get = async () => {
    return await cartModel.find().lean();
  };

  create = async (cart) => {
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
