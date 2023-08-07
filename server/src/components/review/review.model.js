const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    title: {
      type: String,
      required: [true, "review name required"],
      trim: true,
      minlength: [1, "too short review name"],
    },
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
    },
    averageRating: {
      type: Number,
      min: [1, "averageRating must be greater than 1"],
      max: [5, "averageRating must be less than 5"],
    },
  },
  { timestamps: true }
);
module.exports = model("review", schema);
