const ProductModel = require("./product.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require("../../utils/catchAsync");
const { default: slugify } = require("slugify");

// exports.createProduct = factory.create(ProductModel);

exports.createProduct = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  let imgs = [];

  if (req.files && req.files.imageCover) {
    req.body.imageCover = req.files.imageCover[0].filename;
  }
  if (req.files && req.files.images) {
    req.files.images.forEach((elm) => {
      imgs.push(elm.filename);
    });
    req.body.images = imgs;
  }
  let Product = new ProductModel(req.body);
  await Product.save();
  res.status(200).json(Product);
});

exports.getProducts = factory.getAll(ProductModel);
exports.getProduct = factory.getById(ProductModel);
exports.updateProduct = factory.update(ProductModel);
exports.deleteProduct = factory.delete(ProductModel);
