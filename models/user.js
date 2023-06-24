const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        proId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      },
      { quantity: { type: Number, required: true } },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let neWQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex > 0) {
    neWQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = neWQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: neWQuantity,
    });
  }
  product.quantity = 1;
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updateCartItems = this.cart.items.filter((item) => {
    return item.productId !== productId.toString();
  });
  this.cart.items = updateCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
