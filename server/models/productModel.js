const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
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

        image: {
            type: String,
            default: "",
        },

        specs:  {
            type: [String],
            default: [],
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);