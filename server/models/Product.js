const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    Category: {
      type: String,
      default: "Mobiles",
    },
    images: {
      type: Array,
      default: [],
    },
    cities: {
      type: Number,
      default: 1,
    },
    report: {
      type: String,
      default: "null",
    },
    views: {
      type: Number,
      default: 0,
    },
    city: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

productSchema.index({
  title: "text",
  description: "text",
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
