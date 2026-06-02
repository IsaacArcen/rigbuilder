const mongoose = require("mongoose");

// Beskriver kunduppgifterna i en order.
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "swish"],
      required: true,
    },
  },
  {
    // Skapar inte ett extra MongoDB-id för customer-objektet.
    _id: false,
  }
);

// Beskriver varje produkt som sparas i en order.
const orderItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

// Beskriver hela ordern.
const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: customerSchema,
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    // Lägger automatiskt till createdAt och updatedAt.
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);