const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
      trim: true,
      unique: [true, "Product name unique"],
      minlength: [2, "too short Product name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description required"],
      trim: true,
      minlength: [10, "too short Product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity required"],
      default: 0,
    },
    colors: [String],
    price: {
      type: Number,
      required: [true, "Product price required"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "Product price after discount required"],
    },
    sold: {
      type: Number,
      required: [true, "Product sold required"],
      default: 0,
    },
    imageCover: String,
    images: [String],
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: [true, "Product category required"],
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "subcategory",
      required: [true, "Product subcategory required"],
    },
    brand: {
      type: Types.ObjectId,
      ref: "brand",
      required: [true, "Product brand required"],
    },
    averageRating: {
      type: Number,
      min: [1, "averageRating must be greater than 1"],
      max: [5, "averageRating must be less than 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.post("init", (doc) => {
  let imgs = [];
  doc.imageCover = process.env.BASE_URL + "items/" + doc.imageCover;
  doc.images.forEach((elm) => {
    imgs.push(process.env.BASE_URL + "items/" + elm);
  });
  doc.images = imgs;
});

module.exports = model("product", schema);
